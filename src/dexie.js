import { Dexie } from 'dexie';
import { store } from '@/store/store';

const db = new Dexie("p4ssword_m4nager");
db.version(4).stores({
    curr_user: "++idx, username, password, email, api_key",
    folders: "++idx, folder, pass_amount, color, starred",
    passwords: "++idx, name, password, folder, note, username, starred",
    two_fa: "++idx, username, name, secret",
    settings: "idx, fold_pass_select",
});


export function del_dexie() {
    db.delete()
    console.log("deleted db")
}

export async function DBL_loginUser(username_, password_, email_, api_key_) {
    const user_exists = await db.curr_user.toArray(); 
    if (user_exists) {
        await db.curr_user.clear();
    }
    const data = {
        username: username_, 
        password: password_, 
        email: email_,
        api_key: api_key_
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

    const passwords_exists = await db.passwords.toArray(); 
    if (passwords_exists) {
        await db.passwords.clear();
    }

    const twoFa_exists = await db.two_fa.toArray(); 
    if (twoFa_exists) {
        await db.two_fa.clear();
    }

    const settings_exists = await db.settings.toArray(); 
    if (settings_exists) {
        await db.settings.clear();
    }
}


export async function getCurrentUser() {
    const user_exists = await db.curr_user.toArray(); 
    if (!user_exists) {
        return false;
    }

    return user_exists[0];
}


export async function DBL_updateFolders(folders) {
    if (folders == null) {
        return await db.folders.toArray();
    }

    
    await db.folders.clear();
    for(let i = 0; i < folders.length; i++)
    {
        const data = {
            folder: folders[i].folder,
            pass_amount: folders[i].pass_amount,
            color: folders[i].color,
            idx: folders[i].id,
            starred: folders[i].starred
        }
        await db.folders.add(data);
    }
    return await db.folders.toArray();
}

export async function DBL_update2FA(twofas) {
    if (twofas == null) {
        return await db.two_fa.toArray();
    }

    
    await db.two_fa.clear();
    for(let i = 0; i < twofas.length; i++)
    {

        const data = {
            username: twofas[i].user,
            name: twofas[i].name,
            secret: twofas[i].secret,
        }
        await db.two_fa.add(data);
    }
    return await db.two_fa.toArray();
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
            idx: passwords[i].id,
            starred: passwords[i].starred,
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



export async function DBL_deleteTwoFa(name) {
    await db.two_fa.where("name").equals(name).delete()
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


export async function DBL_editFolder(folder_id, folder_name, folder_color, folder_starred) {
    await db.folders.update(folder_id, {folder: folder_name, color: folder_color, starred: folder_starred})
    const current_passwords = await db.passwords.toArray();
    for (let i = 0; i < current_passwords.length; i++) {
        if (current_passwords[i].folder == store.temp.curr_folder_name) {
            await db.passwords.update(current_passwords[i].idx, {folder: folder_name})
        }
    }
}

export async function DBL_edit2FA(old_name, new_name, new_secret) {
    let curr = await db.two_fa.where("name").equals(old_name).toArray();
    curr = curr[0]
    await db.two_fa.update(curr.idx, {name: new_name, secret: new_secret})
}




export async function  DBL_editPassword(id, name, username, password, folder, note, starred) {
    await db.passwords.update(id, 
                                {
                                    name: name, 
                                    username: username,
                                    password: password,
                                    folder: folder,
                                    note: note,
                                    starred: starred
                                })
}