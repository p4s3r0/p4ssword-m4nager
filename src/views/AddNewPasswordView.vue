<template>
  <div id="mainLogin">
    <h1>Add new Password.</h1>
    <h2>I'll protect it!</h2>
    <text-input @valueUpdated="updateName" id="posNameInput" placeholder="Name" />
    <password-input @valueUpdated="updatePassword" />
    <selector-folder />
    <text-input @valueUpdated="updateNote" id="posNoteInput" placeholder="Note" />
    <big-button-register-signin text="Add Password" @click="addFolder()"/>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import SelectorFolder from '@/components/SelectorFolder.vue'

import { DB_addNewFolder } from '@/supabase';
import { store } from '@/store/store';

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
        folder: "",
        color: "black"
      }
  },
  methods: {
    updateFolder(folder) {
      this.folder = folder;
    },
    updateColor(color) {
      this.color = color;
    },
    addFolder() {
      DB_addNewFolder(store.user.username, this.folder, this.color).then( (res) => {
        if (res) {
          this.$router.push('/home');
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

#posNameInput {
  margin-top: 10vh;
  margin-bottom: 1vh;
}

#posNoteInput {
  margin-top: 10px;
}
</style>
