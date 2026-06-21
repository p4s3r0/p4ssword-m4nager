<script setup>
import { computed, ref, onMounted, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  optionLabel: {
    type: String,
    default: "label"
  },
  optionValue: {
    type: String,
    default: "value"
  }
});

const model = defineModel({ type: [String, Number, Object], default: "" });

const container = ref(null);
const optionRefs = ref([]);

const activeStyle = ref({
  width: '0px',
  transform: 'translateX(0px)'
});

const activeIndex = computed(() => {
  return props.options.findIndex(option => {
    const val = typeof option === 'object' ? option[props.optionValue] : option;
    return val === model.value;
  });
});

function updateActiveStyle() {
  const index = activeIndex.value;
  if (index !== -1 && optionRefs.value[index]) {
    const el = optionRefs.value[index];
    activeStyle.value = {
      width: `${el.offsetWidth}px`,
      transform: `translateX(${el.offsetLeft}px)`
    };
  }
}

function selectOption(option) {
  model.value = typeof option === 'object' ? option[props.optionValue] : option;
}

watch([activeIndex, optionRefs], () => {
  updateActiveStyle();
}, { deep: true, flush: 'post' });

onMounted(() => {
  updateActiveStyle();
});

function getOptionLabel(option) {
  if (typeof option === 'object') {
    return option[props.optionLabel];
  }
  return option;
}

function getOptionIcon(option) {
  if (typeof option === 'object') {
    return option.icon;
  }
  return undefined;
}

function getOptionValue(option) {
  if (typeof option === 'object') {
    return option[props.optionValue];
  }
  return option;
}
</script>

<template>
  <div
    ref="container"
    class="pm-select-button"
  >
    <div
      v-if="activeIndex !== -1"
      class="active-bg"
      :style="activeStyle"
    />
    <div
      v-for="(option, index) in props.options"
      :key="getOptionValue(option)"
      :ref="el => { if (el) optionRefs[index] = el }"
      class="pm-select-button-option"
      :class="{ 'pm-select-button-option-selected': model === getOptionValue(option) }"
      @click="selectOption(option)"
    >
      <div class="option-content">
        <i
          v-if="getOptionIcon(option)"
          :class="`pi ${getOptionIcon(option)}`"
        />
        <span v-if="getOptionLabel(option)">{{ getOptionLabel(option) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pm-select-button {
  position: relative;
  display: flex;
  border: 1px dashed var(--surface-900);
  padding: var(--gap-1);
  border-radius: var(--border-radius-4);
  width: fit-content;
  background-color: transparent;
  gap: var(--gap-1);

  .active-bg {
    position: absolute;
    top: var(--gap-1);
    left: 0; // Changed from var(--gap-1) to 0 because we use offsetLeft directly
    height: calc(100% - 2 * var(--gap-1));
    background-color: var(--surface-100);
    border-radius: var(--border-radius-4);
    transition: transform 0.2s ease, width 0.2s ease;
    z-index: 0;
  }

  .pm-select-button-option {
    position: relative;
    z-index: 1;
    cursor: pointer;
    padding: var(--gap-1) var(--gap-2);
    border-radius: var(--border-radius-4);
    color: var(--surface-800);
    transition: color 0.2s;
    min-width: 34px;
    display: flex;
    justify-content: center;

    &:hover:not(.pm-select-button-option-selected) {
      color: var(--surface-800);
    }

    &.pm-select-button-option-selected {
      color: var(--surface-900);
    }
  }
}

.option-content {
  display: flex;
  align-items: center;
  gap: var(--gap-2);

  i {
    font-size: 18px;
  }
}
</style>