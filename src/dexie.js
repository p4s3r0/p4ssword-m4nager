import { Dexie } from 'dexie';
import { store } from '@/store/store';

const db = new Dexie("p4ssword_m4nager");
db.version(1).stores({
    curr_user: "++idx, username, password, email",
    folders: "++idx, folder, pass_amount, color",
    passwords: "++idx, name, password, folder, note, username",
    settings: "idx, fold_pass_select",
});

export function del_dexie() {
    db.delete()
    console.log("deleted db")
}

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


export async function DBL_isUserLoggedIn() {
    const user_exists = await db.curr_user.toArray(); 
    if (!user_exists) {
        return false;
    }

    return user_exists[0];
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
    if (folders == null || current_folders.length == folders.length) {
        return await db.folders.toArray();
    }

    await db.folders.clear();
    for(let i = 0; i < folders.length; i++)
    {
        const data = {
            folder: folders[i].folder,
            pass_amount: folders[i].pass_amount,
            color: folders[i].color,
            idx: folders[i].id
        }
        await db.folders.add(data);
    }
    return await db.folders.toArray();
}

export async function DBL_updatePasswords(passwords) {
    const current_passwords = await db.passwords.toArray();
    if (passwords == null || current_passwords.length == passwords.length) {
        return await db.passwords.toArray();
    }

    await db.passwords.clear();
    for(let i = 0; i < passwords.length; i++)
    {
        const data = {
            name: passwords[i].name,
            username: passwords[i].username,
            password: passwords[i].password,
            folder: passwords[i].folder,
            note: passwords[i].note,
            idx: passwords[i].id
        }
        await db.passwords.add(data);
    }
    const ret = await db.passwords.toArray();
    return ret;
}

export async function DBL_getFolders() {
    const current_folders = await db.folders.toArray();
    return current_folders;
}


export async function DBL_deleteFolder(folder) {
    await db.folders.where("folder").equals(folder).delete()
}

export async function DBL_deletePassword(idx) {
    await db.passwords.where("idx").equals(idx).delete()
}

export async function settings_getFolderOrPassword() {
    const settings = await db.settings.toArray();
    if(settings.length == 0) {
        return "Folders";
    }
    return settings[0].fold_pass_select;
}

export async function settings_updateFolderOrPassword(value) {
    let settings = await db.settings.toArray();
    if (settings.length == 0) {
        settings = {
            idx: 0,
            fold_pass_select: value
        }
        await db.settings.add(settings)
        return;
    }
    await db.settings.update(0, {fold_pass_select: value});
}


export async function DBL_getPasswordsByIdx(idx) {
    const data = await db.passwords.where("idx").equals(idx).toArray();
    return data[0];
}


export async function DBL_editFolder(folder_id, folder_name, folder_color) {
    await db.folders.update(folder_id, {folder: folder_name, color: folder_color})
    const current_passwords = await db.passwords.toArray();
    for (let i = 0; i < current_passwords.length; i++) {
        if (current_passwords[i].folder == store.temp.curr_folder_name) {
            console.log("updated password")
            await db.passwords.update(current_passwords[i].idx, {folder: folder_name})
        }
    }
}


