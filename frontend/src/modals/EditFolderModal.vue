<script setup>
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTempStore } from "@/store/tempStore";
import PMColorPicker from "@/components/PMColorPicker.vue";
import API from "@/plugins/axios";

const emit = defineEmits(['closeModal']);
const toast = useToast();
const router = useRouter();

document.body.style.overflow = "hidden";

const tempStore = useTempStore();
const folder = ref(tempStore.folder);
const edit_mode = ref(false);

function valueChange() {
  edit_mode.value = true;
}

function edit() {
  API.put(`folders/${folder.value.id}`, {
    name: folder.value.name,
    color: folder.value.color,
  }).then(() => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Folder edited!",
      life: TOAST_LIFESPAN
    });
    emit('closeModal');
    router.push({ name: "home" });
  });
}
</script>

<template>
  <div id="blurredBackground">
    <div id="viewPasswordModalContainer">
      <h1 id="title">
        Edit
      </h1>
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
      <div style="width: 100%">
        <FloatLabel variant="in">
          <InputText
            id="in_label"
            v-model="folder.name"
            @change="valueChange"
          />
          <label
            style="color: var(--p-select-placeholder-color)"
            for="in_label"
          >Name</label>
        </FloatLabel>
        <div style="margin-top: 20px;">
          <PMColorPicker
            v-model="folder.color"
            label="Color"
            @update:model-value="valueChange"
          />
        </div>
      </div>
      <div
        class="starButtonContainer"
        style="display: flex; justify-content: space-between; margin-top: 20px"
      >
        <div v-if="folder.starred">
          <Button
            icon="pi pi-star"
            severity="contrast"
            rounded
            aria-label="Star"
            @click="folder.starred=false; edit_mode=true"
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

.starButtonContainer {
    margin-top: 15px;
    display: flex; 
    justify-content: space-between;
}

@media (max-width: 700px) {
    #viewPasswordModalContainer {
        width: 80%;
        max-height: 80%;
    }
}
</style>
