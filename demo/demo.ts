import { Argon2 } from '../runtime/index.js'
const conn = new Argon2.WorkerConnection(new Worker('./argon2/worker.js'))


/** @override */
const qs: Document['querySelector'] = document.querySelector.bind(document)

// Document elements
const els = {
  password: qs<HTMLInputElement>('input#password')!,
  salt: qs<HTMLInputElement>('input#salt')!,
  timeCost: qs<HTMLInputElement>('input#t_cost')!,
  memoryCost: qs<HTMLInputElement>('input#m_cost')!,
  simd: qs<HTMLInputElement>('input#simd_enabled')!,
  run: qs<HTMLInputElement>('input#submit')!,
  result: qs<HTMLSpanElement>('span#result')!,
  timer: qs<HTMLElement>('section#timer')!,
  timerValue: qs<HTMLSpanElement>('span#timer_value')!,
  form: qs<HTMLFormElement>('form#demoForm')!
}

// Store initial value of simdEnabled checkbox
let simdEnabled = els.simd.checked

// Now that the response listener is initialized, we can tell the worker to load the WebAssembly binary and check for errors
;(async function() {
  const loadMessage = await conn.postMessage({
    method: Argon2.Methods.LoadArgon2,
    params: {
      wasmRoot: '.',
      simd: simdEnabled,
      pthread: true
    }
  })
  
  if (loadMessage.code !== 0) {
    displayError(loadMessage.code)
  }
})()

// Unload this listener before the document unloads
document.onclose = () => {
  conn.terminate()
}

function writeResult(text: string) {
  els.run.disabled = false
  els.result.textContent = text
}

function displayError(code: unknown) {
  // TODO: re-implement error code -> name mapping for display
  let errorName = ''
  writeResult(`Error: ${errorName} (code ${code})`)
}

els.form.onsubmit = async (evt) => {
  evt.preventDefault()

  // Disable the run button until the demo is done running, this prevents throwing the event loop out of wack with the worker
  els.run.disabled = true
  // Clear any previous resuls and show the flashing cursor
  els.result.textContent = ''

  // Reload argon2 if SIMD toggle has changed
  const simd = els.simd.checked
  if (simd !== simdEnabled) {
    const loadMessage = await conn.postMessage({
      method: Argon2.Methods.LoadArgon2,
      params: {
        wasmRoot: '.',
        simd,
        pthread: false
      }
    })
    if (loadMessage.code !== 0) {
      displayError(loadMessage.code)
      return
    }
    simdEnabled = simd
  }

  // If a salt has been provided, decode and use that one
  let salt: Uint8Array
  let encodedSalt = els.salt.value
  if (encodedSalt.length) {
    try {
      const raw = atob(encodedSalt)
      salt = new Uint8Array(raw.length)
      for (let i = 0; i < raw.length; i++) {
        salt[i] = raw.charCodeAt(i)
      }
    } catch (err) {
      const errorMsg = `Failed to decode salt (${err})`
      writeResult(`Error: ${errorMsg}`)
      return
    }
  } else {
    // Otherwise generate a random salt
    salt = new Uint8Array(16)
    crypto.getRandomValues(salt)
    encodedSalt = btoa(String.fromCharCode.apply(null, Array.from(salt)))
    els.salt.value = encodedSalt
  }

  // Parse the time and memory cost
  const timeCost = parseInt(els.timeCost.value)
  // Argon2 expects memory cost in the form of KiB, so we have to parse this value as such
  const memoryCostValue = els.memoryCost.value.toUpperCase()
  let memoryCost = 0
  if (memoryCostValue.endsWith('MB')) {
    memoryCost = 1024 * parseInt(memoryCostValue)
  } else if (memoryCostValue.endsWith('GB')) {
    memoryCost = 1024 * 1024 * parseInt(memoryCostValue)
  } else {
    // Assume that any suffix other than MB or GB refers to KB
    try {
      memoryCost = parseInt(memoryCostValue)
      if (isNaN(memoryCost)) {
        throw 'Value entered in form is NaN'
      }
    } catch (err) {
      const errorMsg = `Failed to parse memory cost (${err})`
      writeResult(`Error: ${errorMsg}`)
      return
    }
  }

  const start = performance.now()
  const result = await conn.postMessage({
    method: Argon2.Methods.Hash2i,
    params: {
      password: els.password.value.normalize('NFC'),
      salt,
      timeCost,
      memoryCost,
      hashLen: 32
    }
  })
  let elapsed = performance.now() - start
  console.log(result)

  if (result.code === 0) {
    const encodedHash = btoa(String.fromCharCode.apply(null, Array.from(result.body!)))
    writeResult(encodedHash)  
  } else {
    // Get the argon2 error code's name from the Argon2.ErrorCodes enum
    displayError(result.code)
  }

  const minutes = Math.floor(elapsed / 60000).toString()
  elapsed %= 60000
  const seconds = Math.floor(elapsed / 1000).toString()
  elapsed %= 1000
  const ms = elapsed.toString()

  els.timerValue.textContent = `${minutes}m ${seconds}s ${ms}ms`
}
