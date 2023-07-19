<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>


<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
html {
  background-color: #131517;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: white;
  margin-top: 60px;
  -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
