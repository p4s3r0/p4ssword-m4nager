<template>
    <div id="blurredBackground">
        <div id="viewTwoFAModalContainer">
            <div id="title">
                <h1>{{ this.name }}</h1>
            </div>
            <div id="closeButton" @click="this.$emit('closeModal')">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                >
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                    />
                </svg>
            </div>

            <div id="textShower">
                <attribute-value-shower v-if="this.secret != ''" title="Secret" :value="this.secret" />
            </div>
            <button class="deleteButton ripple" @click="delete2FA">
                <symbol-icon icon="trash"/>
            </button>

            <div id="editButtonContainer">
                <button class="editButton" @click="this.$router.push('/edit2FA');">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import AttributeValueShower from "@/components/AttributeValueShower.vue";
import SymbolIcon from "@/components/SymbolIcon.vue";

import { store } from "@/store/store";
import { DB_delete2FA } from "@/db";

export default {
    name: "twoFaModal",
    components: {
        AttributeValueShower,
        SymbolIcon
    },
    data() {
        return {
            name: store.temp.curr_2fa_name,
            secret: store.temp.curr_2fa_secret,
        };
    },
    methods: {
        delete2FA() {
            DB_delete2FA(store.temp.curr_2fa_id).then(this.$emit("closeModal"));
        }
    },
    beforeMount() {
        document.body.style.overflow = "hidden";
    },
};
</script>

<style scoped>
#viewTwoFAModalContainer {
    position: relative;
    background-color: var(--background-color);
    border: 1px white solid;
    border-radius: 16px;
    width: 60%;
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
    backdrop-filter: blur(5px);
}


#closeButton {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}

#title {
    margin-top: 35px;
    border-bottom: 1px white solid;
}

#textShower {
    margin-top: 30px;
}

#editButtonContainer {
    display: flex;
    justify-items: center;
    justify-content: center;
}

.editButton {
    height: 56px;
    width: 60%;
    background-color: #D9D9D90b;
    color: white;
    border: 0px;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: background 0.8s;

}
.editButton:hover {
    background-color: #d9d9d927;

}


.deleteButton {
    position: absolute;
    margin-top: 10px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.5);
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.deleteButton:hover {
    background-color: #d9d9d927;
}

@media (max-width: 700px) {
    #viewPasswordModalContainer {
        width: 80%;
        max-height: 80%;
    }
}
</style>
