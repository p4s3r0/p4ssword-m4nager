<template>
    <div class="containerCheckBox">
        <label class="container">SHA256
            <input type="checkbox" checked="checked" v-model="this.my_value" @click="this.$emit('valueUpdated', this.my_value)">
            <span class="checkmark"></span>
        </label>
    </div>
</template>
  
<script>
export default {
    name: 'containerCheckBox',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }, 
    data() {
        return {
            my_value: this.value
        }
        },
    methods: {
    },
    watch: { 
            value: function(newVal, oldVal) {
                this.my_value = newVal;
            }
        }
}
</script>
  
<style scoped>
.containerCheckBox {
    margin-top: 10px;
    margin-bottom: 10px;
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

  
</style>
  