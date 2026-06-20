import CryptoJS from 'crypto-js';
import { useUserStore } from "@/store/userStore";

export function DECRYPT(val) {
  const userStore = useUserStore();
  return CryptoJS.AES.decrypt(val, userStore.key).toString(CryptoJS.enc.Utf8);
}

export function ENCRYPT(val) {
  const userStore = useUserStore();
  return CryptoJS.AES.encrypt(val, userStore.key).toString();
}