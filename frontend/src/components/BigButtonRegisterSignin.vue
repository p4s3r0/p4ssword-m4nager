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
  position: absolute;
  bottom: 30px;
  width: 80%;
  margin-left: 50%;
  transform: translateX(-54%);
  height: 70px;
  background-color: white;
  border-radius: 16px; 
  cursor: pointer;
  max-width: 300px;
  color: var(--surface-0);
}

p {
  position: absolute;
  transform: translate(-50%, 50%);
  left: 50%;
  color: black;
}
</style>
