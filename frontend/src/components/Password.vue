<script setup>
import { useToast } from "vue-toastification";
import SymbolIcon from './SymbolIcon.vue';
import { ref, watch } from "vue";
import { DECRYPT } from "@/plugins/encryption";
import { useTempStore } from "@/store/tempStore";
import PMTag from "@/components/PMTag.vue";
import PMIconButton from "@/components/PMIconButton.vue";

const props = defineProps({
  password: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['openPasswordModal']);

const toast = useToast();
const tempStore = useTempStore();

const username_saved = ref('INIT');
const password_saved = ref('INIT');

async function copyUsername() {
  navigator.clipboard.writeText(username_saved.value);
  toast.info("Copied Username to Clipboard!");
}

async function copyPassword() {
  navigator.clipboard.writeText(password_saved.value);
  toast.info("Copied to Clipboard!");
}

async function openPasswordView() {
  tempStore.setPassword(props.password);
  emit('openPasswordModal');
}

watch(() => props.password, (newVal) => {
  if (newVal) {
    username_saved.value = DECRYPT(newVal.username);
    password_saved.value = DECRYPT(newVal.enc_password);
  }
}, { deep: true });

if (props.password) {
  username_saved.value = DECRYPT(props.password.username);
  password_saved.value = DECRYPT(props.password.enc_password);
}
</script>

<template>
  <div
    class="password"
  >
    <div class="name-and-folder-container">
      <p class="password-name">
        {{ props.password.name }}
      </p>
      <template
        v-if="props.password.folder"
      >
        <PMTag
          :text="props.password.folder.name"
          :color="props.password.folder.color"
        />
      </template>
    </div>
    <div class="password-icons">
      <PMIconButton
        icon="pi pi-user"
        @click.stop="copyUsername()"
      />
      <PMIconButton
        icon="pi-key"
        @click.stop="copyPassword()"
      />
    </div>
  </div>
</template>


<style scoped>
.password {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: var(--border-radius-4);
  background-color: var(--surface-100);
  padding: var(--gap-4) calc(var(--gap-4) + 2px) var(--gap-4) var(--gap-4);
  border: 1px solid var(--surface-200);
  height: 80px;

  .name-and-folder-container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-1);

    .password-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      font-size: 1.2rem;
    }
  }

  .password-icons {
    display: flex;
    align-items: center;
    gap: var(--gap-2);

    .copy-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--gap-2);
    }

    .pi {
      font-size: 1.2rem;
    }
  }
}
</style>
  