<template>
    <div id="mainLogin">
        <h1 id="posHello">Hello, {{ this.user.username }} 👋</h1>
        <lock-button class="ripple" @click="logout()"/>
        <search-bar id="posSearchBar" @valueUpdated=search />
        <div class="showFoldersOrPasswords">
            <folders-password-filter class="ripple" text="Folders" @click="activateFoldersButton" :status="this.fold_pass_selector == 'Folders' ? 'active' : 'notActive'"/>
            <folders-password-filter class="ripple" text="Passwords" @click="activatePasswordsButton" :status="this.fold_pass_selector == 'Passwords' ? 'active' : 'notActive'"/>
            <two-factor-button class="ripple" @click="activateTwoFAButton" :status="this.fold_pass_selector == 'twoFA' ? 'active' : 'notActive'"/>
        </div>

        
        <div v-if="this.fold_pass_selector == 'Folders'" id="posFolders">
                <folder v-for="f in this.folders" @click="openFolder(f.id, f.folder, f.color, f.starred)"
                                                :key=f.key 
                                                :name=f.folder
                                                :pass_amount=f.pass_amount 
                                                :color=f.color
                                                :id=f.id 
                                                :starred=f.starred />
        </div>

        <div v-else-if="this.fold_pass_selector=='Passwords'" id="posFolders">
            <password v-for="p in this.passwords" @click="openPasswordView(p.name, p.password, p.username, p.id, p.folder, p.note, p.starred)"
                                                :key=p.key 
                                                :name=p.name
                                                :enc_password=p.password
                                                :username=p.username 
                                                :id=p.id 
                                                :folder=p.folder 
                                                :note=p.note 
                                                :starred=p.starred />
        </div>


        <div v-else id="posFolders">
            <two-f-a v-for="t in this.twoFactors"    
                                            :key="t.key"
                                            :name="t.name"
                                            :secret="t.secret" />
        </div>
    <add-button class="ripple" @click="addNew" />
    </div>
    
</template>
  
<script>
import SearchBar from '@/components/SearchBar.vue';
import FoldersPasswordFilter from '@/components/FoldersPasswordFilter.vue';
import AddButton from '@/components/AddButton.vue';
import Folder from '@/components/Folder.vue';
import LockButton from '@/components/LockButton.vue';
import Password from '@/components/Password.vue';
import TwoFactorButton from '@/components/TwoFactorButton.vue';
import TwoFA from '@/components/TwoFA.vue';

import { DB_getAllFolders, DB_getAll2FA } from '@/supabase';
import { DBL_logoutUser, settings_getFolderOrPassword, settings_updateFolderOrPassword, getCurrentUser } from '@/dexie';
import { rankFoldersBySearch, rankPasswordsBySearch, rankPasswordsAlphabetically, rankFolderAlphabetically } from '@/scripts/search';
import { store, DECRYPT } from '@/store/store'

import { DB_getAllPasswords } from '@/db'

export default {
name: 'App',
components: {
    SearchBar,
    FoldersPasswordFilter,
    AddButton,
    Folder,
    LockButton,
    Password,
    TwoFactorButton,
    TwoFA
},
data() {
    return {
        user: {},
        fold_pass_selector: "Folders",
        folders: [],
        passwords: [],
        twoFactors: []
    }
},
methods: {
    activateFoldersButton() {
        this.fold_pass_selector = "Folders";
        settings_updateFolderOrPassword("Folders")
    },
    activatePasswordsButton() {
        this.fold_pass_selector = "Passwords";
        settings_updateFolderOrPassword("Passwords")
    },
    activateTwoFAButton() {
        this.fold_pass_selector = "twoFA";
        settings_updateFolderOrPassword("twoFA")

    },
    logout() {
        DBL_logoutUser().then( () => {
            this.$router.push('/');
        })
    },
    openFolder(folder_id, folder_name, folder_color, folder_starred) {
        store.temp.curr_folder_id = folder_id;        
        store.temp.curr_folder_name = folder_name;        
        store.temp.curr_folder_color = folder_color;     
        store.temp.curr_folder_starred = folder_starred;
        this.$router.push('/folder');
    },
    search(keyword) {
        if (this.fold_pass_selector == "Folders") {
            rankFoldersBySearch(keyword).then((res) => {
                this.folders = res;
            });
        } else {
            rankPasswordsBySearch(keyword).then((res) => {
                this.passwords = res;
            });
        }
    },
    addNew() {
        setTimeout(() => this.$router.push('/addPasswordOrFolder'), 300);
    },
    async openPasswordView(name, password, username, id, folder, note, starred) {
        store.temp.curr_password_id = id;
        store.temp.curr_password_name = name;
        store.temp.curr_password_username = await DECRYPT(username);
        store.temp.curr_password_password = await DECRYPT(password);
        store.temp.curr_password_folder = folder;
        store.temp.curr_password_note = await DECRYPT(note);
        store.temp.curr_password_starred = starred;
        this.$router.push('/password');
    }
}, beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
            DB_getAllFolders(user.username).then( (res) => {
                this.folders = rankFolderAlphabetically(res);
            });
            DB_getAllPasswords(user.username).then( (res) => {
                this.passwords = rankPasswordsAlphabetically(res);
            });
            DB_getAll2FA(user.username).then( (res) => {
                this.twoFactors = res;
            });
            settings_getFolderOrPassword().then( (res) => {
                this.fold_pass_selector = res;
            })
        } else {
            this.$router.push('/');
        }
    })
}
}
</script>

<style scoped>
#mainLogin {
    margin-bottom: 15vh;
}
#posHello {
    margin-top: 5vh;
    margin-left: 5%;
}
#posSearchBar {
    margin-top: 6vh;
    margin-left: 10vw;
} 

.showFoldersOrPasswords {
    margin-left: 50%;
    transform: translateX(-50%);
    display: flex;
    margin-top: 6vh;
    width: 70%;
}

button {
    width: 32vw;
    height: 4vh;
    margin-left: 5vw;
    background-color: #46464650;
    border-radius: 5px;
    border: none;
    color: white;
}

#posFolders {
    margin-top: 40px;
}

.ripple {
  background-position: center;
  transition: background 0.3s;
}
.ripple:hover {
  background: #ffffff radial-gradient(circle, transparent 1%, #545454 1%) center/15000%;
  color: black;
}
.ripple:active {
  background-color: #ffffff;
  background-size: 100%;
  transition: background 0.5s;
}
</style>
