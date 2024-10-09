<template>
	<div id="containerContainer">
        <div id="deleteConfirmationModalContainer">
            <h1>Delete Confirmation</h1>
            <p>Are you sure you want to delete this {{ this.val }}</p>

            <div id="buttonsBottom">
                <button id="leftButton" class="ripple" @click="this.$emit('confirmed')">Yes</button>
                <button class="ripple" @click="this.$emit('closeModal')">No</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
name: 'modalDeleteConfirmationModal',
props: {
    val: {
        type: String,
    }
},
components: {
},
data() {
    return {
    }
}, 
methods: {
}, 
beforeMount() {
}, 
}
</script>

<style scoped>
#deleteConfirmationModalContainer {
    position: absolute;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 60%;
    max-width: 400px;
    padding: 20px;
    padding-top: 0px;
}

#buttonsBottom {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}
#leftButton {
    margin-right: 10px;
}

button {
    width: 150px;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: var(--background-color);
}

#containerContainer {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
}
</style>