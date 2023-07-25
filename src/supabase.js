import { createClient } from '@supabase/supabase-js'
import CryptoJS from 'crypto-js';

import {DBL_loginUser, 
        DBL_updateFolders, 
        DBL_updatePasswords, 
        DBL_deleteFolder,
        DBL_deletePassword, 
        DBL_editFolder, 
        DBL_editPassword,
        DBL_update2FA,
        DBL_deleteTwoFa,
        DBL_edit2FA,
        getCurrentUser
        } from '@/dexie';

import { store } from '@/store/store';


const URL = process.env.VUE_APP_URL
const KEY = process.env.VUE_APP_KEY

const AES_KEY_CBC = process.env.VUE_APP_AES_KEY_CBC
const AES_IV_CBC = process.env.VUE_APP_AES_IV_CBC


export const supabase = createClient(URL, KEY)

function HASH(val) {
    return CryptoJS.SHA3(val).toString(CryptoJS.enc.Hex)
}

async function ENCRYPT(val) {
    const curr_user = await getCurrentUser();
    return CryptoJS.AES.encrypt(val, curr_user.password).toString();
}


function ENCRYPT_CBC(val) {
    const key = CryptoJS.enc.Utf8.parse(AES_KEY_CBC);
    var iv = CryptoJS.enc.Utf8.parse(AES_IV_CBC)
    var encrypted = CryptoJS.AES.encrypt(val, key, { iv: iv, mode: CryptoJS.mode.CBC});
    return encrypted.toString();
}

function DECRYPT_CBC(val) {
    var iv = CryptoJS.enc.Utf8.parse(AES_IV_CBC);
    var key = AES_KEY_CBC
    key = CryptoJS.enc.Utf8.parse(key);
    var decrypted =  CryptoJS.AES.decrypt(val, key, { iv: iv, mode: CryptoJS.mode.CBC});
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted;
}



export async function DB_getAll2FA(username) {
    const { data } = await supabase.from('2fa').select().eq("user", username)
    for(let i = 0; i < data.length; i++) {
        data[i]["secret"] = DECRYPT_CBC(data[i]["secret"])
    }
    const ret = await DBL_update2FA(data);
    return ret;
}



export async function DB_add2FA(user, name, secret) {
    const data = {
        user: user,
        secret: ENCRYPT_CBC(secret),
        authorized: false,
        name: name
    };
    await supabase.from('2fa').insert(data);
    return true;
}

export async function DB_toggle_authorize_OTP(user, name, to) {
    await supabase.from("2fa").update({authorized: to}).eq("user", user).eq("name", name)
}



export async function DB_delete2FA(name) {
    const current_user = await getCurrentUser();

    await supabase.from("2fa").delete().eq("user", current_user.username).eq("name", name);
    await DBL_deleteTwoFa(name);
    return true;
}



export async function DB_editFolder(folder_id, folder_name, folder_color, folder_starred) {
    const current_user = await getCurrentUser();

    await supabase.from("folders").update({folder: folder_name, color: folder_color, starred: folder_starred}).eq("id", folder_id).eq("user", current_user.username)
    await supabase.from("passwords").update({folder: folder_name}).eq("folder", store.temp.curr_folder_name);
    
    await DBL_editFolder(folder_id, folder_name, folder_color, folder_starred);
    return true;
}

export async function DB_edit2FA(old_name, new_name, new_secret) {
    const current_user = await getCurrentUser();

    await supabase.from("2fa").update({name: new_name, secret: ENCRYPT_CBC(new_secret)}).eq("name", old_name).eq("user", current_user.username)
    await DBL_edit2FA(old_name, new_name, new_secret);
    return true;
}


