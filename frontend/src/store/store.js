import CryptoJS from 'crypto-js';
import { useUserStore } from "@/store/userStore";

export let store = {
  temp: {
    curr_folder_name: "",
    curr_folder_color: "",
    curr_folder_id: 0,
    curr_folder_starred: false,
    curr_password_id: 0,
    curr_password_name: "",
    curr_password_username: "",
    curr_password_password: "",
    curr_password_folder: "",
    curr_password_note: "",
    curr_password_starred: false,
    curr_2fa_name: "",
    curr_2fa_secret: "",
    curr_2fa_id: 0,
  }
};

export async function DECRYPT(val) {
  const userStore = useUserStore();
  return CryptoJS.AES.decrypt(val, userStore.key).toString(CryptoJS.enc.Utf8);
}