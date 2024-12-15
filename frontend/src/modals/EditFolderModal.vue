<template>
    <div id="blurredBackground">
        <div id="viewPasswordModalContainer">
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
            <div style="width: 100%">
                <FloatLabel variant="in">
                    <InputText id="in_label" v-model="this.name" @change="valueChange"/>
                    <label style="color: var(--p-select-placeholder-color)" for="in_label">Name</label>
                </FloatLabel>
                <Select v-model="this.color" :options="colors" optionLabel="name" :placeholder="this.color" class="w-full md:w-56" style="margin-top: 5px;" @change="valueChange"/>
            </div>
            <div class="starButtonContainer" style="display: flex; justify-content: space-between; margin-top: 20px">
                <div v-if="this.starred==true">
                    <Button icon="pi pi-star" severity="contrast" rounded aria-label="Star" @click="this.starred=false; this.edit_mode=true" />
                </div>
                <div v-else>
                    <Button icon="pi pi-star" severity="contrast" text raised rounded aria-label="Star" @click="this.starred=true; this.edit_mode=true" class="p-star-button-false"/>
                </div>
                <Button label="Edit" icon="pi pi-pencil" iconPos="left" style="background-color: white" @click="edit()" :disabled="!this.edit_mode"/>
            </div>
        </div>
    </div>
</template>

<script>
import EnhancedTextInput from "@/components/EnhancedTextInput.vue";
import SymbolIcon from "@/components/SymbolIcon.vue";
import StarPreferred from '@/components/StarPreferred.vue'
import EnhancedSelector from '@/components/EnhancedSelector.vue' 

import { useToast } from "vue-toastification";

import { DB_editFolder } from "@/db";



import { store } from "@/store/store";

export default {
    name: "menuModal",
    setup() {
      const toast = useToast();
      return { toast }
    },
    components: {
        SymbolIcon,
        EnhancedTextInput,
        StarPreferred,
        EnhancedSelector
    },
    data() {
        return {
            id: store.temp.curr_folder_id,
            name: store.temp.curr_folder_name,
            color: store.temp.curr_folder_color,
            starred: store.temp.curr_folder_starred,
            edit_mode: false,
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
        };
    },
    methods: {
        updateFolderName(name) {
            this.name = name;
        },
        updateFolderColor(color) {
            this.color = color;
        },
        valueChange() {
            this.edit_mode = true;
        },
        edit() {
            let curr_color = this.color
            if (this.color.code == undefined) {
                curr_color = this.color
            } else {
                curr_color = this.color.code
            }
            DB_editFolder(this.id, this.name, this.starred, curr_color).then( (res) => {
                if(res == "OK") {
                    this.toast.success("Folder edited!");
                    this.$emit('closeModal');
                    this.$router.push("/home")
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

.deleteButton {
    position: absolute;
    margin-top: 10px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.5);
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.deleteButton:hover {
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
    width: 100%;
    height: 56px;
}

@media (max-width: 700px) {
    #viewPasswordModalContainer {
        width: 80%;
        max-height: 80%;
    }
}
</style>
