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
    border-radius: 50px;
    margin-right: 10px;
    padding-top: 2.5px;
    padding-bottom: 2.5px;
}

.active {
    background-color: white;
    border: solid 1px white;
    color: black
}

.notActive {
    border: solid 1px white;
}

</style>
  