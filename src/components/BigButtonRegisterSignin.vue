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
  bottom: 30px;
  width: 80vw;
  height: 70px;
  background-color: white;
  border-radius: 16px; 
  cursor: pointer;
}

p {
  position: absolute;
  transform: translate(-50%, 50%);
  left: 50%;
  color: black;
}
</style>
