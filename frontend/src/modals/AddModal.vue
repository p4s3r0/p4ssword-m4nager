<script setup>
import { ref } from "vue";
import MenuButtonSelection from '@/components/MenuButtonSelection.vue';
import GeneratePasswordModal from './GeneratePasswordModal.vue';
import { useToast } from "vue-toastification";
import API from "@/plugins/axios";
import { useUserStore } from "@/store/userStore";
import { ENCRYPT } from "@/plugins/encryption";

document.body.style.overflow = "hidden";
const userStore = useUserStore();

const emit = defineEmits(['closeModal', 'closeModalReload']);
const toast = useToast();
const selection = ref(0);
const folder = ref(null);
const name = ref("");
const username = ref("");
const password = ref("");
const note = ref("");
const algo = ref(false);
const color = ref("black");
const starred = ref(false);
const user = ref({});
const folders = ref([]);
const showGeneratePasswordModal = ref(false);
const colors = [
  { name: "Black", code: 'black' },
  { name: "Dark Red", code: 'darkRed' },
  { name: "Red", code: 'red' },
  { name: "Dark Orange", code: 'darkOrange' },
  { name: "Light Orange", code: 'lightOrange' },
  { name: "Yellow", code: 'yellow' },
  { name: "Light Green", code: 'lightGreen' },
  { name: "Green", code: 'green' },
  { name: "Blue Green", code: 'blueGreen' },
  { name: "Blue", code: 'blue' },
  { name: "Violet", code: 'violet' }];


API.get("folders").then((response) => {
  folders.value = response.data;
});

function updateFolder(folder) {
  folder.value = folder;
}

function updateName(name) {
  name.value = name;
}

function updatePassword(password) {
  password.value = password;
}

function updateNote(note) {
  note.value = note;
}

function updateUsername(username) {
  username.value = username;
}

function updateStarred(starred) {
      starred.vaue = starred;
}

function update256(inp) {
      algo.value = inp;
}
function add() {
  if (selection.value === 1) {
    addFolder();
  } else if (selection.value === 2) {
    addPassword();
  } else {
    add2FA();
  }
}
function add2FA() {
  if(name.value === "" || note.value === "") {
    toast.error("Name and secret required!");
    return;
  }

  API.post("tfas", {
    name: name.value,
    enc_secret: ENCRYPT(note.value),
    starred: starred.value,
    algo: algo.value,
  });
}

async function addPassword() {
  if(name.value === "") {
    toast.error("Name is required!");
    return;
  }
  if (folder.value.name === undefined) {
    folder.value = {};
    folder.value.name = "NO FOLDER";
  }

  API.post("passwords", {
    password: {
      name: name.value,
      enc_password: ENCRYPT(password.value),
      folder_id: folder.value.id,
      note: note.value,
      username: username.value,
      starred: starred.value
    }
  }).then(() => {
    emit("closeModalReload");
  });
}

function addFolder() {
  if(folder.value === "") {
    return;
  }

  API.post("folders", {
    username: userStore.username,
    name: folder.value,
    color: color.value.code,
    starred: starred.value,
  }).then(() => {
    emit("closeModalReload");
  });
}
</script>

<template>
  <div id="blurredBackground">
    <div id="addModalContainer">
      <h1 id="modalTitle">
        Add
      </h1>
      <div
        id="closeButton"
        @click="$emit('closeModal')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>

      <transition mode="out-in">
        <div v-if="selection === 0">
          <menu-button-selection
            name="Folder"
            icon="folder"
            @click="selection=1"
          />
          <menu-button-selection
            name="Password"
            icon="password"
            @click="selection=2"
          />
          <menu-button-selection
            name="2FA"
            icon="2fa"
            @click="selection=3"
          />
        </div>

        <!-- FOLDER -->
        <div v-else-if="selection === 1">
          <div>
            <div style="width: 100%">
              <FloatLabel variant="in">
                <InputText
                  id="in_label"
                  v-model="folder"
                />
                <label
                  style="color: var(--p-select-placeholder-color)"
                  for="in_label"
                >Folder Name</label>
              </FloatLabel>
            </div>
            <div style="width: 100%; margin-top: 5px">
              <Select
                v-model="color"
                :options="colors"
                option-label="name"
                placeholder="Select a Color"
                class="w-full md:w-56"
              />
            </div>
            <div class="starButtonContainer">
              <div v-if="starred">
                <Button
                  icon="pi pi-star"
                  severity="contrast"
                  rounded
                  aria-label="Star"
                  @click="starred=false"
                />
              </div>
              <div v-else>
                <Button
                  icon="pi pi-star"
                  severity="contrast"
                  text
                  raised
                  rounded
                  aria-label="Star"
                  class="p-star-button-false"
                  @click="starred=true"
                />
              </div>
              <Button
                label="Save"
                icon="pi pi-save"
                icon-pos="left"
                style="background-color: white"
                @click="add()"
              />
            </div>
          </div>
        </div>

        <div v-else-if="selection === 2">
          <div style="width: 100%">
            <FloatLabel variant="in">
              <InputText
                id="in_label"
                v-model="name"
              />
              <label
                style="color: var(--p-select-placeholder-color)"
                for="in_label"
              >Password Name</label>
            </FloatLabel>
            <FloatLabel
              variant="in"
              style="margin-top: 5px;"
            >
              <InputText
                id="in_label"
                v-model="username"
              />
              <label
                style="color: var(--p-select-placeholder-color)"
                for="in_label"
              >Username</label>
            </FloatLabel>
            <div style="display: flex;margin-top: 5px;">
              <FloatLabel
                variant="in"
                style="flex-grow: 1;"
              >
                <InputText
                  id="in_label"
                  v-model="password"
                />
                <label
                  style="color: var(--p-select-placeholder-color)"
                  for="in_label"
                >Password</label>
              </FloatLabel>
              <Button
                label="Generate"
                icon="pi pi-key"
                icon-pos="left"
                style="background-color: white; margin-left: 5px;"
                @click="showGeneratePasswordModal=true"
              />
            </div>
            <Select
              v-model="folder"
              :options="folders"
              option-label="name"
              placeholder="Folder"
              class="w-full md:w-56"
              style="margin-top: 5px;"
            />
            <FloatLabel
              variant="in"
              style="margin-top: 5px;"
            >
              <InputText
                id="in_label"
                v-model="note"
              />
              <label
                style="color: var(--p-select-placeholder-color)"
                for="in_label"
              >Note</label>
            </FloatLabel>
            <div class="starButtonContainer">
              <div v-if="starred">
                <Button
                  icon="pi pi-star"
                  severity="contrast"
                  rounded
                  aria-label="Star"
                  @click="starred=false"
                />
              </div>
              <div v-else>
                <Button
                  icon="pi pi-star"
                  severity="contrast"
                  text
                  raised
                  rounded
                  aria-label="Star"
                  class="p-star-button-false"
                  @click="starred=true"
                />
              </div>
              <Button
                label="Save"
                icon="pi pi-save"
                icon-pos="left"
                style="background-color: white"
                @click="add()"
              />
            </div>
          </div>
        </div>

        <div v-else-if="selection === 3">
          <div style="width: 100%">
            <FloatLabel variant="in">
              <InputText
                id="in_label"
                v-model="name"
              />
              <label
                style="color: var(--p-select-placeholder-color)"
                for="in_label"
              >2FA Name</label>
            </FloatLabel>
          </div>
          <div style="width: 100%; margin-top: 5px;">
            <FloatLabel variant="in">
              <InputText
                id="in_label"
                v-model="note"
              />
              <label
                style="color: var(--p-select-placeholder-color)"
                for="in_label"
              >Secret</label>
            </FloatLabel>
          </div>
          <div style="display: flex; justify-content: right; margin-top: 5px;">
            <Button
              label="Save"
              icon="pi pi-save"
              icon-pos="left"
              style="background-color: white"
              @click="add()"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
  <Transition
    name="bounce"
    mode="out-in"
  >
    <generate-password-modal
      v-if="showGeneratePasswordModal"
      @close-modal="showGeneratePasswordModal = false"
    />
  </Transition>
</template>

<style scoped>
#addModalContainer {
    position: relative;
    background-color: var(--surface-0);
    border: 1px white solid;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    padding: 0 20px 20px 20px;
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

</style>