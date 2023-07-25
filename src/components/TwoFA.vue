<template>
    <div id="container">
        <p id="name"> {{ this.name }} </p>
        <div id="back" @click=open2FAView(this.name)></div>

            <div id="posIcons">
                    <svg class="ripple" @click="copyOtp" id="lockIcon" width="30" height="30" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_20_65)">
                        <path d="M5.75 9.58333V19.1667H18.2083V9.58333H5.75ZM17.25 7.66666H19.1667C19.4208 7.66666 19.6646 7.76763 19.8443 7.94735C20.024 8.12707 20.125 8.37083 20.125 8.62499V20.125C20.125 20.3792 20.024 20.6229 19.8443 20.8026C19.6646 20.9824 19.4208 21.0833 19.1667 21.0833H3.83333C3.57917 21.0833 3.33541 20.9824 3.15569 20.8026C2.97597 20.6229 2.875 20.3792 2.875 20.125V8.62499C2.875 8.37083 2.97597 8.12707 3.15569 7.94735C3.33541 7.76763 3.57917 7.66666 3.83333 7.66666H5.75V6.70833C5.75 5.18333 6.3558 3.7208 7.43414 2.64246C8.51247 1.56413 9.97501 0.958328 11.5 0.958328C13.025 0.958328 14.4875 1.56413 15.5659 2.64246C16.6442 3.7208 17.25 5.18333 17.25 6.70833V7.66666ZM15.3333 7.66666V6.70833C15.3333 5.69166 14.9295 4.71664 14.2106 3.99775C13.4917 3.27886 12.5167 2.87499 11.5 2.87499C10.4833 2.87499 9.50831 3.27886 8.78942 3.99775C8.07053 4.71664 7.66667 5.69166 7.66667 6.70833V7.66666H15.3333ZM6.70833 10.5417H8.625V12.4583H6.70833V10.5417ZM6.70833 13.4167H8.625V15.3333H6.70833V13.4167ZM6.70833 16.2917H8.625V18.2083H6.70833V16.2917Z" fill="black" />
                        </g>
                    </svg>
            </div>
    </div>
</template>

<script>
import { getCurrentUser } from '@/dexie';
import { useToast } from "vue-toastification";
import { store } from '@/store/store'
import { toasts_config_error, toasts_config_info } from '@/toasts'
import { DB_getOtpCode } from '@/db'

import { Clipboard } from "v-clipboard"


export default {
name: 'App',
props: ["name", "secret", "id"],
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
    async copyOtp() {
        DB_getOtpCode(this.id).then((otp_code) => {
            console.log(otp_code.data)
            if (otp_code.data.length !== 6) {
                this.toast.error("Something went wrong", toasts_config_error);
                return;
            }
            Clipboard.copy(otp_code.data)

            const data = otp_code.data
            navigator.clipboard.writeText(data);
            this.toast.info("Copied to Clipboard!", toasts_config_info);
        })
    },
    open2FAView() {
        store.temp.curr_2fa_name = this.name;
        store.temp.curr_2fa_secret = this.secret;
        store.temp.curr_2fa_id = this.id;
        this.$router.push('/twoFA');
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
#container {
    position: relative;
    width: 90%;
    margin-left: 5%;
    height: 70px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 16px; 
    display: flex;
    color: black;
    font-size: 1.2em;
    cursor: pointer;
}

#name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2em;
}

#posIcons {
    position: absolute;
    right: 10px;
    top: 35px;
}
#lockIcon {
    transform: translateY(-53%);
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
    top: 0px;
    left: 5px;
    transform: translate(-50%, -50%);
    width: 30px;
    fill: #ffea00;
}


.ripple {
  background-position: center;
  transition: background 0.5s;
}
.ripple:hover {
  background: #ffffff radial-gradient(circle, transparent 1%, #545454 1%) center/15000%;
}
.ripple:active {
  background-color: #ffffff;
  background-size: 100%;
  transition: background 0s;
}

</style>
  