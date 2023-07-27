<template>
  <div id="mainLogin">
    <h1>{{ this.folder }}</h1>
    <div id="delEdit">
      <small-button-delete text="Delete" @click=deleteFolder() />
      <small-button-edit text="Edit" @click=editFolder() />

    </div>

    <password v-for="p in this.passwords"
                                          :key=p.key
                                          :name=p.name
                                          :enc_password=p.password
                                          :username=p.username
                                          :id=p.id 
                                          :folder=p.folder
                                          :note=p.note 
                                          :starred=p.starred />

    <home-button @click="this.$router.push('/home')" />
    
  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import AddButton from '@/components/AddButton.vue';
import HomeButton from '@/components/HomeButton.vue';

import { store } from '@/store/store';
import { getCurrentUser } from '@/dexie';
import { DB_deleteFolder, DB_getPasswordsForSpecificFolder } from '@/db'

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success } from '@/toasts';


export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    Password,
    SmallButtonDelete,
    SmallButtonEdit,
    AddButton,
    HomeButton
  },
  data() {
      return {
        user: {},
        folder: store.temp.curr_folder_name,
        folder_id: store.temp.curr_folder_id,
        passwords: []
      }
  },
  methods: {
    deleteFolder() {
      if (!navigator.onLine) {
        this.toast.error("No internet Connection!", toasts_config_error);
        return;
      }

      DB_deleteFolder(this.folder_id).then( (res) => {
        if(res) {
          this.toast.success("Folder Deleted!", toasts_config_success);
          this.$router.push('/home');
        } else {
          this.toast.error("Something went Wrong!", toasts_config_error);
        }
      })
    },
    editFolder() {
      if (!navigator.onLine) {
        this.toast.error("No internet Connection!", toasts_config_error);
        return;
      }
      this.$router.push('/editFolder');
    },
  }, 

  beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
            DB_getPasswordsForSpecificFolder(store.temp.curr_folder_name).then( (res) => {
              this.passwords = res;
            })
        } else {
            this.$router.push('/');
        }
    })
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
  margin-left: 40%;
  margin-bottom: 5vh;
  transform: translate(-40%);
}

h1 {
  margin-left: 8vw;
  margin-bottom: 3vh;
}
</style>
