<template>
    <div id="blurredBackground">
        <div id="GeneratePasswordModalContainer">
                <div id="containsCheckBoxes">
                    <h2>Generated Password</h2>
                    <div style="width: 80%; margin-left: 10%; margin-top: -10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                            <InputText id="in_label" v-model="this.password" style="flex-grow: 1;" />
                            <Button  icon="pi pi-copy" iconPos="left" style="background-color: white; margin-top: 10px; width: 50px;" @click="copyToClipboard"/>
                        </div>

                    </div>
                        <h2>Password should contain</h2>

                        <div class="card flex justify-center" style="margin-top: -10px;">
                            <div class="flex flex-col gap-4">
                                <div v-for="setting of settings" :key="setting.key" class="flex items-center" style="position: relative; margin-top: 10px;">
                                    <Checkbox v-model="settings_values" :inputId="setting.key" name="setting" :value="setting.name" style="width:40px; height:40px" />
                                    <label style="width:70%; position: absolute; top:50%; transform: translateY(-50%); font-size: 1.2em;" :for="setting.key">{{ setting.name }}</label>
                                </div>
                            </div>
                        </div>
                        <h2>Password Length</h2>
                        <div class="card flex justify-center" style="margin-top: -20px;">
                            <div class="w-56">
                                <InputNumber v-model.number="password_length" class="w-full mb-4" style="width: 100%;"/>
                                <Slider v-model="password_length" class="w-full" style="margin-top: 15px; width: 80%; margin-left: 10%" :min="5" :max="40"/>
                            </div>
                        </div>
                        <div style="margin-top: 30px; display: flex; justify-content: center;">
                            <Button label="Close" icon="pi pi-times" iconPos="left" style="background-color: white; margin-right: 5px;" @click="this.$emit('closeModal')"/>
                            <Button label="Generate" icon="pi pi-key" iconPos="left" style="background-color: white" @click="generatePassword()"/>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import TextShower from '@/components/TextShower.vue';
import { useToast } from "vue-toastification";

export default {
name: 'App',
setup() {
      const toast = useToast();
      return { toast }
    },
components: {
    TextShower
},
data() {
    return {
        password: "GENERATE_PASSWORD",
        password_length: 10,
        settings: [
            { name: "lowercase a-z", key: "L"},
            { name: "uppercase A-Z", key: "U"},
            { name: "numbers 0-9", key: "N"},
            { name: "symbols #-?", key: "S"},
        ],
        settings_values: [
        ],
        pool: {
            lowercases: "abcdefghijklmnopqrstuvwxyz",
            uppercases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numbers: "0123456789",
            symbols: ",;.:-_#'+*~|@€!§%&/()=?{[]}^" 
        }
    }
}, beforeMount() {
    this.generatePassword();
    document.body.style.overflow = "hidden"
},
methods: {
    generatePassword() {
        this.password = "";
        let data_pool = "";
        for(let i = 0; i < this.settings_values.length; i++) {
            switch (this.settings_values[i]) {
                case 'lowercase a-z':
                    data_pool += this.pool.lowercases;
                    break;
                case 'uppercase A-Z':
                    data_pool += this.pool.uppercases;
                    break;
                case 'numbers 0-9':
                    data_pool += this.pool.numbers;
                    break;
                case 'symbols #-?':
                    data_pool += this.pool.symbols;
                    break;
            }
        }
        if (data_pool.length == 0) {
            data_pool += this.pool.lowercases;
            data_pool += this.pool.uppercases;
            data_pool += this.pool.numbers;
            data_pool += this.pool.symbols;
        }
        for(let i = 0; i < this.password_length; i++) {
                const index = Math.floor(Math.random() * (data_pool.length-0.0001))
                this.password += data_pool[index];
            }
    },
    copyToClipboard() {
        navigator.clipboard.writeText(this.password);
        this.toast.info("Copied to Clipboard!");
    }
}
}
</script>

<style scoped>
#GeneratePasswordModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    padding: 20px;
    padding-top: 0px;
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




#leftButton {
    margin-right: 10px;
}

button {
    width: 150px;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: var(--background-color);
}

#passwordShower {
    width: 80%;
    margin-left: 10%;
    margin-top: 10%;
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