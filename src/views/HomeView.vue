<template>
    <div id="mainLogin">
        <h1 id="posHello">Hello, {{ this.username }} 👋</h1>
        <lock-button @click="logout()"/>
        <search-bar id="posSearchBar" />
        <div class="showFoldersOrPasswords">
            <folders-password-filter text="Folders" @click="activateFoldersButton" :status="this.fold_pass_selector == 'Folders' ? 'active' : 'notActive'"/>
            <folders-password-filter text="Passwords" @click="activatePasswordsButton" :status="this.fold_pass_selector == 'Folders' ? 'notActive' : 'active'"/>
        </div>
        <div v-if="this.fold_pass_selector == 'Folders'" id="posFolders">
            <folder v-for="f in this.folders" @click=openFolder(f.folder)
                                                :key=f.key 
                                                :name=f.folder
                                                :pass_amount=f.pass_amount 
                                                :color=f.color />
        </div>

        <div v-else id="posFolders">
            <password v-for="p in this.passwords" :key=p.key 
                                                :name=p.name
                                                :enc_password=p.password
                                                :username=p.username />
        </div>
        <add-button v-if="this.fold_pass_selector == 'Folders'" @click="this.$router.push('/addFolder')"/>
    <add-button v-else @click="this.$router.push('/addPassword')"/>
    </div>
    
</template>
  
<script>
import SearchBar from '@/components/SearchBar.vue';
import FoldersPasswordFilter from '@/components/FoldersPasswordFilter.vue';
import AddButton from '@/components/AddButton.vue';
import Folder from '@/components/Folder.vue';
import LockButton from '@/components/LockButton.vue';
import Password from '@/components/Password.vue';

import { store } from '@/store/store'
import { DB_getAllFolders, DB_getAllPasswords } from '@/supabase';
import { DBL_refreshUserLogin, DBL_logoutUser, settings_getFolderOrPassword, settings_updateFolderOrPassword } from '@/dexie';

export default {
name: 'App',
components: {
    SearchBar,
    FoldersPasswordFilter,
    AddButton,
    Folder,
    LockButton,
    Password,
},
data() {
    return {
        username: store.user.username,
        fold_pass_selector: "Folders",
        folders: [],
        passwords: []
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
    logout() {
        DBL_logoutUser().then( () => {
            this.$router.push('/');
        })
    },
    openFolder(folder_name) {
        store.temp.curr_folder = folder_name;
        this.$router.push('/folder');
    }
}, beforeMount() {
    if (store.user.username == "") {
        DBL_refreshUserLogin().then((res) => {
            if (!res) {
                this.$router.push('/');
            }
            this.username = res;
            DB_getAllFolders(this.username).then( (res) => {
                this.folders = res;
            });
            DB_getAllPasswords(this.username).then( (res) => {
                this.passwords = res;
            });
        })
    } else {
        DB_getAllFolders(store.user.username).then( (res) => {
        this.folders = res;
        });
        DB_getAllPasswords(this.username).then( (res) => {
                this.passwords = res;
        });
    }
    settings_getFolderOrPassword().then( (res) => {
        this.fold_pass_selector = res;
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
</style>
