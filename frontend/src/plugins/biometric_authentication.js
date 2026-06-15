// register
export async function biometricRegister(username) {
  if (import.meta.env.DEV) {
    return { id: "dev-biometric-id" };
  }
  if (typeof username !== "string") {
    throw new Error(`Username is required as string, got: ${username}`);
  }

  if (!window.isSecureContext) {
    throw new Error("WebAuthn requires a secure context. Use localhost or HTTPS.");
  }

  if (!navigator.credentials?.create) {
    throw new Error("WebAuthn is not supported in this browser.");
  }

  return await navigator.credentials.create({
    publicKey: {
      challenge: randomBytes(32),
      rp: {
        name: "P4ssword M4nager",
      },
      user: {
        id: randomBytes(32),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: {
        userVerification: "required",
        residentKey: "required",
        requireResidentKey: true,
      },
      timeout: 60000,
      attestation: "none",
      extensions: {
        prf: {},
      },
    },
  });
}

export async function biometricDecrypt(iv, ciphertext, biometricId) {
  const key = await getEncryptionKey(biometricId);
  const plaintextBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64UrlToArrayBuffer(iv), }, key, base64UrlToArrayBuffer(ciphertext));
  return new TextDecoder().decode(plaintextBuffer);
}

export async function biometricEncrypt(text, biometricId) {
  const key = await getEncryptionKey(biometricId);
  const iv = randomBytes(12);

  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text));

  return {
    iv: arrayBufferToBase64Url(iv.buffer),
    ciphertext: arrayBufferToBase64Url(ciphertext)
  };
}

// get
async function getEncryptionKey(biometricId) {
  if (typeof biometricId !== "string") {
    throw new Error(`Wrong biometrid id. needs to be string. got: ${biometricId}`);
  }

  const prfOutput = await getPrfOutput(biometricId);
  const baseKey = await crypto.subtle.importKey("raw", prfOutput, "HKDF", false, ["deriveKey"]);

  return crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new TextEncoder().encode("p4ssword-m4nager"),
      info: new TextEncoder().encode("encryption-key"),
    },
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

function randomBytes(length = 32) {
  return crypto.getRandomValues(new Uint8Array(length));
}

function base64UrlToArrayBuffer(base64url) {
  const base64 = base64url
    .replaceAll("-", "+")
    .replaceAll("_", "/")
    .padEnd(Math.ceil(base64url.length / 4) * 4, "=");

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}


function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}


function getOrCreatePrfSalt() {
  const stored = localStorage.getItem("prfSalt");

  if (stored) {
    return base64UrlToArrayBuffer(stored);
  }

  const salt = randomBytes(32);
  localStorage.setItem("prfSalt", arrayBufferToBase64Url(salt.buffer));

  return salt.buffer;
}

async function getPrfOutput(biometricId) {
  if (import.meta.env.DEV) {
    return new Uint8Array(32).fill(0).buffer;
  }
  const credentialId = base64UrlToArrayBuffer(biometricId);
  const prfSalt = getOrCreatePrfSalt();

  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: randomBytes(32),
      allowCredentials: [
        {
          type: "public-key",
          id: credentialId,
        },
      ],
      userVerification: "required",
      extensions: {
        prf: {
          eval: {
            first: prfSalt,
          },
        },
      },
    },
  });

  const extensions = assertion.getClientExtensionResults();
  const prfOutput = extensions.prf?.results?.first;

  if (!prfOutput) {
    throw new Error("No PRF output returned. Your browser/device may not support WebAuthn PRF.");
  }

  return prfOutput;
}


