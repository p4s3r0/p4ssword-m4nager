<template>
    <div id="mainUploadButton">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
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
#mainUploadButton {
    bottom: 0;
    padding-top: 10px;
    padding-left: 10px;
    width: 45px;
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
}

svg {
    zoom: 1.5;
}
</style>
  