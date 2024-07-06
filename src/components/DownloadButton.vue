<template>
    <div id="mainDownloadButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960"  fill="#e8eaed"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
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
#mainDownloadButton {
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
  