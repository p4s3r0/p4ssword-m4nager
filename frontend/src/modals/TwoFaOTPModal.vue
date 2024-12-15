<template>
    <div id="containerContainer">
        <div id="container">
            <h1>OTP Code</h1>
            <div id="closeButton" @click="this.$emit('closeModal')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </div>
            <div id="numbersContainer">
                <div class="singleNumber">
                    <h2>{{ this.code[0] }}</h2>
                </div>

                <div class="singleNumber">
                    <h2>{{ this.code[1] }}</h2>
                </div>

                <div class="singleNumber">
                    <h2>{{ this.code[2] }}</h2>
                </div>
                <h1 id="numberSeparator">.</h1>
                
                <div class="singleNumber">
                    <h2>{{ this.code[3] }}</h2>
                </div>

                <div class="singleNumber">
                    <h2>{{ this.code[4] }}</h2>
                </div>

                <div class="singleNumber">
                    <h2>{{ this.code[5] }}</h2>
                </div>
            </div>
            <button class="copyButton" @click="copyOtp()">Copy to Clipboard</button>

        </div>
    </div>

</template>

<script>
import { useToast } from "vue-toastification";


export default {
name: 'App',
props: ["OTPcode"],
setup() {
      const toast = useToast();
      return { toast }
    },
    components: {
        
    },
data() {
    return {
        code: 0
    }
},
methods: {
    async copyOtp() {
        navigator.clipboard.writeText(this.code);
        this.toast.info("OTP Code copied to Clipboard")
    },
}, beforeMount() {
    this.code = this.OTPcode 
},
watch: {
    OTPcode: function(newVal, oldVal) { // watch it
        this.code = newVal
    },
}
}
</script>

<style scoped>
#container {
    position: absolute;
    background-color: var(--background-color);
    padding: 10px 20px 10px 20px;
    border: solid 1px white;
    border-radius: var(--border-radius);
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
    border-radius: var(--border-radius);
}

h2, h1 {
    margin: 0px;
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
    color: var(--background-color);
    border: 0px;
    border-radius: 10px;
    margin-top: 20px;
    cursor: pointer;
    transition: background 0.8s;
}
.editButton:hover {
    background-color: #d9d9d927;
}


#numberSeparator {
    border-bottom: none;
    margin-left: 0px;
    margin-right: 5px;
}
</style>
  