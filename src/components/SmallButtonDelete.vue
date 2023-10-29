<template>
  <div id="mainBigButtonRegisterSigning">
    <p>{{ this.text }}</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  props: ["text"],
  components: {
  }
}
</script>

<style scoped>
#mainBigButtonRegisterSigning {
  width: 30vw;
  background-color: rgb(213, 49, 49);
  border-radius: 16px; 
  cursor: pointer;
  margin-right: 10px;
}

p {
  text-align: center;
  color: black;
  line-height: 0.3em;
  transform: translateY(30%);
}
</style>
