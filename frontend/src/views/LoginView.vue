<script setup>
import { ref } from "vue";
import { HASH } from "@/db";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { DBL_onboardingOn } from "@/dexie";
import BigButtonRegisterSignin from "@/components/BigButtonRegisterSignin.vue";
import API from "@/plugins/axios";
import { biometricEncrypt, biometricRegister } from "@/plugins/biometric_authentication";
import { useUserStore } from "@/store/userStore";
import { activateOnboarding } from "@/plugins/router";

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

function createUserEncryption(passkey, apiKey) {
  biometricEncrypt(password.value, passkey).then((encrypted) => {
    localStorage.setItem("key", encrypted.ciphertext);
    localStorage.setItem("iv", encrypted.iv);
    userStore.setUser(username.value, apiKey, password.value);
    router.push({ name: "home" });
  });
}

function loginUser() {
  API.get("login_user", { params: {
    username: username.value,
    password: HASH(password.value),
    } }
  ).then((response) => {
    const apiKey = response.data.data.api_key;
    localStorage.setItem("api-key", apiKey);
    localStorage.setItem("username", username.value);
    biometricRegister(username.value).then((passkey) => {
      localStorage.setItem("authentication-id", passkey.id);
      createUserEncryption(passkey.id, apiKey);
    });
  }, (response) => {
    response.code === 401 ? toast.error("Wrong Credentials") : toast.error("API Error!");
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
