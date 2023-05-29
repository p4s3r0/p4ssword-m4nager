<template>
    <div id="mainEditFolder">
      <h1>Edit Folder</h1>
      <edit-text-input placeholder="Folder Name" :value="this.folder_name" @valueUpdated="updateFolderName"/>
      <selector :value="this.folder_color" @valueUpdated="updateFolderColor"/>
      <big-button-register-signin text="Apply Edit" @click="edit"/>
    </div>
  </template>
  
<script>
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import EditTextInput from '@/components/EditTextInput.vue';
import Selector from '@/components/Selector.vue';

import { DBL_refreshUserLogin } from '@/dexie';
import { DB_editFolder } from '@/supabase';

import { store, checkFolderValid, checkUserValid } from '@/store/store';

export default {
  name: 'App',
  components: {
    BigButtonRegisterSignin,
    EditTextInput,
    Selector
  },
  data() {
      return {
        folder_name: store.temp.curr_folder_name,
        folder_color: store.temp.curr_folder_color,
      }
  },
  methods: {
    updateFolderName(name) {
      this.folder_name = name;
    },
    updateFolderColor(color) {
      this.folder_color = color;
    },
    edit() {
      DB_editFolder(store.temp.curr_folder_id, this.folder_name, this.folder_color).then( () => {
        this.$router.push('/home');
      })
    }
  }, 
  beforeMount() {
    if(!checkUserValid()) {
      DBL_refreshUserLogin().then((res) => {
        if (!res) {
          DBL_logoutUser();
          this.$router.push('/');
        } else {
          if(!checkFolderValid()) {
            this.$router.push('/home');
          }
        }
      })
    } else {
      if(!checkFolderValid()) {
        this.$router.push('/home');
      }
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
