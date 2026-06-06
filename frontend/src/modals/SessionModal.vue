<script setup>
import TextRemovable from "@/components/TextRemovable.vue";
import { useToast } from "vue-toastification";
import { DB_getApiKeys, DB_removeAPIKey } from '@/db';
import { ref } from "vue";

const emits = defineEmits(['closeModal', 'closeModalReload']);
const toast = useToast();
const api_keys = ref([]);

DB_getApiKeys().then((res) => {
  if (res) {
    api_keys.value = res;
  } else if (res === -1) {
    toast.error("Cant load 2FA, invalid parameters.");
  } else if (res === -2) {
    toast.error("Cant load 2FA, invalid API key.");
  } else {
    toast.error("API Error!");
  }
});

async function removeAPIKey(key) {
  const res = await DB_removeAPIKey(key);
  if(res === 0) {
    toast.success("Successfully removed API key");
    api_keys.value = api_keys.value.filter(key_elem => key_elem !== key);
  } else if (res === -1){
    toast.error("Cant remove API key");
  } else {
    toast.error("API Error");
  }
}
</script>

<template>
  <div id="blurredBackground">
    <div id="sessionsModalContainer">
      <h1 id="modalTitle">
        Active Sessions
      </h1>
      <div
        id="closeButton"
        @click="emit('closeModalReload')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
      <div style="width:100%; display: flex; flex-direction: column;">
        <div
          v-for="a in api_keys"
          :key="a"
        >
          <TextRemovable
            :my-value="a"
            @remove-api="removeAPIKey(a)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#sessionsModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    padding: 20px;
    padding-top: 0;
    overflow: scroll;
    max-height: 80vh;
}

#blurredBackground {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
}

#closeButton {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}

#modalTitle {
    border-bottom: 1px white solid;
}
</style>