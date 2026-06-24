<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { useToast } from "vue-toastification";
import BigButtonRegisterSignin from "@/components/BigButtonRegisterSignin.vue";

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
    toast.success("Welcome back, " + username.value + "!");
    await nextTick();
    await router.push({ name: "home" });
  } else {
    toast.error("Authentication failed. Please login manually.");
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
  <div class="passkey-login-container">
    <div class="center-content">
      <h1 class="username">
        {{ username }}
      </h1>
      <BigButtonRegisterSignin
        text="Login with Passkey"
        @click="login"
      />
    </div>
    <div class="footer">
      <a @click="standardLogin()">Login as another user</a>
    </div>
  </div>
</template>

<style scoped>
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

.username {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  text-align: center;
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

.footer a:hover {
  opacity: 1;
}
</style>
