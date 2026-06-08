
<script setup>
import { DECRYPT } from '@/store/store';
import { useToast } from "vue-toastification";
import { store } from '@/store/store';
import SymbolIcon from './SymbolIcon.vue';
import { ref, watch } from "vue";
import { useUserStore } from "@/store/userStore";

const props = defineProps({
  name: {
    type: String,
    default: undefined
  },
  encPassword: {
    type: String,
    default: undefined
  },
  username: {
    type: String,
    default: undefined
  },
  id: {
    type: Number,
    default: undefined
  },
  folder: {
    type: String,
    default: undefined
  },
  note: {
    type: String,
    default: undefined
  },
  starred: {
    type: Boolean,
    default: undefined
  }
});

const emit = defineEmits(['openPasswordModal']);

const toast = useToast();
const userStore = useUserStore();
const user = ref({});
const username_saved = ref('INIT');
const password_saved = ref('INIT');

async function copyUsername() {
  navigator.clipboard.writeText(username_saved.value);
  toast.info("Copied Username to Clipboard!");
}

async function copyPassword() {
  navigator.clipboard.writeText(password_saved.value);
  toast.info("Copied to Clipboard!");
}

async function openPasswordView() {
  store.temp.curr_password_id = props.id;
  store.temp.curr_password_name = props.name;
  store.temp.curr_password_username = await DECRYPT(props.username);
  store.temp.curr_password_password = await DECRYPT(props.encPassword);
  store.temp.curr_password_folder = props.folder;
  store.temp.curr_password_note = await DECRYPT(props.note);
  store.temp.curr_password_starred = props.starred;
  emit('openPasswordModal');
}

watch(() => props.encPassword, async (newVal) => {
  DECRYPT(newVal).then((res) => {
    password_saved.value = res;
  });
});

watch(() => props.username, async (newVal) => {
  username_saved.value = await DECRYPT(newVal);
});

DECRYPT(userStore.username).then((res) => {
  username_saved.value = res;
});

DECRYPT(props.encPassword).then((res) => {
  password_saved.value = res;
});
</script>

<template>
  <div
    id="mainPassword"
    class="ripple2"
  >
    <svg
      v-if="starred"
      viewBox="0 0 24 24"
      class="starred icon flat-color"
    ><path
      id="primary"
      d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"
    /></svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      class="notStarred icon flat-color"
    ><path
      id="primary"
      d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"
    /></svg>

    <div id="nameAndFolderContainer">
      <p id="passwordName">
        {{ name }}
      </p>
      <p id="passwordFolder">
        {{ folder }}
      </p>
    </div>
    <div
      id="back"
      @click="openPasswordView()"
    />
    <div id="posIcons">
      <symbol-icon
        icon="user"
        class="ripple symbol"
        @click="copyUsername()"
      />
      <symbol-icon
        icon="password"
        class="ripple symbol"
        @click="copyPassword()"
      />
    </div>
  </div>
</template>


<style scoped>
#mainPassword {
    border-top: #ffffff20 1px solid;
    border-bottom: #ffffff20 1px solid;
    position: relative;
    width: 110%;
    height: 90px;
    display: flex;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 15px;
    border-radius: 10px;
    margin-bottom: -1px;
}

#passwordName {
    position: absolute;
    left: 60px;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#passwordFolder {
    position: absolute;
    color: #ffffff40;
    left: 60px;
    font-size: 0.8em;
    top: 35px;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#posIcons {
    position: absolute;
    display: flex;
    align-items: center;
    right: 15px;
    top: 24px;
}


.symbol {
    cursor: pointer;
    top: 35px;
    border-radius: 15px;
    padding: 10px;
}

.starred {
    position: absolute;
    top: 42px;
    left: 30px;
    transform: translate(-50%, -50%);
    width: 30px;
    fill: #FAFF00;
}

.notStarred {
    position: absolute;
    top: 42px;
    left: 30px;
    transform: translate(-50%, -50%);
    width: 30px;
    fill: #fbff0010; 
}


#back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

@media (max-width : 700px) {
    .ripple {
        background-position: center;
        transition: background 0.5s;
    }
    .ripple:hover {
        background: #0E0E0E radial-gradient(circle, transparent 1%, #0E0E0E 1%) center/15000%;
    }
    .ripple:active {
        background-color: white;
        background-size: 100%;
        transition: background 1s;
    }

    .ripple2 {
        background-position: center;
        transition: background 1s;
    }
    .ripple2:active {
        background-color: #1E1E1E;
        background-size: 100%;
        transition: background 0s;
    }
}



@media (min-width : 700px) {
    .ripple {
        background-position: center;
        transition: background 0.5s;
    }
    .ripple:hover {
        background: #ffffff90 radial-gradient(circle, transparent 1%, #545454 1%) center/15000%;
    }
    .ripple:active {
        background-color: #ffffff90;
        background-size: 100%;
        transition: background 0s;
    }

    .ripple2 {
        background-position: center;
        transition: background 1s;
    }
    .ripple2:hover {
        background: #1E1E1E radial-gradient(circle, transparent 1%, #545454a0 1%) center/15000%;
    }
    .ripple2:active {
        background-color: #1E1E1E;
        background-size: 100%;
        transition: background 0s;
    }
}





</style>
  