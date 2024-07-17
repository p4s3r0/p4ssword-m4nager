<template>
  <div id="mainLogin">
    <h1>{{ this.folder }}</h1>
    <div id="posDelEdit">
      <div id="delEdit">
        <small-button-delete text="Delete" @click=deleteFolder() />
        <small-button-edit text="Edit" @click="this.showEditModal=true" />
      </div>
    </div>

    <div id="wrapperl">

    <div id="posPasswords">
      <password v-for="p in this.passwords"
                                            @openPasswordModal="this.showViewPasswordModal = true"
                                            :key=p.key
                                            :name=p.name
                                            :enc_password=p.password
                                            :username=p.username
                                            :id=p.id 
                                            :folder=p.folder
                                            :note=p.note 
                                            :starred=p.starred />
      </div>
    </div>

    <home-button @click="this.$router.push('/home')" />
    

    <Transition name="bounce" mode="out-in">
      <view-password-modal
              v-if="this.showViewPasswordModal"
              @closeModal="
                  this.showViewPasswordModal = false;
                  resetScrolling();
              "
          />
    </Transition>
    <Transition name="bounce" mode="out-in">
      <edit-folder-modal v-if="this.showEditModal"
              @closeModal="
                  this.showEditModal = false;
                  resetScrolling();
              "/>
    </Transition>


  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import AddButton from '@/components/AddButton.vue';
import HomeButton from '@/components/HomeButton.vue';

import ViewPasswordModal from "@/modals/ViewPasswordModal.vue";
import EditFolderModal from "@/modals/EditFolderModal"

import { store } from '@/store/store';
import { getCurrentUser } from '@/dexie';
import { DB_deleteFolder, DB_getPasswordsForSpecificFolder } from '@/db'
import { rankPasswordsAlphabetically } from '@/scripts/search'

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
    HomeButton,
    ViewPasswordModal,
    EditFolderModal
  },
  data() {
      return {
        user: {},
        folder: store.temp.curr_folder_name,
        folder_id: store.temp.curr_folder_id,
        passwords: [],
        showViewPasswordModal: false,
        showEditModal: false
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
    resetScrolling() {
      document.body.style.overflow = "";
    },
  }, 

  beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
            DB_getPasswordsForSpecificFolder(store.temp.curr_folder_name).then( (res) => {
              this.passwords = rankPasswordsAlphabetically(res);
            })
        } else {
            this.$router.push('/');
        }
    })
  }
}

</script>

<style scoped>
#wrapperl {
    max-width: 700px;
    margin-left: 45%;
    transform: translateX(-50%);
    width: 100%;
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
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  transform: translateX(-50%);
  margin-left: 50%;
}

#posDelEdit {
  position: relative;

}

h1 {
  margin-left: 8%;
}

#posPasswords {
    margin-top: 40px;
    width: 90%;
    max-width: 1000px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

@media (min-width : 700px) {
  #wrapperl {
    margin-left: 48.5%;
}
}
</style>
