<template>
    <div id="mainAddButton">
        <svg width="18" height="18" viewBox="0 0 10 10" fill="none">
        <path d="M4.79545 10.0057V0.630681H6.38636V10.0057H4.79545ZM0.903409 6.11364V4.52273H10.2784V6.11364H0.903409Z" fill="black"/>
</svg>

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
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background-color: white;
    cursor: pointer;
    box-shadow: rgb(38, 57, 77) 0px 20px 20px -10px;
    border: 1px black solid;
}

svg {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

</style>
  