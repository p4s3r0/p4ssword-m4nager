<script setup>
import { computed, inject, ref } from "vue";
import PMTextInput from "@/components/PMTextInput.vue";
import { DECRYPT, ENCRYPT } from "@/plugins/encryption";
import PMIconButton from "@/components/PMIconButton.vue";
import PMTextButton from "@/components/PMTextButton.vue";
import API from "@/plugins/axios";
import { useDialog } from "primevue";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import DeleteConfirmationDialog from "@/dialogs/DeleteConfirmationDialog.vue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";

const dialogRef = inject("dialogRef");
const dialog = useDialog();
const toast = useToast();

const initialTfa = { ...dialogRef?.value?.data?.tfa };
initialTfa.secret = initialTfa.enc_secret ? DECRYPT(initialTfa.enc_secret) : "";

const tfa = ref({ ...initialTfa });
const submitted = ref(false);

const isChanged = computed(() => {
  return (
    tfa.value.name !== initialTfa.name ||
    tfa.value.secret !== initialTfa.secret
  );
});

function updateTfa() {
  submitted.value = true;
  if (!tfa.value.name) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Name is required",
      life: TOAST_LIFESPAN
    });
    return;
  }

  API.put(`tfas/${tfa.value.id}`, {
    tfa: {
      name: tfa.value.name,
      enc_secret: ENCRYPT(tfa.value.secret),
    },
  }).then(() => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "TFA updated!",
      life: TOAST_LIFESPAN
    });
    dialogRef.value.close({ reload: true });
  });
}

function deleteTfa() {
  dialog.open(DeleteConfirmationDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Delete TFA",
    },
    data: {
      description: `Are you sure you want to delete ${tfa.value.name}?`,
    },
    onClose: (opt) => {
      if (opt?.data?.confirmed) {
        API.delete(`tfas/${tfa.value.id}`).then(() => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "TFA deleted!",
            life: TOAST_LIFESPAN
          });
          dialogRef.value.close({ reload: true });
        });
      }
    },
  });
}
</script>

<template>
  <div class="tfa-dialog">
    <PMTextInput
      v-model="tfa.name"
      label="Name"
      name="name"
      required
      :submitted="submitted"
    />
    <PMTextInput
      v-model="tfa.secret"
      label="Secret"
      name="secret"
    />

    <div class="footer">
      <PMIconButton
        icon="pi-trash"
        severity="delete"
        @click="deleteTfa"
      />

      <PMTextButton
        v-if="isChanged"
        text="Edit"
        @click="updateTfa"
      />
    </div>
  </div>
</template>

<style scoped>
.tfa-dialog {
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