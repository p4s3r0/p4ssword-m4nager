<template>
    <div id="mainFolder">
        <div id="rectangle" :class="this.color"> </div>
      <p id="folderName">{{ this.name }} </p>
      <p id="amount"> {{ this.pass_amount }}</p>
    </div>
</template>

<script>

export default {
name: 'App',
props: ["name", "pass_amount", "color"],
components: {
}
}
</script>

<style scoped>
#mainFolder {
    width: 80%;
    height: 20vw;
    margin-left: 10%;
    margin-bottom: 10px;
    min-height: 15vw;
    background-color: white;
    border-radius: 16px; 
    display: flex;
}

p {
    color: black;
}

#amount {
    position: absolute;
    right: 15%;
    transform: translateY(100%);
}
#folderName {
    position: absolute;
    font-size: 1.5em;
    transform: translateY(-50%);
    margin-left: 15vw;
    margin-top: 10vw;
    max-width: 220px;
}

#rectangle {
    width: 10vw;
    height: 15vw;
    border-radius: 10px;
    margin-top: 2.5vw;
    margin-left: 2.5vw;
}

.black {
    background-color: black;
}
.green {
    background-color: rgb(35, 208, 93);
}
.red {
    background-color: rgb(218, 72, 70);
}
.blue {
    background-color: rgb(56, 113, 212);
}
</style>
  