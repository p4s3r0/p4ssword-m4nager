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
  background-color: white;
  border-radius: 16px; 
  cursor: pointer;
}

p {
  text-align: center;
  color: black;
  top: 10px;
  transform: translateY(-50%);
}
</style>
