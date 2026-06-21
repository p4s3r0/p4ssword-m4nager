<script setup>
import { ref } from "vue";
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';

import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import API from "@/plugins/axios";
import PMTextInput from "@/components/PMTextInput.vue";
import PMPasswordInput from "@/components/PMPasswordInput.vue";

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
  <div class="container-register-view">
    <div class="top-part">
      <div class="header">
        <h1>Let's Register you.</h1>
        <h2>Welcome stranger. <br>Lemme keep your passwords</h2>
      </div>
      <div class="user-input">
        <PMTextInput
          v-model="email"
          label="Email"
          name="email"
        />
        <PMTextInput
          v-model="username"
          label="Username"
          name="username"
        />
        <PMPasswordInput
          v-model="password"
          label="Password"
          name="password"
        />
      </div>
    </div>
    <div class="footer">
      <div class="links">
        <p>Already have an account? <a @click="$router.push('/');">Login</a></p>
      </div>
      <big-button-register-signin
        text="Register"
        @click="clickRegisterUser()"
      />
    </div>
  </div>
</template>

<style scoped>
.container-register-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--gap-10) * 2) var(--gap-4) var(--gap-4) var(--gap-4);
  height: 100svh;

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
