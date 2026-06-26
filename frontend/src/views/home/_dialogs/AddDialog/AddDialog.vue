<script setup>
import { inject, ref, watch } from "vue";
import PMSelectButton from "@/components/PMSelectButton.vue";
import AddPassword from "@/views/home/_dialogs/AddDialog/_components/AddPassword.vue";
import AddFolder from "@/views/home/_dialogs/AddDialog/_components/AddFolder.vue";
import AddTfa from "@/views/home/_dialogs/AddDialog/_components/AddTfa.vue";

const dialogRef = inject("dialogRef");
const addOptions = [
  { value: "folder", icon: "pi-folder", label: "Folder" },
  { value: "password", icon: "pi-key", label: "Password" },
  { value: "tfa", icon: "pi-ticket", label: "TFA" }
];
const addOption = ref("password");

watch(addOption, (val) => {
  const option = addOptions.find((opt) => opt.value === val);
  dialogRef.value.options.props.header = `Add ${option.label}`;
}, { immediate: true });
</script>

<template>
  <div class="add-dialog">
    <div class="select-buttons">
      <PMSelectButton
        v-model="addOption"
        :options="addOptions"
      />
    </div>
    <div class="add-container">
      <Transition
        name="fade"
        mode="out-in"
      >
        <AddPassword
          v-if="addOption === 'password'"
          @close-reload="dialogRef?.close({ reload: true })"
        />
        <AddFolder
          v-else-if="addOption === 'folder'"
          @close-reload="dialogRef?.close({ reload: true })"
        />
        <AddTfa
          v-else-if="addOption === 'tfa'"
          @close-reload="dialogRef?.close({ reload: true })"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.add-dialog {
  color: var(--surface-900);

  .select-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: var(--gap-7);
  }
}
</style>