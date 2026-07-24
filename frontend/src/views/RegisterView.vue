<script setup>
import { ref } from "vue";
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';

import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import { useRouter } from "vue-router";
import API from "@/plugins/axios";
import PMTextInput from "@/components/PMTextInput.vue";
import PMPasswordInput from "@/components/PMPasswordInput.vue";
import { t } from "@/plugins/i18n";

const router = useRouter();
const toast = useToast();
const username = ref("");
const email = ref("");
const password = ref("");
const submitted = ref(false);

function clickRegisterUser() {
  submitted.value = true;
  if (!email.value || !username.value || !password.value) {
    toast.add({
      severity: "error",
      summary: t("common.error"),
      detail: t("register.requiredFields"),
      life: TOAST_LIFESPAN
    });
    return;
  }
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

    toast.add({
      severity: "success",
      summary: t("common.success"),
      detail: t("register.registered"),
      life: TOAST_LIFESPAN
    });
    router.push("/");
    return user;
  }, () => {
    toast.add({
      severity: "error",
      summary: t("common.error"),
      detail: t("register.error"),
      life: TOAST_LIFESPAN
    });
  });
}
</script>

<template>
  <div class="container-register-view">
    <div class="top-part">
      <div class="header">
        <h1>{{ $t("register.title") }}</h1>
        <h2>
          {{ $t("register.subtitleLine1") }} <br>
          {{ $t("register.subtitleLine2") }}
        </h2>
      </div>
      <div class="user-input">
        <PMTextInput
          v-model="email"
          :label="$t('common.email')"
          name="email"
          required
          :submitted="submitted"
        />
        <PMTextInput
          v-model="username"
          :label="$t('common.username')"
          name="username"
          required
          :submitted="submitted"
        />
        <PMPasswordInput
          v-model="password"
          :label="$t('common.password')"
          name="password"
          required
          :submitted="submitted"
        />
      </div>
    </div>
    <div class="footer">
      <div class="links">
        <p>
          {{ $t("common.alreadyHaveAccount") }}
          <a @click="$router.push('/')">{{ $t("common.login") }}</a>
        </p>
      </div>
      <big-button-register-signin
        :text="$t('common.register')"
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
