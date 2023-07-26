<template>
    <div id="mainModal">
        <h1>Your Application is not up to Date!</h1>
        <p>Please close and exit the Application and reopen it multiple times. If this message will still be there after 5 refreshs, contact developer.</p>
        <p>Current Version: {{ this.APP_VERSION }}</p>
        <p>Newest Version: {{ this.new_app_version }}</p>
        <button class="ripple" @click="this.$emit('closeModal')">Skip for Now!</button>
    </div>
</template>

<script>
export default {
name: 'outDatedModal',
props: ["new_app_version"],
components: {
}
}
</script>

<style scoped>
#mainModal {
    position: fixed;
    left: 1px;
    top: 1px;
    right: 1px;
    bottom: 1px;
    background: black;
    border: 1px white solid;
    padding: 10vw;
    border-radius: 5px;
}

button {
    position: absolute;
    width: 80vw;
    height: 60px;
    border-radius: 10px;
    border: 1px solid rgb(68, 169, 224);
    background: white;
    color: black;
    bottom: 60px;
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
  