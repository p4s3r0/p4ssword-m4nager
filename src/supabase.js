import { createClient } from '@supabase/supabase-js'
import CryptoJS from 'crypto-js';

import {DBL_loginUser, 
        DBL_updateFolders, 
        DBL_updatePasswords, 
        DBL_deleteFolder,
        DBL_deletePassword, 
        DBL_editFolder, 
        DBL_editPassword 
        } from '@/dexie';

import { store } from '@/store/store';


const URL = process.env.VUE_APP_URL
const KEY = process.env.VUE_APP_KEY

export const supabase = createClient(URL, KEY)

function HASH(val) {
    return CryptoJS.SHA3(val).toString(CryptoJS.enc.Hex)
}

function ENCRYPT(val) {
    return CryptoJS.AES.encrypt(val, store.user.password).toString();
}



export async function DB_registerUser(email, username, password) {
    const { data } = await supabase.from('users').select().eq("username", username)
    console.log(data)
    if (data.length !== 0) {
        return false;
    }

    const data = {
        email: email,
        username: username,
        password: HASH(password),
    }
    await supabase.from('users').insert(data);
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
    return ret;
}

export async function DB_getAllPasswords(username) {
    const { data } = await supabase.from('passwords').select().eq("user", username)
    const ret = await DBL_updatePasswords(data);
    return ret;
}



export async function DB_addNewFolder(username, folder, color, starred) {
    const data = {
        folder: folder,
        user: username,
        color: color,
        pass_amount: 0,
        starred: starred
    };
    await supabase.from('folders').insert(data);
    return true;
}



export async function DB_addNewPassword(name, password, folder, note, user, username, starred) {
    const pssw = {
        name: name,
        username: ENCRYPT(username),
        password: ENCRYPT(password),
        folder: folder,
        note: ENCRYPT(note),
        user: user,
        starred: starred
    };
    await supabase.from('passwords').insert(pssw);

    let { data } = await supabase.from('folders').select().eq("user", store.user.username).eq("folder", folder)
    if (data.length == 0) {
        return true;
    }
    data = data[0] // only one folder with same name
    await supabase.from("folders").update({pass_amount: data.pass_amount + 1}).eq("folder", folder)
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
    await supabase.from("passwords").update({folder: "NO FOLDER"}).eq("user", username).eq("folder", folder)
    await supabase.from("folders").delete().eq("user", username).eq("folder", folder);

    await DBL_deleteFolder(folder);
    return true;
}



export async function DB_deletePassword(id, folder) {
    let { data } = await supabase.from('folders').select().eq("user", store.user.username).eq("folder", folder)
    await supabase.from("passwords").delete().eq("id", id)
    await DBL_deletePassword(id);
    if (data.length == 0) {
        return true;
    }
    data = data[0] // only one folder with same name
    await supabase.from("folders").update({pass_amount: data.pass_amount - 1}).eq("folder", folder)
    return true;
}



export async function DB_editFolder(folder_id, folder_name, folder_color, folder_starred) {
    await supabase.from("folders").update({folder: folder_name, color: folder_color, starred: folder_starred}).eq("id", folder_id).eq("user", store.user.username)
    await supabase.from("passwords").update({folder: folder_name}).eq("folder", store.temp.curr_folder_name);
    
    await DBL_editFolder(folder_id, folder_name, folder_color, folder_starred);
    return true;
}



export async function DB_editPassword(folder_before, password_id, name, username, password, folder, note, starred) {
    await supabase.from("passwords").update(
                                            { 
                                                name: name, 
                                                username: ENCRYPT(username),
                                                password: ENCRYPT(password),
                                                folder: folder,
                                                note: ENCRYPT(note),
                                                starred: starred
                                            }).eq("id", password_id)
    if (folder_before != "NO FOLDER") {
        const folder_bef = await supabase.from('folders').select().eq("user", store.user.username).eq("folder", folder_before)
        await supabase.from("folders").update({pass_amount: folder_bef.data[0].pass_amount - 1}).eq("folder", folder_before).eq("user", store.user.username)
    }
    
    if (folder != "NO FOLDER") {
        const folder_aft = await supabase.from('folders').select().eq("user", store.user.username).eq("folder", folder)
        await supabase.from("folders").update({pass_amount: folder_aft.data[0].pass_amount + 1}).eq("folder", folder).eq("user", store.user.username)
    }
    await DBL_editPassword(folder_before, password_id, name, ENCRYPT(username), ENCRYPT(password), folder, ENCRYPT(note), starred);
    return true;
}
