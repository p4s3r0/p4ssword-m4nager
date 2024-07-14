<template>
    <div>
      <input autocomplete="off" type="text" :placeholder="this.placeholder" v-model="this.my_value" @input="$emit('valueUpdated', this.my_value)">
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    props: ["placeholder"],
    components: {
    }, 
    data() {
        return {
          my_value: ""
        }
      },
    methods: {
    }
  }
  </script>
  
  <style scoped>
  input {
    font-size: 1em;
    width: calc(100% - 40px);
    height: 56px;
    border-radius: var(--border-radius);
    padding-left: 20px;
    padding-right: 20px;
    background-color: var(--background-color);
    border: solid 1px rgba(255, 255, 255, 0.5);
    color: white;
    margin-bottom: 5px;
  }
  input:focus {
      outline:none;
  }
  
  
  </style>
  