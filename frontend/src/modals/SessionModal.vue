<template>
    <div id="blurredBackground">
        <div id="sessionsModalContainer">
            <h1 id="modalTitle">Active Sessions</h1>
            <div id="closeButton" @click="this.$emit('closeModalReload')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </div>
            <div style="width:100%; display: flex; flex-direction: column;">
                <TextRemovable v-for="a in this.api_keys" :my_value="a" @removeApi="removeAPIKey(a)"/>
            </div>
        </div>
    </div>
</template>

<script>
import TextRemovable from "@/components/TextRemovable.vue";

import { useToast } from "vue-toastification";

import { DB_getApiKeys, DB_removeAPIKey } from '@/db';


export default {
name: 'addModal',
    setup() {
      const toast = useToast();
      return { toast }
    },
    emits: ['closeModal'],
    components: {
        TextRemovable
    },
    data() {
    return {
        api_keys: []
    }
},
methods: {
    async removeAPIKey(key) {
        const res = await DB_removeAPIKey(key)
        if(res === 0) {
            this.toast.success("Successfully removed API key")
            this.api_keys = this.api_keys.filter(key_elem => key_elem !== key)
        } else if (res === -1){
            this.toast.error("Cant remove API key")
        } else {
            this.toast.error("API Error")
        }
    }
    },
beforeMount() {
    DB_getApiKeys().then((res) => {
        if (res) {
            this.api_keys = res
        } else if (res === -1) {
            this.toast.error("Cant load 2FA, invalid parameters.")
        } else if (res === -2) {
            this.toast.error("Cant load 2FA, invalid API key.")
        } else {
            this.toast.error("API Error!")
        }
    })

},
}
</script>

<style scoped>
#sessionsModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    padding: 20px;
    padding-top: 0px;
    overflow: scroll;
    max-height: 80vh;
}

#blurredBackground {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
}

#closeButton {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}

#modalTitle {
    border-bottom: 1px white solid;
}
</style>