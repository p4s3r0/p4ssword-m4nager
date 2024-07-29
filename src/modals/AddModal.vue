<template>
    <div id="blurredBackground">
        <div id="addModalContainer">
            <h1 id="modalTitle">Add</h1>
            <div id="closeButton" @click="this.$emit('closeModal')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </div>

            <transition mode="out-in">
                <div v-if="this.selection === 0">
                    <menu-button-selection name="Folder" icon="folder" @click="this.selection=1"/>
                    <menu-button-selection name="Password" icon="password" @click="this.selection=2"/>
                    <menu-button-selection name="2FA" icon="2fa" @click="this.selection=3"/>
                </div>

                <!-- FOLDER -->
                <div v-else-if="this.selection === 1" >
                    <div>
                        <enhanced-text-input @valueUpdated="updateFolder" placeholder="Folder Name" />
                        <enhanced-selector @valueUpdated="updateColor"/>
                        <div class="starButtonContainer">
                            <div id="starContainer">
                                <star-preferred :selected_init=false @valueUpdated="updateStarred" />
                            </div>
                            <button class="AddButton" @click="add()">Add</button>
                        </div>
                    </div>
                </div>

                <div v-else-if="this.selection === 2" >
                    <enhanced-text-input @valueUpdated="updateName" id="posNameInput" placeholder="Name" />
                    <enhanced-text-input @valueUpdated="updateUsername" placeholder="Username" style="margin-bottom: 13px;" />
                    <enhanced-password-input @valueUpdated="updatePassword" @showGeneratePasswordModal="this.showGeneratePasswordModal=true"/>
                    <enhanced-selector-folder @valueUpdated="updateFolder" />
                    <enhanced-text-input @valueUpdated="updateNote" id="posNoteInput" placeholder="Note" />
                    <div class="starButtonContainer">
                            <div id="starContainer">
                                <star-preferred :selected_init=false @valueUpdated="updateStarred" />
                            </div>
                            <button class="AddButton" @click="add()">Add</button>
                    </div>
                </div>

                <div v-else-if="this.selection === 3" >
                    <enhanced-text-input @valueUpdated="updateName" id="posNameInput" placeholder="Name" />
                    <enhanced-text-input @valueUpdated="updateNote" id="posNoteInput" placeholder="Secret" />
                    <button class="AddButton" @click="add()">Add</button>
                </div>
            </transition>
        </div>
    </div>
    <Transition name="bounce" mode="out-in">
        <generate-password-modal v-if="this.showGeneratePasswordModal" @closeModal="this.showGeneratePasswordModal = false"/>
    </Transition>
</template>

<script>
import MenuButtonSelection from '@/components/MenuButtonSelection.vue'
import EnhancedTextInput from '@/components/EnhancedTextInput.vue'
import StarPreferred from '@/components/StarPreferred.vue'
import EnhancedSelector from '@/components/EnhancedSelector.vue'
import EnhancedPasswordInput from '@/components/EnhancedPasswordInput.vue'
import EnhancedSelectorFolder from '@/components/EnhancedSelectorFolder.vue';

import GeneratePasswordModal from './GeneratePasswordModal.vue'

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success } from '@/toasts';

import { DB_addNewPassword, DB_addNewFolder, DB_add2FA } from '@/db';


export default {
name: 'addModal',
setup() {
      const toast = useToast();
      return { toast }
    },
components: {
    MenuButtonSelection,
    EnhancedTextInput,
    StarPreferred,
    EnhancedSelector,
    EnhancedPasswordInput,
    GeneratePasswordModal,
    EnhancedSelectorFolder,
},
data() {
    return {
        selection: 0,
        folder: "NO FOLDER",
        name: "",
        username: "",
        password: "",
        note: "",
        algo: false,
        color: "black",
        starred: false,
        user: {},
        showGeneratePasswordModal: false
    }
}, 
methods: {
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
    update256(inp) {
        this.algo = inp;
    },
    add() {
        if (this.selection == 1) {
            this.addFolder();
        } else if (this.selection == 2) {
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
            this.$emit("closeModal")
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
            this.$emit("closeModal")
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
            this.$emit("closeModal")
        } else {
            this.toast.error("Something went wrong!", toasts_config_error);
        }
      });
    }
}, 
beforeMount() {
    document.body.style.overflow = "hidden"
}, 
}
</script>

<style scoped>
#addModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 80%;
    max-width: 500px;
    padding: 20px;
    padding-top: 0px;
    overflow: scroll;
    max-height: 80vh;
}

#blurredBackground {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
}

#closeButton {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}

#modalTitle {
    border-bottom: 1px white solid;
}

.starButtonContainer {
    margin-top: 15px;
    display: flex; 
    justify-content: space-between;
}

#starContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.AddButton{
    border-radius: var(--border-radius);
    border: none;
    cursor: pointer;
    width: 100%;
    height: 56px;
}

</style>