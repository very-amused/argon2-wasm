import { Argon2_Exports, Argon2_ErrorCodes, loadArgon2, Argon2_Request, Argon2_Actions } from './argon2.js'

let argon2: Argon2_Exports

function getErrorMessage(err: any): string {
  if (err instanceof Error) {
    return err.message
  } else if (typeof err === 'string') {
    return err
  } else {
    return 'An unknown error has occured, and a message was unable to be parsed from this error'
  }
}

function postError(err: any): void {
  if (err in Argon2_ErrorCodes) {
    postMessage({
      code: err
    })
  } else {
    postMessage({
      code: Argon2_ErrorCodes.ARGON2WASM_UNKNOWN,
      message: getErrorMessage(err)
    })
  }
}

// This code is run as a web worker, not on the main thread
onmessage = async function(evt: MessageEvent): Promise<void> {
  // To check if the body is a key-value object, it first needs to be ruled out that it isn't an array,
  // Because arrays will test positive as objects in JS
  if (Array.isArray(evt.data) || typeof evt.data !== 'object') {
    postMessage({
      code: Argon2_ErrorCodes.ARGON2WASM_BAD_REQUEST,
      body: null
    })
  }

  const req: Argon2_Request = evt.data

  switch (req.action) {
    case Argon2_Actions.LoadArgon2:
      try {
        argon2 = await loadArgon2()
      } catch (err) {
        postError(err)
        return
      }
      postMessage({
        code: Argon2_ErrorCodes.ARGON2_OK
      })
      break

    default:
      postMessage({
        code: Argon2_ErrorCodes.ARGON2WASM_BAD_REQUEST,
        body: null
      })
  }
}
