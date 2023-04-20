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
  position: absolute;
  top: 7vh;
  right: 28%;
  width: 15vw;
  height: 10vw;
  background-color: rgb(213, 49, 49);
  border-radius: 16px; 
  margin-left: 8%;
  cursor: pointer;
}

p {
  position: absolute;
  transform: translate(-50%, -35%);
  left: 50%;
  color: black;
}
</style>
