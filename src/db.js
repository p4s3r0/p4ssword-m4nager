import { AXIOS_BASE_URL } from '@/main.js'
import CryptoJS from 'crypto-js';
import axios from 'axios';

import { DBL_loginUser, getCurrentUser } from './dexie';



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

    const res = await axios.get(AXIOS_BASE_URL + "add_password", { params: {
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