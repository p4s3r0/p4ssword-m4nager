<script setup>
import { APP_VERSION } from '@/main';
import { ref, watch } from "vue";
import API from "@/plugins/axios";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import { inject } from "vue";
import PMTextToggleSwitch from "@/components/PMTextToggleSwitch.vue";
import PMSelectButton from "@/components/PMSelectButton.vue";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import { t, i18n } from "@/plugins/i18n";

const dialogRef = inject("dialogRef");

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const theme = ref(document.documentElement.classList.contains("dark"));
const disableThemeSwitcher = ref(false);

const language = ref(i18n.global.locale.value);
const languageOptions = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "it", label: "Italiano", flag: "🇮🇹" }
];

watch(language, (newVal) => {
  i18n.global.locale.value = newVal;
  localStorage.setItem("locale", newVal);
});

function logout() {
  API.delete("users/sign_out", { params: { session_token: userStore.sessionToken } }).then(() => {
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
      summary: t("common.success"),
      detail: t("home.profileDialog.destroyed"),
      life: TOAST_LIFESPAN
    });
  }, () => {
    toast.add({
      severity: "error",
      summary: t("common.error"),
      detail: t("common.somethingWentWrong"),
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
      summary: t("common.error"),
      detail: t("common.somethingWentWrong"),
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
      {{ $t("common.version") }}: {{ APP_VERSION }}
    </p>

    <div>
      <PMTextToggleSwitch
        v-model="theme"
        :text="theme ? $t('common.darkMode') : $t('common.lightMode')"
        :disabled="disableThemeSwitcher"
      />
    </div>

    <div class="language-selector">
      <PMSelectButton
        v-model="language"
        :options="languageOptions"
      />
    </div>
    <div
      class="list-element ripple"
      @click="logout()"
    >
      <i class="pi pi-lock" />
      {{ $t("common.logout") }}
    </div>

    <div
      class="list-element ripple"
      @click="destroySessions()"
    >
      <i class="pi pi-hourglass" />
      {{ $t("common.destroyAllSessions") }}
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

  .language-selector {
    padding: 0 var(--gap-4);
    display: flex;
    justify-content: center;
  }

  .list-element {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: var(--gap-2);
    padding: var(--gap-2) var(--gap-4);
    background-color: var(--surface-100);

    @media (hover: hover) {
      &:hover {
        cursor: pointer;
        background-color: var(--surface-200);
      }
    }

    &:active {
      background-color: var(--surface-200);
    }
  }
}
</style>
