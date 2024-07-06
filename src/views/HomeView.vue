<template>
    <div id="mainLogin">
        <h1 id="posHello">Hello, {{ this.user.username }} 👋</h1>
        <div id="rightTopButton">
            <download-button class="ripple" @click="download()"/>
            <upload-button class="ripple" @click="this.showUploadFileModal=true" />
            <lock-button class="ripple" @click="logout()"/>
        </div>
        <search-bar id="posSearchBar" @valueUpdated=search />
        <div class="showFoldersOrPasswords">
            <folders-password-filter class="ripple" text="Folders" @click="activateFoldersButton" :status="this.fold_pass_selector == 'Folders' ? 'active' : 'notActive'"/>
            <folders-password-filter class="ripple" text="Passwords" @click="activatePasswordsButton" :status="this.fold_pass_selector == 'Passwords' ? 'active' : 'notActive'"/>
            <folders-password-filter class="ripple" text="2FA" @click="activateTwoFAButton" :status="this.fold_pass_selector == 'twoFA' ? 'active' : 'notActive'"/>
        </div>
        

        <div id="wrapperl">
            <div class="loader" v-if="this.loading">

            </div>
            <div v-if="this.fold_pass_selector == 'Folders'" id="posFolders">
                        <folder v-for="f in this.folders" @click="openFolder(f.id, f.folder, f.color, f.starred)"
                                                        :key=f.key 
                                                        :name=f.folder
                                                        :color=f.color
                                                        :id=f.id 
                                                        :starred=f.starred 
                                                        :pass_amount="f.pass_amount "/>
            </div>

            <div v-else-if="this.fold_pass_selector=='Passwords'" id="posFolders">
                <password v-for="p in this.passwords"
                                                    :key=p.key 
                                                    :name=p.name
                                                    :enc_password=p.password
                                                    :username=p.username 
                                                    :id=p.id 
                                                    :folder=p.folder 
                                                    :note=p.note 
                                                    :starred=p.starred />
            </div>


            <div v-else id="posFolders">
                <two-f-a v-for="t in this.twoFactors"    
                                                :key="t.key"
                                                :name="t.name"
                                                :secret="t.secret" 
                                                :id="t.id" />
            </div>
        </div>
    
    <add-button class="ripple" @click="addNew" />
    <upload-file-modal v-if="this.showUploadFileModal" @closeModal="this.showUploadFileModal=false"/>
    </div>   
</template>
  
<script>
import SearchBar from '@/components/SearchBar.vue';
import FoldersPasswordFilter from '@/components/FoldersPasswordFilter.vue';
import AddButton from '@/components/AddButton.vue';
import Folder from '@/components/Folder.vue';
import LockButton from '@/components/LockButton.vue';
import Password from '@/components/Password.vue';
import TwoFA from '@/components/TwoFA.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import UploadButton from '@/components/UploadButton.vue';

import UploadFileModal from '@/modals/UploadFileModal.vue';


import { DBL_logoutUser, settings_getFolderOrPassword, settings_updateFolderOrPassword, getCurrentUser, DBL_getPasswords } from '@/dexie';
import { rankFoldersBySearch, rankPasswordsBySearch, rankPasswordsAlphabetically, rankFolderAlphabetically } from '@/scripts/search';
import { store, DECRYPT } from '@/store/store'

import { DB_getAllPasswords, DB_getAllFolders, DB_getAll2FA, DB_logoutUser } from '@/db'

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success } from '@/toasts';

export default {
name: 'App',
components: {
    SearchBar,
    FoldersPasswordFilter,
    AddButton,
    Folder,
    LockButton,
    Password,
    TwoFA,
    DownloadButton,
    UploadButton,
    UploadFileModal
},
setup() {
      const toast = useToast();
      return { toast }
},
data() {
    return {
        user: {},
        fold_pass_selector: "Folders",
        folders: [],
        passwords: [],
        twoFactors: [],
        new_app_version: "",
        loading: true,
        showUploadFileModal: false
    }
},
methods: {
    activateFoldersButton() {
        this.fold_pass_selector = "Folders";
        settings_updateFolderOrPassword("Folders")
    },
    activatePasswordsButton() {
        this.fold_pass_selector = "Passwords";
        settings_updateFolderOrPassword("Passwords")
    },
    activateTwoFAButton() {
        this.fold_pass_selector = "twoFA";
        settings_updateFolderOrPassword("twoFA")

    },
    logout() {
        DBL_logoutUser().then( () => {
            this.$router.push('/');
        })
        DB_logoutUser()
    },
    openFolder(folder_id, folder_name, folder_color, folder_starred) {
        store.temp.curr_folder_id = folder_id;        
        store.temp.curr_folder_name = folder_name;        
        store.temp.curr_folder_color = folder_color;     
        store.temp.curr_folder_starred = folder_starred;
        this.$router.push('/folder');
    },
    search(keyword) {
        if (this.fold_pass_selector == "Folders") {
            rankFoldersBySearch(keyword).then((res) => {
                this.folders = res;
            });
        } else {
            rankPasswordsBySearch(keyword).then((res) => {
                this.passwords = res;
            });
        }
    },
    addNew() {
        if (!navigator.onLine) {
            this.toast.error("No internet Connection!", toasts_config_error);
            return;
        }
        setTimeout(() => this.$router.push('/addPasswordOrFolder'), 300);
    },
    async download() {
        const passwords = await DBL_getPasswords();

        let str = '{\n\t"data": ['
        for(let i = 0; i < passwords.length; i++) {
            str += '\n{\n'
            str = str + '\t"name": "' + (passwords[i].name).replace('"', '\"') + '",\n';
            str = str + '\t"username": "' + (await DECRYPT(passwords[i].username)).replace('"', '\"') + '",\n';
            str = str + '\t"password": "' + (await DECRYPT(passwords[i].password)).replace('"', '\"') + '",\n';
            str = str + '\t"folder": "' + (passwords[i].folder).replace('"', '\"') + '",\n';
            str = str + '\t"note": "' + (await DECRYPT(passwords[i].note)).replace('"', '\"') + '",\n';
            str = str + '\t"idx": "' + passwords[i].idx + '",\n';
            str = str + '\t"starred": "' + passwords[i].starred + '"\n';
            str += "},"
        }
        str += "\n]}"


        const blob = new Blob([str], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "passwords.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    async upload() {

    }
}, beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
            DB_getAllPasswords().then( (res) => {
                this.passwords = rankPasswordsAlphabetically(res);
                // folders are loaded after passwords, to make sure the 
                //count is correct of the passwords inside the folder
                DB_getAllFolders(this.passwords).then( (res_fold) => {
                    this.folders = rankFolderAlphabetically(res_fold);
                    this.loading = false;
                });
            });
            DB_getAll2FA().then( (res) => {
                this.twoFactors = res;
            });
            settings_getFolderOrPassword().then( (res) => {
                this.fold_pass_selector = res;
            })
        } else {
            this.$router.push('/');
        }
    })
}
}
</script>

<style scoped>
#mainLogin {
}
#wrapperl {
    max-width: 700px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 100%;
}
#posHello {
    position: relative;
    margin-top: -10px;
    margin-left: 5%;
}
#posSearchBar {
    margin-top: 6vh;
} 



.showFoldersOrPasswords {
    margin-left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 90%;
    max-width: 800px;
}

button {
    width: 32vw;
    height: 4vh;
    margin-left: 5vw;
    background-color: #D9D9D90b;
    border-radius: 5px;
    border: none;
    color: white;
}

#posFolders {
    margin-top: 40px;
    width: 90%;
    max-width: 1000px;
}


#rightTopButton {
    display: flex;
    align-items: bottom;
    justify-content: right;
}


.ripple {
  background-position: center;
  transition: background 0.3s;
}

.ripple:active {
  background-color: #ffffff;
  background-size: 100%;
  transition: background 0.5s;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}


/* HTML: <div class="loader"></div> */
.loader {
    margin-left: 50%;
    margin-top: 100px;
    transform: translateX(-50%);
    width: 20%;
    aspect-ratio: 1;
    --_g: no-repeat radial-gradient(farthest-side,#fff 90%,#fff0);
    background: var(--_g), var(--_g), var(--_g), var(--_g);
    background-size: 40% 40%;
    animation: l46 1s infinite;
}
@keyframes l46 {
  0%  {background-position: 0 0      ,100% 0,100% 100%,0 100%}
  40%,
  50% {background-position: 100% 100%,100% 0,0    0   ,0 100%}
  90%,
  100%{background-position: 100% 100%,0 100%,0    0   ,100% 0}
}
</style>
