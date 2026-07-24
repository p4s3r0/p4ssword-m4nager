<script>
export default {
  name: '404',
};
</script>

<template>
  <div id="Container404">
    <div id="innerContainer">
      <h1>{{ $t("error404.title") }}</h1>
      <a @click="$router.push('/')">{{ $t("common.returnToLogin") }}</a>
    </div>
  </div>
</template>
  


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
