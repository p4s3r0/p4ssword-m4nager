<script setup>
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";
import { useToast } from "vue-toastification";
import { DB_deletePassword, DB_editPassword } from "@/db";
import { store } from "@/store/store";
import { ref } from "vue";

const emit = defineEmits(["closeModalReload", "closeModal"]);
const toast = useToast();
const id = ref(store.temp.curr_password_id);
const name = ref(store.temp.curr_password_name);
const username = ref(store.temp.curr_password_username);
const password = ref(store.temp.curr_password_password);
const folder = ref(store.temp.curr_password_folder);
const note = ref(store.temp.curr_password_note);
const starred = ref(store.temp.curr_password_starred);
const edit_mode = ref(false);
const showConfirmationModal = ref(false);
const folders = ref([]);
const static_folder = ref(store.temp.curr_password_folder);

document.body.style.overflow = "hidden";
function deletePassword() {
  DB_deletePassword(id.value).then((res) => {
      if (res === 0) {
        toast.success("Password deleted!");
        emit("closeModalReload");
      } else if (res === -1) {
        toast.error("Invalid Parameters!");
      } else if (res === -2) {
        toast.error("Not authorized, API key invalid!");
      } else if (res === -3) {
        toast.error("Internal API Error!");
      } else {
        toast.error("API Error!");
      }
    }
  );
}

function updateStarred(starred) {
  starred.value = starred;
}
function valueChange() {
  edit_mode.value = true;
}

function edit() {
  let curr_folder;
  if (folder.value.name === undefined) {
    curr_folder = folder.value;
  } else {
    curr_folder = folder.value.name;
  }
  DB_editPassword(id.value, name.value, username.value, password.value, curr_folder,
    note.value, starred.value).then( (res) => {
    if(res === 0) {
      toast.success("Password edited!");
      emit('closeModalReload');
    } else if (res === -1) {
      toast.error("Invalid Parameters!");
    } else if (res === -2) {
      toast.error("Not authorized, API key invalid!");
    } else if (res === -3) {
      toast.error("Internal API Error!");
    } else {
      toast.error("API Error!");
    }
  });
}

function resetScrolling() {
  document.body.style.overflow = "";
}
</script>

<template>
  <div id="blurredBackground">
    <div id="viewPasswordModalContainer">
      <div>
        <div id="title">
          <h1>{{ name }}</h1>
        </div>
        <div
          id="closeButton"
          @click="emit('closeModal')"
        >
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
          <FloatLabel variant="in">
            <InputText
              id="in_label"
              v-model="username"
              @change="valueChange"
            />
            <label
              style="color: var(--p-select-placeholder-color)"
              for="in_label"
            >Username</label>
          </FloatLabel>
          <FloatLabel
            variant="in"
            style="margin-top: 5px; width: 100%;"
          >
            <Password
              v-model="password"
              input-id="in_label"
              style="width: 100%;"
              toggle-mask
              @change="valueChange"
            />
            <label for="in_label">Password</label>
          </FloatLabel>
          <Select
            v-model="folder"
            :options="folders"
            option-label="name"
            :placeholder="static_folder"
            class="w-full md:w-56"
            style="margin-top: 5px;"
            @change="valueChange"
          />
          <FloatLabel
            variant="in"
            style="margin-top: 5px;"
          >
            <InputText
              id="in_label"
              v-model="note"
              @change="valueChange"
            />
            <label
              style="color: var(--p-select-placeholder-color)"
              for="in_label"
            >Note</label>
          </FloatLabel>
          <div
            class="starButtonContainer"
            style="display: flex; justify-content: space-between; margin-top: 20px"
          >
            <div v-if="starred">
              <Button
                icon="pi pi-star"
                severity="contrast"
                rounded
                aria-label="Star"
                @click="starred=false; edit_mode=true"
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
                @click="starred=true; edit_mode=true"
              />
            </div>
            <Button
              label="Delete"
              icon="pi pi-trash"
              icon-pos="left"
              severity="danger"
              @click="showConfirmationModal=true"
            />
            <Button
              label="Edit"
              icon="pi pi-pencil"
              icon-pos="left"
              style="background-color: white"
              :disabled="!edit_mode"
              @click="edit()"
            />
          </div>
        </div>
      </div>
    </div>
    <Transition
      name="bounce"
      mode="out-in"
    >
      <delete-confirmation-modal
        v-if="showConfirmationModal"
        val="password?"
        @close-modal="showConfirmationModal = false; resetScrolling();"
        @confirmed="showConfirmationModal=false; deletePassword()"
      />
    </Transition>
  </div>
</template>

<style scoped>
#viewPasswordModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 60%;
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

.starButtonContainer {
    margin-top: 15px;
    display: flex; 
    justify-content: space-between;
}

@media (max-width: 700px) {
    #viewPasswordModalContainer {
        width: 90%;
        max-height: 80%;
    }
}
</style>
