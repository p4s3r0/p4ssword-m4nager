<template>
  <div id="mainLogin">
    <h1> Password Data</h1>
    <div id="delEdit">
      <small-button-delete text="Delete" @click=deletePassword() />
      <small-button-edit text="Edit" @click=editPassword() />
    </div>
    <div>
      <svg v-if="!this.starred" class="notSelected" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68a1,1,0,0,0,.4,1,1,1,0,0,0,1.05.07L12,18.76l5.1,2.68a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.89l.72,4.19-3.76-2a1,1,0,0,0-.94,0l-3.76,2,.72-4.19a1,1,0,0,0-.29-.89l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"/>
        </svg>

        <svg v-else  viewBox="0 0 24 24" class="selected icon flat-color"><path id="primary" d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"></path></svg>
    </div>


    <div id="textShower">
      <text-shower v-if="this.name != ''" :text=this.name />
      <text-shower v-if="this.username != ''" :text=this.username />
      <text-shower v-if="this.password != ''" is_pssw="true" :text=this.password />
      <text-shower v-if="this.folder != 'NO FOLDER'" :text=this.folder />
      <text-shower v-if="this.note != ''" :text=this.note />
    </div>
    <home-button @click="this.$router.push('/home')" />
  </div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import TextShower from '@/components/TextShower.vue';
import HomeButton from '@/components/HomeButton.vue';

import { store } from '@/store/store';
import { getCurrentUser } from '@/dexie';
import { DB_deletePassword } from '@/db';

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
    TextShower,
    HomeButton
  },
  data() {
      return {
        id: store.temp.curr_password_id,
        name: store.temp.curr_password_name,
        username: store.temp.curr_password_username,
        password: store.temp.curr_password_password,
        folder: store.temp.curr_password_folder,
        note: store.temp.curr_password_note,
        starred: store.temp.curr_password_starred,
      }
  },
  methods: {
    deletePassword() {
      if (!navigator.onLine) {
        this.toast.error("No internet Connection!", toasts_config_error);
        return;
      }

      DB_deletePassword(this.id).then((res) => {
        if (res) {
          this.toast.success("Password Deleted!", toasts_config_success);
            this.$router.push('/home');
          } else {
            this.toast.error("Something went Wrong!", toasts_config_error);
          }
      })
    },
    editPassword() {
      if (!navigator.onLine) {
        this.toast.error("No internet Connection!", toasts_config_error);
        return;
      }
      this.$router.push('/editPassword');
    }
  }, 
  beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
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
  margin-left: 50%;
  max-width: 800px;
  margin-bottom: 5vh;
  transform: translate(-50%);
}

h1 {
  margin-left: 8%;
  margin-bottom: 3vh;
}

#textShower {
  margin-top: 10px;
  width: 90%;
  max-width: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

svg {
  height: 35px;
  width: 35px;
  margin-left: calc(50% - 20px);
  margin-top: 5px;
  margin-bottom: 20px;
}

.selected {
    fill: #d2dd0b;
}

.notSelected {
    fill: #ffffff;
}

</style>
