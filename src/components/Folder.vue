<template>
    <div id="mainFolder" :class="this.color">
      <p id="folderName">{{ this.name }} </p>
      <p id="amount"> {{ this.pass_amount }}</p>
    </div>
</template>

<script>

export default {
name: 'App',
props: ["name", "pass_amount", "color"],
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

</style>
  