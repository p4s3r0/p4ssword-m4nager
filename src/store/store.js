import CryptoJS from 'crypto-js';


export let store = {
    user: {
        loggedIn: false,
        username: "",
        password: "",
        email: ""
    }, 
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



export function checkUserValid() {
    return  store.user.loggedIn == true && 
            store.user.username != ""   &&
            store.user.password != ""   &&
            store.user.email    != "";
}


export function checkFolderValid() {
    return store.temp.curr_folder_name  != "" &&
           store.temp.curr_folder_color != "" &&
           store.temp.curr_folder_id    != 0;
}



export function checkPasswordValid() {
    return store.temp.curr_password_id  != 0 &&
           store.temp.curr_password_name != "" &&
           store.temp.curr_password_folder != "";
}

export function DECRYPT(val) {
    return CryptoJS.AES.decrypt(val, store.user.password).toString(CryptoJS.enc.Utf8);    
}