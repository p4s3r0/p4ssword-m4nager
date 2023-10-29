<template>
    <div>
      <h1>Edit 2FA</h1>
      <div id="userInput">
        <edit-text-input placeholder="Name" :value="this.fa_name" @valueUpdated="update2FAName"/>
        <edit-text-input placeholder="Secret" :value="this.fa_secret" @valueUpdated="update2FASecret"/>
      </div>
      <big-button-register-signin text="Apply Edit" @click="edit"/>
    </div>
  </template>
  
<script>
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import EditTextInput from '@/components/EditTextInput.vue';

import { getCurrentUser } from '@/dexie';
import { DB_edit2FA } from '@/db';

import { store } from '@/store/store';

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success } from '@/toasts';

export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    BigButtonRegisterSignin,
    EditTextInput,
  },
  data() {
      return {
        user: {},
        fa_name: store.temp.curr_2fa_name,
        fa_secret: store.temp.curr_2fa_secret,
        fa_id: store.temp.curr_2fa_id,
      }
  },
  methods: {
    update2FAName(name) {
      this.fa_name = name;
    },
    update2FASecret(secret) {
      this.fa_secret = secret;
    },
    edit() {
      DB_edit2FA(this.fa_id, this.fa_name, this.fa_secret).then( (res) => {
        if (res) {
          this.toast.success("Folder edited!", toasts_config_success);
          this.$router.push('/home');
        } else {
          this.toast.error("Something went Wrong!", toasts_config_error);
        }
      })
    }
  }, 
  beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
        } else {
            this.$router.push('/');
        }
    })
  }
}

</script>

<style scoped>
h1 {
  margin-bottom: 20vh;
  margin-left: 8%;
}

#userInput {
  width: 80%;
  left: 10%;
  right: 10%;
  margin-left: 50%;
  transform: translateX(-50%);
  max-width: 800px;
}
</style>
