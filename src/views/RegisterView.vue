<template>
  <div id="mainLogin">
    <h1>Let's Register you.</h1>
    <h2>Welcome stranger. <br>Lemme keep your passwords</h2>
    <div class="userInput">
      <enhanced-text-input id="posUsernameInput" placeholder="Email" @valueUpdated="updateEmail"/>
      <enhanced-text-input id="posEmailInput" placeholder="Username" @valueUpdated="updateUsername"/>
      <enhanced-password-input-without-generate @valueUpdated="updatePassword"/>
    </div>
      <p>Already have an account? <a @click="this.$router.push('/');">Login</a></p>
    <big-button-register-signin text="Register" @click="clickRegisterUser()"/>
  </div>
</template>

<script>
import EnhancedTextInput from '@/components/EnhancedTextInput.vue'
import EnhancedPasswordInputWithoutGenerate from '@/components/EnhancedPasswordInputWithoutGenerate.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import { DB_registerUser } from '@/db.js'

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
        email: "",
        password: ""
      }
    },
  methods: {
    updateUsername(username) {
      this.username = username;
    },
    updateEmail(email) {
      this.email = email;
    },
    updatePassword(password) {
      this.password = password;
    },
    clickRegisterUser() {
      if (!navigator.onLine) {
        this.toast.error("No internet Connection!");
        return;
      }
      DB_registerUser(this.username, this.email, this.password).then( (res) => {
        if(res == "OK") {
          this.toast.success("User Registered!");
          this.$router.push("/");
        } else if(res == "[ERROR]-UsernameTaken"){
          this.toast.error("Username already taken!");
        } else {
          this.toast.error("Something weird went wrong!");
        }
      })
    }
  }
}
</script>

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
  max-width: 800px;
  left: 50%;
  transform: translateX(-50%);
}

#posUsernameInput {
  margin-top: 10vh;
}

#posEmailInput {
  margin-bottom: 13px;
}
</style>
