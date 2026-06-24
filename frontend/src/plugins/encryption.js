import CryptoJS from 'crypto-js';
import { useUserStore } from "@/store/userStore";

export function DECRYPT(val) {
  if (val === undefined || val === null || val === "") {
    return "";
  }
  const userStore = useUserStore();
  try {
    const bytes = CryptoJS.AES.decrypt(val, userStore.key);
    const decoded = bytes.toString(CryptoJS.enc.Utf8);
    if (!decoded && val) {
       return "";
    }
    return decoded;
  } catch (e) {
    console.error("Decryption failed:", e);
    return "";
  }
}

export function ENCRYPT(val) {
  const userStore = useUserStore();
  return CryptoJS.AES.encrypt(val, userStore.key).toString();
}