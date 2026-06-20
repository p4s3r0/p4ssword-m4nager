<script setup>
import { ref } from "vue";
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";
import { useToast } from "vue-toastification";
import { useTempStore } from "@/store/tempStore";
import { DECRYPT, ENCRYPT } from "@/plugins/encryption";
import API from "@/plugins/axios";

const toast = useToast();
const emit = defineEmits(["closeModalReload", "closeModal"]);

document.body.style.overflow = "hidden";

const tempStore = useTempStore();

const tfa = ref(tempStore.tfa);
tfa.value.secret = DECRYPT(tfa.value.enc_secret);

const edit_mode = ref(false);
const showConfirmationModal = ref(false);

function delete2FA() {
  API.delete(`tfas/${tempStore.tfa.id}`).then(() => {
    toast.success("2FA deleted!");
    emit("closeModalReload");
  });
}
function valueChange() {
  edit_mode.value = true;
}

function edit() {
  API.put(`tfas/${tempStore.tfa.id}`, {
    name: tfa.value.name,
    enc_secret: ENCRYPT(tfa.value.secret),
  }).then(() => {
    toast.success("2FA edited!");
    emit("closeModalReload");
  });
}
</script>

<template>
  <div id="blurredBackground">
    <div id="viewTwoFAModalContainer">
      <div>
        <div id="title">
          <h1>{{ tfa.name }}</h1>
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
              v-model="tfa.secret"
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

#title {
    margin-top: 35px;
    border-bottom: 1px white solid;
}

#textShower {
    margin-top: 30px;
}
</style>
