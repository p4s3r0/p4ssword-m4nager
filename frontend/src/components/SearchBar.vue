<template>
  <div class="mainContainerSearchBar">
    <div id="lenseIconPos">
      <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" stroke="white" stroke-width="1.5"/>
        <path d="M13 13L16 16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>
    <input type="text" v-model="this.my_value" @input="$emit('valueUpdated', this.my_value)" placeholder="Search">
  </div>
</template>

<script>
export default {
  name: 'App',
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
.mainContainerSearchBar {
  position: relative;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -20px;
}

input {
  max-width: 700px;
  font-size: 1em;
  width: 70%;
  height: 60px;
  border-radius: 16px;
  padding-left: 70px;
  background-color: #D9D9D90b;
  border: solid 0px black;
  color: white;
}
input:focus {
    outline:none;
}

#lenseIconPos {
  position: relative;
  left: 50px;
  top: 2px
}
</style>
