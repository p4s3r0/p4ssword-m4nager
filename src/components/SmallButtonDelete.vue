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
  height: 30px;
  background-color: rgb(213, 49, 49);
  border-radius: 16px; 
  cursor: pointer;
  margin-right: 10px;
}

p {
  text-align: center;
  color: black;
  top: 10px;
  transform: translateY(-50%);
}
</style>
