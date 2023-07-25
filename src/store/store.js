import CryptoJS from 'crypto-js';

import { getCurrentUser } from '@/dexie';

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
    }
}

export async function DECRYPT(val) {
    const current_user = await getCurrentUser();
    return CryptoJS.AES.decrypt(val, current_user.password).toString(CryptoJS.enc.Utf8);    
}