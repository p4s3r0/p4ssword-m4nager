import { Dexie } from 'dexie';
import { store } from '@/store/store';

const db = new Dexie("p4ssword_m4nager");
db.version(6).stores({
    curr_user: "++idx, username, password, email, api_key",
    folders: "++idx, folder, color, starred, pass_amount",
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
    if (folders == null || folders == undefined) {
        return await db.folders.toArray();
    }

    await db.folders.clear();
    for(let i = 0; i < folders.length; i++)
    {
        const data = {
            folder: folders[i].folder,
            color: folders[i].color,
            idx: folders[i].id,
            starred: folders[i].starred,
            pass_amount: folders[i].pass_amount
        }
        await db.folders.add(data);
    }
}

export async function DBL_update2FA(twofas) {
    if (twofas == null || twofas == undefined) {
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
}


export async function DBL_updatePasswords(passwords) {
    if (passwords == null || passwords == undefined) {
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
}

export async function DBL_getFolders(passwords) {
    const current_folders = await db.folders.toArray();

    for(let i = 0; i < current_folders.length; i++) {
        const amount = passwords.filter(pass => pass.folder === current_folders[i].folder).length
        current_folders[i].pass_amount = amount;
    }
    return current_folders;
}

export async function DBL_getPasswords() {
    const current_passwords = await db.passwords.toArray();
    return current_passwords;
}

export async function DBL_get2Fa() {
    const current_2fa = await db.two_fa.toArray();
    return current_2fa;
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

export async function DBL_getFoldersPasswords(folder_name) {
    const passwords = await db.passwords.toArray();

    let ret = []
    for (let i = 0; i < passwords.length; i++) {
        if (passwords[i].folder == folder_name){
            ret.push(passwords[i]);
        }
    }
    return ret;
}


export async function DBL_getPassAmount(folder_name) {
    const passwords = await db.passwords.toArray();
    console.log(passwords.length)
    const amount = passwords.filter(pass => pass.folder === folder_name).length
    return amount
}