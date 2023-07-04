<template>
  <div id="mainLogin">
    <h1> 2FA Data</h1>
    <div id="delEdit">
      <small-button-delete text="Delete" @click=delete2FA() />
      <small-button-edit text="Edit" @click=edit2FA() />
    </div>


    <div id="textShower">
      <text-shower v-if="this.name != ''" :text=this.name />
      <text-shower v-if="this.secret != ''" :text=this.secret />
    </div>

    <add-button @click="this.$router.push('/addPasswordOrFolder')" />
  </div>
</template>

<script>
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import AddButton from '@/components/AddButton.vue';
import TextShower from '@/components/TextShower.vue';

import { store, checkUserValid } from '@/store/store';
import { DBL_refreshUserLogin } from '@/dexie';
import { DB_delete2FA } from '@/supabase';

import { useToast } from "vue-toastification";

export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    SmallButtonDelete,
    SmallButtonEdit,
    AddButton,
    TextShower,
  },
  data() {
      return {
        name: store.temp.curr_2fa_name,
        secret: store.temp.curr_2fa_secret
      }
  },
  methods: {
    delete2FA() {
      DB_delete2FA(store.temp.curr_2fa_name).then((res) => {
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
    edit2FA() {
      this.$router.push('/edit2FA');
    }
  }, 
  beforeMount() {
    if(!checkUserValid()) {
        DBL_refreshUserLogin().then((res) => {
          if (!res) {
            DBL_logoutUser();
            this.$router.push('/');
          }
        })
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