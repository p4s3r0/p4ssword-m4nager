<script setup>
import { APP_VERSION } from '@/main';
import API from "@/plugins/axios";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import { inject } from "vue";

const userStore = useUserStore();
const router = useRouter();
const dialogRef = inject("dialogRef");

function logout() {
  API.delete("users/sign_out").then(() => {
    userStore.removeUser();
    dialogRef.value.close();
    router.push({ name: "login" });
  });
}
</script>

<template>
  <div class="profile-dialog">
    <p class="version">
      Version: {{ APP_VERSION }}
    </p>
    <div
      class="list-element ripple"
      @click="logout()"
    >
      <i class="pi pi-lock" />
      Logout
    </div>

    <div class="list-element ripple">
      <i class="pi pi-hourglass" />
      Sessions
    </div>

    <div class="list-element ripple">
      <i class="pi pi-download" />
      Download
    </div>

    <div class="list-element ripple">
      <i class="pi pi-upload" />
      Upload
    </div>
  </div>
</template>

<style scoped>
.profile-dialog {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  color: var(--surface-900);

  .version {
    padding-left: var(--gap-4);
  }

  .list-element {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: var(--gap-2);
    padding: var(--gap-2) var(--gap-4);
    background-color: var(--surface-100);

    &:hover {
      cursor: pointer;
      background-color: var(--surface-200);
    }
  }
}
</style>