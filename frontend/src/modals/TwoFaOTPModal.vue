
<script setup>
import { useToast } from "vue-toastification";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['closeModal']);
const toast = useToast();

async function copyOtp() {
  navigator.clipboard.writeText(props.code);
  toast.info("OTP Code copied to Clipboard");
}
</script>

<template>
  <div id="containerContainer">
    <div id="container">
      <h1>OTP Code</h1>
      <div
        id="closeButton"
        @click="emit('closeModal')"
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
      <div id="numbersContainer">
        <div class="singleNumber">
          <h2>{{ props.code[0] }}</h2>
        </div>

        <div class="singleNumber">
          <h2>{{ props.code[1] }}</h2>
        </div>

        <div class="singleNumber">
          <h2>{{ props.code[2] }}</h2>
        </div>
        <h1 id="numberSeparator">
          .
        </h1>
                
        <div class="singleNumber">
          <h2>{{ props.code[3] }}</h2>
        </div>

        <div class="singleNumber">
          <h2>{{ props.code[4] }}</h2>
        </div>

        <div class="singleNumber">
          <h2>{{ props.code[5] }}</h2>
        </div>
      </div>
      <button
        class="copyButton"
        @click="copyOtp()"
      >
        Copy to Clipboard
      </button>
    </div>
  </div>
</template>

<style scoped>
#container {
    position: absolute;
    background-color: var(--surface-0);
    padding: 10px 20px 10px 20px;
    border: solid 1px white;
    border-radius: var(--border-radius-2);
}
#containerContainer {
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


#numbersContainer {
    display: flex;
    margin-top: 20px;
}


.singleNumber {
    background: #1b1b1b;
    padding: 5px 10px 5px 10px;
    margin-right: 5px;
    border-radius: var(--border-radius-2);
}

h2, h1 {
    margin: 0;
}

h1 {
    border-bottom: 1px white solid;
    font-size:x-large;
    padding-top: 2px;
}

#closeButton {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}

.copyButton {
    height: 45px;
    width: 100%;
    background-color: white;
    color: var(--surface-0);
    border: 0;
    border-radius: 10px;
    margin-top: 20px;
    cursor: pointer;
    transition: background 0.8s;
}

#numberSeparator {
    border-bottom: none;
    margin-left: 0;
    margin-right: 5px;
}
</style>
  