<template>
    <div id="container" class="ripple2">
        <svg id="icon" width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4316 9.16096L14.9138 8.6788C16.5115 7.08106 16.5115 4.49061 14.9138 2.89286C13.3161 1.29512 10.7256 1.29512 9.12787 2.89287L7.19923 4.82151C5.60149 6.41925 5.60149 9.0097 7.19923 10.6074C7.49684 10.9051 7.8289 11.1472 8.18256 11.334" stroke="yellow" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M3.37514 8.64568L2.89299 9.12784C1.29524 10.7256 1.29524 13.316 2.89299 14.9138C4.49073 16.5115 7.08118 16.5115 8.67892 14.9138L10.6076 12.9851C12.2053 11.3874 12.2053 8.79694 10.6076 7.1992C10.195 6.7866 9.71618 6.48055 9.20537 6.28105" stroke="yellow" stroke-width="1.5" stroke-linecap="round"/>
        </svg>

        <p id="name"> {{ this.name }}  </p>
        <div id="back" @click=open2FAView(this.name)></div>

            <div id="posIcons">
                <svg class="ripple" @click="copyOtp()" id="lockIcon" width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import { useToast } from "vue-toastification";
import { store } from '@/store/store'
import { toasts_config_error, toasts_config_info } from '@/toasts'
import { DB_getOtpCode } from '@/db'



export default {
name: 'App',
props: ["name", "secret", "id"],
setup() {
      const toast = useToast();
      return { toast }
    },
data() {
    return {
    }
},
methods: {
    async copyOtp() {
        if (!navigator.onLine) {
            this.toast.error("No internet Connection!", toasts_config_error);
            return;
        }

        const otp_code = await DB_getOtpCode(this.id)
        if (otp_code.data.length !== 6) {
            this.toast.error("Something went wrong", toasts_config_error);
            return;
        }
        navigator.clipboard.writeText(otp_code.data);
        this.toast.info("Copied to Clipboard!", toasts_config_info);
    },
    open2FAView() {
        store.temp.curr_2fa_name = this.name;
        store.temp.curr_2fa_secret = this.secret;
        store.temp.curr_2fa_id = this.id;
        this.$router.push('/twoFA');
    },
    async plscopy() {
        const val = await this.copyOtp()
        navigator.clipboard.writeText(val);
    },
}, beforeMount() {
    getCurrentUser().then( (user) => {
        if(!user) {
            this.$router.push('/');
        }
    })
},
watch: {
    otp(newVal, oldVal) {
        navigator.clipboard.writeText(newVal);
    }
}
}
</script>

<style scoped>
#container {
    position: relative;
    border-top: #ffffff20 1px solid;
    border-bottom: #ffffff20 1px solid;
    width: 110%;
    height: 90px;
    display: flex;
    cursor: pointer;
    color: white;
    border-radius: 10px;
    margin-bottom: -1px;
}

#name {
    position: absolute;
    left: 110px;
    top: 15px;
    transform: translateX(-50%);
    font-size: 1.2em;
}

#posIcons {
    position: absolute;
    right: 10px;
    top: 45px;
}
#lockIcon {
    transform: translateY(-43%);
}

#icon {
    position: absolute;
    top: 45px;
    left: 7px;
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
  