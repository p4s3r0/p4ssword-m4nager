<template>
    <div id="mainEditPassword">
      <h1>Edit Password</h1>
      <div id="userInput">
        <edit-text-input class="smallSpacing" placeholder="Site Name" :value="this.curr_password_name" @valueUpdated="updatePasswordName"/>
        <edit-text-input class="smallSpacing" placeholder="Username" :value="this.curr_password_username" @valueUpdated="updatePasswordUsername"/>
        <edit-text-input placeholder="Password" :value="this.curr_password_password" @valueUpdated="updatePasswordPassword"/>
        <selector-folder :init_value=this.curr_password_folder class="smallSpacing" :value="this.curr_password_folder" @valueUpdated="updatePasswordFolder"/>
        <edit-text-input placeholder="Note" :value="this.curr_password_note" @valueUpdated="updatePasswordNote"/>
        <star-preferred :selected_init=this.curr_password_starred @valueUpdated="updateStarred" />
      </div>
      <div id="botButtons">
        <halve-button-apply @click="edit"/>
        <halve-button-cancel @click="this.$router.push('/home');" />
      </div>
    </div>
  </template>
  
<script>
import HalveButtonApply from '@/components/HalveButtonApply.vue';
import EditTextInput from '@/components/EditTextInput.vue';
import SelectorFolder from '@/components/SelectorFolder.vue';
import StarPreferred from '@/components/StarPreferred.vue';
import HalveButtonCancel from '@/components/HalveButtonCancel.vue'

import { getCurrentUser } from '@/dexie';
import { DB_editPassword } from '@/db';

import { store } from '@/store/store';

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success} from '@/toasts'
import HalveButtonCancelVue from '@/components/HalveButtonCancel.vue';

export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    EditTextInput,
    SelectorFolder,
    StarPreferred,
    HalveButtonApply,
    HalveButtonCancel
  },
  data() {
      return {
        curr_password_id: store.temp.curr_password_id,
        curr_password_name: store.temp.curr_password_name,
        curr_password_username: store.temp.curr_password_username,
        curr_password_password: store.temp.curr_password_password,
        curr_password_folder: store.temp.curr_password_folder,
        curr_password_note: store.temp.curr_password_note,
        curr_password_starred: store.temp.curr_password_starred,
      }
  },
  methods: {
    updatePasswordName(name) {
      this.curr_password_name = name;
    },
    updatePasswordUsername(username) {
      this.curr_password_username = username;
    },
    updatePasswordPassword(password) {
      this.curr_password_password = password;
    },
    updatePasswordFolder(folder) {
      this.curr_password_folder = folder;
    },
    updatePasswordNote(note) {
      this.curr_password_note = note;
    },
    updateStarred(starred) {
      this.curr_password_starred = starred;

    },
    edit() {
      //id, name, username, password, folder, note, starred
      DB_editPassword(this.curr_password_id, this.curr_password_name, this.curr_password_username, this.curr_password_password, this.curr_password_folder,
                      this.curr_password_note, this.curr_password_starred).then( (res) => {
        if(res == "OK") {
          this.toast.success("Password edited!", toasts_config_success);
          this.$router.push('/home');
        } else {
          this.toast.error("Something went Wrong!", toasts_config_error);
        }
      })
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
#userInput {
  width: 80%;
  left: 10%;
  right: 10%;
  margin-left: 50%;
  transform: translateX(-50%);
  max-width: 800px;
}

h1 {
  margin-bottom: 10vh;
  margin-left: 8%;
}



#botButtons {
  position: absolute;
  bottom: 10px;
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
}
</style>
