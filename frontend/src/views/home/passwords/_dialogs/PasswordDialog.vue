<script setup>
import { computed, inject, ref } from "vue";
import PMTextInput from "@/components/PMTextInput.vue";
import PMPasswordInput from "@/components/PMPasswordInput.vue";
import { DECRYPT, ENCRYPT } from "@/plugins/encryption";
import PMSelect from "@/components/PMSelect.vue";
import API from "@/plugins/axios";
import PMTextArea from "@/components/PMTextArea.vue";
import PMIconButton from "@/components/PMIconButton.vue";
import PMToggleButton from "@/components/PMToggleButton.vue";
import PMTextButton from "@/components/PMTextButton.vue";
import { useDialog } from "primevue";
import DeleteConfirmationDialog from "@/dialogs/DeleteConfirmationDialog.vue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";
import { useToast } from "vue-toastification";

const dialogRef = inject("dialogRef");
const toast = useToast();
const dialog = useDialog();

const initialPassword = { ...dialogRef?.value?.data?.password };
initialPassword.password = DECRYPT(initialPassword.enc_password);
initialPassword.folder_id = initialPassword?.folder?.id;

const password = ref({ ...initialPassword });
const folders = ref([]);
const submitted = ref(false);

API.get("folders").then((response) => {
  folders.value = response.data;
});

const isChanged = computed(() => {
  return (
    password.value.name !== initialPassword.name ||
    password.value.username !== initialPassword.username ||
    password.value.password !== initialPassword.password ||
    password.value.folder_id !== initialPassword.folder_id ||
    password.value.note !== initialPassword.note ||
    password.value.starred !== initialPassword.starred
  );
});

function updatePassword() {
  submitted.value = true;
  if (!password.value.name) {
    toast.error("Name is required");
    return;
  }

  API.put(`passwords/${password.value.id}`, {
    password: {
      name: password.value.name,
      username: password.value.username,
      enc_password: ENCRYPT(password.value.password),
      folder_id: password.value.folder_id,
      note: password.value.note,
      starred: password.value.starred,
    },
  }).then(() => {
    toast.success("Password updated!");
    dialogRef.value.close({ reload: true });
  });
}

function deletePassword() {
  dialog.open(DeleteConfirmationDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Delete Password",
    },
    data: {
      description: `Are you sure you want to delete ${password.value.name}?`,
    },
    onClose: (opt) => {
      if (opt?.data?.confirmed) {
        API.delete(`passwords/${password.value.id}`).then(() => {
          toast.success("Password deleted!");
          dialogRef.value.close({ reload: true });
        });
      }
    },
  });
}
</script>

<template>
  <div class="password-dialog">
    <PMTextInput
      v-model="password.name"
      label="Name"
      name="name"
      :required="submitted"
    />

    <PMTextInput
      v-model="password.username"
      label="Username"
      name="username"
    />

    <PMPasswordInput
      v-model="password.password"
      label="Password"
      name="password"
    />

    <PMSelect
      v-model="password.folder_id"
      :options="folders"
      option-label="name"
      option-value="id"
      placeholder="Folder"
    />

    <PMTextArea
      v-model="password.note"
      label="Notes"
      name="notes"
    />

    <div class="footer">
      <PMIconButton
        icon="pi-trash"
        severity="delete"
        @click="deletePassword"
      />

      <PMTextButton
        v-if="isChanged"
        text="Edit"
        @click="updatePassword"
      />
      <span v-else />

      <PMToggleButton
        v-model="password.starred"
      />
    </div>
  </div>
</template>

<style scoped>
.password-dialog {
  color: var(--surface-900);
  padding-top: var(--gap-2);
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--gap-2);
  }
}
</style>