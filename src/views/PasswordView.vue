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
      <star-preferred :selected_init=this.starred />
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

import { store, checkUserValid, checkPasswordValid, DECRYPT } from '@/store/store';
import { DBL_refreshUserLogin, DBL_getPasswordsByIdx } from '@/dexie';
import { DB_deletePassword } from '@/supabase';

import CryptoJS from 'crypto-js';
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
    TextShower,
  },
  data() {
      return {
        name: "",
        username: "",
        password: "",
        folder: "",
        note: "",
        starred: true,
      }
  },
  methods: {
    deletePassword() {
      DB_deletePassword(store.temp.curr_password_id, this.folder).then((res) => {
        if (res) {
          this.toast.success("Password Deleted!", {
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
                this.username =  DECRYPT(res.username);
                this.password = DECRYPT(res.password);        
                this.folder = res.folder;
                this.note = DECRYPT(res.note); 
                this.starred = res.starred;
              })
              console.log("Hello")
            }
          }
        })
    } else {
      if(!checkPasswordValid()) {
        this.$router.push('/home');
      } else {
        DBL_getPasswordsByIdx(store.temp.curr_password_id).then( (res) => {
          this.name = res.name;
          this.username =  DECRYPT(res.username);
          this.password = DECRYPT(res.password);        
          this.folder = res.folder;
          this.note = DECRYPT(res.note); 
          this.starred = res.starred;
        })
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
