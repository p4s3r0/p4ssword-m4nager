<template>
    <div>
    <div id="mainAddNewPassword">
        <div v-if="this.fold_pass_selector == 'Passwords'" id="title">
            <h1>Add new Password.</h1>
            <h2>I'll protect it!</h2>
        </div>

        <div v-else-if="this.fold_pass_selector == 'Folders'">
            <h1>Add new Folder.</h1>
            <h2>Order is key!</h2>
        </div>

        <div v-else>
            <h1>Add 2FA.</h1>
            <h2>Experimental!</h2>
        </div>

        <div class="showFoldersOrPasswords">
            <folders-password-filter class="ripple" text="Folder" @click="activateFoldersButton" :status="this.fold_pass_selector == 'Folders' ? 'active' : 'notActive'"/>
            <folders-password-filter class="ripple" text="Password" @click="activatePasswordsButton" :status="this.fold_pass_selector == 'Passwords' ? 'active' : 'notActive'"/>
            <folders-password-filter class="ripple" text="2FA" @click="activate2FAButton" :status="this.fold_pass_selector == 'TwoFA' ? 'active' : 'notActive'"/>
        </div>

        <div class="containerInput" v-if="this.fold_pass_selector == 'Passwords'">
            <button id="genPasswordButton" @click="this.showGeneratePasswordModal=true">Generate Secure Password</button>
            <text-input @valueUpdated="updateName" id="posNameInput" placeholder="Name" />
            <text-input @valueUpdated="updateUsername" placeholder="Username" style="margin-bottom: 13px;" />
            <password-input @valueUpdated="updatePassword" />
            <selector-folder @valueUpdated="updateFolder" />
            <text-input @valueUpdated="updateNote" id="posNoteInput" placeholder="Note" />
            <star-preferred :selected_init=false @valueUpdated="updateStarred" />
            <button class="AddButton" @click="add()">Add</button>
        </div>

        <div class="containerInput" v-else-if="this.fold_pass_selector == 'TwoFA'">
            <text-input @valueUpdated="updateName" id="posNameInput" placeholder="Name" />
            <text-input @valueUpdated="updateNote" id="posNoteInput" placeholder="Secret" />
            <star-preferred :selected_init=false @valueUpdated="updateStarred" />
            <button class="AddButton" @click="add()">Add</button>
        </div>

        <div class="containerInput" v-else >
            <text-input @valueUpdated="updateFolder" placeholder="Folder Name" />
            <selector @valueUpdated="updateColor"/>
            <star-preferred :selected_init=false @valueUpdated="updateStarred" />
            <button class="AddButton" @click="add()">Add</button>
        </div>
    </div>
    <generatePasswordModal v-if="this.showGeneratePasswordModal" @closeModal="this.showGeneratePasswordModal = false"/>
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
import GeneratePasswordModal from '@/modals/GeneratePasswordModal.vue';

import { getCurrentUser } from '@/dexie';

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success } from '@/toasts';

import { DB_addNewPassword, DB_addNewFolder, DB_add2FA } from '@/db';

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
    StarPreferred,
    GeneratePasswordModal
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
        starred: false,
        user: {},
        showGeneratePasswordModal: false
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
    activate2FAButton() {
        this.fold_pass_selector = "TwoFA";
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
        } else if (this.fold_pass_selector == "Passwords") {
            this.addPassword();
        } else {
            this.add2FA();
        }
    },
    add2FA() {
        if(this.name == "" || this.note == "") {
            this.toast.error("Name and secret required!", toasts_config_error);
            return;
        }
    DB_add2FA(this.name, this.note).then((res) => {
        if (res) {
            this.toast.success("New 2FA Added!", toasts_config_success);
            this.$router.push('/home');
        } else {
            this.toast.error("Something went wrong!", toasts_config_error);   
        }
    })
    },
    addPassword() {
        if(this.name == "") {
            this.toast.error("Name is required!", toasts_config_error);
            return;
        }
    DB_addNewPassword(this.name, this.password, this.folder, this.note, this.user.username, this.username, this.starred).then( (res) => {
        if (res) {
            this.toast.success("New Password Added!", toasts_config_success);
            this.$router.push('/home');
        } else {
            this.toast.error("Something went wrong!", toasts_config_error);   
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
        if(this.folder == "")
            return;
      DB_addNewFolder(this.user.username, this.folder, this.color, this.starred).then( (res) => {
        if (res) {
            this.toast.success("New Folder Added!", toasts_config_success);
            this.$router.push('/home');
        } else {
            this.toast.error("Something went wrong!", toasts_config_error);
        }
      });
    }
}, 
beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
        } else {
            this.$router.push('/');
        }
    })
}
}
</script>

<style scoped>
h1 {
    margin-left: 8%;
}

h2 {
    margin-left: 8%;
}
.showFoldersOrPasswords {
    margin-left: 50%;
    transform: translateX(-50%);
    display: flex;
    margin-top: 6vh;
    max-width: 800px;
    width: 90%;

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

.containerInput {
    position: absolute;
    left: 0px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 800px;
    margin-top: 5vh;
}


#genPasswordButton {
    background-color: white;
    color: black;
    width: 100%;
    border-radius: 16px;
    height: 7vh;
    cursor: pointer;
    margin-bottom: 5px;
    border: none;
}

.AddButton {
    margin-top: 100px;
    margin-bottom: 10px;
    width: 80%;
    margin-left: 10%;
    height: 70px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
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
