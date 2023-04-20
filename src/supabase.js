import { createClient } from '@supabase/supabase-js'
import CryptoJS from 'crypto-js';

import { DBL_loginUser, DBL_updateFolders, DBL_updatePasswords, DBL_deleteFolder } from '@/dexie';
import { store } from '@/store/store';

export const supabase = createClient('https://yxqtpqkugnsqbfzcopjt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cXRwcWt1Z25zcWJmemNvcGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4OTg5MTksImV4cCI6MTk5NjQ3NDkxOX0.cEnLQtFcI1-FVeFnQ-NLeOLf5UrqGIc8VMt3Nhm-p8c')

function HASH(val) {
    return CryptoJS.SHA3(val).toString(CryptoJS.enc.Hex)
}


export async function DB_registerUser(email, username, password) {
    const data = {
        email: email,
        username: username,
        password: HASH(password),
    }
    await supabase.from('user').insert(data);
    return true;
}

export async function DB_loginUser(username, password) {
    const { data } = await supabase.from('users').select().eq("username", username)
    if (data.length < 1) {
        return false;
    }

    const user = data[0];

    if (user.password != HASH(password)) {
        return false;
    }

    await DBL_loginUser(username, password, user["email"]);
    return true;
}

export async function DB_getAllFolders(username) {
    const { data } = await supabase.from('folders').select().eq("user", username)
    const ret = await DBL_updateFolders(data);
    if(ret) {
        return ret;
    }
    return data;
}

export async function DB_getAllPasswords(username) {
    const { data } = await supabase.from('passwords').select().eq("user", username)
    const ret = await DBL_updatePasswords(data);
    if(ret) {
        return ret;
    }
    return data;
}


export async function DB_addNewFolder(username, folder, color) {
    const data = {
        folder: folder,
        user: username,
        color: color,
        pass_amount: 0,
    };
    await supabase.from('folders').insert(data);
    return true;
}


export async function DB_addNewPassword(name, password, folder, note, user, username) {
    const data = {
        name: name,
        username: username,
        password: CryptoJS.AES.encrypt(password, store.user.password).toString(),
        folder: folder,
        note: note,
        user: user
    };
    await supabase.from('passwords').insert(data);
    return true;
}

export async function DB_getPasswordsForSpecificFolder(username, folder) {
    const data = await DB_getAllPasswords(username)
    let ret = [];
    for(let i = 0; i < data.length; i++) {
        if (data[i].folder == folder) {
            ret.push(data[i]);
        }
    }
    return ret
}


export async function DB_deleteFolder(username, folder) {
    await supabase.from("folders").delete().eq("user", username).eq("folder", folder);
    await DBL_deleteFolder(folder);
}

/*
const enc = this.$CryptoJS.AES.encrypt("Hi There!", "Secret Passphrase").toString()
console.log("encoded: ", enc);

const dec = this.$CryptoJS.AES.decrypt(enc, "Secret Passphrase").toString(this.$CryptoJS.enc.Utf8)
console.log("decoded: ", dec);
*/