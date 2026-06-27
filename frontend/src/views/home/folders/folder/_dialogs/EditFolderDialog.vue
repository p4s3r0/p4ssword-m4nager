<script setup>
import PMTextInput from "@/components/PMTextInput.vue";
import { inject, ref } from "vue";
import PMColorPicker from "@/components/PMColorPicker.vue";
import PMTextButton from "@/components/PMTextButton.vue";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import API from "@/plugins/axios";

const dialogRef = inject("dialogRef");
const toast = useToast();
const folder = ref({ ...dialogRef?.value?.data?.folder });
const submitted = ref(false);

function confirm() {
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

  API.put(`folders/${folder.value.id}`, { folder: folder.value }).then(() => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Folder updated successfully",
      life: TOAST_LIFESPAN
    });
    dialogRef.value.close({ reload: true });
  }).catch(() => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "An error occurred while updating the folder",
      life: TOAST_LIFESPAN
    });
  });
}
</script>

<template>
  <div class="edit-folder-dialog">
    <PMTextInput
      v-model="folder.name"
      name="name"
      label="Name"
      required
      :submitted="submitted"
    />

    <PMColorPicker
      v-model="folder.color"
      label="Color"
    />

    <div class="footer">
      <PMTextButton
        text="Cancel"
        severity="secondary"
        @click="dialogRef.close()"
      />

      <PMTextButton
        text="Confirm"
        @click="confirm"
      />
    </div>
  </div>
</template>

<style scoped>
.edit-folder-dialog {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
  padding-top: var(--gap-3);
  color: var(--surface-900);

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--gap-2);
  }
}
</style>