<template>
    <div id="mainModal">
        <h1>Your Application is not up to Date!</h1>
        <p>Please close and exit the Application and reopen it multiple times. If this message will still be there after 5 refreshs, contact developer.</p>
    </div>
</template>

<script>
export default {
name: 'outDatedModal',
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
</style>
  