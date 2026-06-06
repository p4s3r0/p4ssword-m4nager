<script>
const props = {
  text: {
    type: String,
    default: undefined
  },
  status: {
    type: String,
    default: undefined
  }
};
</script>

<template>
  <div
    id="main"
    :class="props.status"
  >
    <p>{{ props.text }}</p>
  </div>
</template>
  


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
  