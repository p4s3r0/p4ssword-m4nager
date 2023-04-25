<template>
  <div id="mainLogin">
    <h1>{{ this.name }}</h1>
    <div id="delEdit">
      <small-button-delete text="Delete" @click=deleteFolder() />
      <small-button-edit text="Edit" />
    </div>

    <add-button @click="this.$router.push('/addPasswordOrFolder')" />
    
  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import AddButton from '@/components/AddButton.vue';

import { store } from '@/store/store';
import { DBL_refreshUserLogin, DBL_getPasswordsByIdx } from '@/dexie';

export default {
  name: 'App',
  components: {
    Password,
    SmallButtonDelete,
    SmallButtonEdit,
    AddButton
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
    deleteFolder() {
      DB_deletePassword(store.user.username, store.temp.curr_folder).then( () => {
        this.$router.push('/home');
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
          this.password = res.password;
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
