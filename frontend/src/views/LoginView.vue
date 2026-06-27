<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import BigButtonRegisterSignin from "@/components/BigButtonRegisterSignin.vue";
import API from "@/plugins/axios";
import { useUserStore } from "@/store/userStore";
import { biometricRegister } from "@/plugins/biometric_authentication";
import PMTextInput from "@/components/PMTextInput.vue";
import PMPasswordInput from "@/components/PMPasswordInput.vue";

const userStore = useUserStore();

const toast = useToast();
const router = useRouter();

const username = ref("");
const password = ref("");
const submitted = ref(false);

function loginUser() {
  submitted.value = true;
  if (!username.value || !password.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please fill in all required fields",
      life: TOAST_LIFESPAN
    });
    return;
  }
  API.post("users/sign_in", {
      user: {
        username: username.value,
        password: password.value
      }
    }).then(async (response) => {
    const user = response.data.user;

    let authenticationObject;
    try {
      localStorage.setItem("username", user.username);
      authenticationObject = await biometricRegister(username.value);
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Biometric Authentication failed. Please try again.",
        life: TOAST_LIFESPAN
      });
      return;
    }

    localStorage.setItem("authentication-id", authenticationObject.id);
    const success = await userStore.loginUser(authenticationObject.id, user.username, password.value, user.session_token);
    if (success) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Logged in!",
        life: TOAST_LIFESPAN
      });
      router.push({ name: "home" });
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Biometric Authentication failed. Please try again.",
        life: TOAST_LIFESPAN
      });
    }
  }, () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong!",
      life: TOAST_LIFESPAN
    });
  });
}
</script>

<template>
  <div class="container-login-view">
    <div class="top-part">
      <div class="header">
        <h1>Let's sign you in.</h1>
        <h2>Welcome back. <br>You've been missed!</h2>
      </div>
      <div class="user-input">
        <PMTextInput
          v-model="username"
          label="Username"
          name="username"
          required
          :submitted="submitted"
        />
        <PMPasswordInput
          v-model="password"
          label="Password"
          name="password"
          required
          :submitted="submitted"
        />
      </div>
    </div>
      
    <div class="footer">
      <div class="links">
        <p>
          Don't have an account?
          <a @click="router.push({ name: 'register' })">Register</a>
        </p>
      </div>
        
      <big-button-register-signin
        text="Sign in"
        @click="loginUser()"
      />
    </div>
  </div>
</template>

<style scoped>
.container-login-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--gap-10) * 2) var(--gap-4) var(--gap-4) var(--gap-4);
  min-height: 100svh;
  max-width: 500px;
  margin: 0 auto;

  .user-input {
    display: flex;
    flex-direction: column;
    gap: var(--gap-2);
    margin-top: 10vh;
  }

  .footer {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    .links {
      display: flex;
      flex-direction: column;
      gap: var(--gap-2);
      margin-bottom: var(--gap-4);
      p {
        margin: 0;
      }
    }

    a {
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

</style>
