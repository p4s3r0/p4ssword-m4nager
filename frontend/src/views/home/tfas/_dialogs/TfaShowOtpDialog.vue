<script setup>
import { inject } from "vue";
import PMOtp from "@/components/PMOtp.vue";
import PMTextButton from "@/components/PMTextButton.vue";
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";

const dialogRef = inject('dialogRef');
const otpCode = dialogRef?.value?.data?.otpCode;

const toast = useToast();

function copyCode() {
  navigator.clipboard.writeText(otpCode);
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Copied to clipboard!",
    life: TOAST_LIFESPAN
  });
  dialogRef.value.close();
}
</script>

<template>
  <div class="tfa-show-otp-dialog">
    <PMOtp :otp-code="otpCode" />
    <div class="copy-container">
      <PMTextButton
        label="Copy Code"
        @click="copyCode()"
      />
    </div>
  </div>
</template>

<style scoped>
.tfa-show-otp-dialog {
  .copy-container {
    display: flex;
    justify-content: end;
    margin-top: 1rem;
  }
}
</style>