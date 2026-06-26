<script setup>
import { ref } from "vue";
import PMTextInput from "@/components/PMTextInput.vue";
import PMColorPicker from "@/components/PMColorPicker.vue";
import API from "@/plugins/axios";
import PMToggleButton from "@/components/PMToggleButton.vue";
import PMTextButton from "@/components/PMTextButton.vue";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";

const toast = useToast();

const folder = ref({ color: "#000000" });
const submitted = ref(false);

const emit = defineEmits(["close-reload"]);

function addFolder() {
  submitted.value = true;
  if (!folder.value.name) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Name is required",
      life: TOAST_LIFESPAN
    });
    return;
  }

  API.post("folders", {
    folder: {
      name: folder.value.name,
      color: folder.value.color,
      starred: folder.value.starred,
    }
  }).then(() => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Folder added!",
      life: TOAST_LIFESPAN
    });
    emit("close-reload");
  });
}
</script>

<template>
  <div class="add-password">
    <PMTextInput
      v-model="folder.name"
      name="name"
      label="Name"
      :required="submitted"
    />

    <PMColorPicker
      v-model="folder.color"
      label="Color"
    />


    <div class="footer">
      <PMToggleButton
        v-model="folder.starred"
        icon="pi-star"
      />

      <PMTextButton
        text="Save"
        @click="addFolder"
      />
    </div>
  </div>
</template>

<style scoped>
.add-password {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);

  .password-container {
    display: flex;
    gap: var(--gap-3);

    .password {
      width: 100%;
    }

    .generate {
      width: 50px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>