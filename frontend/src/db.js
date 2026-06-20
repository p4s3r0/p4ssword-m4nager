import CryptoJS from "crypto-js";
import base32 from "hi-base32";

function checkBase64OrBase32(str) {
  // Regular expressions for Base64 and Base32
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  const base32Regex = /^[A-Z2-7=]+$/;

  // Check if the string has valid Base64 or Base32 characters
  const isBase64 = base64Regex.test(str) && str.length % 4 === 0;
  const isBase32 = base32Regex.test(str) && str.length % 8 === 0;

  // Return true if Base64 and false if Base32
  if (isBase64 && !isBase32) {
    return true; // It's Base64
  } else if (!isBase64 && isBase32) {
    return false; // It's Base32
  } else {
    // If both are invalid or both match, return null or handle as needed
    return null; // Indeterminate or both invalid
  }
}

function genBase64OTP(secretBase64, timeStep = 30, digits = 6) {
  // Step 1: Decode the Base64 secret into bytes
  const secretBytes = Uint8Array.from(atob(secretBase64), (char) =>
    char.charCodeAt(0)
  );

  // Step 2: Get the current time and calculate the time counter
  const currentTime = Math.floor(Date.now() / 1000); // Get current Unix time
  let timeCounter = Math.floor(currentTime / timeStep); // Calculate the time counter

  // Step 3: Convert the time counter to an 8-byte array (big-endian)
  const timeBuffer = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) {
    timeBuffer[i] = timeCounter & 0xff;
    timeCounter >>= 8;
  }

  // Step 4: Generate the HMAC-SHA1 hash
  const timeHex = Array.from(timeBuffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const timeWordArray = CryptoJS.enc.Hex.parse(timeHex);

  const secretHex = Array.from(secretBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const secretWordArray = CryptoJS.enc.Hex.parse(secretHex);

  const hmac = CryptoJS.HmacSHA1(timeWordArray, secretWordArray);

  // Step 5: Extract the dynamic binary code (truncate)
  const hmacHex = hmac.toString(CryptoJS.enc.Hex);
  const offset = parseInt(hmacHex.slice(-1), 16); // Get offset from the last nibble of HMAC
  const binaryCode =
    parseInt(hmacHex.substring(offset * 2, offset * 2 + 8), 16) & 0x7fffffff; // Truncate

  // Step 6: Generate the OTP (specified number of digits)
  return (binaryCode % Math.pow(10, digits))
    .toString()
    .padStart(digits, "0");
}

export function getTOTP(secret, timeStep = 30) {
  if (checkBase64OrBase32(secret)) {
    return genBase64OTP(secret);
  }

  // Get the current Unix time and calculate the time counter
  const currentTime = Math.floor(Date.now() / 1000);
  let timeCounter = Math.floor(currentTime / timeStep);

  // Convert the time counter to an 8-byte hex string (16 hex characters)
  const timeHex = timeCounter.toString(16).padStart(16, "0");
  const timeBuffer = CryptoJS.enc.Hex.parse(timeHex);

  // Decode the Base32 secret as bytes
  const decodedBytes = base32.decode.asBytes(secret);

  // Convert the decoded bytes to a hex string for CryptoJS
  const secretKeyHex = decodedBytes
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const secretKey = CryptoJS.enc.Hex.parse(secretKeyHex);

  // Generate HMAC-SHA1 hash
  const hmac = CryptoJS.HmacSHA1(timeBuffer, secretKey);

  // Extract dynamic binary code (truncate)
  const hmacHex = hmac.toString(CryptoJS.enc.Hex);
  const offset = parseInt(hmacHex.slice(-1), 16); // Get offset from last nibble of HMAC
  const binaryCode =
    parseInt(hmacHex.substring(offset * 2, offset * 2 + 8), 16) & 0x7fffffff;

  // Generate OTP (6 digits)
  return (binaryCode % Math.pow(10, 6)).toString().padStart(6, "0");
}

export function getSHA_OTP(secret, timeStep = 60) {
  // Get the current Unix time and calculate the time counter
  const currentTime = Math.floor(Date.now() / 1000);
  const timeCounter = Math.floor(currentTime / timeStep);

  // Convert the time counter to an 8-byte hex string (16 hex characters)
  const timeHex = timeCounter.toString(16).padStart(16, "0");
  const timeBuffer = CryptoJS.enc.Hex.parse(timeHex);

  // Decode the Base32 secret as bytes
  const decodedBytes = base32.decode.asBytes(secret);

  // Convert the decoded bytes to a hex string for CryptoJS
  const secretKeyHex = decodedBytes
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const secretKey = CryptoJS.enc.Hex.parse(secretKeyHex);

  // Generate HMAC-SHA256 hash
  const hmac = CryptoJS.HmacSHA256(timeBuffer, secretKey);

  // Extract dynamic binary code (truncate)
  const hmacHex = hmac.toString(CryptoJS.enc.Hex);
  const offset = parseInt(hmacHex.slice(-1), 16); // Get offset from last nibble of HMAC
  const binaryCode =
    parseInt(hmacHex.substring(offset * 2, offset * 2 + 8), 16) & 0x7fffffff;

  // Generate OTP (6 digits)
  return (binaryCode % Math.pow(10, 6)).toString().padStart(6, "0");
}
