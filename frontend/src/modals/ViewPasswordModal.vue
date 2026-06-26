<script setup>
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import { ref } from "vue";
import API from "@/plugins/axios";
import { useTempStore } from "@/store/tempStore";
import { DECRYPT, ENCRYPT } from "@/plugins/encryption";

const emit = defineEmits(["closeModalReload", "closeModal"]);
const toast = useToast();
const tempStore = useTempStore();

const password = ref(tempStore.password);
password.value.password = DECRYPT(tempStore.password.enc_password);

const edit_mode = ref(false);
const showConfirmationModal = ref(false);
const folders = ref([]);

document.body.style.overflow = "hidden";

API.get("folders").then( (res) => {
  folders.value = res.data;
});

function deletePassword() {
  API.delete(`passwords/${password.value.id}`);
}

function valueChange() {
  edit_mode.value = true;
}

function edit() {
  API.put(`passwords/${password.value.id}`, {
    name: password.value.name,
    username: password.value.username,
    enc_password: ENCRYPT(password.value.password),
    folder_id: password.value.folder_id,
    note: password.value.note,
    starred: password.value.starred,
  }).then(() => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Password edited!",
      life: TOAST_LIFESPAN
    });
    emit("closeModalReload");
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
          <h1>{{ password.name }}</h1>
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
              v-model="password.username"
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
              v-model="password.password"
              input-id="in_label"
              style="width: 100%;"
              toggle-mask
              @change="valueChange"
            />
            <label for="in_label">Password</label>
          </FloatLabel>
          <Select
            v-model="password.folder_id"
            :options="folders"
            option-label="name"
            option-value="id"
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
              v-model="password.note"
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
            <div v-if="password.starred">
              <Button
                icon="pi pi-star"
                severity="contrast"
                rounded
                aria-label="Star"
                @click="password.starred=false; edit_mode=true"
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
                @click="password.starred=true; edit_mode=true"
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
    background-color: var(--surface-0);
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
