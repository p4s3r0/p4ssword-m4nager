<script setup>
import { ref } from "vue";
import PMTextInput from "@/components/PMTextInput.vue";
import PMPasswordInput from "@/components/PMPasswordInput.vue";
import PMIconButton from "@/components/PMIconButton.vue";
import PMSelect from "@/components/PMSelect.vue";
import API from "@/plugins/axios";
import PMTextArea from "@/components/PMTextArea.vue";
import PMToggleButton from "@/components/PMToggleButton.vue";
import PMTextButton from "@/components/PMTextButton.vue";
import { ENCRYPT } from "@/plugins/encryption";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import { useDialog } from "primevue";
import GeneratePasswordDialog from "@/views/home/_dialogs/AddDialog/GeneratePasswordDialog.vue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";

const toast = useToast();

const folders = ref([]);
const password = ref({});
const dialog = useDialog();
const submitted = ref(false);

const emit = defineEmits(["close-reload"]);

API.get("folders").then((response) => {
  folders.value = response.data;
});

function addPassword() {
  submitted.value = true;
  if (!password.value.name) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Name is required",
      life: TOAST_LIFESPAN
    });
    return;
  }

  API.post("passwords", {
    password: {
      name: password.value.name,
      folder_id: password.value.folder,
      enc_password: ENCRYPT(password.value.password),
      enc_username: ENCRYPT(password.value.username),
      enc_note: ENCRYPT(password.value.notes),
      starred: password.value.starred,
    }
  }).then(() => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Password added!",
      life: TOAST_LIFESPAN
    });
    emit("close-reload");
  });
}

function generatePassword() {
  dialog.open(GeneratePasswordDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Generate Password"
    },
    onClose: (data) => {
      if (data?.data?.password) {
        password.value.password = data.data.password;
      }
    }
  });
}
</script>

<template>
  <div class="add-password">
    <PMTextInput
      v-model="password.name"
      name="name"
      label="Name"
      required
      :submitted="submitted"
    />
    <PMTextInput
      v-model="password.username"
      name="username"
      label="Username"
    />
    <div class="password-container">
      <PMPasswordInput
        v-model="password.password"
        name="password"
        label="Password"
        class="password"
      />
      <PMIconButton
        icon="pi-cog pi-spin"
        class="generate"
        @click="generatePassword()"
      />
    </div>
    <PMSelect
      v-model="password.folder"
      :options="folders"
      option-label="name"
      option-value="id"
      placeholder="Folder"
      label="Folder"
    />

    <PMTextArea
      v-model="password.notes"
      label="Notes"
      name="notes"
    />

    <div class="footer">
      <PMToggleButton
        v-model="password.starred"
        icon="pi-star"
      />

      <PMTextButton
        text="Save"
        @click="addPassword"
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
      min-width: 50px;
      max-width: 50px;
      width: 50px;
      height: 50px;
      min-height: 50px;
      max-height: 50px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>