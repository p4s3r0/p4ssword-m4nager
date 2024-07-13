<template>
    <div class="ripple" id="mainAddButton">
      <p>{{ this.text }}</p>
    </div>

</template>

<script>
export default {
name: 'App',
props: {
    text: {
        type: String,
        default: "Add New"
    }
},
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




</style>
  