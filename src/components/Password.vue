<template>
    <div id="mainPassword" class="ripple2">
        <svg v-if="this.starred" viewBox="0 0 24 24" class="starred icon flat-color"><path id="primary" d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" ></path></svg>
        <svg v-else viewBox="0 0 24 24" class="notStarred icon flat-color"><path id="primary" d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" ></path></svg>

        <div id="nameAndFolderContainer">
            <p id="passwordName">{{ this.name }} </p>
            <p id="passwordFolder"> {{ this.folder }}</p>
        </div>
        <div id="back" @click="openPasswordView(this.name, this.enc_password, this.username, this.id, this.folder, this.note, this.starred)">
        </div>
        <div id="posIcons">
                <svg class="ripple" @click="copyUsername" width="25" height="25" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="4" r="3" stroke="white" stroke-width="1" stroke-linecap="round"/>
                    <path d="M13 14C13 16.7614 9.76142 17 7 17C4.23858 17 1 16.7614 1 14C1 11.2386 4.23858 9 7 9C9.76142 9 13 11.2386 13 14Z" stroke="white" stroke-width="1" stroke-linecap="round"/>
                </svg>


                <svg class="ripple" @click="copyPassword" id="lockIcon" width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="16" height="16" rx="4" stroke="white" stroke-width="1" stroke-linejoin="round"/>
                    <path d="M10.6 8.59998C10.6 7.49541 11.4954 6.59998 12.6 6.59998H17V10.6H12.6C11.4954 10.6 10.6 9.70455 10.6 8.59998V8.59998Z" stroke="white" stroke-width="1" stroke-linejoin="round"/>
                    <circle cx="12.75" cy="8.65002" r="0.75" fill="white"/>
                    <path d="M4.79999 4.69995H7.79999" stroke="white" stroke-width="1" stroke-linecap="round"/>
                </svg>

        </div>
    </div>

</template>

<script>
import { getCurrentUser } from '@/dexie';
import { DECRYPT } from '@/store/store';
import { useToast } from "vue-toastification";
import { toasts_config_info } from '@/toasts'
import { store } from '@/store/store'

export default {
name: 'App',
props: ["name", "enc_password", "username", "id", "folder", "note", "starred"],
setup() {
      const toast = useToast();
      return { toast }
    },
data() {
    return {
        user: {},
    }
},
methods: {
    async copyUsername() {
        const dec_username = await DECRYPT(this.username);
        navigator.clipboard.writeText(dec_username);
        this.toast.info("Copied to Clipboard!", toasts_config_info);
    },
    async copyPassword() {
        const dec_password = await DECRYPT(this.enc_password);   
        navigator.clipboard.writeText(dec_password);
        this.toast.info("Copied to Clipboard!", toasts_config_info);
    },
    async openPasswordView(name, password, username, id, folder, note, starred) {
        store.temp.curr_password_id = id;
        store.temp.curr_password_name = name;
        store.temp.curr_password_username = await DECRYPT(username);
        store.temp.curr_password_password = await DECRYPT(password);
        store.temp.curr_password_folder = folder;
        store.temp.curr_password_note = await DECRYPT(note);
        store.temp.curr_password_starred = starred;
        this.$router.push('/password');
    }
    
}, beforeMount() {
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
#mainPassword {
    border-top: #ffffff10 1px solid;
    border-bottom: #ffffff10 1px solid;
    position: relative;
    width: 110%;
    height: 70px;
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
    right: 10px;
    top: 48px;
}
#lockIcon {
    transform: translateY(-50%);
}

#back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

svg {
    transform: translateY(-50%);
    margin-right: 0px;
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

</style>
  