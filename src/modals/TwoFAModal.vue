<template>
    <div id="blurredBackground">
        <div id="viewTwoFAModalContainer">
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
                        <attribute-value-shower v-if="this.secret != ''" title="Secret" :value="this.secret" />
                    </div>
                    <div class="actionButtonContainer">
                        <div class="ripple actionButton" @click="this.showConfirmationModal=true;">
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
                        <enhanced-text-input title="Name" :value="this.name" @valueUpdated="this.update2FAName"/>
                        <enhanced-text-input title="Secret" :value="this.secret" @valueUpdated="this.update2FASecret"/>
                    </div>
                    <div class="starButtonContainer">
                            <button class="editButton" @click="edit()">Edit</button>
                    </div>
                </div>
            </Transition>

        </div>

        <Transition name="bounce" mode="out-in">
            <delete-confirmation-modal v-if="this.showConfirmationModal" 
            @closeModal="this.showConfirmationModal = false;" val="2FA?" @confirmed="showConfirmationModal=false; delete2FA()"/>
        </Transition>
    </div>
</template>

<script>
import AttributeValueShower from "@/components/AttributeValueShower.vue";
import SymbolIcon from "@/components/SymbolIcon.vue";
import EnhancedTextInput from "@/components/EnhancedTextInput.vue";
import StarPreferred from "@/components/StarPreferred.vue";
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";

import { store } from "@/store/store";
import { DB_delete2FA, DB_edit2FA } from "@/db";

import { useToast } from "vue-toastification";

export default {
    name: "twoFaModal",
    setup() {
        const toast = useToast();
        return { toast }
    },
    components: {
        AttributeValueShower,
        SymbolIcon,
        EnhancedTextInput,
        StarPreferred,
        DeleteConfirmationModal
    },
    data() {
        return {
            name: store.temp.curr_2fa_name,
            secret: store.temp.curr_2fa_secret,
            edit_mode: false,
            showConfirmationModal: false
        };
    },
    methods: {
        delete2FA() {
            DB_delete2FA(store.temp.curr_2fa_id).then((_) => {
                this.toast.success("2FA deleted!");
                this.$emit("closeModalReload");
            })
        },
        update2FAName(name) {
            this.name = name;
        },
        update2FASecret(secret) {
            this.secret = secret;
        },
        edit() {
        DB_edit2FA(store.temp.curr_2fa_id, this.name, this.secret).then( (res) => {
            if (res) {
                this.toast.success("2FA edited!");
                this.$emit("closeModalReload")
            } else {
                this.toast.error("Something went Wrong!");
            }
        })
    }
    },
    beforeMount() {
        document.body.style.overflow = "hidden";
    },
};
</script>

<style scoped>
#viewTwoFAModalContainer {
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

#title {
    margin-top: 35px;
    border-bottom: 1px white solid;
}

#textShower {
    margin-top: 30px;
}

#editButtonContainer {
    display: flex;
    justify-items: center;
    justify-content: center;
}

.editButton {
    height: 56px;
    width: 60%;
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
    justify-content: center;
}

#starContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}


.actionButtonContainer {
    height: 60px;
    display: flex;
    justify-content: right;
    margin-top: 20px;
    margin-right: 10px;
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
