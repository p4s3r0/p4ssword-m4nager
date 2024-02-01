<template>
    <div id="mainAddButton">
        <svg stroke-width="2" width="25" height="35" viewBox="0 0 35 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.05768" y="17.3943" width="32.7885" height="26.2308" rx="1" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            <rect x="14.378" y="27.6406" width="5.32812" height="5.32812" rx="2.66406" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            <path d="M9.25478 9.19711C9.25478 4.66997 12.9248 1 17.4519 1V1C21.979 1 25.649 4.66997 25.649 9.19711V17.3942H17.4519H9.25478V9.19711Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
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
    position: absolute;
    top: 37px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 16px;
    cursor: pointer;
}

svg {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

</style>
  