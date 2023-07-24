import { AXIOS_BASE_URL } from '@/main.js'
import CryptoJS from 'crypto-js';
import axios from 'axios';

import { DBL_loginUser } from './dexie';

function HASH(val) {
    return CryptoJS.SHA3(val).toString(CryptoJS.enc.Hex)
}


export async function registerUser(username, email, password) {
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
export async function loginUser(username, password) {
    const q = AXIOS_BASE_URL +  "login_user?" + 
                                "username=" + username + 
                                "&password=" + HASH(password)

    const res = await axios.get(q)

    if (res.data == "[ERROR]-LoginUserDoesNotExist") {
        return false
    } 

        console.log("got", res.data)
    const user = JSON.parse(res.data);
    
    await DBL_loginUser(user.username, user.password, user.email, user.api_key);

    return true;
}