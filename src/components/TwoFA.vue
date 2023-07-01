<template>
    <div id="container">
        <p id="name"> {{ this.name }} </p>
    </div>
</template>

<script>
import { store, checkUserValid } from '@/store/store';
import { DBL_refreshUserLogin } from '@/dexie';

export default {
name: 'App',
props: ["name"],
methods: {
    copyUsername() {
        console.log("get otp")
        navigator.clipboard.writeText("dec_username");
    },
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
    margin-right: 10px;
    cursor: pointer;
    top: 35px;
}

.starred {
    position: absolute;
    top: 0px;
    left: 5px;
    transform: translate(-50%, -50%);
    width: 30px;
    fill: #ffea00;
}


</style>
  