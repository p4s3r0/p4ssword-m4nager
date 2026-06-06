<script setup>
import SymbolIcon from './SymbolIcon.vue';

const props = defineProps( {
  name: {
    type: String,
    default: undefined
  },
  icon: {
    type: String,
    default: undefined
  }
});
</script>

<template>
  <div
    id="MenuButtonSelection"
    class="ripple2"
  >
    <div
      v-if="props.icon === 'lock'"
      class="icon"
    >
      <symbol-icon icon="lock" />
    </div>

    <div
      v-else-if="props.icon === 'session'"
      class="icon"
    >
      <symbol-icon icon="session" />
    </div>

    <div
      v-else-if="props.icon === 'download'"
      class="icon"
    >
      <symbol-icon icon="download" />
    </div>

    <div
      v-else-if="props.icon === 'upload'"
      class="icon"
    >
      <symbol-icon icon="upload" />
    </div>

    <div
      v-else-if="props.icon === 'folder'"
      class="icon"
    >
      <symbol-icon icon="folder" />
    </div>

    <div
      v-else-if="props.icon === 'password'"
      class="icon"
    >
      <symbol-icon icon="password" />
    </div>

    <div
      v-else-if="props.icon === '2fa'"
      class="icon"
    >
      <symbol-icon icon="2fa" />
    </div>
    <p> {{ props.name }} </p>
  </div>
</template>

<style scoped>
#MenuButtonSelection {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 40px;
  padding-left: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.icon {
  margin-right: 10px;
}




</style>
  