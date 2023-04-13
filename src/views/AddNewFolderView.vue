<template>
  <div id="mainLogin">
    <h1>Add new Folder.</h1>
    <h2>Sorting is Key!</h2>
    <text-input @valueUpdated="updateFolder" id="posUsernameInput" placeholder="Folder Name" />
    <selector @valueUpdated="updateColor"/>
    <big-button-register-signin text="Add Folder" @click="addFolder()"/>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import Selector from '@/components/Selector.vue'

import { DB_addNewFolder } from '@/supabase';
import { store } from '@/store/store';

export default {
  name: 'App',
  components: {
    TextInput,
    BigButtonRegisterSignin,
    Selector
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

#posUsernameInput {
  margin-top: 10vh;
  margin-bottom: 1vh;
}
</style>
