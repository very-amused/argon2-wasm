import { Argon2, Base64 as b64 } from '../runtime/index.js'
const conn = new Argon2.WorkerConnection(new Worker('/argon2/worker.js'))


/** @override */
const qs: Document['querySelector'] = document.querySelector.bind(document)

// Document elements
const els = {
  password: qs<HTMLInputElement>('input#password')!,
  salt: qs<HTMLInputElement>('input#salt')!,
  textSalt: qs<HTMLInputElement>('input#text_salt')!,
  timeCost: qs<HTMLInputElement>('input#t_cost')!,
  memoryCost: qs<HTMLInputElement>('input#m_cost')!,
  threads: qs<HTMLInputElement>('input#threads')!,
  mode: qs<HTMLSelectElement>('select#argon2_mode')!,
  simd: qs<HTMLInputElement>('input#simd_enabled')!,
  pthread: qs<HTMLInputElement>('input#pthread_enabled')!,
  run: qs<HTMLInputElement>('input#submit')!,
  result: qs<HTMLSpanElement>('span#result')!,
  timer: qs<HTMLElement>('section#timer')!,
  timerValue: qs<HTMLSpanElement>('span#timer_value')!,
  form: qs<HTMLFormElement>('form#demoForm')!
}

// Store initial checkbox values
let simdEnabled = els.simd.checked
let pthreadEnabled = els.pthread.checked

// Now that the response listener is initialized, we can tell the worker to load the WebAssembly binary and check for errors
;(async function() {
  const loadMessage = await conn.postMessage({
    method: Argon2.Methods.LoadArgon2,
    params: {
      wasmRoot: '.',
      simd: simdEnabled,
      pthread: pthreadEnabled
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
  let errorName = ''
  for (const name in Argon2.ErrorCodes) {
    if (Argon2.ErrorCodes[name] === code) {
      errorName = name
      break
    }
  }
  writeResult(`Error: ${errorName} (code ${code})`)
}

els.form.onsubmit = async (evt) => {
  evt.preventDefault()

  // Disable the run button until the demo is done running, this prevents throwing the event loop out of wack with the worker
  els.run.disabled = true
  // Clear any previous resuls and show the flashing cursor
  els.result.textContent = ''

  // Reload argon2 if toggles have changed
  const simd = els.simd.checked
  const pthread = els.pthread.checked
  if (simd !== simdEnabled || pthread !== pthreadEnabled) {
    const loadMessage = await conn.postMessage({
      method: Argon2.Methods.LoadArgon2,
      params: {
        wasmRoot: '.',
        simd,
        pthread: pthread
      }
    })
    if (loadMessage.code !== 0) {
      displayError(loadMessage.code)
      return
    }
    simdEnabled = simd
    pthreadEnabled = pthread
  }


  // If a salt has been provided, decode and use that one
  let salt: Uint8Array
  let updateEncodedSalt = false
  let encodedSalt = els.salt.value
  let textSalt = els.textSalt.value
  if (textSalt.length >= 8) {
    // Use text salt (for compatibility w/ argon2 CLI tools)
    const enc = new TextEncoder()
    salt = enc.encode(textSalt)
    updateEncodedSalt = true
  } else if (encodedSalt.length > 0) {
    try {
      salt = b64.decode(encodedSalt)
    } catch (err) {
      writeResult(`Failed to decode salt: ${err}`)
      return
    }
    // Our salt might also have a useful text form, so we try to decode into that
    // and ignore any errors
    try {
      const dec = new TextDecoder('utf-8', {fatal: true})
      textSalt = dec.decode(salt)
      els.textSalt.value = textSalt
    } catch {
      // pass
    }
  } else {
    // Otherwise generate a random salt
    salt = new Uint8Array(16)
    crypto.getRandomValues(salt)
    updateEncodedSalt = true
  }
  if (updateEncodedSalt) {
    encodedSalt = b64.encode(salt)
    els.salt.value = encodedSalt
  }

  // Parse time, memory, and thread cost
  const timeCost = parseInt(els.timeCost.value)
  const threads = parseInt(els.threads.value)
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

  const params: Argon2.Parameters = {
    mode: els.mode.value as Argon2.Modes,
    password: els.password.value.normalize('NFC'),
    salt,
    timeCost,
    memoryCost,
    threads: 1,
    hashLen: 32
  }
  console.table(params)
  const start = performance.now()
  const result = await conn.postMessage({
    method: Argon2.Methods.Hash,
    params
  })
  let elapsed = performance.now() - start

  if (result.code === 0) {
    writeResult(b64.encode(result.body!))
  } else {
    // Get the argon2 error code's name from the Argon2.ErrorCodes enum
    displayError(result.code)
  }

  // Second and minute values in terms of milliseconds
  const msSec = 1000
  const msMin = 60 * msSec

  const minutes = Math.floor(elapsed / msMin)
  elapsed -= minutes * msMin
  const seconds = Math.floor(elapsed / msSec)
  elapsed -= seconds * msSec
  const ms = elapsed.toFixed(2)

  els.timerValue.textContent = `${minutes}m ${seconds}s ${ms}ms`
}
