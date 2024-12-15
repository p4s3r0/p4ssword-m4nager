<template>
  <div id="mainBigButtonRegisterSigning">
    <p>Cancel</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style scoped>
#mainBigButtonRegisterSigning {
  position: relative;
  bottom: 30px;
  width: 37.5vw;
  height: 70px;
  background-color: red;
  border-radius: 16px; 
  cursor: pointer;
  margin-left: 10px;
}

p {
  position: absolute;
  transform: translate(-50%, 50%);
  left: 50%;
  color: black;
}
</style>
