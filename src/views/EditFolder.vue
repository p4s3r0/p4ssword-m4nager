<template>
  <div>
      <h1>Edit Folder</h1>
      <div id="userInput">
        <edit-text-input placeholder="Folder Name" :value="this.folder_name" @valueUpdated="updateFolderName"/>
        <selector :value="this.folder_color" @valueUpdated="updateFolderColor"/>
        <star-preferred :selected_init=this.folder_starred @valueUpdated="updateStarred" />
      </div>
      <div id="botButtons">
        <halve-button-apply @click="edit"/>
        <halve-button-cancel @click="this.$router.push('/home')"/>
      </div>
  </div>

  </template>
  
<script>
import EditTextInput from '@/components/EditTextInput.vue';
import Selector from '@/components/Selector.vue';
import StarPreferred from '@/components/StarPreferred.vue';
import HalveButtonApply from '@/components/HalveButtonApply.vue';
import HalveButtonCancel from '@/components/HalveButtonCancel.vue';

import { DB_editFolder } from '@/db';
import { store } from '@/store/store';
import { useToast } from "vue-toastification";
import { getCurrentUser } from '@/dexie';

import { toasts_config_error, toasts_config_success } from '@/toasts'; 

export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    HalveButtonApply,
    EditTextInput,
    Selector,
    StarPreferred,
    HalveButtonCancel
  },
  data() {
      return {
        user: {},
        folder_name: store.temp.curr_folder_name,
        folder_color: store.temp.curr_folder_color,
        folder_starred: store.temp.curr_folder_starred,
        folder_id: store.temp.curr_folder_id,
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
      DB_editFolder(this.folder_id, this.folder_name, this.folder_starred, this.folder_color).then( (res) => {
        if (res) {
          this.toast.success("Folder edited!", toasts_config_success);
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
  margin-bottom: 20vh;
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
