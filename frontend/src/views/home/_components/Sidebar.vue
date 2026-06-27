<script setup>
import { useRoute, useRouter } from 'vue-router';
import PMIconButton from "@/components/PMIconButton.vue";
import { useUserStore } from "@/store/userStore";
import { useDialog } from "primevue";
import AddDialog from "@/views/home/_dialogs/AddDialog/AddDialog.vue";
import ProfileDialog from "@/views/home/_dialogs/ProfileDialog.vue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(["update:modelValue", "reload"]);
const dialog = useDialog();
const router = useRouter();
const userStore = useUserStore();

const options = [
  { value: 'home.passwords', icon: 'pi-key', label: 'Passwords' },
  { value: 'home.folders', icon: 'pi-folder', label: 'Folders' },
  { value: 'home.tfas', icon: 'pi-ticket', label: '2FA' }
];

function onOptionChange(value) {
  emit('update:modelValue', value);
  router.push({ name: value });
}

function showAddDialog() {
  dialog.open(AddDialog, {
    props: DIALOG_DEFAULT_PROPS,
    onClose: (data) => {
      if (data?.data?.reload) {
        emit("reload");
      }
    }
  });
}

function openProfileDialog() {
  dialog.open(ProfileDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Profile"
    }
  });
}
</script>

<template>
  <div class="sidebar">
    <div class="logo-container">
      <img
        src="/img/icons/android-chrome-192x192.png"
        alt="Logo"
        class="logo"
      >
      <h2 class="app-name">
        P4ssword M4nager
      </h2>
    </div>

    <div class="nav-items">
      <div 
        v-for="option in options" 
        :key="option.value"
        class="nav-item"
        :class="{ active: modelValue === option.value }"
        @click="onOptionChange(option.value)"
      >
        <i :class="['pi', option.icon]" />
        <span>{{ option.label }}</span>
      </div>
    </div>

    <div class="actions">
      <button
        class="add-button"
        @click="showAddDialog"
      >
        <i class="pi pi-plus" />
        <span>Add New</span>
      </button>
    </div>

    <div class="spacer" />

    <div
      class="profile-section"
      @click="openProfileDialog"
    >
      <div class="avatar">
        {{ userStore.username.charAt(0).toUpperCase() }}
      </div>
      <div class="user-info">
        <span class="username">{{ userStore.username }}</span>
        <span class="status">Online</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  background: var(--surface-100);
  border-right: 1px solid var(--surface-200);
  padding: var(--gap-6) var(--gap-4) var(--gap-4) var(--gap-4);
  position: sticky;
  top: 0;
  box-shadow: 4px 0 10px rgba(0,0,0,0.02);
  z-index: 100;
}

.dark .sidebar {
  background: #1a1a1a;
  box-shadow: 4px 0 10px rgba(0,0,0,0.2);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
  margin-bottom: var(--gap-10);
  padding: 0 var(--gap-2);
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: var(--gap-2);
  border: 1px solid var(--surface-200);
}

.app-name {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  color: var(--surface-900);
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--gap-4);
  padding: var(--gap-3) var(--gap-4);
  border-radius: var(--border-radius-3);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--surface-700);
}

.nav-item:hover {
  background-color: var(--surface-200);
  color: var(--surface-900);
}

.nav-item.active {
  background-color: var(--surface-900);
  color: var(--surface-0);
}

.nav-item i {
  font-size: 1.2rem;
}

.nav-item span {
  font-weight: 500;
}

.actions {
  margin-top: var(--gap-6);
  padding: 0 var(--gap-2);
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-2);
  width: 100%;
  padding: var(--gap-3);
  border-radius: var(--border-radius-3);
  background: var(--surface-900);
  color: var(--surface-0);
  border: 1px solid var(--surface-900);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: var(--surface-700);
  border-color: var(--surface-700);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.spacer {
  flex: 1;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
  padding: var(--gap-3);
  border-radius: var(--border-radius-3);
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: 1px dashed var(--surface-700);

  &:hover {
    background-color: var(--surface-0);
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--surface-300);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--surface-900);
}

.user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.username {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--surface-900);
}

.status {
  font-size: 0.75rem;
  color: #10b981;
}
</style>
