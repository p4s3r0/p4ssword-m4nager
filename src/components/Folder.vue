<template>
    <div id="mainFolder" :class="this.color">
        <svg v-if="this.starred" viewBox="0 0 24 24" class="starred icon flat-color"><path id="primary" d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" ></path></svg>

        <p id="folderName">{{ this.name }} </p>
        <p id="amount"> {{ this.pass_amount }}</p>
    </div>
</template>

<script>
import { DBL_getPassAmount } from '@/dexie';

export default {
name: 'App',
props: ["name", "color", "starred", "id", "pass_amount"],
}
</script>

<style scoped>
#mainFolder {
    position: relative;
    width: 90%;
    margin-left: 5%;
    height: 70px;
    margin-bottom: 8px;
    border-radius: 16px; 
    display: flex;
    cursor: pointer;
}

p {
    color: white;
}

#amount {
    position: absolute;
    right: 30px;
    top: 10px;
}

#folderName {
    position: absolute;
    top: 35px;
    font-size: 1.2em;
    left: 30px;
    width: 70%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    transform: translateY(-130%);
}

.darkRed {
    background-color: #9e0142;
}

.red {
    background-color: #d53e4f;
}

.darkOrange {
    background-color: #FF5722;
}

.lightOrange {
    background-color: #FF9800;
}

.yellow {
    background-color: #FFEB3B;
}

.lightGreen {
    background-color: #8BC34A;
}
.green {
    background-color: #689F38;
}
.blueGreen {
    background-color: #66c2a5;
}
.blue {
    background-color: #3288bd;
}

.violet {
    background-color: #5e4fa2;
}


.black {
    background-color: black;
    border: 1px solid rgba(255, 255, 255, 0.277);
}

.starred {
    position: absolute;
    top: 0px;
    left: 5px;
    transform: translate(-50%, -50%);
    width: 30px;
    fill: #ffea00;
}

</style>
  