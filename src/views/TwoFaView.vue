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

    <home-button @click="this.$router.push('/home')" />
  </div>
</template>

<script>
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import TextShower from '@/components/TextShower.vue';
import HomeButton from '@/components/HomeButton.vue';

import { store } from '@/store/store';
import { getCurrentUser } from '@/dexie';
import { DB_delete2FA } from '@/db';

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success} from '@/toasts'

export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    SmallButtonDelete,
    SmallButtonEdit,
    TextShower,
    HomeButton
  },
  data() {
      return {
        user: {},
        name: store.temp.curr_2fa_name,
        secret: store.temp.curr_2fa_secret,
        id: store.temp.curr_2fa_id
      }
  },
  methods: {
    delete2FA() {
      DB_delete2FA(this.id).then((res) => {
        if (res) {
          this.toast.success("Password Deleted!", toasts_config_success);
            this.$router.push('/home');
          } else {
            this.toast.error("Something went Wrong!", toasts_config_error);
          }
      })
    },
    edit2FA() {
      this.$router.push('/edit2FA');
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