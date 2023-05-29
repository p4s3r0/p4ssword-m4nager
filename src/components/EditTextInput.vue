<template>
    <input autocomplete="off" type="text" :placeholder="this.placeholder" v-model="this.my_value" @input="$emit('valueUpdated', this.my_value)">
</template>

<script>
export default {
  name: 'App',
  props: ["placeholder", "value"],
  components: {
  }, 
  data() {
      return {
        my_value: this.value
      }
    },
  methods: {
  }
}
</script>

<style scoped>
input {
  font-size: 1em;
  width: 79%;
  height: 7vh;
  border-radius: 16px;
  padding-left: 10vw;
  background-color: #46464650;
  border: solid 0px black;
  color: white;
}
input:focus {
    outline:none;
}
</style>
