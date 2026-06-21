<script setup>
import { inject, ref } from "vue";
import PMTextToggleSwitch from "@/components/PMTextToggleSwitch.vue";
import PMSlider from "@/components/PMSlider.vue";
import PMTextInput from "@/components/PMTextInput.vue";
import PMTextButton from "@/components/PMTextButton.vue";

const dialogRef = inject("dialogRef");
const passwordLength = ref(10);
const shouldContainOptions = ref({
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
});

const password = ref("");
generatePassword();
function generatePassword() {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";

  if (shouldContainOptions.value.uppercase) chars += uppercase;
  if (shouldContainOptions.value.lowercase) chars += lowercase;
  if (shouldContainOptions.value.numbers) chars += numbers;
  if (shouldContainOptions.value.symbols) chars += symbols;

  if (!chars) {
    password.value = "";
    return;
  }

  let generatedPassword = "";

  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    generatedPassword += chars[randomIndex];
  }

  password.value = generatedPassword;
}
</script>

<template>
  <div class="generate-password-dialog">
    <div class="options-container">
      <PMTextToggleSwitch
        v-model="shouldContainOptions.uppercase"
        text="Uppercase"
      />

      <PMTextToggleSwitch
        v-model="shouldContainOptions.lowercase"
        text="Lowercase"
      />

      <PMTextToggleSwitch
        v-model="shouldContainOptions.numbers"
        text="Numbers"
      />

      <PMTextToggleSwitch
        v-model="shouldContainOptions.symbols"
        text="Symbols"
      />

      <PMSlider
        v-model="passwordLength"
        label="Password Length"
        :min="3"
        :max="30"
      />

      <PMTextButton
        text="Generate"
        @click="generatePassword()"
      />

      <div class="divider" />
      <div class="password-container">
        <PMTextInput v-model="password" />
      </div>
      <PMTextButton
        text="Take"
        @click="dialogRef?.close({ password: password })"
      />
    </div>
  </div>
</template>

<style scoped>
.generate-password-dialog {
  padding: var(--gap-4);
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);

  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--surface-100);
    margin: var(--gap-2) 0;
  }

  .password-container {
    display: flex;
    width: 100%;
  }
}
</style>