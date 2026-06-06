<script setup>
import SymbolIcon from './SymbolIcon.vue';
import { ref } from "vue";

const props = defineProps({
  myValue: {
    type: String,
    default: undefined
  }
});

const emit = defineEmits(['removeApi']);
const curr_user_api_key = ref(false);
</script>

<template>
  <div
    class="container"
    :class="[{'mainApiKey': curr_user_api_key}]"
  >
    <p style="position: absolute; right: 50px; left: 10px; text-wrap: nowrap; overflow: hidden">
      {{ props.my_value }}
    </p>
    <div
      style="position: absolute; right: 10px; cursor: pointer;"
      @click="emit('removeApi')"
    >
      <SymbolIcon
        icon="remove"
        :inverted="curr_user_api_key"
      />
    </div>
  </div>
</template>

<style scoped>
    .container {
        position: relative;
        background-color: var(--lighter-back-color);
        border-radius: var(--border-radius);
        margin-bottom: 5px;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .mainApiKey {
      background-color: white;
      color: black;
    }
</style>
  