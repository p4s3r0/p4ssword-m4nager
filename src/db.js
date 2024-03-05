import { AXIOS_BASE_URL } from '@/main.js'
import CryptoJS from 'crypto-js';
import axios from 'axios';

import {DBL_loginUser, 
    DBL_updateFolders, 
    DBL_getFolders,
    DBL_updatePasswords,
    DBL_getPasswords, 
    DBL_update2FA,
    DBL_get2Fa,
    DBL_getFoldersPasswords,
    getCurrentUser
    } from '@/dexie';


const AES_KEY_CBC = process.env.VUE_APP_AES_KEY_CBC
const AES_IV_CBC = process.env.VUE_APP_AES_IV_CBC


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


export async function DB_logoutUser() {
    const api_key = (await getCurrentUser()).api_key

    await axios.get(AXIOS_BASE_URL + "logout_user", { params: {
        api_key: api_key,
    }})

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

    if (!navigator.onLine) {
        return DBL_getPasswords();
    }

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


export async function DB_getAllFolders(passwords) {
    const user = await getCurrentUser()

    if (!navigator.onLine) {
        return DBL_getFolders(passwords);
    } 

    const res = await axios.get(AXIOS_BASE_URL + "get_folders", { params: {
        api_key: user.api_key,
        user: user.username,
    }})

    for (let i = 0; i < res.data.length; i++) {
        const amount = passwords.filter(pass => pass.folder === res.data[i].folder).length
        res.data[i].pass_amount = amount;
    }

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

    if (!navigator.onLine) {
        return DBL_getFoldersPasswords(folder_name);
    }

    const res = await axios.get(AXIOS_BASE_URL + "get_folders_passwords", { params: {
        api_key: user.api_key,
        user: user.username,
        folder: folder_name
    }})

    return res.data;
}


export async function DB_editFolder(id, folder, starred, color) {
    const user = await getCurrentUser()
    
    const res = await axios.get(AXIOS_BASE_URL + "update_folder", { params: {
        api_key: user.api_key,
        user: user.username,
        id: id,
        folder: folder,
        starred: starred,
        color: color
    }})

    return true;
}


export async function DB_add2FA(name, secret) {
    const user = await getCurrentUser()

    const res = await axios.get(AXIOS_BASE_URL + "add_2fa", { params: {
        api_key: user.api_key,
        user: user.username,
        name: name,
        secret: ENCRYPT_CBC(secret)
    }})

    return true;
}



export async function DB_edit2FA(id, name, secret) {
    const user = await getCurrentUser()
    
    const res = await axios.get(AXIOS_BASE_URL + "update_2fa", { params: {
        api_key: user.api_key,
        user: user.username,
        id: id,
        name: name,
        secret: ENCRYPT_CBC(secret)
    }})

    return true;
}


export async function DB_getAll2FA() {
    const user = await getCurrentUser()

    if (!navigator.onLine) {
        return DBL_get2Fa();
    }

    const res = await axios.get(AXIOS_BASE_URL + "get_2fa", { params: {
        api_key: user.api_key,
        user: user.username,
    }})

    let ret = []
    for(let i = 0; i < res.data.length; i++) {
        ret.push({
            id: res.data[i].id,
            name: res.data[i].name,
            secret: DECRYPT_CBC(res.data[i].secret),
        })
    }
    DBL_update2FA(ret)
    return ret;
}



export async function DB_delete2FA(id) {
    const user = await getCurrentUser()
    
    const res = await axios.get(AXIOS_BASE_URL + "del_2fa", { params: {
        api_key: user.api_key,
        user: user.username,
        id: id,
    }})

    return true;
}



export async function DB_getOtpCode(id) {
    const user = await getCurrentUser()
    
    const res = await axios.get(AXIOS_BASE_URL + "get_otp", { params: {
        api_key: user.api_key,
        user: user.username,
        id: id,
    }})

    return res;
}
