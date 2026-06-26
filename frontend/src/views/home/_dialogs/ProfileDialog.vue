<script setup>
import { APP_VERSION } from '@/main';
import { ref, watch } from "vue";
import API from "@/plugins/axios";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import { inject } from "vue";
import PMTextToggleSwitch from "@/components/PMTextToggleSwitch.vue";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";

const dialogRef = inject("dialogRef");

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const theme = ref(document.documentElement.classList.contains("dark"));
const disableThemeSwitcher = ref(false);

function logout() {
  API.delete("users/sign_out").then(() => {
    userStore.removeUser();
    dialogRef.value.close();
    router.push({ name: "login" });
  });
}

function destroySessions() {
  API.delete("users/destroy_all_sessions").then(() => {
    userStore.removeUser();
    dialogRef.value.close();
    router.push({ name: "login" });
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "All sessions have been destroyed.",
      life: TOAST_LIFESPAN
    });
  }, () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong!",
      life: TOAST_LIFESPAN
    });
  });
}

watch(theme, (newVal, oldVal) => {
  disableThemeSwitcher.value = true;
  const currTheme = newVal ? "dark" : "light";

  API.put("users/set_theme", { theme: currTheme }).then((response) => {
    theme.value = response.data === "dark";
  }, () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong!",
      life: TOAST_LIFESPAN
    });
    theme.value = oldVal;
  }).finally(() => {
    disableThemeSwitcher.value = false;
  });

  if (currTheme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});
</script>

<template>
  <div class="profile-dialog">
    <p class="version">
      Version: {{ APP_VERSION }}
    </p>

    <div>
      <PMTextToggleSwitch
        v-model="theme"
        :text="theme ? 'Dark Mode' : 'Light Mode'"
        :disabled="disableThemeSwitcher"
      />
    </div>
    <div
      class="list-element ripple"
      @click="logout()"
    >
      <i class="pi pi-lock" />
      Logout
    </div>

    <div
      class="list-element ripple"
      @click="destroySessions()"
    >
      <i class="pi pi-hourglass" />
      Destroy all Sessions
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