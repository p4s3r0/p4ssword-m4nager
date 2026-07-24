<script setup>
import { inject } from "vue";
import PMTextButton from "@/components/PMTextButton.vue";

const dialogRef = inject("dialogRef");

const description = dialogRef?.value?.data?.description;
</script>

<template>
  <div class="delete-confirmation-dialog">
    <p class="description">
      {{ description }}
    </p>
    <div class="footer">
      <PMTextButton
        :text="$t('common.delete')"
        severity="delete"
        @click="dialogRef.close({ confirmed: true })"
      />
      <PMTextButton
        :text="$t('common.no')"
        @click="dialogRef.close({ confirmed: false})"
      />
    </div>
  </div>
</template>

<style scoped>
.delete-confirmation-dialog {
  .description {
    margin: 0;
    color: var(--surface-900);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--gap-5);
    gap: var(--gap-2);
  }
}
</style>
