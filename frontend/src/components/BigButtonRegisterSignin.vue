<script setup>
const props = defineProps({
  text: {
    type: String,
    default: undefined
  }
});
</script>

<template>
  <div id="mainBigButtonRegisterSigning">
    <p>{{ props.text }}</p>
  </div>
</template>

<style scoped>
#mainBigButtonRegisterSigning {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: white;
  border-radius: 16px; 
  cursor: pointer;
  max-width: 300px;
  color: var(--surface-0);
}

p {
  color: black;
}
</style>
