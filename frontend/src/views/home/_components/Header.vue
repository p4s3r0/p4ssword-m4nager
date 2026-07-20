<script setup>
import PMIconButton from "@/components/PMIconButton.vue";
import { useUserStore } from "@/store/userStore";
import { useDialog } from "primevue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";
import ProfileDialog from "@/views/home/_dialogs/ProfileDialog.vue";

const userStore = useUserStore();
const dialog = useDialog();

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
  <div class="home-header">
    <div
      class="profile-section"
      @click="openProfileDialog"
    >
      <div class="avatar">
        {{ userStore.username.charAt(0).toUpperCase() }}
      </div>
      <div class="user-info">
        <span class="status">Welcome back</span>
        <span class="username">{{ userStore.username }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap-6) var(--gap-4) 0 var(--gap-4);

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: var(--border-radius-3);
    background-color: var(--surface-100);
    border: 1px solid var(--surface-200);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--surface-900);
  }

  .user-info {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .username {
    font-weight: 600;
    font-size: 1.3rem;
    color: var(--surface-900);
  }

  .status {
    font-size: 0.75rem;
    color: var(--surface-300);
  }

  .profile-section {
    display: flex;
    align-items: center;
    gap: var(--gap-3);
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) {
      &:hover {
        background-color: var(--surface-0);
      }
    }

    &:active {
      background-color: var(--surface-0);
    }
  }
}
</style>