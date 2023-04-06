<template>
  <div id="mainLogin">
    <h1>Let's Register you.</h1>
    <h2>Welcome stranger. <br>(But not for long)!</h2>
    <username-input />
    <password-input />
    <p>Don't have an account? <a>Register</a></p>
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
</style>
