<template>
    <div id="mainEditPassword">
      <h1>Edit Password</h1>
      <edit-text-input class="smallSpacing" placeholder="Site Name" :value="this.curr_password_name" @valueUpdated="updatePasswordName"/>
      <edit-text-input class="smallSpacing" placeholder="Username" :value="this.curr_password_username" @valueUpdated="updatePasswordUsername"/>
      <edit-text-input placeholder="Password" :value="this.curr_password_password" @valueUpdated="updatePasswordPassword"/>
      <selector-folder :init_value=this.curr_password_folder class="smallSpacing" :value="this.curr_password_folder" @valueUpdated="updatePasswordFolder"/>
      <edit-text-input placeholder="Note" :value="this.curr_password_note" @valueUpdated="updatePasswordNote"/>

      <big-button-register-signin text="Apply Edit" @click="edit"/>
    </div>
  </template>
  
<script>
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import EditTextInput from '@/components/EditTextInput.vue';
import SelectorFolder from '@/components/SelectorFolder.vue';

import { DBL_refreshUserLogin } from '@/dexie';
import { DB_editPassword } from '@/supabase';

import { store } from '@/store/store';

export default {
  name: 'App',
  components: {
    BigButtonRegisterSignin,
    EditTextInput,
    SelectorFolder
  },
  data() {
      return {
        curr_password_id: store.temp.curr_password_id,
        curr_password_name: store.temp.curr_password_name,
        curr_password_username: store.temp.curr_password_username,
        curr_password_password: store.temp.curr_password_password,
        curr_password_folder: store.temp.curr_password_folder,
        curr_password_note: store.temp.curr_password_note,
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
    edit() {
      DB_editPassword(store.temp.curr_password_folder, this.curr_password_id, this.curr_password_name,this.curr_password_username, this.curr_password_password, this.curr_password_folder, this.curr_password_note).then( () => {
        this.$router.push('/home');
      })
    }
  }, 
  beforeMount() {
    if (store.user.username == "") {
      if (store.temp.curr_folder_name == "") {
        this.$router.push('/home');

      }
        DBL_refreshUserLogin().then((res) => {
          if (!res) {
            this.$router.push('/');
          }
        })
      }
      }
    }

</script>

<style scoped>
#mainEditPassword {
  margin-left: 8vw;
}

h1 {
  margin-bottom: 20vh;
}

.smallSpacing {
  margin-bottom: 10px;
}
</style>
