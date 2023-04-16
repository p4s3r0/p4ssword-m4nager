<template>
  <div id="mainLogin">
    <h1>Let's sign you in.</h1>
    <h2>Welcome back. <br>You've been missed!</h2>
    <text-input id="posUsernameInput" placeholder="Username" @valueUpdated="updateUsername" />
    <password-input @valueUpdated="updatePassword" />
    <p>Don't have an account? <a @click="this.$router.push('/register');">Register</a></p>
    <big-button-register-signin text="Sign in" @click="loginUser()"/>
  <p id="Version">@1.1</p>

  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import { DB_loginUser } from '@/supabase';
import { store } from '@/store/store';

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
        password: ""
      }
  },
  methods: {
    updateUsername(username) {
      this.username = username;
    },
    updatePassword(password) {
      this.password = password;
    },
    loginUser() {
      DB_loginUser(this.username, this.password).then((res) => {
        if (res) {
          store.user.loggedIn = true;
          store.user.username = this.username;
          this.$router.push('/home');
        } else {
          console.log("Login FAILED")
        }
      });
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

#Version {
  position: absolute;
  bottom: -15px;
  right: 5px;
  text-align: right;
  width: auto;
  color: rgba(255, 255, 255, 0.093);
}
</style>
