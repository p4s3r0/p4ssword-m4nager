<template>
    <div id="mainSelector">
        <select name="cars" id="cars" v-model="this.my_value" @change="$emit('valueUpdated', this.my_value)">
            <option value="black">Black</option>
            <option value="darkRed">Dark Red</option>
            <option value="red">Red</option>
            <option value="darkOrange">Dark Orange</option>
            <option value="lightOrange">Light Orange</option>
            <option value="yellow">Yellow</option>
            <option value="lightGreen">Light Green</option>
            <option value="green">Green</option>
            <option value="blueGreen">Blue Green</option>
            <option value="blue">Blue</option>
            <option value="violet">Violet</option>
        </select>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11.828L9.17199 14.657L7.75699 13.243L12 9L16.243 13.243L14.828 14.657L12 11.828Z" opacity="0.59" fill="white"/>
        </svg>
    </div>
</template>


<script>
export default {
name: 'App',
props: ["value"],
data() {
      return {
        my_value: this.value == undefined ? "black" : this.value,
      }
  }
}
</script>

<style scoped>
#mainSelector {
    position: relative;
    width: 100%;
}

select {
    font-size: 1em;
    max-width: 1000px;
    width: 100%;
    height: 7vh;
    border-radius: 16px;
    padding-left: 50px;
    background-color: #D9D9D90b;
    border: solid 0px black;
    color: rgba(255, 255, 255, 0.35);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

select:focus {
    outline: none;
}


svg {
    position: absolute;
    top: 2.6vh;
    right: 25px;
    transform: rotate(180deg);
    pointer-events: none;
}

option { 
    background-color: #242424;
}

</style>
  