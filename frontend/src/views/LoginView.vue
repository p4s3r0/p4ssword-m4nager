<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { DBL_onboardingOn } from "@/dexie";
import BigButtonRegisterSignin from "@/components/BigButtonRegisterSignin.vue";
import API from "@/plugins/axios";
import { useUserStore } from "@/store/userStore";
import { activateOnboarding } from "@/plugins/router";
import { biometricRegister } from "@/plugins/biometric_authentication";

const userStore = useUserStore();

const toast = useToast();
const router = useRouter();

const username = ref("");
const password = ref("");

function redoOnboarding() {
  DBL_onboardingOn().then((_) => {
    activateOnboarding();
    router.push({ name: "onboarding" });
  });
}

function loginUser() {
  API.post("users/sign_in", {
      user: {
        username: username.value,
        password: password.value
      }
    }).then(async (response) => {
    const user = response.data.user;
    localStorage.setItem("username", user.username);
    const authenticationObject = await biometricRegister(username.value);
    localStorage.setItem("authentication-id", authenticationObject.id);
    const success = await userStore.loginUser(authenticationObject.id, user.username, password.value);
    if (success) {
      toast.success("Logged in!");
      router.push({ name: "home" });
    } else {
      toast.error("OHOH!");
    }
  }, () => {
    toast.error("Error!");
  });
}
</script>

<template>
  <div id="containerLoginView">
    <h1>Let's sign you in.</h1>
    <h2>Welcome back. <br>You've been missed!</h2>
    <div class="userInput">
      <FloatLabel variant="in">
        <InputText
          id="in_label"
          v-model="username"
        />
        <label
          style="color: var(--p-select-placeholder-color)"
          for="in_label"
        >Username</label>
      </FloatLabel>
      <FloatLabel
        variant="in"
        style="margin-top: 5px; width: 100%"
      >
        <Password
          v-model="password"
          input-id="in_label"
          style="width: 100%"
          toggle-mask
        />
        <label for="in_label">Password</label>
      </FloatLabel>
    </div>
    <div id="centercenter">
      <p>
        Don't have an account?
        <a @click="router.push({ name: 'register' })">Register</a>
      </p>
      <p>
        No clue what this is about? Check out the
        <a @click="redoOnboarding()">Tutorial</a>
      </p>
    </div>
    <big-button-register-signin
      text="Sign in"
      @click="loginUser()"
    />
  </div>
</template>

<style scoped>
h1,
h2 {
  margin-left: 8%;
}

.userInput {
  position: absolute;
  width: 90%;
  margin-top: 10vh;
  max-width: 500px;
  left: 50%;
  transform: translateX(-50%);
}

a {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

#centercenter {
  position: absolute;
  bottom: 105px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>
