<template>
    <div id="mainSelector">
        <select name="cars" id="cars" v-model="this.my_value" @change="$emit('valueUpdated', this.my_value)">
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
        </select>
    </div>
</template>

<script>

export default {
name: 'App',
data() {
      return {
        my_value: "black",
      }
  },
}
</script>

<style scoped>
#mainSelector {
    margin-top: 10px;
}

select {
    font-size: 1em;
    width: 75vw;
    height: 15vw;
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
  