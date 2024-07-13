<template>
    <div id="GeneratePasswordModalContainer">
        <div>
            <div id="passwordShower">
                <TextShower :text="this.password"/>
            </div>

            <div id="containsCheckBoxes">
                <h2>Password should contain</h2>

                <label class="container">Lowercase a-z
                    <input type="checkbox" checked="checked" v-model="settings.lowercase">
                    <span class="checkmark"></span>
                </label>

                <label class="container">Uppercase A-Z
                    <input type="checkbox" checked="checked" v-model="settings.uppercase">
                    <span class="checkmark"></span>
                </label>

                <label class="container">Numbers 0-9
                    <input type="checkbox" checked="checked" v-model="settings.numbers">
                    <span class="checkmark"></span>
                </label>

                <label class="container">Symbols #-?
                    <input type="checkbox" checked="checked" v-model="settings.symbols">
                    <span class="checkmark"></span>
                </label>

                <div class="slidecontainer">Password Length: {{ this.settings.length }}
                    <input type="range" min="4" max="100" value="10" class="slider" id="myRange" v-model="settings.length">
                </div>

            </div>
            <div id="buttonsBottom">
                <button id="leftButton" class="ripple" @click="this.$emit('closeModal')">Close</button>
                <button class="ripple" @click="generatePassword()">Generate</button>
            </div>
        </div>
    </div>
</template>

<script>
import TextShower from '@/components/TextShower.vue';

export default {
name: 'App',
components: {
    TextShower
},
data() {
    return {
        password: "GENERATE_PASSWORD",
        settings: {
            lowercase: true,
            uppercase: true,
            numbers: true,
            symbols: true,
            length: 10
        },
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
        if(this.settings.lowercase) { data_pool += this.pool.lowercases; }
        if(this.settings.uppercase) { data_pool += this.pool.uppercases; }
        if(this.settings.numbers) { data_pool += this.pool.numbers; }
        if(this.settings.symbols) { data_pool += this.pool.symbols; }
        for(let i = 0; i < this.settings.length; i++) {
            const index = Math.floor(Math.random() * (data_pool.length-0.0001))
            this.password += data_pool[index];
        }
    }
}
}
</script>

<style scoped>
#GeneratePasswordModalContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #0E0E0E;
    border: 1px white solid;
    border-radius: 16px;
    width: 80%;
    max-width: 800px;
}


#buttonsBottom {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
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


 /* Customize the label (the container) */
 .container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
} 


.slidecontainer {
  width: 100%; /* Width of the outside container */
  margin-top: 50px;
}

/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #2196F3; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #2196F3; /* Green background */
  cursor: pointer; /* Cursor on hover */
}



@media (max-width : 700px) {
    #GeneratePasswordModalContainer {
        width: 98%;
        height: 98%;
    }

    #buttonsBottom {
        position: absolute;
        bottom: 10px;
    }
}
</style>