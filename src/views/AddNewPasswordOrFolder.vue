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
            <star-preferred :selected_init=false @valueUpdated="updateStarred" />
        </div>
        <div v-else id="posFolderInput">
            <text-input @valueUpdated="updateFolder" id="posUsernameInput" placeholder="Folder Name" />
            <selector @valueUpdated="updateColor"/>
            <big-button-register-signin text="Add Folder" @click="addFolder()"/>
            <star-preferred :selected_init=false @valueUpdated="updateStarred" />
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
import StarPreferred from '@/components/StarPreferred.vue';

import { DB_addNewPassword, DB_addNewFolder } from '@/supabase';
import { store, checkUserValid } from '@/store/store';
import { DBL_refreshUserLogin } from '@/dexie';

import { useToast } from "vue-toastification";

export default {
name: 'App',
setup() {
      const toast = useToast();
      return { toast }
    },
components: {
    TextInput,
    BigButtonRegisterSignin,
    PasswordInput,
    SelectorFolder,
    FoldersPasswordFilter,
    Selector,
    StarPreferred
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
        starred: false
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
    updateStarred(starred) {
        this.starred = starred;
    },
    add() {
        if (this.fold_pass_selector == "Folders") {
            this.addFolder();

        } else {
            this.addPassword();
        }
    },
    addPassword() {
    DB_addNewPassword(this.name, this.password, this.folder, this.note, store.user.username, this.username, this.starred).then( (res) => {
        if (res) {
            this.toast.success("New Password Added!", {
                position: "top-center",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
            this.$router.push('/home');
        } else {
            this.toast.error("Something went wrong!", {
                position: "top-center",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });   
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
      DB_addNewFolder(store.user.username, this.folder, this.color, this.starred).then( (res) => {
        if (res) {
            this.toast.success("New Folder Added!", {
                position: "top-center",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
            this.$router.push('/home');
        } else {
            this.toast.error("Something went wrong!", {
                position: "top-center",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        }
      });
    }
}, 
beforeMount() {
    if(!checkUserValid()) {
      DBL_refreshUserLogin().then((res) => {
        if (!res) {
          DBL_logoutUser();
          this.$router.push('/');
        }
      })
    }
}
}
</script>

<style scoped>
#mainLogin {
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
