<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import BigButtonRegisterSignin from "@/components/BigButtonRegisterSignin.vue";
import { t } from "@/plugins/i18n";

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const username = ref(localStorage.getItem("username") || "");
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

async function login() {
  const success = await userStore.setUser();
  if (success) {
    toast.add({
      severity: "success",
      summary: t("common.success"),
      detail: t("passkeyLogin.welcomeBackUser", { username: username.value }),
      life: TOAST_LIFESPAN
    });
    await nextTick();
    await router.push({ name: "home" });
  } else {
    toast.add({
      severity: "error",
      summary: t("common.error"),
      detail: t("passkeyLogin.authenticationFailed"),
      life: TOAST_LIFESPAN
    });
    userStore.removeUser();
    await nextTick();
    await router.push({ name: "login" });
  }
}

onMounted(() => {
  if (!username.value) {
    router.push({ name: "login" });
  }
});

async function standardLogin() {
  userStore.removeUser();
  await router.push({ name: 'login' });
}
</script>

<template>
  <div class="passkey-login-view">
    <div class="header">
      <h1>{{ $t("passkeyLogin.title") }}</h1>
      <h2>{{ $t("passkeyLogin.subtitle") }}</h2>
    </div>
    <div class="passkey-login-container">
      <div class="center-content">
        <div class="user-container">
          <div class="avatar">
            {{ username.charAt(0).toUpperCase() }}
          </div>
          <h1 class="username">
            {{ username }}
          </h1>
        </div>
        <BigButtonRegisterSignin
          :text="$t('passkeyLogin.loginButton')"
          @click="login"
        />
      </div>
      <div class="footer">
        <a @click="standardLogin()">{{ $t("passkeyLogin.anotherUser") }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.passkey-login-view {
  .header {
    position: absolute;
    left: var(--gap-4);
    top: calc(var(--gap-10) * 2);
    text-align: left;
    margin-bottom: var(--gap-4);

    h2 {
      font-weight: lighter;
      margin: 0;
      font-size: 1.1rem;
    }
  }

  .passkey-login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100svh;
    padding: var(--gap-4);
    background-color: var(--surface-0);
    color: var(--surface-900);


  }

  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-6);
    flex-grow: 1;
    justify-content: center;
    width: 100%;
  }

  .user-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: var(--gap-2);
    border-radius: var(--border-radius-3);
    gap: var(--gap-3);
    margin-bottom: var(--gap-6);

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

    .username {
      font-size: 2.2rem;
      font-weight: bold;
      margin: 0;
      text-align: center;
    }
  }


  .footer {
    margin-top: auto;
    padding-bottom: var(--gap-4);
  }

  .footer a {
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @media (hover: hover) {
    .footer a:hover {
      opacity: 1;
    }
  }

  .footer a:active {
    opacity: 1;
  }
}

</style>
