<template>
  <div id="mainLogin">
    <h1>Add new Password.</h1>
    <h2>I'll protect it!</h2>
    <text-input @valueUpdated="updateName" id="posNameInput" placeholder="Name" />
    <password-input @valueUpdated="updatePassword" />
    <selector-folder @valueUpdated="updateFolder" />
    <text-input @valueUpdated="updateNote" id="posNoteInput" placeholder="Note" />
    <big-button-register-signin text="Add Password" @click="addPassword()"/>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import SelectorFolder from '@/components/SelectorFolder.vue'

import { DB_addNewPassword } from '@/supabase';
import { store } from '@/store/store';
import { DBL_refreshUserLogin } from '@/dexie';

export default {
  name: 'App',
  components: {
    TextInput,
    BigButtonRegisterSignin,
    PasswordInput,
    SelectorFolder,
  },
  data() {
      return {
        folder: "NO FOLDER",
        name: "",
        password: "",
        note: "",
        color: "black"
      }
  },
  methods: {
    updateFolder(folder) {
      this.folder = folder;
    },
    updateName(name) {
      this.name = name;
    },
    updatePassword(password) {
      this.password = password;
    },
    updateNote(note) {
      this.note = note;
    },
    addPassword() {
      DB_addNewPassword(this.name, store.user.password, this.folder, this.note, store.user.username).then( (res) => {
        if (res) {
          this.$router.push('/home');
        }
      });
    }
  }, 
  beforeMount() {
    if (store.user.username == "") {
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

#posNameInput {
  margin-top: 10vh;
  margin-bottom: 1vh;
}

#posNoteInput {
  margin-top: 10px;
}
</style>
