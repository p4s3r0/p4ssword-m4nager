import { Dexie } from 'dexie';
import { store } from '@/store/store';

const db = new Dexie("p4ssword_m4nager");
db.version(1).stores({
    curr_user: "++idx, username, password, email",
    folders: "++idx, folder, pass_amount, color"
});


export async function DBL_loginUser(username_, password_, email_) {
    const user_exists = await db.curr_user.toArray(); 
    if (user_exists) {
        await db.curr_user.clear();
    }
    const data = {
        username: username_, 
        password: password_, 
        email: email_
    }
    await db.curr_user.add(data);
}

export async function DBL_logoutUser() {
    const user_exists = await db.curr_user.toArray(); 
    if (user_exists) {
        await db.curr_user.clear();
    }

    const folders_exist = await db.folders.toArray(); 
    if (folders_exist) {
        await db.folders.clear();
    }
}

export async function DBL_refreshUserLogin() {
    const user_exists = await db.curr_user.toArray(); 
    if (!user_exists) {
        return false;
    }
    const user = user_exists[0]; 

    store.user.username = user.username;
    store.user.password = user.password;
    store.user.email = user.email;
    store.user.loggedIn = true;
    return user.username;
}

export async function DBL_updateFolders(folders) {
    const current_folders = await db.folders.toArray();
    if (current_folders.length == folders.length || folders.length == 0) {
        return await db.folders.toArray();
    }

    await db.folders.clear();
    for(let i = 0; i < folders.length; i++)
    {
        const data = {
            folder: folders[i].folder,
            pass_amount: folders[i].pass_amount,
            color: folders[i].color
        }
        await db.folders.add(data);
    }
    return false;
}