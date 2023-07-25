import { AXIOS_BASE_URL } from '@/main.js'
import CryptoJS from 'crypto-js';
import axios from 'axios';

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

function HASH(val) {
    return CryptoJS.SHA3(val).toString(CryptoJS.enc.Hex)
}

async function ENCRYPT(val) {
    const curr_user = await getCurrentUser();
    return CryptoJS.AES.encrypt(val, curr_user.password).toString();
}


export async function DB_registerUser(username, email, password) {
    const q = AXIOS_BASE_URL +  "add_user?" + 
                                "username=" + username + 
                                "&email=" + email + 
                                "&password=" + HASH(password)

    const res = await axios.get(q)

    if (res.data == "OK") {
        return "OK";
    } else if (res.data == "[ERROR]-UsernameTaken") {
        return "[ERROR]-UsernameTaken"
    }
    return "ERROR";
}



// http://localhost:8000/login_user?username=a&password=b
export async function DB_loginUser(username, password) {
    const q = AXIOS_BASE_URL +  "login_user?" + 
                                "username=" + username + 
                                "&password=" + HASH(password)

    const res = await axios.get(q)

    if (res.data == "[ERROR]-LoginUserDoesNotExist") {
        return false
    } 
    const user = res.data
    
    await DBL_loginUser(username, password, user.email, user.api_key);
    return true;
}


export async function DB_addNewPassword(name, password, folder, note, user, username, starred) {
    const api_key = (await getCurrentUser()).api_key

    await axios.get(AXIOS_BASE_URL + "add_password", { params: {
        api_key: api_key,
        name: name,
        password: (await ENCRYPT(password)),
        folder: folder,
        note: (await ENCRYPT(note)),
        user: user,
        username: (await ENCRYPT(username)),
        starred: starred
    }})

    return true
}


export async function DB_getAllPasswords() {
    const user = await getCurrentUser()

    const res = await axios.get(AXIOS_BASE_URL + "get_passwords", { params: {
        api_key: user.api_key,
        user: user.username,
    }})

    DBL_updatePasswords(res.data)
    return res.data;
}


export async function DB_deletePassword(id) {
    const user = (await getCurrentUser())

    const res = await axios.get(AXIOS_BASE_URL + "del_password", { params: {
        api_key: user.api_key,
        user: user.username,
        id: id
    }})
    await DBL_deletePassword(id)
    return res.data;
}


export async function DB_editPassword(id, name, username, password, folder, note, starred) {
    const user = (await getCurrentUser())

    const res = await axios.get(AXIOS_BASE_URL + "update_password", { params: {
        api_key: user.api_key,
        id: id,
        name: name,
        password: (await ENCRYPT(password)),
        folder: folder,
        note: (await ENCRYPT(note)),
        user: user.username,
        username: (await ENCRYPT(username)),
        starred: starred
    }})
    await DBL_editPassword(id, name, username, password, folder, note, starred)
    return res.data
}


export async function DB_addNewFolder(username, folder, color, starred) {
    const api_key = (await getCurrentUser()).api_key

    await axios.get(AXIOS_BASE_URL + "add_folder", { params: {
        api_key: api_key,
        user: username,
        folder: folder,
        color: color,
        starred: starred,
    }})

    return true
}


export async function DB_getAllFolders() {
    const user = await getCurrentUser()

    const res = await axios.get(AXIOS_BASE_URL + "get_folders", { params: {
        api_key: user.api_key,
        user: user.username,
    }})
    await DBL_updateFolders(res.data)
    return res.data;
}

export async function DB_deleteFolder(folder_id) {
    const user = await getCurrentUser()

    const res = await axios.get(AXIOS_BASE_URL + "del_folder", { params: {
        api_key: user.api_key,
        user: user.username,
        id: folder_id
    }})
    return res.data;
}



export async function DB_getPasswordsForSpecificFolder(folder_name) {
    const user = await getCurrentUser()

    const res = await axios.get(AXIOS_BASE_URL + "get_folders_passwords", { params: {
        api_key: user.api_key,
        user: user.username,
        folder: folder_name
    }})

    return res.data;
}


export async function DB_editFolder(id, folder, starred, color) {
    const user = await getCurrentUser()
    
    console.log(starred)
    const res = await axios.get(AXIOS_BASE_URL + "update_folder", { params: {
        api_key: user.api_key,
        user: user.username,
        id: id,
        folder: folder,
        starred: starred,
        color: color
    }})

    await DBL_updateFolders(res.data);
    return res.data
}