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
  <TransitionGroup
    name="list"
    tag="div"
    class="passwords-container"
  >
    <div
      v-for="password in props.passwords"
      :key="password.id"
    >
      <password
        :password="password"
        @click="openPasswordDialog(password)"
      />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.passwords-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  position: relative;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>