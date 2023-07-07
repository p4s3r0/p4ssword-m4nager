<template>
    <div id="mainPassword">
        <svg v-if="this.starred" viewBox="0 0 24 24" class="starred icon flat-color"><path id="primary" d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" ></path></svg>

        <p id="passwordName">{{ this.name }} </p>
        <div id="back" @click=openPasswordView(this.enc_password)>

        </div>
        <div id="posIcons">
                <svg class="ripple" @click="copyUsername" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_19_53)">
                    <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM7.013 18.256C8.42855 19.3877 10.1877 20.0029 12 20C13.97 20 15.773 19.288 17.167 18.108C16.5157 17.4397 15.7371 16.9089 14.877 16.5468C14.017 16.1847 13.0931 15.9988 12.16 16C11.1926 15.9989 10.2355 16.1989 9.34947 16.5872C8.46343 16.9756 7.66778 17.5439 7.013 18.256ZM5.616 16.82C6.45645 15.9281 7.47067 15.2177 8.59614 14.7327C9.72161 14.2477 10.9345 13.9984 12.16 14C13.3417 13.9985 14.512 14.2304 15.6037 14.6824C16.6955 15.1344 17.6873 15.7976 18.522 16.634C19.3781 15.4291 19.8836 14.0106 19.9826 12.5359C20.0815 11.0612 19.77 9.58789 19.0825 8.27946C18.395 6.97102 17.3585 5.87862 16.088 5.12345C14.8174 4.36827 13.3625 3.97984 11.8846 4.00125C10.4067 4.02267 8.96366 4.45308 7.71552 5.24476C6.46738 6.03643 5.46296 7.1584 4.81369 8.4862C4.16442 9.814 3.89569 11.2957 4.03732 12.7669C4.17894 14.2382 4.72537 15.6414 5.616 16.821V16.82ZM12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9C8 7.93913 8.42143 6.92172 9.17157 6.17157C9.92172 5.42143 10.9391 5 12 5C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13ZM12 11C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9C14 8.46957 13.7893 7.96086 13.4142 7.58579C13.0391 7.21071 12.5304 7 12 7C11.4696 7 10.9609 7.21071 10.5858 7.58579C10.2107 7.96086 10 8.46957 10 9C10 9.53043 10.2107 10.0391 10.5858 10.4142C10.9609 10.7893 11.4696 11 12 11Z" fill="black"/>
                    </g>
                </svg>
    
                <svg class="ripple" @click="copyPassword" id="lockIcon" width="30" height="30" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_20_65)">
                    <path d="M5.75 9.58333V19.1667H18.2083V9.58333H5.75ZM17.25 7.66666H19.1667C19.4208 7.66666 19.6646 7.76763 19.8443 7.94735C20.024 8.12707 20.125 8.37083 20.125 8.62499V20.125C20.125 20.3792 20.024 20.6229 19.8443 20.8026C19.6646 20.9824 19.4208 21.0833 19.1667 21.0833H3.83333C3.57917 21.0833 3.33541 20.9824 3.15569 20.8026C2.97597 20.6229 2.875 20.3792 2.875 20.125V8.62499C2.875 8.37083 2.97597 8.12707 3.15569 7.94735C3.33541 7.76763 3.57917 7.66666 3.83333 7.66666H5.75V6.70833C5.75 5.18333 6.3558 3.7208 7.43414 2.64246C8.51247 1.56413 9.97501 0.958328 11.5 0.958328C13.025 0.958328 14.4875 1.56413 15.5659 2.64246C16.6442 3.7208 17.25 5.18333 17.25 6.70833V7.66666ZM15.3333 7.66666V6.70833C15.3333 5.69166 14.9295 4.71664 14.2106 3.99775C13.4917 3.27886 12.5167 2.87499 11.5 2.87499C10.4833 2.87499 9.50831 3.27886 8.78942 3.99775C8.07053 4.71664 7.66667 5.69166 7.66667 6.70833V7.66666H15.3333ZM6.70833 10.5417H8.625V12.4583H6.70833V10.5417ZM6.70833 13.4167H8.625V15.3333H6.70833V13.4167ZM6.70833 16.2917H8.625V18.2083H6.70833V16.2917Z" fill="black"/>
                    </g>
                </svg>
        </div>
    </div>

</template>

<script>
import { store, checkUserValid } from '@/store/store';
import CryptoJS from 'crypto-js';
import { DBL_refreshUserLogin } from '@/dexie';
import { DECRYPT } from '@/store/store';
import { useToast } from "vue-toastification";

export default {
name: 'App',
props: ["name", "enc_password", "username", "idx", "folder", "note", "starred"],
setup() {
      const toast = useToast();
      return { toast }
    },
methods: {
    copyUsername() {
        const dec_username = DECRYPT(this.username);        
        navigator.clipboard.writeText(dec_username);
        this.toast.info("Copied to Clipboard!", {
            position: "top-center",
            timeout: 1533,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: "button",
            icon: {
                iconClass: "undefined",
                iconChildren: "",
                iconTag: "i"
            },
            rtl: false
            });
    },
    copyPassword() {
        const dec_password = DECRYPT(this.enc_password);        
        navigator.clipboard.writeText(dec_password);
        this.toast.info("Copied to Clipboard!", {
            position: "top-center",
            timeout: 1533,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: {
                iconClass: "undefined",
                iconChildren: "",
                iconTag: "i"
            },
            rtl: false
            });
    },
    openPasswordView(pssw) {
        const dec_password = CryptoJS.AES.decrypt(pssw, store.user.password).toString(this.$CryptoJS.enc.Utf8);  
        store.temp.curr_password_id = this.idx;
        store.temp.curr_password_name = this.name;
        store.temp.curr_password_username = this.username;
        store.temp.curr_password_password = dec_password;
        store.temp.curr_password_folder = this.folder;
        store.temp.curr_password_note = this.note;
        store.temp.curr_password_starred = this.starred;
        this.$router.push('/password');
    }
}, beforeMount() {
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
#mainPassword {
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

#passwordName {
    position: absolute;
    left: 30px;
    font-size: 1.2em;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

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
  