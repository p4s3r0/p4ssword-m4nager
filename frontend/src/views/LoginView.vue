<template>
  <div id="containerLoginView">
    <h1>Let's sign you in.</h1>
    <h2>Welcome back. <br>You've been missed!</h2>
    <div class="userInput">
      <FloatLabel variant="in">
          <InputText id="in_label" v-model="this.username"/>
          <label style="color: var(--p-select-placeholder-color)" for="in_label">Username</label>
      </FloatLabel>
      <FloatLabel variant="in" style="margin-top: 5px; width: 100%;">
        <Password v-model="this.password" inputId="in_label" style="width: 100%;" toggleMask @change="valueChange"/>
        <label for="in_label">Password</label>
      </FloatLabel>
    </div>
    <div id="centercenter">
      <p>Don't have an account? <a @click="this.$router.push('/register');">Register</a></p>
      <p>No clue what this is about? Check out the <a @click="redoOnboarding()">Tutorial</a></p>
    </div>
    <big-button-register-signin text="Sign in" @click="loginUser()"/>
  </div>
</template>

<script>
import EnhancedTextInput from '@/components/EnhancedTextInput.vue'
import EnhancedPasswordInputWithoutGenerate from '@/components/EnhancedPasswordInputWithoutGenerate.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import { DB_loginUser } from '@/db';
import { del_dexie, DBL_onboardingOn } from '@/dexie';

import { useToast } from "vue-toastification";

import { activateOnboarding } from "@/main"


export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    EnhancedTextInput,
    EnhancedPasswordInputWithoutGenerate,
    BigButtonRegisterSignin,
  },
  data() {
      return {
        username: "",
        password: "",
      }
  },
  methods: {
    redoOnboarding() {
      DBL_onboardingOn().then((_) => {
        activateOnboarding();
        this.$router.push("/onboarding");

      })

    },
    updateUsername(username) {
      this.username = username;
    },
    updatePassword(password) {
      this.password = password;
    },
    deleteLocalDb() {
      del_dexie();
    },
    loginUser() {
      if (!navigator.onLine) {
        this.toast.error("No internet Connection!");
        return;
      }
      DB_loginUser(this.username, this.password).then((res) => {

        if(res === 0) {
          this.$router.push('/home');
        } else if (res === -1) {
          this.toast.info("Data missing!");
        } else if(res === -2){
          this.toast.error("Wrong Credentials");
        } else {
          this.toast.error("API Error!");
        }
      });
    }
  }
}
</script>

<style scoped>

h1, h2 {
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
