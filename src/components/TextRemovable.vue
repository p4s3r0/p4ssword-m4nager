<template>
    <div class="container" :class='[{"mainApiKey": this.curr_user_api_key}]'>
      <p style="position: absolute; right: 50px; left: 10px; text-wrap: nowrap; overflow: hidden">{{ this.my_value }}</p>
      <div style="position: absolute; right: 10px; cursor: pointer;" @click="this.$emit('removeApi')">
          <SymbolIcon icon="remove" :inverted="this.curr_user_api_key"/>
      </div>
    </div>
</template>
  
<script>
import SymbolIcon from './SymbolIcon.vue';
import { getCurrentUser } from '@/dexie'

export default {
    name: 'App',
    props: ["my_value"],
    components: {
        SymbolIcon
    }, 
    data() {
        return {
          key: this.my_value,
          curr_user_api_key: false
        }
      },
    methods: {
    },
    watch: {
        my_value: function(newVal, oldVal) { // watch it
          this.key = newVal;
          getCurrentUser().then((user) => {
            if (user.api_key == this.key) {
              this.curr_user_api_key = true
            } else {
              this.curr_user_api_key = false
            }
          })
        }
    },
    beforeMount() {
      this.key = this.my_value
      getCurrentUser().then((user) => {
        if (user.api_key == this.my_value) {
          this.curr_user_api_key = true
        }
      }
      )
    }
  }
</script>

<style scoped>
    .container {
        position: relative;
        background-color: var(--lighter-back-color);
        border-radius: var(--border-radius);
        margin-bottom: 5px;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .mainApiKey {
      background-color: white;
      color: black;
    }
</style>
  