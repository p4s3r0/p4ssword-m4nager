<script setup>
const props = defineProps({
  val: {
    type: String,
    default: undefined
  }
});

const emit = defineEmits(['closeModal', 'confirmed']);
</script>

<template>
  <div id="containerContainer">
    <div id="deleteConfirmationModalContainer">
      <h1>Delete Confirmation</h1>
      <p>Are you sure you want to delete this {{ props.val }}</p>

      <div id="buttonsBottom">
        <Button
          label="Delete"
          icon="pi pi-trash"
          icon-pos="left"
          severity="danger"
          @click="emit('confirmed')"
        />
        <Button
          label="Cancel"
          icon="pi pi-chevron-left"
          icon-pos="left"
          style="margin-left: 5px;"
          @click="emit('closeModal')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#deleteConfirmationModalContainer {
    position: absolute;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 60%;
    max-width: 400px;
    padding: 20px;
    padding-top: 0;
}

#buttonsBottom {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
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