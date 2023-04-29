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
components: {
}
}
</script>

<style scoped>
#mainFolder {
    width: 90%;
    height: 20vw;
    margin-left: 5%;
    margin-bottom: 8px;
    min-height: 15vw;
    border-radius: 16px; 
    display: flex;
    cursor: pointer;
}

p {
    color: white;
}

#amount {
    position: absolute;
    right: 15%;
    transform: translateY(100%);
}
#folderName {
    position: absolute;
    font-size: 1.2em;
    transform: translateY(-50%);
    margin-left: 20px;
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
  