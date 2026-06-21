<script setup>
import PMTextInput from "@/components/PMTextInput.vue";
import { inject } from "vue";
import PMColorPicker from "@/components/PMColorPicker.vue";
import PMTextButton from "@/components/PMTextButton.vue";

const dialogRef = inject("dialogRef");
const folder = dialogRef?.value?.data?.folder;
</script>

<template>
  <div class="edit-folder-dialog">
    <PMTextInput
      v-model="folder.name"
      name="name"
      label="Name"
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
        @click="dialogRef.close({ edit: folder})"
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