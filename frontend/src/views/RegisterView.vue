<script setup>
import { ref } from "vue";
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import { DB_registerUser } from '@/db.js';

import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import API from "@/plugins/axios";

const router = useRouter();
const toast = useToast();
const username = ref("");
const email = ref("");
const password = ref("");

function clickRegisterUser() {
  API.post("users", {
    user: {
      email: email.value,
      username: username.value,
      password: password.value
    }
  }).then((response) => {
    const user = response.data.user;
    localStorage.setItem("username", user.username);

    // set the cookie as authentication from the header.
    const cookie = response.headers["set-cookie"];
    if (cookie) {
      document.cookie = cookie;
    }

    toast.success("User Registered!");
    router.push("/");
    return user;
  }, () => {
    toast.error("Error!");
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
