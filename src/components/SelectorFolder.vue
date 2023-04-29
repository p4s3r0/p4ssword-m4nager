<template>
    <div id="mainSelector">
        <select name="cars" id="cars" v-model="this.my_value" @change="$emit('valueUpdated', this.my_value)">
            <option>NO FOLDER</option>
            <option v-for="f in this.folders" :key="f.key">{{ f.folder }} </option>
        </select>
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
    margin-top: 10px;
}

select {
    font-size: 1em;
    width: 90%;
    height: 7vh;
    border-radius: 16px;
    padding-left: 9vw;
    background-color: #46464650;
    border: solid 0px black;
    color: rgba(255, 255, 255, 0.35);
}

select:focus {
    outline: none;
}


</style>
  