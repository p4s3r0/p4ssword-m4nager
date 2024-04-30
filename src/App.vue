<template>
    <router-view v-slot=" { Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
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
  background-color: #0E0E0E;
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

</style>
