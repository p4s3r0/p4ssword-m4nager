<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  otpCode: {
    type: String,
    required: true,
    validator: (value) => value.length === 6 && /^\d+$/.test(value)
  }
});

const displayDigits = ref(['0', '0', '0', '0', '0', '0']);
const isAnimating = ref([true, true, true, true, true, true]);

const animateSlot = (index, targetDigit) => {
  const duration = 1000; // Total duration 1s
  const startTime = Date.now();
  const finishTime = startTime + (index + 1) * (duration / 6);
  
  const interval = setInterval(() => {
    const now = Date.now();
    if (now >= finishTime) {
      displayDigits.value[index] = targetDigit;
      isAnimating.value[index] = false;
      clearInterval(interval);
    } else {
      displayDigits.value[index] = Math.floor(Math.random() * 10).toString();
    }
  }, 50);
};

onMounted(() => {
  for (let i = 0; i < 6; i++) {
    animateSlot(i, props.otpCode[i]);
  }
});
</script>

<template>
  <div class="pm-otp-container">
    <div 
      v-for="(digit, index) in displayDigits" 
      :key="index" 
      class="otp-slot"
      :class="{ 'animating': isAnimating[index] }"
    >
      {{ digit }}
    </div>
  </div>
</template>

<style scoped>
.pm-otp-container {
  display: flex;
  gap: var(--gap-1);
  justify-content: center;
  align-items: center;
}

.otp-slot {
  width: 3rem;
  height: 3.5rem;
  border: 1px solid var(--surface-200);
  border-radius: var(--gap-4);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  background: var(--surface-100);
  color: var(--surface-900);
}

.otp-slot.animating {
  color: var(--surface-200, #007bff);
}
</style>
