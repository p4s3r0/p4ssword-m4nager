<template>
  <div id="mainLogin">
    <h1>{{ this.folder }}</h1>
    <small-button-delete text="Delete Folder" @click=deleteFolder() />
    <small-button-edit text="Edit Folder" />

    <password v-for="p in this.passwords" :key=p.key
                                          :name=p.name
                                          :enc_password=p.password
                                          :username=p.username />
  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'

import { DB_getPasswordsForSpecificFolder, DB_deleteFolder } from '@/supabase';
import { store } from '@/store/store';
import { DBL_refreshUserLogin } from '@/dexie';

export default {
  name: 'App',
  components: {
    Password,
    SmallButtonDelete,
    SmallButtonEdit
  },
  data() {
      return {
        folder: store.temp.curr_folder,
        passwords: []
      }
  },
  methods: {
    deleteFolder() {
      DB_deleteFolder(store.user.username, store.temp.curr_folder).then( () => {
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
        DB_getPasswordsForSpecificFolder(store.user.username, store.temp.curr_folder).then( (res) => {
          this.passwords = res;
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

h1 {
  margin-left: 8vw;
  margin-bottom: 10vh;
}
</style>
