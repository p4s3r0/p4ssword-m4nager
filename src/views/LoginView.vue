<template>
  <div id="containerLoginView">
    <h1>Let's sign you in.</h1>
    <h2>Welcome back. <br>You've been missed!</h2>
    <div class="userInput">
      <enhanced-text-input id="posUsernameInput" placeholder="Username" @valueUpdated="updateUsername" />
      <enhanced-password-input-without-generate @valueUpdated="updatePassword"/>
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
        if (res) {
          this.$router.push('/home');
        } else {
          this.toast.error("Incorrect Username or Password");
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
  max-width: 800px;
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

#posUsernameInput {
  margin-top: 10vh;
  margin-bottom: 13px;
}

#Version {
  position: absolute;
  bottom: -15px;
  right: 15px;
  text-align: right;
  width: auto;
  color: rgba(255, 255, 255, 0.093);
}

@media (max-width : 700px) {
  .userInput {
    margin-top: 0;
  }

}
</style>
