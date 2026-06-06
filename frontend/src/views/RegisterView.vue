<script setup>
import { ref } from "vue";
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import { DB_registerUser } from '@/db.js';

import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const username = ref("");
const email = ref("");
const password = ref("");

function updateUsername(username) {
  username.value = username;
}

function updateEmail(email) {
  email.value = email;
}

function updatePassword(password) {
  password.value = password;
}

function clickRegisterUser() {
  if (!navigator.onLine) {
    toast.error("No internet Connection!");
    return;
  }

  DB_registerUser(username.value, email.value, password.value).then((res) => {
    if (res === 0) {
      toast.success("User Registered!");
      router.push("/");
    } else if (res === -1) {
      toast.info("Data missing!");
    } else if (res === -2) {
      toast.error("Username already taken!");
    } else {
      toast.error("API Error!");
    }
  });
}
</script>

<template>
  <div id="mainLogin">
    <h1>Let's Register you.</h1>
    <h2>Welcome stranger. <br>Lemme keep your passwords</h2>
    <div class="userInput">
      <FloatLabel
        variant="in"
        style="margin-top: 10px;"
      >
        <InputText
          id="in_label"
          v-model="email"
        />
        <label
          style="color: var(--p-select-placeholder-color)"
          for="in_label"
        >Email</label>
      </FloatLabel>
      <FloatLabel
        variant="in"
        style="margin-top: 5px;"
      >
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
        style="margin-top: 5px; width: 100%;"
      >
        <Password
          v-model="password"
          input-id="in_label"
          style="width: 100%;"
          toggle-mask
        />
        <label for="in_label">Password</label>
      </FloatLabel>
    </div>
    <p>Already have an account? <a @click="$router.push('/');">Login</a></p>
    <big-button-register-signin
      text="Register"
      @click="clickRegisterUser()"
    />
  </div>
</template>

<style scoped>

h1, h2 {
  padding-left: 8%;
}

p {
  position: absolute;
  bottom: 105px;
  width: 100%;
  text-align: center;
}

a {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

.userInput {
  position: absolute;
  width: 90%;
  margin-top: 10vh;
  max-width: 500px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
