<template>
    <div class="ripple" id="mainAddButton">
      <p>Add New</p>
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
#mainAddButton {
    margin-top: 10px;
    border-radius: 10px;
    margin-left: 50%;
    margin-bottom: 30px;
    transform: translateX(-50%);
    width: 80%;
    max-width: 300px;
    height: 60px;
    background-color: #D9D9D90b;
    cursor: pointer;
    color: white;
}

p {
    position: absolute;
    transform: translate(-50%, -130%);
    left: 50%;
    top: 50%;
}


.ripple {
  background-position: center;
  transition: background 0.3s;
}
.ripple:hover {
  background: #ffffff radial-gradient(circle, transparent 1%, #545454 1%) center/15000%;
  color: black;
}
.ripple:active {
  background-color: #ffffff;
  background-size: 100%;
  transition: background 0.5s;
}

</style>
  