<template>
  <div id="mainLogin">
    <h1 @click="deleteLocalDb()">Let's sign you in.</h1>
    <h2>Welcome back. <br>You've been missed!</h2>
    <text-input id="posUsernameInput" placeholder="Username" @valueUpdated="updateUsername" />
    <password-input @valueUpdated="updatePassword" />
    <p>Don't have an account? <a @click="this.$router.push('/register');">Register</a></p>
    <big-button-register-signin text="Sign in" @click="loginUser()"/>
  <p id="Version">@3.2</p>

  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import { DB_loginUser } from '@/supabase';
import { store } from '@/store/store';
import { del_dexie, DBL_isUserLoggedIn } from '@/dexie';

import { useToast } from "vue-toastification";

export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
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
    deleteLocalDb() {
      del_dexie();
    },
    loginUser() {
      DB_loginUser(this.username, this.password).then((res) => {
        if (res) {
          store.user.loggedIn = true;
          store.user.username = this.username;
          this.$router.push('/home');
        } else {
          this.toast.error("Incorrect Username or Password", {
            position: "top-center",
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
        }
      });
    }
  }, beforeMount() {
    DBL_isUserLoggedIn().then((res) => {
      if (res) {
        store.user.loggedIn = true;
        store.user.username = res.username;
        store.user.password = res.password;
        store.user.email = res.email;
        this.$router.push('/home');
      }
    })
  }
}
</script>

<style scoped>
#mainLogin {
  padding-left: 8vw;
}

p {
  position: absolute;
  bottom: 105px;
  width: 80vw;
  text-align: center;
}

a {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

#posUsernameInput {
  margin-top: 10vh;
  margin-bottom: 1vh;
}

#Version {
  position: absolute;
  bottom: -15px;
  right: 15px;
  text-align: right;
  width: auto;
  color: rgba(255, 255, 255, 0.093);
}
</style>
