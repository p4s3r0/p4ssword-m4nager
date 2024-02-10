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
    cursor: pointer;
}


.active {
    background: white;
    border: solid 1px white;
    color: black
}

.notActive:hover {
    background: #2E2E2E radial-gradient(circle, transparent 1%, #545454a0 1%) center/15000%;
}

.notActive {
    border: solid 1px white;
}

</style>
  