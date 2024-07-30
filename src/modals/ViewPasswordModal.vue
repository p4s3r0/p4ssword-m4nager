<template>
    <div id="blurredBackground">
        <div id="viewPasswordModalContainer">
            <Transition mode="out-in">
                <div v-if="this.edit_mode === false">
                    <div id="title">
                        <h1>{{ this.name }}</h1>
                    </div>
                    <div id="closeButton" @click="this.$emit('closeModal')">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                        >
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                            />
                        </svg>
                    </div>

                    <div id="textShower">
                        <attribute-value-shower v-if="this.username != ''" title="Username" :value="this.username" />
                        <attribute-value-shower v-if="this.password != ''" :is_pssw="true" title="Password" :value="this.password" />
                        <attribute-value-shower v-if="this.folder != 'NO FOLDER'" title="Folder" :value="this.folder" />
                        <attribute-value-shower v-if="this.note != ''" title="Note" :value="this.note" />
                    </div>

                    <div class="actionButtonContainer">
                        <div class="ripple actionButton" @click="showConfirmationModal=true">
                            <symbol-icon icon="trash"/>
                        </div>
    
                        <div class="ripple actionButton" @click="this.edit_mode=true">
                            <symbol-icon icon="edit"/>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h1 id="title">Edit</h1>
                    <div id="closeButton" @click="this.$emit('closeModal')">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                        >
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                            />
                        </svg>
                    </div>
                    <div id="textShower">
                        <enhanced-text-input title="Name" :value="this.name" @valueUpdated="this.updatePasswordName"/>
                        <enhanced-text-input title="Username" :value="this.username" @valueUpdated="this.updatePasswordUsername"/>
                        <enhanced-text-input :is_pssw="true" title="Password" :value="this.password" @valueUpdated="this.updatePasswordPassword"/>
                        <enhanced-selector-folder title="Folder" :init_value="this.folder" @valueUpdated="this.updatePasswordFolder"/>
                        <enhanced-text-input title="Note" :value="this.note" @valueUpdated="this.updatePasswordNote"/>
                    </div>

                    <div class="starButtonContainer">
                            <div id="starContainer">
                                <star-preferred :selected_init=this.starred @valueUpdated="updateStarred" />
                            </div>
                            <button class="editButton" @click="edit()">Edit</button>
                    </div>
                </div>
            </Transition>
        </div>
        <Transition name="bounce" mode="out-in">
            <delete-confirmation-modal v-if="this.showConfirmationModal" 
            @closeModal="this.showConfirmationModal = false; resetScrolling();" val="password?" @confirmed="showConfirmationModal=false; deletePassword()"/>
        </Transition>
    </div>
</template>

<script>
import AttributeValueShower from "@/components/AttributeValueShower.vue";
import EnhancedTextInput from "@/components/EnhancedTextInput.vue";
import EnhancedSelectorFolder from "@/components/EnhancedSelectorFolder.vue";
import SymbolIcon from "@/components/SymbolIcon.vue";
import StarPreferred from '@/components/StarPreferred.vue'

import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";

import { useToast } from "vue-toastification";

import { DB_deletePassword, DB_editPassword } from "@/db";



import { store } from "@/store/store";

export default {
    name: "menuModal",
    setup() {
      const toast = useToast();
      return { toast }
    },
    components: {
        AttributeValueShower,
        SymbolIcon,
        EnhancedTextInput,
        StarPreferred,
        EnhancedSelectorFolder,
        DeleteConfirmationModal
    },
    data() {
        return {
            id: store.temp.curr_password_id,
            name: store.temp.curr_password_name,
            username: store.temp.curr_password_username,
            password: store.temp.curr_password_password,
            folder: store.temp.curr_password_folder,
            note: store.temp.curr_password_note,
            starred: store.temp.curr_password_starred,
            edit_mode: false,
            showConfirmationModal: false
        };
    },
    methods: {
        deletePassword() {
            DB_deletePassword(this.id).then((_) => {
                    this.toast.success("Password deleted!");
                    this.$emit("closeModalReload");
                }
            )
        },
        updatePasswordName(name) {
            this.name = name;
        },
        updatePasswordUsername(username) {
            this.username = username;
        },
        updatePasswordPassword(password) {
            this.password = password;
        },
        updatePasswordFolder(folder) {
            this.folder = folder;
        },
        updatePasswordNote(note) {
            this.note = note;
        },
        updateStarred(starred) {
            this.starred = starred;
        },
        edit() {
        //id, name, username, password, folder, note, starred
        DB_editPassword(this.id, this.name, this.username, this.password, this.folder,
                        this.note, this.starred).then( (res) => {
            if(res == "OK") {
                this.toast.success("Password edited!");
                this.$emit('closeModalReload');
            } else {
                this.toast.error("Something went Wrong!");
            }
        })
        },
        resetScrolling() {
            document.body.style.overflow = "";
        },
    },
    beforeMount() {
        document.body.style.overflow = "hidden";
    },
};
</script>

<style scoped>
#viewPasswordModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 60%;
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

h1 {
    font-size: 2em;
}

#closeButton {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}

#title {
    margin-top: 35px;
    border-bottom: 1px white solid;
}

#textShower {
    margin-top: 30px;
}

#editButtonContainer {
    margin-left: 60px;
    display: flex;
    justify-items: center;
    justify-content: center;
}

.editButton {
    height: 56px;
    width: 20%;
    background-color: #D9D9D90b;
    color: white;
    border: 0px;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: background 0.8s;

}
.editButton:hover {
    background-color: #d9d9d927;
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

.editButton{
    border-radius: var(--border-radius);
    border: none;
    cursor: pointer;
    width: 80%;
    height: 56px;
}

.actionButtonContainer {
    height: 60px;
    display: flex;
    justify-content: left;
    margin-top: 20px;
}

.actionButton {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.5);
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}
.actionButton:hover {
    background-color: #d9d9d927;
}

@media (max-width: 700px) {
    #viewPasswordModalContainer {
        width: 80%;
        max-height: 80%;
    }
}
</style>
