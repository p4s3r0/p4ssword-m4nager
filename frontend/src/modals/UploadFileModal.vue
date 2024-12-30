<template>
    <div id="blurredBackground">

        <div id="modalUploadFile">
            <h2>Upload Password File</h2>
            <input type="file" @change="gotFile"/>
            <FloatLabel variant="in" style="margin-top: 5px; width: 100%;">
                <Password v-model="this.key" inputId="in_label" style="width: 100%;" toggleMask/>
                <label for="in_label">Encrypt with this Password</label>
            </FloatLabel>
            <div id="buttonsBottom">
                <Button id="leftButton" label="Close" icon="pi pi-times" iconPos="left" @click="this.$emit('closeModal')"/>
                <Button label="Upload" icon="pi pi-upload" iconPos="left" @click="uploadData()"/>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';
import TwoFA from '@/components/TwoFA.vue';

import { DB_add2FA, DB_addNewFolder, DB_addNewPassword } from '@/db.js';
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
        console.log("hi")
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    console.log("hi")
                    this.fileContent = JSON.parse(e.target.result);
                    console.log("hi", this.fileContent.folders[0].folder)

                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    this.fileContent = "Error parsing JSON file.";
                }
            };
            reader.readAsText(file);
        }
    },
    async uploadData() {
        // Passwords
        for(let i = 0; i < this.fileContent.passwords.length; i++) {
            const pssw = this.fileContent.passwords[i];
            await DB_addNewPassword(pssw.name, pssw.password, pssw.folder, pssw.note, pssw.username, pssw.starred, this.key);
        }
        //Folders
        for(let i = 0; i < this.fileContent.folders.length; i++) {
            const fold = this.fileContent.folders[i];
            await DB_addNewFolder("", fold.folder, fold.color, fold.starred);
        }
        // 2FA
        for(let i = 0; i < this.fileContent.twoFAs.length; i++) {
            const twoFAs = this.fileContent.twoFAs[i];
            const user = await getCurrentUser();
            await DB_add2FA(twoFAs.name, twoFAs.secret, this.key);
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