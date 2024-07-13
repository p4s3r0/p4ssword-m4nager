<template>
    <div v-if="this.is_pssw == true" class="passwordBox ripple">
        <div class="titleBox" @click="switchPasswordVisability()">
            <p id="title">{{ this.title }}</p>
            <input id="pssw" :type="this.display_type" placeholder="" v-model="this.value" />
        </div>
    </div>

    <div v-if="this.is_pssw == false" class="containerTextShower ripple" @click="copyContent()" >
        <p id="title">{{ this.title }}</p>
        
        <div >
            <p>{{ this.value }}</p>
        </div>
        
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { toasts_config_info } from "@/toasts";

export default {
    setup() {
        const toast = useToast();
        return { toast };
    },
    props: {
        title: { type: String },
        value: { type: String },
        is_pssw: { type: Boolean, default: false },
    },
    data() {
        return {
            password: this.text,
            display_type: "text",
        };
    },
    methods: {
        switchPasswordVisability() {
            if (this.display_type == "text") {
                this.display_type = "password";
            } else {
                this.display_type = "text";
            }
        },
        copyContent() {
            this.toast.info("Copied to Clipboard!", toasts_config_info);
            navigator.clipboard.writeText(this.value);
        },
    },
    beforeMount() {
        if (this.is_pssw == true) {
            this.display_type = "password";
        }
    },
};
</script>

<style scoped>
.containerTextShower {
    position: relative;
    font-size: 1em;
    padding-left: 15px;
    border-radius: 16px;
    color: white;
    margin-bottom: 5px;
    overflow-wrap: break-word;
    cursor: pointer;
    padding-top: 1px;
    min-height: 70px;
}


#pssw {
    width: 100%;
    background-color: transparent;
    border: none;
    color: white;
    pointer-events: none;
    padding-bottom: 15px;
    padding-top: 20px;
    font-size: 1.2em;
}



.passwordBox {
    padding-left: 15px;
    padding-top: 1px;
    border-radius: 16px;
    cursor: pointer;
}




#title {
    font-size: 0.8em;
    margin-bottom: -15px;
    color: #ffffff50;
}

p {
    font-size: 1.2em;
    line-height: 20px;
}

.containerTextShower:hover {
    background-color: #ffffff0a;
}





#titlePssw {
    font-size: 0.8em;
    color: #ffffff50;
    margin-bottom: -20px;
}
</style>
