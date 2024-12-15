<template>
  <div id="Container404">
    <div id="innerContainer">
      <h1>404 Site not found</h1>
      <a @click="this.$router.push('/')">Return to Login</a>
    </div>
  </div>
</template>
  
<script>


export default {
  name: '404',
}

</script>

<style scoped>
#Container404 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
}

a{
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
}

</style>
