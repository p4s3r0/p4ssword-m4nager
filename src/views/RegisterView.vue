<template>
  <div id="mainLogin">
    <h1>Let's Register you.</h1>
    <h2>Welcome stranger. <br>Lemme keep your passwords</h2>
    <text-input id="posUsernameInput" placeholder="Email" @valueUpdated="updateEmail"/>
    <text-input id="posEmailInput" placeholder="Username" @valueUpdated="updateUsername"/>
    <password-input @valueUpdated="updatePassword"/>
    <p>Already have an account? <a @click="this.$router.push('/');">Login</a></p>
    <big-button-register-signin text="Register" @click="clickRegisterUser()"/>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import { DB_registerUser } from '@/supabase.js'

export default {
  name: 'App',
  components: {
    TextInput,
    PasswordInput,
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
      DB_registerUser(this.email, this.username, this.password).then( (res) => {
        if(res) {
          this.$router.push("/");
        }
      })
    }
  }
}
</script>

<style scoped>
#mainLogin {
  max-width: 600px;
  padding-left: 8vw;
}

p {
  position: absolute;
  bottom: 22vw;
  width: 80vw;
  text-align: center;
}

a {
  font-weight: bold;
  text-decoration: underline;
}

#posUsernameInput {
  margin-top: 10vh;
  margin-bottom: 1vh;
}

#posEmailInput {
  margin-bottom: 1vh;
}
</style>
