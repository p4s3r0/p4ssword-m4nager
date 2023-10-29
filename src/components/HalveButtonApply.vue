<template>
  <div id="mainBigButtonRegisterSigning">
    <p>Apply Edit</p>
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
  width: 35%;
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
