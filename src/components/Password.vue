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

                <svg class="ripple" @click="copyPassword" id="lockIcon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed">
                        <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/>
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
        this.$emit('openPasswordModal');
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
    border-top: #ffffff20 1px solid;
    border-bottom: #ffffff20 1px solid;
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
  