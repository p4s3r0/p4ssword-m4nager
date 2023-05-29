<template>
  <div id="mainLogin">
    <h1> Password Data</h1>
    <div id="delEdit">
      <small-button-delete text="Delete" @click=deletePassword() />
      <small-button-edit text="Edit" @click=editPassword() />
    </div>
    <div id="textShower">
      <text-shower v-if="this.name != ''" :text=this.name />
      <text-shower v-if="this.username != ''" :text=this.username />
      <text-shower v-if="this.password != ''" is_pssw="true" :text=this.password />
      <text-shower v-if="this.folder != 'NO FOLDER'" :text=this.folder />
      <text-shower v-if="this.note != ''" :text=this.note />
    </div>
    <add-button @click="this.$router.push('/addPasswordOrFolder')" />
  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import AddButton from '@/components/AddButton.vue';
import TextShower from '@/components/TextShower.vue';

import { store, checkUserValid, checkPasswordValid } from '@/store/store';
import { DBL_refreshUserLogin, DBL_getPasswordsByIdx } from '@/dexie';
import { DB_deletePassword, DB_editPassword } from '@/supabase';

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
      DB_deletePassword(store.temp.curr_password_id, this.folder).then((res) => {
        if (!res) {
            this.$router.push('/home');
          }
      })
    },
    editPassword() {
      this.$router.push('/editPassword');
    }
  }, 
  beforeMount() {
    if(!checkUserValid()) {
        DBL_refreshUserLogin().then((res) => {
          if (!res) {
            DBL_logoutUser();
            this.$router.push('/');
          } else {
            if(!checkPasswordValid()) {
              this.$router.push('/home');
            } else {
              DBL_getPasswordsByIdx(store.temp.curr_password_id).then( (res) => {
                this.name = res.name;
                this.username = res.username;
                this.password = CryptoJS.AES.decrypt(res.password, store.user.password).toString(CryptoJS.enc.Utf8);        
                this.folder = res.folder;
                this.note = res.note; })
            }
          }
        })
    } else {
      if(!checkPasswordValid()) {
        console.log("here=?")

        this.$router.push('/home');
      } else {
        DBL_getPasswordsByIdx(store.temp.curr_password_id).then( (res) => {
          this.name = res.name;
          this.username = res.username;
          this.password = CryptoJS.AES.decrypt(res.password, store.user.password).toString(CryptoJS.enc.Utf8);        
          this.folder = res.folder;
          this.note = res.note; })
      }
    }
  }
}
</script>

<style scoped>

#posNameInput {
  margin-top: 10vh;
  margin-bottom: 1vh;
}

#posNoteInput {
  margin-top: 10px;
}

#delEdit {
  display: flex;
  margin-left: 50%;
  margin-bottom: 5vh;
  transform: translate(-50%);
}

h1 {
  margin-left: 8vw;
  margin-bottom: 3vh;
}

#textShower {
  margin-left: 10%;
}
</style>