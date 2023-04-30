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
        curr_password_id: 0,
        curr_password_name: "",
        curr_password_username: "",
        curr_password_password: "",
        curr_password_folder: "",
        curr_password_note: "",
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
           store.temp.curr_password_username != "" &&
           store.temp.curr_password_password != "" &&
           store.temp.curr_password_folder != "" &&
           store.temp.curr_password_note != "";
}