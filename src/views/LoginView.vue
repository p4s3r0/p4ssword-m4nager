<template>
  <div id="mainLogin">
    <h1>Let's sign you in.</h1>
    <h2>Welcome back. <br>You've been missed!</h2>
    <username-input id="posUsernameInput" />
    <password-input />
    <p>Don't have an account? <a @click="this.$router.push('/register');">Register</a></p>
    <big-button-register-signin />
  </div>
</template>

<script>
import UsernameInput from '@/components/UsernameInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'

export default {
  name: 'App',
  components: {
    UsernameInput,
    PasswordInput,
    BigButtonRegisterSignin,
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
</style>
