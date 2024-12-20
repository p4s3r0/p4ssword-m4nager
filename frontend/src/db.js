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
import { DECRYPT } from './store/store';


const AES_KEY_CBC = process.env.VUE_APP_AES_KEY_CBC
const AES_IV_CBC = process.env.VUE_APP_AES_IV_CBC

function HASH(val) {
    return CryptoJS.SHA3(val).toString(CryptoJS.enc.Hex)
}

async function ENCRYPT(val, key=null) {
    const curr_user = await getCurrentUser();
    if(key == null)
        return CryptoJS.AES.encrypt(val, curr_user.password).toString();
    else
        return CryptoJS.AES.encrypt(val, key).toString();

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


async function AXIOS_CALL(call, parameters) {
    let ret;
    try {
        ret = await axios.get(AXIOS_BASE_URL + call, { params: parameters })
    } catch (error) {
        console.log(error)

        if (error === undefined) {
            return {status: 500}
        }
        return 500;
        return error.response;
    }
    return ret
}




export async function DB_registerUser(username, email, password) {
    const res = await AXIOS_CALL("add_user", {
        username: username,
        email: email,
        password: HASH(password)
    });

    if (res.status === 201) { // OK
        return 0;
    } else if (res.status === 400) { // Wrong Params
        return -1;
    } else if (res.status === 401) { // Username taken
        return -2;
    }
    return -99; // API Error
}



export async function DB_loginUser(username, password) {
    const res = await AXIOS_CALL("login_user", {
        username: username,
        password: HASH(password)
    });

    if (res.status === 202) { // OK
        const user = res.data.data
        await DBL_loginUser(username, password, user.email, user.api_key);
        return 0;
    } else if (res.status === 400) { // Wrong Params
        return -1;
    } else if (res.status === 401) { // Wrong credentials
        return -2;
    }
    return -99; // API Error
}



export async function DB_logoutUser() {
    const api_key = (await getCurrentUser()).api_key

    if (api_key === undefined) return false;

    const res = await AXIOS_CALL("logout_user", {
        api_key: api_key,
    });

    if (res.status === 200) { // OK
        return 0;
    } else if (res.status === 401) { // API key could not be removed
        return 0;
    }
    return -99; // API Error
}



export async function DB_removeAPIKey(key) {
    const q = "logout_user?" +
                "api_key=" + key

    const res = await AXIOS_CALL("logout_user", {
        api_key: key,
    });

    if (res.status === 200) { // OK
        return 0;
    } else if (res.status === 401) { // Error, cant remove API key
        return -1;
    }
    return -99;
}



export async function DB_addNewPassword(name, password, folder, note, username, starred, key=null) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("add_password", {
        api_key: user.api_key,
        name: name,
        password: (await ENCRYPT(password, key)),
        folder: folder,
        note: (await ENCRYPT(note, key)),
        user: user.username,
        username: (await ENCRYPT(username, key)),
        starred: starred
    })

    if (res.status === 201) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API error
        return -3;
    }

    return -99
}



export async function DB_getAllPasswords() {
    const user = await getCurrentUser();

    const res = await AXIOS_CALL("get_passwords", {
        api_key: user.api_key,
        user: user.username,
    });

    if (res.status === 200) { // OK
        DBL_updatePasswords(res.data.data);
        return res.data.data;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    }

    return -99;
}


export async function DB_deletePassword(id) {
    const user = (await getCurrentUser())

    const res = await AXIOS_CALL("del_password", {
        api_key: user.api_key,
        user: user.username,
        id: id
    });

    if (res.status === 201) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API Error
        return -3
    }

    return -99;
}


export async function DB_editPassword(id, name, username, password, folder, note, starred) {
    const user = (await getCurrentUser())

    const res = await AXIOS_CALL("update_password", {
        api_key: user.api_key,
        id: id,
        name: name,
        password: (await ENCRYPT(password)),
        folder: folder,
        note: (await ENCRYPT(note)),
        user: user.username,
        username: (await ENCRYPT(username)),
        starred: starred
    })

    if (res.status === 202) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API Error
        return -3
    }
    return -99;
}


export async function DB_addNewFolder(username, folder, color, starred) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("add_folder", {
        api_key: user.api_key,
        user: user.username,
        folder: folder,
        color: color,
        starred: starred,
    })

    if (res.status === 202) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API Error
        return -3
    }
    return -99;
}


export async function DB_getAllFolders(passwords) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("get_folders", {
        api_key: user.api_key,
        user: user.username,
    })

    if (res.status === 200) { // OK
        const folders = res.data
        for (let i = 0; i < res.data.length; i++) {
            const amount = passwords.filter(pass => pass.folder === folders[i].folder).length;
            folders[i].pass_amount = amount;
        }
        await DBL_updateFolders(folders)
        return folders;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    }
    return -99;
}

export async function DB_deleteFolder(folder_id) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("del_folder", {
        api_key: user.api_key,
        user: user.username,
        id: folder_id
    })

    if (res.status === 201) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API Error
        return -3
    }

    return -99;
}



export async function DB_getPasswordsForSpecificFolder(folder_name) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("get_folders_passwords", {
        api_key: user.api_key,
        user: user.username,
        folder: folder_name
    })

    if (res.status === 200) { // OK
        return res.data.data;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    }
    return -99;
}


export async function DB_editFolder(id, folder, starred, color) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("update_folder",  {
        api_key: user.api_key,
        user: user.username,
        id: id,
        folder: folder,
        starred: starred,
        color: color
    })

    if (res.status === 202) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API Error
        return -3
    }
    return -99;
}


export async function DB_add2FA(name, secret) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("add_2fa", {
        api_key: user.api_key,
        user: user.username,
        name: name,
        secret: ENCRYPT_CBC(secret)
    })

    if (res.status === 202) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    }
    return -99;
}



export async function DB_edit2FA(id, name, secret) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("update_2fa", {
        api_key: user.api_key,
        user: user.username,
        id: id,
        name: name,
        secret: ENCRYPT_CBC(secret)
    })

    if (res.status === 202) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API Error
        return -3
    }
    return -99;
}



export async function DB_getAll2FA() {
    const user = await getCurrentUser();

    const res = await AXIOS_CALL("get_2fa", {
        api_key: user.api_key,
        user: user.username,
    })

    if (res.status === 202) { // OK
        let ret = []
        for(let i = 0; i < res.data.data.length; i++) {
            ret.push({
                id: res.data.data[i].id,
                name: res.data.data[i].name,
                secret: DECRYPT_CBC(res.data.data[i].secret),
            })
        }
        DBL_update2FA(ret)
        return ret;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    }
    return -99;
}



export async function DB_delete2FA(id) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("del_2fa", {
        api_key: user.api_key,
        user: user.username,
        id: id,
    })

    if (res.status === 201) { // OK
        return 0;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 503) { // Internal API Error
        return -3
    }

    return -99;
}



export async function DB_getOtpCode(id) {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("get_otp", {
        api_key: user.api_key,
        user: user.username,
        id: id,
    })

    if (res.status === 200) {
        return res.data
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    } else if (res.status === 417) { // Secret not present in backend
        return -3;
    } else if (res.status === 501) { // OTP Generation Error
        return -4;
    }
    return -99;
}


export async function DB_getApiKeys() {
    const user = await getCurrentUser()

    const res = await AXIOS_CALL("get_api_keys", {
        user: user.username,
        api_key: user.api_key,
    })


    if (res.status === 200) { // OK
        let api_keys = []
        console.log(res.data.data)

        for(let i = 0; i < res.data.data.length; i++) {
            api_keys.push(res.data.data[i].key)
        }
        console.log(api_keys)
        return api_keys;
    } else if (res.status === 400) { // Invalid paramaters
        return -1;
    } else if (res.status === 401) { // Not authorized with this API key
        return -2;
    }
    return -99;
}

export async function DB_checkValidAPIKey() {
    const user = await getCurrentUser()


    const res = await AXIOS_CALL("get_api_keys", {
        user: user.username,
        api_key: user.api_key,
    })

    if (res.status === 200) { // OK
        return true;
    }
    return false;
}