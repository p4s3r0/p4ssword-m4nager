<template>
  <div id="mainLogin">
    <h1> Password Data</h1>
    <div id="delEdit">
      <small-button-delete text="Delete" @click=deletePassword() />
      <small-button-edit text="Edit" />
    </div>
    <text-shower v-if="this.name != ''" :text=this.name />
    <text-shower v-if="this.username != ''" :text=this.username />
    <text-shower v-if="this.password != ''" is_pssw="true" :text=this.password />
    <text-shower v-if="this.folder != 'NO FOLDER'" :text=this.folder />
    <text-shower v-if="this.note != ''" :text=this.note />
    <add-button @click="this.$router.push('/addPasswordOrFolder')" />
  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import AddButton from '@/components/AddButton.vue';
import TextShower from '@/components/TextShower.vue';

import { store } from '@/store/store';
import { DBL_refreshUserLogin, DBL_getPasswordsByIdx } from '@/dexie';
import { DB_deletePassword } from '@/supabase';

import CryptoJS from 'crypto-js';

export default {
  name: 'App',
  components: {
    Password,
    SmallButtonDelete,
    SmallButtonEdit,
    AddButton,
    TextShower
  },
  data() {
      return {
        name: "",
        username: "",
        password: "",
        folder: "",
        note: "",
      }
  },
  methods: {
    deletePassword() {
      DB_deletePassword(store.curr_password_id).then( (res) => {
        if (!res) {
            this.$router.push('/home');
          }
      })
    }
  }, 
  beforeMount() {
    if (store.user.username == "") {
      if (store.temp.curr_folder == "") {
        this.$router.push('/home');

      }
        DBL_refreshUserLogin().then((res) => {
          if (!res) {
            this.$router.push('/');
          }
        })
      } else {
        DBL_getPasswordsByIdx(store.curr_password_id).then( (res) => {
          this.name = res.name;
          this.username = res.username;
          this.password = CryptoJS.AES.decrypt(res.password, store.user.password).toString(this.$CryptoJS.enc.Utf8);        
          this.folder = res.folder;
          this.note = res.note;
        })

      }
    }

}
</script>

<style scoped>
#mainLogin {
  max-width: 600px;
}

#posNameInput {
  margin-top: 10vh;
  margin-bottom: 1vh;
}

#posNoteInput {
  margin-top: 10px;
}

#delEdit {
  display: flex;
  margin-left: 40%;
  margin-bottom: 5vh;
  transform: translate(-40%);
}

h1 {
  margin-left: 8vw;
  margin-bottom: 3vh;
}
</style>
