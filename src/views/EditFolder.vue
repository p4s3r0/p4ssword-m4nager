<template>
    <div id="mainEditFolder">
      <h1>Edit Folder</h1>
      <edit-text-input placeholder="Folder Name" :value="this.folder_name" @valueUpdated="updateFolderName"/>
      <selector :value="this.folder_color" @valueUpdated="updateFolderColor"/>
      <star-preferred :selected_init=this.folder_starred @valueUpdated="updateStarred" />

      <big-button-register-signin text="Apply Edit" @click="edit"/>
    </div>
  </template>
  
<script>
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue';
import EditTextInput from '@/components/EditTextInput.vue';
import Selector from '@/components/Selector.vue';
import StarPreferred from '@/components/StarPreferred.vue';

import { DBL_refreshUserLogin } from '@/dexie';
import { DB_editFolder } from '@/supabase';

import { store, checkFolderValid, checkUserValid } from '@/store/store';

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
    Selector,
    StarPreferred
  },
  data() {
      return {
        folder_name: store.temp.curr_folder_name,
        folder_color: store.temp.curr_folder_color,
        folder_starred: store.temp.curr_folder_starred,
      }
  },
  methods: {
    updateFolderName(name) {
      this.folder_name = name;
    },
    updateFolderColor(color) {
      this.folder_color = color;
    },
    updateStarred(starred) {
      this.folder_starred = starred;
    },
    edit() {
      DB_editFolder(store.temp.curr_folder_id, this.folder_name, this.folder_color, this.folder_starred).then( (res) => {
        if (res) {
          this.toast.success("Folder edited!", {
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
