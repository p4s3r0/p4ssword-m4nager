<template>
  <div class="mainContainerSearchBar">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g clip-path="url(#clip0_9_64)">
      <path d="M13.5233 12.4628L16.7355 15.6742L15.6742 16.7355L12.4628 13.5233C11.2678 14.4812 9.7815 15.0022 8.25 15C4.524 15 1.5 11.976 1.5 8.25C1.5 4.524 4.524 1.5 8.25 1.5C11.976 1.5 15 4.524 15 8.25C15.0022 9.7815 14.4812 11.2678 13.5233 12.4628ZM12.0187 11.9062C12.9706 10.9274 13.5022 9.61532 13.5 8.25C13.5 5.349 11.1503 3 8.25 3C5.349 3 3 5.349 3 8.25C3 11.1503 5.349 13.5 8.25 13.5C9.61532 13.5022 10.9274 12.9706 11.9062 12.0187L12.0187 11.9062Z" fill="white"/>
      </g>
    </svg>
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
}
input {
  font-size: 1em;
  width: 60vw;
  height: 70px;
  border-radius: 16px;
  padding-left: 12vw;
  background-color: #46464650;
  border: solid 0px black;
  color: white;
}
input:focus {
    outline:none;
}

svg {
  position: absolute;
  top: 35px;
  transform: translateY(-50%);
  width: 30px;
  padding-left: 10px;
}
</style>
