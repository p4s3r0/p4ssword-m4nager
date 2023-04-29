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
  