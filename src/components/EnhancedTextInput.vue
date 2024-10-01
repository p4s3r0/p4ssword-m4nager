<template>
  <div>
    <p v-if="this.title !== 'NO TITLE'">
      {{this.title}}
    </p>
    <input autocomplete="off" type="text" :placeholder="this.placeholder" v-model="this.my_value" @input="$emit('valueUpdated', this.my_value)">
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "NO TITLE"
    },
    value: {
      type: String,
      default: ""
    }
  },
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
  width: calc(100% - 40px);
  height: 56px;
  border-radius: var(--border-radius);
  padding-left: 20px;
  padding-right: 20px;
  background-color: var(--background-color);
  border: solid 1px rgba(255, 255, 255, 0.5);
  color: white;
  transition: border 0.5s;
  margin-bottom: 5px;
  padding-top: 0;
  padding-bottom: 0;
}
input:focus {
  outline: none;
  border: 1px white solid;
}
  

p {
  font-size: 0.8em;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #ffffff50;
}
  
</style>
  