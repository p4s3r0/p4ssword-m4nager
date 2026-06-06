<script setup>
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";
import { store } from "@/store/store";
import { DB_delete2FA, DB_edit2FA } from "@/db";
import { useToast } from "vue-toastification";

const toast = useToast();
const emit = defineEmits(["closeModalReload", "closeModal"]);

document.body.style.overflow = "hidden";

const name = ref(store.temp.curr_2fa_name);
const secret = ref(store.temp.curr_2fa_secret);
const edit_mode = ref(false);
const showConfirmationModal = ref(false);
function delete2FA() {
  DB_delete2FA(store.temp.curr_2fa_id).then((res) => {
    if (res === 0) {
      toast.success("2FA deleted!");
      emit("closeModalReload");
    } else if (res === -1) {
      toast.error("Invalid Parameters!");
    } else if (res === -2) {
      toast.error("Not authorized, invalid API key!");
    } else if (res === -3) {
      toast.error("Internal API Error!");
    } else {
      toast.error("API Error!");
    }
  });
}
function update2FAName(name) {
  name.value = name;
}

function update2FASecret(secret) {
  secret.value = secret;
}

function valueChange() {
      edit_mode.value = true;
}

function edit() {
  DB_edit2FA(store.temp.curr_2fa_id, name.value, secret.value).then( (res) => {
    if (res === 0) {
      toast.success("2FA edited!");
      emit("closeModalReload");
    } else if (res === -1) {
      toast.error("Invalid Parameters!");
    } else if (res === -2) {
      toast.error("Not authorized, invalid API key!");
    } else if (res === -3) {
      toast.error("Internal API Error!");
    } else {
      toast.error("API Error!");
    }
  });
}
</script>

<template>
  <div id="blurredBackground">
    <div id="viewTwoFAModalContainer">
      <div>
        <div id="title">
          <h1>{{ name }}</h1>
        </div>
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
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
        </div>

        <div id="textShower">
          <FloatLabel variant="in">
            <InputText
              id="in_label"
              v-model="secret"
              @change="valueChange"
            />
            <label
              style="color: var(--p-select-placeholder-color)"
              for="in_label"
            >Secret</label>
          </FloatLabel>
          <div style="margin-top: 10px; display: flex; justify-content: space-between;">
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
        val="2FA?"
        @close-modal="showConfirmationModal = false;"
        @confirmed="showConfirmationModal=false; delete2FA()"
      />
    </Transition>
  </div>
</template>

<style scoped>
#viewTwoFAModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 80%;
    max-width: 500px;
    padding: 20px;
    padding-top: 0;
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

@media (max-width: 700px) {
    #viewPasswordModalContainer {
        width: 90%;
        max-height: 80%;
    }
}
</style>
