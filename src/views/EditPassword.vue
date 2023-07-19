<template>
    <div id="mainEditPassword">
      <h1>Edit Password</h1>
      <edit-text-input class="smallSpacing" placeholder="Site Name" :value="this.curr_password_name" @valueUpdated="updatePasswordName"/>
      <edit-text-input class="smallSpacing" placeholder="Username" :value="this.curr_password_username" @valueUpdated="updatePasswordUsername"/>
      <edit-text-input placeholder="Password" :value="this.curr_password_password" @valueUpdated="updatePasswordPassword"/>
      <selector-folder :init_value=this.curr_password_folder class="smallSpacing" :value="this.curr_password_folder" @valueUpdated="updatePasswordFolder"/>
      <edit-text-input placeholder="Note" :value="this.curr_password_note" @valueUpdated="updatePasswordNote"/>
      <star-preferred :selected_init=this.curr_password_starred @valueUpdated="updateStarred" />

      <big-button-register-signin text="Apply Edit" @click="edit"/>
    </div>
  </template>
  
<script>
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import EditTextInput from '@/components/EditTextInput.vue';
import SelectorFolder from '@/components/SelectorFolder.vue';
import StarPreferred from '@/components/StarPreferred.vue';

import { getCurrentUser } from '@/dexie';
import { DB_editPassword } from '@/supabase';

import { store, DECRYPT } from '@/store/store';

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
    SelectorFolder,
    StarPreferred
  },
  data() {
      return {
        curr_password_id: store.temp.curr_password_id,
        curr_password_name: store.temp.curr_password_name,
        curr_password_username: "",
        curr_password_password: store.temp.curr_password_password,
        curr_password_folder: store.temp.curr_password_folder,
        curr_password_note: "",
        curr_password_starred: store.temp.curr_password_starred,
      }
  },
  methods: {
    updatePasswordName(name) {
      this.curr_password_name = name;
    },
    updatePasswordUsername(username) {
      this.curr_password_username = username;
    },
    updatePasswordPassword(password) {
      this.curr_password_password = password;
    },
    updatePasswordFolder(folder) {
      this.curr_password_folder = folder;
    },
    updatePasswordNote(note) {
      this.curr_password_note = note;
    },
    updateStarred(starred) {
      this.curr_password_starred = starred;

    },
    edit() {
      DB_editPassword(store.temp.curr_password_folder, this.curr_password_id, this.curr_password_name,this.curr_password_username, this.curr_password_password, this.curr_password_folder, this.curr_password_note, this.curr_password_starred).then( (res) => {

        if(res) {
          this.toast.success("Password edited!", {
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
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
            DECRYPT(store.temp.curr_password_username).then( (res) => {
              this.curr_password_username = res;
            })

            DECRYPT(store.temp.curr_password_note).then( (res) => {
              this.curr_password_note = res;
            })
        } else {
            this.$router.push('/');
        }
    })
  }
}

</script>

<style scoped>
#mainEditPassword {
  margin-left: 8vw;
}

h1 {
  margin-bottom: 10vh;
}

.smallSpacing {
  margin-bottom: 5px;
}
</style>
