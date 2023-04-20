<template>
    <div id="main" :class="this.status">
      <p>{{ this.text }}</p>
    </div>
</template>
  
<script>
export default {
    name: 'App',
    props: ["text", "status"],
    components: {
    }
}
</script>

<style scoped>
#main {
    text-align: center;
    width: 40vw;
    line-height: 0.3em;
    border-radius: 10px;
    margin-right: 10px;
}

.active {
    background-color: #46464650;
    border: solid 2px #46464600;
}

.notActive {
    border: solid 2px #46464650;
}

</style>
  