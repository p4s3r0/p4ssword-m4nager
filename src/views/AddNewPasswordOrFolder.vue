<template>
    <div id="mainLogin">
        <div v-if="this.fold_pass_selector == 'Passwords'">
            <h1>Add new Password.</h1>
            <h2>I'll protect it!</h2>
        </div>

        <div v-else>
            <h1>Add new Folder.</h1>
            <h2>Order is key!</h2>
        </div>

        <div class="showFoldersOrPasswords">
            <folders-password-filter text="Folder" @click="activateFoldersButton" :status="this.fold_pass_selector == 'Folders' ? 'active' : 'notActive'"/>
            <folders-password-filter text="Password" @click="activatePasswordsButton" :status="this.fold_pass_selector == 'Folders' ? 'notActive' : 'active'"/>
        </div>

        <div v-if="this.fold_pass_selector == 'Passwords'">
            <text-input @valueUpdated="updateName" id="posNameInput" placeholder="Name" />
            <text-input @valueUpdated="updateUsername" placeholder="Username" style="margin-bottom: 10px;" />
            <password-input @valueUpdated="updatePassword" />
            <selector-folder @valueUpdated="updateFolder" />
            <text-input @valueUpdated="updateNote" id="posNoteInput" placeholder="Note" />
        </div>
        <div v-else id="posFolderInput">
            <text-input @valueUpdated="updateFolder" id="posUsernameInput" placeholder="Folder Name" />
            <selector @valueUpdated="updateColor"/>
            <big-button-register-signin text="Add Folder" @click="addFolder()"/>
        </div>

        <big-button-register-signin text="Add" @click="add()"/>
    </div>
</template>
  
<script>
import TextInput from '@/components/TextInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import SelectorFolder from '@/components/SelectorFolder.vue'
import FoldersPasswordFilter from '@/components/FoldersPasswordFilter.vue';
import Selector from '@/components/Selector.vue'

import { DB_addNewPassword, DB_addNewFolder } from '@/supabase';
import { store } from '@/store/store';
import { DBL_refreshUserLogin } from '@/dexie';

export default {
name: 'App',
components: {
    TextInput,
    BigButtonRegisterSignin,
    PasswordInput,
    SelectorFolder,
    FoldersPasswordFilter,
    Selector
},
data() {
    return {
        folder: "NO FOLDER",
        name: "",
        username: "",
        password: "",
        note: "",
        color: "black",
        fold_pass_selector: "Folders",
        color: "black"
    }
},
methods: {
    //Password
    activateFoldersButton() {
        this.fold_pass_selector = "Folders";
    },
    activatePasswordsButton() {
        this.fold_pass_selector = "Passwords";
    },
    updateFolder(folder) {
    this.folder = folder;
    },
    updateName(name) {
    this.name = name;
    },
    updatePassword(password) {
    this.password = password;
    },
    updateNote(note) {
    this.note = note;
    },
    updateUsername(username) {
    this.username = username;
    },
    add() {
        if (this.fold_pass_selector == "Folders") {
            this.addFolder();
        } else {
            this.addPassword();
        }
    },
    addPassword() {
    DB_addNewPassword(this.name, this.password, this.folder, this.note, store.user.username, this.username).then( (res) => {
        if (res) {
        this.$router.push('/home');
        }
    });
    },
    //Folder
    updateFolder(folder) {
      this.folder = folder;
    },
    updateColor(color) {
      this.color = color;
    },
    addFolder() {
      DB_addNewFolder(store.user.username, this.folder, this.color).then( (res) => {
        if (res) {
          this.$router.push('/home');
        }
      });
    }
}, 
beforeMount() {
    if (store.user.username == "") {
        DBL_refreshUserLogin().then((res) => {
            if (!res) {
                this.$router.push('/');
            }
        })
    }
    }
}
</script>

<style scoped>
#mainLogin {
max-width: 600px;
padding-left: 8vw;
}

.showFoldersOrPasswords {
    margin-left: 50%;
    transform: translateX(-60%);
    display: flex;
    margin-top: 6vh;
    width: 70%;
}

p {
position: absolute;
bottom: 22vw;
width: 80vw;
text-align: center;
}

a {
font-weight: bold;
text-decoration: underline;
}

#posNameInput {
margin-top: 5vh;
margin-bottom: 1vh;
}

#posNoteInput {
margin-top: 10px;
}


#posFolderInput {
    margin-top: 5vh;
}
</style>
