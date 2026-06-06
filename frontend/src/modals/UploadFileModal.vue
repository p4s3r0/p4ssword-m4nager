<script setup>
import { ref } from "vue";
import { DB_add2FA, DB_addNewFolder, DB_addNewPassword } from "@/db";

const emit = defineEmits(['closeModal']);

const fileContent = ref(null);
const key = ref("toor");
document.body.style.overflow = "hidden";

function updateValue(val) {
  key.value = val;
}

function gotFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        fileContent.value = JSON.parse(e.target.result);
      } catch (error) {
        fileContent.value = "Error parsing JSON file.";
      }
    };
    reader.readAsText(file);
  }
}


async function uploadData() {
  // Passwords
  for(let i = 0; i < fileContent.value.passwords.length; i++) {
    const pssw = fileContent.value.passwords[i];
    await DB_addNewPassword(pssw.name, pssw.password, pssw.folder, pssw.note, pssw.username, pssw.starred, key.value);
  }
  //Folders
  for(let i = 0; i < fileContent.value.folders.length; i++) {
    const fold = fileContent.value.folders[i];
    await DB_addNewFolder("", fold.folder, fold.color, fold.starred);
  }
  // 2FA
  for(let i = 0; i < fileContent.value.twoFAs.length; i++) {
    const twoFAs = fileContent.value.twoFAs[i];
    await DB_add2FA(twoFAs.name, twoFAs.secret, key.value);
  }
}
</script>

<template>
  <div id="blurredBackground">
    <div id="modalUploadFile">
      <h2>Upload Password File</h2>
      <input
        type="file"
        @change="gotFile"
      >
      <FloatLabel
        variant="in"
        style="margin-top: 5px; width: 100%;"
      >
        <Password
          v-model="key"
          input-id="in_label"
          style="width: 100%;"
          toggle-mask
        />
        <label for="in_label">Encrypt with this Password</label>
      </FloatLabel>
      <div id="buttonsBottom">
        <Button
          id="leftButton"
          label="Close"
          icon="pi pi-times"
          icon-pos="left"
          @click="emit('closeModal')"
        />
        <Button
          label="Upload"
          icon="pi pi-upload"
          icon-pos="left"
          @click="uploadData()"
        />
      </div>
    </div>
  </div>
</template>

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