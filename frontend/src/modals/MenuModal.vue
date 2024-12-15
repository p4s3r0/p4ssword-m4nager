<template>
    <div id="blurredBackground">
        <div id="menuModalContainer">
            <h1 id="modalTitle">Profile</h1>
            <p>version@{{ this.APP_VERSION }}</p>
            <div id="closeButton" @click="this.$emit('closeModal')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </div>
            <menu-button-selection name="Logout" icon="lock" @click="this.$emit('logoutClick')"/>
            <menu-button-selection name="Sessions" icon="session" @click="this.$emit('openSessionModal')"/>
            <menu-button-selection name="Download" icon="download" @click="this.$emit('downloadClick')"/>
            <menu-button-selection name="Upload" icon="upload" @click="this.$emit('uploadClick')"/>
        </div>
    </div>
</template>

<script>
import MenuButtonSelection from '@/components/MenuButtonSelection.vue'
import { APP_VERSION } from '@/main'

export default {
name: 'menuModal',
components: {
    MenuButtonSelection
},
data() {
    return {
        APP_VERSION: APP_VERSION
    }
}, 
methods: {
}, 
beforeMount() {
    document.body.style.overflow = "hidden"
}, 
}
</script>

<style scoped>
#menuModalContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 60%;
    max-width: 400px;
    min-width: 300px;
    padding: 20px;
    padding-top: 0px;
}

#blurredBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
}

#closeButton {
    position: absolute;
    top: 25px;
    right: 20px;
    cursor: pointer;
}


p {
    color: rgba(255, 255, 255, 0.259);
    margin-left: 10px;
}

#modalTitle {
    border-bottom: 1px white solid;
}
</style>