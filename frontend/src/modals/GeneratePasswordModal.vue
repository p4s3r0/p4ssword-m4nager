<script setup>
import { useToast } from "primevue/usetoast";
import { TOAST_LIFESPAN } from "@/helper/constants";
import { ref } from "vue";

const emit = defineEmits(['closeModal']);

const toast = useToast();
const password = ref("GENERATE_PASSWORD");
const password_length = ref(10);
const settings = [
  { name: "lowercase a-z", key: "L" },
  { name: "uppercase A-Z", key: "U" },
  { name: "numbers 0-9", key: "N" },
  { name: "symbols #-?", key: "S" },
];
const settings_values = ref([]);
const pool = {
  lowercases: "abcdefghijklmnopqrstuvwxyz",
  uppercases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: ",;.:-_#'+*~|@€!§%&/()=?{[]}^"
};

generatePassword();
document.body.style.overflow = "hidden";
function generatePassword() {
  password.value = "";
      let data_pool = "";
      for(let i = 0; i < settings_values.value.length; i++) {
        switch (settings_values.value[i]) {
          case 'lowercase a-z':
            data_pool += pool.lowercases;
            break;
          case 'uppercase A-Z':
            data_pool += pool.uppercases;
            break;
          case 'numbers 0-9':
            data_pool += pool.numbers;
            break;
          case 'symbols #-?':
            data_pool += pool.symbols;
            break;
        }
      }
      if (data_pool.length === 0) {
        data_pool += pool.lowercases;
        data_pool += pool.uppercases;
        data_pool += pool.numbers;
        data_pool += pool.symbols;
      }
      for(let i = 0; i < password_length.value; i++) {
        const index = Math.floor(Math.random() * (data_pool.length-0.0001));
        password.value += data_pool[index];
      }
    }

function copyToClipboard() {
  navigator.clipboard.writeText(password.value);
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Copied to Clipboard!",
    life: TOAST_LIFESPAN
  });
}
</script>

<template>
  <div id="blurredBackground">
    <div id="GeneratePasswordModalContainer">
      <div id="containsCheckBoxes">
        <h2>Generated Password</h2>
        <div style="width: 80%; margin-left: 10%; margin-top: -10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <InputText
              id="in_label"
              v-model="password"
              style="flex-grow: 1;"
            />
            <Button
              icon="pi pi-copy"
              icon-pos="left"
              style="background-color: white; margin-top: 10px; width: 50px;"
              @click="copyToClipboard"
            />
          </div>
        </div>
        <h2>Password should contain</h2>

        <div
          class="card flex justify-center"
          style="margin-top: -10px;"
        >
          <div class="flex flex-col gap-4">
            <div
              v-for="setting of settings"
              :key="setting.key"
              class="flex items-center"
              style="position: relative; margin-top: 10px;"
            >
              <Checkbox
                v-model="settings_values"
                :input-id="setting.key"
                name="setting"
                :value="setting.name"
                style="width:40px; height:40px"
              />
              <label
                style="width:70%; position: absolute; top:50%; transform: translateY(-50%); font-size: 1.2em;"
                :for="setting.key"
              >{{ setting.name }}</label>
            </div>
          </div>
        </div>
        <h2>Password Length</h2>
        <div
          class="card flex justify-center"
          style="margin-top: -20px;"
        >
          <div class="w-56">
            <InputNumber
              v-model.number="password_length"
              class="w-full mb-4"
              style="width: 100%;"
            />
            <Slider
              v-model="password_length"
              class="w-full"
              style="margin-top: 15px; width: 80%; margin-left: 10%"
              :min="5"
              :max="40"
            />
          </div>
        </div>
        <div style="margin-top: 30px; display: flex; justify-content: center;">
          <Button
            label="Close"
            icon="pi pi-times"
            icon-pos="left"
            style="background-color: white; margin-right: 5px;"
            @click="emit('closeModal')"
          />
          <Button
            label="Generate"
            icon="pi pi-key"
            icon-pos="left"
            style="background-color: white"
            @click="generatePassword()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#GeneratePasswordModalContainer {
    position: relative;
    background-color: var(--surface-0);
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
}

button {
    width: 150px;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: var(--surface-0);
}

#containsCheckBoxes {
    width: 80%;
    margin-left: 10%;
    margin-top: 10%;
}

input {
    margin-top: 10px;
}


@media (max-width : 700px) {
    #GeneratePasswordModalContainer {
        width: 98%;
        height: 98%;
    }
}
</style>