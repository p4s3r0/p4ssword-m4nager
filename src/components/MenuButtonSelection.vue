<template>
    <div id="MenuButtonSelection" class="ripple2">
      <div class="icon" v-if="this.icon=='lock'">
        <symbol-icon icon="lock"/>
      </div>

      <div class="icon" v-else-if="this.icon=='download'">
        <symbol-icon icon="download" />
      </div>

      <div class="icon" v-else-if="this.icon=='upload'">
        <symbol-icon icon="upload" />
      </div>

      <div class="icon" v-else-if="this.icon=='folder'">
        <symbol-icon icon="folder" />
      </div>

      <div class="icon" v-else-if="this.icon=='password'">
        <symbol-icon icon="password" />
      </div>

      <div class="icon" v-else-if="this.icon=='2fa'">
        <symbol-icon icon="2fa" />
      </div>
      <p> {{ this.name }} </p>
    </div>
</template>

<script>
import SymbolIcon from './SymbolIcon.vue';
export default {
name: 'App',
components: {
  SymbolIcon
},
props: {
    name: String,
    icon: String
},
}
</script>

<style scoped>
#MenuButtonSelection {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 40px;
  padding-left: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.icon {
  margin-right: 10px;
}




</style>
  