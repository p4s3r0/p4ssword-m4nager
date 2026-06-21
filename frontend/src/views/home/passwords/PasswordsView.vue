<script setup>
import Password from "@/components/Password.vue";
import { useDialog } from "primevue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";
import PasswordDialog from "@/views/home/passwords/_dialogs/PasswordDialog.vue";

const props = defineProps({
  passwords: {
    type: Array,
    default: () => []
  }
});

const dialog = useDialog();

const emit = defineEmits(["reload"]);

function openPasswordDialog(password) {
  dialog.open(PasswordDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Password"
    },
    data: {
      password: password
    },
    onClose: (opt) => {
      if (opt?.data?.reload) {
        emit("reload");
      }
    }
  });
}
</script>

<template>
  <div class="passwords-container">
    <div
      v-for="password in props.passwords"
      :key="password.key"
    >
      <password
        :password="password"
        @click="openPasswordDialog(password)"
      />
    </div>
  </div>
</template>

<style scoped>
.passwords-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}
</style>