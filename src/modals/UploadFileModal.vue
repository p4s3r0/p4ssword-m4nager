<template>
    <div id="blurredBackground">

        <div id="modalUploadFile">
            <h2>Upload Password File</h2>
            <input type="file" @change="gotFile"/>
            <FloatLabel variant="in" style="margin-top: 5px; width: 100%;">
                <Password v-model="this.key" inputId="in_label" style="width: 100%;" toggleMask/>
                <label for="in_label">Password</label>
            </FloatLabel>
            <div id="buttonsBottom">
                    <button id="leftButton" class="ripple" @click="this.$emit('closeModal')">Close</button>
                    <button @click="uploadNewPasswords()">Upload</button>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';

import { DB_addNewPassword } from '@/db.js';
import { getCurrentUser } from '@/dexie';

export default {
name: 'uploadFile',
components: {
    TextInput,
},
data() {
    return {
        fileContent: null,
        key: "toor"
    }
}, 
methods: {
    updateValue(val) {
        this.key = val
    },
    gotFile(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    this.fileContent = JSON.parse(e.target.result);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    this.fileContent = "Error parsing JSON file.";
                }
            };
            reader.readAsText(file);
        }
    },
    async uploadNewPasswords() {
        for(let i = 0; i < this.fileContent.data.length; i++) {
            const pssw = this.fileContent.data[i];
            const user = await getCurrentUser(); 
            await DB_addNewPassword(pssw.name, pssw.password, pssw.folder, pssw.note, user.username, pssw.username, pssw.starred, this.key);
        }
    }
},  
beforeMount() {
    document.body.style.overflow = "hidden"
},
}
</script>

<style scoped>
#modalUploadFile {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #0E0E0E;
    border: 1px white solid;
    border-radius: 16px;
    width: 80%;
    max-width: 500px;
    padding: 20px;
}

#blurredBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
}

#buttonsBottom {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}

#leftButton {
    margin-right: 10px;
}

button {
    width: 150px;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: var(--background-color);
}

input {
    margin-bottom: 20px;
}

</style>