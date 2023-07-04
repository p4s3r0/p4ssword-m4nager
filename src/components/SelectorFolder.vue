<template>
    <div id="mainSelector">
        <select v-model="this.my_value" @change="$emit('valueUpdated', this.my_value)">
            <option>NO FOLDER</option>
            <option v-for="f in this.folders" :key="f.key">{{ f.folder }} </option>
        </select>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11.828L9.17199 14.657L7.75699 13.243L12 9L16.243 13.243L14.828 14.657L12 11.828Z" opacity="0.59" fill="white"/>
        </svg>
    </div>
</template>

<script>
import { DBL_getFolders } from '@/dexie';

export default {
name: 'App',
props: ["init_value"],
data() {
      return {
        my_value: "NO FOLDER",
        folders: [],
      }
  }, beforeMount() {
    DBL_getFolders().then( (res) => {
        this.folders = res;
    })
    if (this.init_value != undefined) {
        this.my_value = this.init_value;
    }
  }
}
</script>

<style scoped>
#mainSelector {
    position: relative;
    margin-bottom: 5px;
}

select {
    font-size: 1em;
    width: 90%;
    height: 7vh;
    border-radius: 16px;
    padding-left: 9vw;
    background-color: #46464650;
    border: solid 0px black;
    color: rgba(255, 255, 255, 1);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

select:focus {
    outline: none;
}

svg {
    position: absolute;
    top: 2vh;
    right: 17.5%;
    transform: rotate(180deg);
    pointer-events: none;
}

option { 
    background-color: #242424;
}

</style>
  