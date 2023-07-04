<template>
    <div id="mainEditFolder">
      <h1>Edit 2FA</h1>
      <edit-text-input placeholder="Name" :value="this.fa_name" @valueUpdated="update2FAName"/>
      <edit-text-input placeholder="Secret" :value="this.fa_secret" @valueUpdated="update2FASecret"/>

      <big-button-register-signin text="Apply Edit" @click="edit"/>
    </div>
  </template>
  
<script>
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import EditTextInput from '@/components/EditTextInput.vue';

import { DBL_refreshUserLogin } from '@/dexie';
import { DB_edit2FA } from '@/supabase';

import { store, checkUserValid } from '@/store/store';

import { useToast } from "vue-toastification";

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
        fa_name: store.temp.curr_2fa_name,
        fa_secret: store.temp.curr_2fa_secret,
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
      DB_edit2FA(store.temp.curr_2fa_name, this.fa_name, this.fa_secret).then( (res) => {
        if (res) {
          this.toast.success("Folder edited!", {
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
          this.$router.push('/home');
        } else {
          this.toast.error("Something went Wrong!", {
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
      })
    }
  }, 
  beforeMount() {
    if(!checkUserValid()) {
      DBL_refreshUserLogin().then((res) => {
        if (!res) {
          DBL_logoutUser();
          this.$router.push('/');
        }
      })
    }
  }
}

</script>

<style scoped>
#mainEditFolder {
  margin-left: 8vw;
}

h1 {
  margin-bottom: 20vh;
}
</style>
