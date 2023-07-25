<template>
  <div id="mainLogin">
    <h1>{{ this.folder }}</h1>
    <div id="delEdit">
      <small-button-delete text="Delete" @click=deleteFolder() />
      <small-button-edit text="Edit" @click=editFolder() />

    </div>

    <password v-for="p in this.passwords" :key=p.key
                                          :name=p.name
                                          :enc_password=p.password
                                          :username=p.username
                                          :id=p.id 
                                          :folder=p.folder
                                          :note=p.note 
                                          :starred=p.starred />

    <add-button @click="this.$router.push('/addPasswordOrFolder')" />
    
  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import AddButton from '@/components/AddButton.vue';

import { DB_getPasswordsForSpecificFolder, DB_deleteFolder } from '@/supabase';
import { store } from '@/store/store';
import { getCurrentUser } from '@/dexie';

import { useToast } from "vue-toastification";


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
  },
  data() {
      return {
        user: {},
        folder: store.temp.curr_folder_name,
        passwords: []
      }
  },
  methods: {
    deleteFolder() {
      DB_deleteFolder(this.user.username, store.temp.curr_folder_name).then( (res) => {
        if(res) {
          this.toast.success("Folder Deleted!", {
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
    },
    editFolder() {
      this.$router.push('/editFolder');
    }
  }, 
  beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
            DB_getPasswordsForSpecificFolder(user.username, store.temp.curr_folder_name).then( (res) => {
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
