import {Argon2} from "./runtime/index.js";
const conn = new Argon2.WorkerConnection(new Worker("./argon2/worker.js"));
const qs = document.querySelector.bind(document);
const els = {
  password: qs("input#password"),
  salt: qs("input#salt"),
  timeCost: qs("input#t_cost"),
  memoryCost: qs("input#m_cost"),
  simd: qs("input#simd_enabled"),
  run: qs("input#submit"),
  result: qs("span#result"),
  timer: qs("section#timer"),
  timerValue: qs("span#timer_value"),
  form: qs("form#demoForm")
};
let simdEnabled = els.simd.checked;
(async function() {
  const loadMessage = await conn.postMessage({
    method: Argon2.Methods.LoadArgon2,
    params: {
      wasmRoot: ".",
      simd: simdEnabled
    }
  });
  if (loadMessage.code !== 0) {
    displayError(loadMessage.code);
  }
})();
document.onclose = () => {
  conn.terminate();
};
function writeResult(text) {
  els.run.disabled = false;
  els.result.textContent = text;
}
function displayError(code) {
  let errorName = "";
  for (const name in Argon2.ErrorCodes) {
    if (Argon2.ErrorCodes[name] === code) {
      errorName = name;
      break;
    }
  }
  writeResult(`Error: ${errorName} (code ${code})`);
}
els.form.onsubmit = async (evt) => {
  evt.preventDefault();
  els.run.disabled = true;
  els.result.textContent = "";
  const simd = els.simd.checked;
  if (simd !== simdEnabled) {
    const loadMessage = await conn.postMessage({
      method: Argon2.Methods.LoadArgon2,
      params: {
        wasmRoot: ".",
        simd
      }
    });
    if (loadMessage.code !== 0) {
      displayError(loadMessage.code);
      return;
    }
    simdEnabled = simd;
  }
  let salt;
  let encodedSalt = els.salt.value;
  if (encodedSalt.length) {
    try {
      const raw = atob(encodedSalt);
      salt = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) {
        salt[i] = raw.charCodeAt(i);
      }
    } catch (err) {
      const errorMsg = `Failed to decode salt (${err})`;
      writeResult(`Error: ${errorMsg}`);
      return;
    }
  } else {
    salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    encodedSalt = btoa(String.fromCharCode.apply(null, Array.from(salt)));
    els.salt.value = encodedSalt;
  }
  const timeCost = parseInt(els.timeCost.value);
  const memoryCostValue = els.memoryCost.value.toUpperCase();
  let memoryCost = 0;
  if (memoryCostValue.endsWith("MB")) {
    memoryCost = 1024 * parseInt(memoryCostValue);
  } else if (memoryCostValue.endsWith("GB")) {
    memoryCost = 1024 * 1024 * parseInt(memoryCostValue);
  } else {
    try {
      memoryCost = parseInt(memoryCostValue);
      if (isNaN(memoryCost)) {
        throw "Value entered in form is NaN";
      }
    } catch (err) {
      const errorMsg = `Failed to parse memory cost (${err})`;
      writeResult(`Error: ${errorMsg}`);
      return;
    }
  }
  const start = performance.now();
  const result = await conn.postMessage({
    method: Argon2.Methods.Hash2i,
    params: {
      password: els.password.value.normalize("NFC"),
      salt,
      timeCost,
      memoryCost,
      hashLen: 32
    }
  });
  let elapsed = performance.now() - start;
  if (result.code === 0) {
    const encodedHash = btoa(String.fromCharCode.apply(null, Array.from(result.body)));
    writeResult(encodedHash);
  } else {
    displayError(result.code);
  }
  const minutes = Math.floor(elapsed / 6e4).toString();
  elapsed %= 6e4;
  const seconds = Math.floor(elapsed / 1e3).toString();
  elapsed %= 1e3;
  const ms = elapsed.toString();
  els.timerValue.textContent = `${minutes}m ${seconds}s ${ms}ms`;
};
