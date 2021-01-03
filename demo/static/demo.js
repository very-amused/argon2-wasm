import { Argon2_Actions, Argon2_ErrorCodes } from './argon2.js'
import { initResponseListener, removeResponseListener, nextMessage } from './listen.js'
const worker = new Worker('./worker.js')

// Initialize the listener for messages from the worker (guarantees we receive the last message posted when we await nextMessage)
initResponseListener(worker);

// Now that the response listener is initialized, we can tell the worker to load the WebAssembly binary and check for errors
(async function() {
  worker.postMessage({
    action: Argon2_Actions.LoadArgon2
  })
  
  const loadMessage = await nextMessage(worker)
  if (loadMessage.code !== 0) {
    displayError(loadMessage.code)
    return
  }
})()

// Unload this listener before the document unloads
document.onbeforeunload = () => {
  removeResponseListener(worker)
}

// Remove the flashing cursor and write text to the result field
function writeResult(text) {
  document.querySelector('pre#result').classList.remove('show-cursor')
  document.querySelector('pre#result').textContent = text
}

function displayError(code) {
  let errorName = ''
  for (const name in Argon2_ErrorCodes) {
    if (Argon2_ErrorCodes[name] === code) {
      errorName = name
      break
    }
  }
  writeResult(`Error: ${errorName} (code ${code})`)
}

document.querySelector('form#demoForm').onsubmit = async (evt) => {
  evt.preventDefault()
  // Disable the run button until the demo is done running, this prevents throwing the event loop out of wack with the worker
  document.querySelector('input#submit').disabled = true
  // Clear any previous resuls and show the flashing cursor
  const resultEl = document.querySelector('pre#result')
  resultEl.textContent = ''
  if (!resultEl.classList.contains('show-cursor')) {
    resultEl.classList.add('show-cursor')
  }

  // If a salt has been provided, decode and use that one
  let salt
  let encodedSalt = document.querySelector('input#salt').value
  if (encodedSalt.length) {
    try {
      const raw = atob(encodedSalt)
      salt = new Uint8Array(raw.length)
      for (let i = 0; i < raw.length; i++) {
        salt[i] = raw.charCodeAt(i)
      }
    } catch (err) {
      document.querySelector('input#submit').disabled = false
      const errorMsg = `Failed to decode salt (${err})`
      writeResult(`Error: ${errorMsg}`)
      throw new Error(errorMsg)
    }
  } else {
    // Otherwise generate a random salt
    salt = new Uint8Array(16)
    crypto.getRandomValues(salt)
    encodedSalt = btoa(String.fromCharCode.apply(null, Array.from(salt)))
    document.querySelector('input#salt').value = encodedSalt
  }

  // Parse the time and memory cost
  const timeCost = parseInt(document.querySelector('input#t_cost').value)
  // Argon2 expects memory cost in the form of KiB, so we have to parse this value as such
  const memoryCostValue = document.querySelector('input#m_cost').value.toUpperCase()
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
      document.querySelector('input#submit').disabled = false
      const errorMsg = `Failed to parse memory cost (${err})`
      writeResult(`Error: ${errorMsg}`)
      throw new Error(errorMsg)
    }
  }

  worker.postMessage({
    action: Argon2_Actions.Hash2i,
    body: {
      options: {
        password: document.querySelector('input#password').value,
        salt,
        timeCost,
        memoryCost,
        hashLen: 32
      }
    }
  })
  const message = await nextMessage(worker)

  if (message.code === 0) {
    const encodedHash = btoa(String.fromCharCode.apply(null, Array.from(message.body)))
    writeResult(encodedHash)  
  } else {
    // Get the argon2 error code's name from the Argon2_ErrorCodes enum
    displayError(message.code)
  }

  document.querySelector('input#submit').disabled = false
}
