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
  width: calc(100% - 100px);
  height: 7vh;
  border-radius: 16px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #46464650;
  border: solid 0px black;
  color: white;
  margin-bottom: 10px;
}
input:focus {
    outline:none;
}


</style>
