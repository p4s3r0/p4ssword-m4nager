<script setup>
import { ref } from "vue";
import PMTextInput from "@/components/PMTextInput.vue";
import API from "@/plugins/axios";
import PMTextButton from "@/components/PMTextButton.vue";
import { ENCRYPT } from "@/plugins/encryption";
import { useToast } from "vue-toastification";
import { useDialog } from "primevue";

const toast = useToast();

const tfa = ref({});

const emit = defineEmits(["close-reload"]);

function addTfa() {
  API.post("tfas", {
    tfa: {
      name: tfa.value.name,
      secret: ENCRYPT(tfa.value.secret),
    }
  }).then(() => {
    toast.success("Tfa added!");
    emit("close-reload");
  });
}
</script>

<template>
  <div class="add-tfa">
    <PMTextInput
      v-model="tfa.name"
      name="name"
      label="Name"
    />
    <PMTextInput
      v-model="tfa.secret"
      name="secret"
      label="Secret"
    />

    <div class="footer">
      <PMTextButton
        text="Save"
        @click="addTfa"
      />
    </div>
  </div>
</template>

<style scoped>
.add-tfa {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);

  .footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>