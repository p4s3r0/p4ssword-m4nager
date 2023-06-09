<template>
    <div id="mainLogin">
        <h1 id="posHello">Hello, {{ this.username }} 👋</h1>
        <lock-button @click="logout()"/>
        <search-bar id="posSearchBar" @valueUpdated=search />
        <div class="showFoldersOrPasswords">
            <folders-password-filter text="Folders" @click="activateFoldersButton" :status="this.fold_pass_selector == 'Folders' ? 'active' : 'notActive'"/>
            <folders-password-filter text="Passwords" @click="activatePasswordsButton" :status="this.fold_pass_selector == 'Folders' ? 'notActive' : 'active'"/>
        </div>

        
        <div v-if="this.fold_pass_selector == 'Folders'" id="posFolders">
                <folder v-for="f in this.folders" @click="openFolder(f.idx, f.folder, f.color, f.starred)"
                                                :key=f.key 
                                                :name=f.folder
                                                :pass_amount=f.pass_amount 
                                                :color=f.color
                                                :idx=f.idx 
                                                :starred=f.starred />
        </div>

        <div v-else id="posFolders">
            <password v-for="p in this.passwords"
                                                :key=p.key 
                                                :name=p.name
                                                :enc_password=p.password
                                                :username=p.username 
                                                :idx=p.idx 
                                                :folder=p.folder 
                                                :note=p.note 
                                                :starred=p.starred />
        </div>
    <add-button @click="this.$router.push('/addPasswordOrFolder')" />
    </div>
    
</template>
  
<script>
import SearchBar from '@/components/SearchBar.vue';
import FoldersPasswordFilter from '@/components/FoldersPasswordFilter.vue';
import AddButton from '@/components/AddButton.vue';
import Folder from '@/components/Folder.vue';
import LockButton from '@/components/LockButton.vue';
import Password from '@/components/Password.vue';


import { store, checkUserValid } from '@/store/store'
import { DB_getAllFolders, DB_getAllPasswords } from '@/supabase';
import { DBL_refreshUserLogin, DBL_logoutUser, settings_getFolderOrPassword, settings_updateFolderOrPassword } from '@/dexie';
import { rankFoldersBySearch, rankPasswordsBySearch, rankPasswordsAlphabetically, rankFolderAlphabetically } from '@/scripts/search';

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
    }
}, beforeMount() {
    if (!checkUserValid()) {
        DBL_refreshUserLogin().then((res) => {
            this.username = store.user.username
            if (!res) {
                DBL_logoutUser();
                this.$router.push('/');
            } else {
                DB_getAllFolders(store.user.username).then( (res) => {
                    this.folders = rankFolderAlphabetically(res);
                });
                DB_getAllPasswords(store.user.username).then( (res) => {
                    this.passwords = rankPasswordsAlphabetically(res);
                });
            }
        })
    } else {
        DB_getAllFolders(store.user.username).then( (res) => {
            this.folders = rankFolderAlphabetically(res);
        });
        DB_getAllPasswords(store.user.username).then( (res) => {
            this.passwords = rankPasswordsAlphabetically(res);
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
