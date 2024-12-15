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
                        <div style="width: 100%">
                            <FloatLabel variant="in">
                                <InputText id="in_label" v-model="this.folder" />
                                <label style="color: var(--p-select-placeholder-color)" for="in_label">Folder Name</label>
                            </FloatLabel>
                        </div>
                        <div style="width: 100%; margin-top: 5px">
                            <Select v-model="this.color" :options="colors" optionLabel="name" placeholder="Select a Color" class="w-full md:w-56" />
                        </div>
                        <div class="starButtonContainer">
                            <div v-if="this.starred==true">
                                <Button icon="pi pi-star" severity="contrast" rounded aria-label="Star" @click="this.starred=false" />
                            </div>
                            <div v-else>
                                <Button icon="pi pi-star" severity="contrast" text raised rounded aria-label="Star" @click="this.starred=true" class="p-star-button-false"/>
                            </div>
                            <Button label="Save" icon="pi pi-save" iconPos="left" style="background-color: white" @click="add()"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="this.selection === 2" >
                    <div style="width: 100%">
                        <FloatLabel variant="in">
                            <InputText id="in_label" v-model="this.name" />
                            <label style="color: var(--p-select-placeholder-color)" for="in_label">Password Name</label>
                        </FloatLabel>
                        <FloatLabel variant="in" style="margin-top: 5px;">
                            <InputText id="in_label" v-model="this.username" />
                            <label style="color: var(--p-select-placeholder-color)" for="in_label">Username</label>
                        </FloatLabel>
                        <div style="display: flex;margin-top: 5px;">
                            <FloatLabel variant="in" style="flex-grow: 1;">
                                <InputText id="in_label" v-model="this.password" />
                                <label style="color: var(--p-select-placeholder-color)" for="in_label">Password</label>
                            </FloatLabel>
                            <Button label="Generate" icon="pi pi-key" iconPos="left" style="background-color: white; margin-left: 5px;" @click="showGeneratePasswordModal=true"/>
                        </div>
                        <Select v-model="this.folder" :options="folders" optionLabel="name" placeholder="Folder" class="w-full md:w-56" style="margin-top: 5px;" />
                        <FloatLabel variant="in" style="margin-top: 5px;">
                            <InputText id="in_label" v-model="this.note" />
                            <label style="color: var(--p-select-placeholder-color)" for="in_label">Note</label>
                        </FloatLabel>
                        <div class="starButtonContainer">
                            <div v-if="this.starred==true">
                                <Button icon="pi pi-star" severity="contrast" rounded aria-label="Star" @click="this.starred=false" />
                            </div>
                            <div v-else>
                                <Button icon="pi pi-star" severity="contrast" text raised rounded aria-label="Star" @click="this.starred=true" class="p-star-button-false"/>
                            </div>
                            <Button label="Save" icon="pi pi-save" iconPos="left" style="background-color: white" @click="add()"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="this.selection === 3" >
                    <div style="width: 100%">
                        <FloatLabel variant="in">
                            <InputText id="in_label" v-model="this.name" />
                            <label style="color: var(--p-select-placeholder-color)" for="in_label">2FA Name</label>
                        </FloatLabel>
                    </div>
                    <div style="width: 100%; margin-top: 5px;">
                        <FloatLabel variant="in">
                            <InputText id="in_label" v-model="this.note" />
                            <label style="color: var(--p-select-placeholder-color)" for="in_label">Secret</label>
                        </FloatLabel>
                    </div>
                    <div style="display: flex; justify-content: right; margin-top: 5px;">
                        <Button label="Save" icon="pi pi-save" iconPos="left" style="background-color: white" @click="add()"/>
                    </div>
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

import { DB_addNewPassword, DB_addNewFolder, DB_add2FA } from '@/db';
import { DBL_getFoldersNames } from '@/dexie'


export default {
name: 'addModal',
    setup() {
      const toast = useToast();
      return { toast }
    },
    emits: ['closeModal', 'closeModalReload'],
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
        folder: "",
        name: "",
        username: "",
        password: "",
        note: "",
        algo: false,
        color: "black",
        starred: false,
        user: {},
        folders: [],
        showGeneratePasswordModal: false,
        colors: [
            {name: "Black", code: 'black'},
            {name: "Dark Red", code: 'darkRed'},
            {name: "Red", code: 'red'},
            {name: "Dark Orange", code: 'darkOrange'},
            {name: "Light Orange", code: 'lightOrange'},
            {name: "Yellow", code: 'yellow'},
            {name: "Light Green", code: 'lightGreen'},
            {name: "Green", code: 'green'},
            {name: "Blue Green", code: 'blueGreen'},
            {name: "Blue", code: 'blue'},
            {name: "Violet", code: 'violet'}],
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
            this.toast.error("Name and secret required!");
            return;
        }
    DB_add2FA(this.name, this.note).then((res) => {
        if (res) {
            this.toast.success("New 2FA Added!");
            this.$emit("closeModalReload")
        } else {
            this.toast.error("Something went wrong!");
        }
    })
    },
    addPassword() {
        if(this.name == "") {
            this.toast.error("Name is required!");
            return;
        }
        if (this.folder.name == undefined) {
            this.folder = {}
            this.folder.name = "NO FOLDER"
        }
    DB_addNewPassword(this.name, this.password, this.folder.name, this.note, this.user.username, this.username, this.starred).then( (res) => {
        if (res) {
            this.toast.success("New Password Added!");
            this.$emit("closeModalReload")
        } else {
            this.toast.error("Something went wrong!");
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

        DB_addNewFolder(this.user.username, this.folder, this.color.code, this.starred).then( (res) => {
            if (res) {
                this.toast.success("New Folder Added!");
                this.$emit("closeModalReload")
            } else {
                this.toast.error("Something went wrong!");
            }
        });
    }
},
beforeMount() {
    document.body.style.overflow = "hidden";
    DBL_getFoldersNames().then((res) => {
        this.folders = res
    })
    
},
}
</script>

<style scoped>
#addModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 90%;
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
    color: var(--background-color);
}


#wtf {
    width: 50px;
}

</style>