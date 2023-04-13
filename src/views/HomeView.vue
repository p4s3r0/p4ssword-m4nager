<template>
    <div id="mainLogin">
        <h1 id="posHello">Hello, {{ this.username }} 👋</h1>
        <lock-button @click="logout()"/>
        <search-bar id="posSearchBar" />
        <div class="showFoldersOrPasswords">
            <folders-password-filter text="Folders" @click="activateFoldersButton" :status="this.fold_pass_selector == 'Folders' ? 'active' : 'notActive'"/>
            <folders-password-filter text="Passwords" @click="activatePasswordsButton" :status="this.fold_pass_selector == 'Folders' ? 'notActive' : 'active'"/>
        </div>
        <div id="posFolders">
            <folder v-for="f in this.folders"  :key=f.key 
                                               :name=f.folder
                                               :pass_amount=f.pass_amount 
                                               :color=f.color />
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

import { store } from '@/store/store'
import { DB_getAllFolders } from '@/supabase';
import { DBL_refreshUserLogin, DBL_logoutUser } from '@/dexie';

export default {
name: 'App',
components: {
    SearchBar,
    FoldersPasswordFilter,
    AddButton,
    Folder,
    LockButton,
},
data() {
    return {
        username: store.user.username,
        fold_pass_selector: "Folders",
        folders: [],
    }
},
methods: {
    activateFoldersButton() {
        this.fold_pass_selector = "Folders";
    },
    activatePasswordsButton() {
        this.fold_pass_selector = "Passwords";
    },
    logout() {
        DBL_logoutUser().then( () => {
            this.$router.push('/');
        })
    }
}, beforeMount() {
    if (store.user.username == "") {
        DBL_refreshUserLogin().then((res) => {
            if (!res) {
                this.$router.push('/');
            }
            this.username = res;
            DB_getAllFolders(store.user.username).then( (res) => {
                this.folders = res;
            })
        })
    } else {
        DB_getAllFolders(store.user.username).then( (res) => {
        this.folders = res;
    })
    }
}
}
</script>

<style scoped>
#mainLogin {
    margin-bottom: 15vh;
}
#posHello {
    margin-top: 5vh;
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
