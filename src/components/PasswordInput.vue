<template>
  <div id="container">
    <input @input="$emit('valueUpdated', this.my_value)" :type=this.password_state placeholder="Password" v-model="this.my_value">
    <i v-if="this.password_state == 'password'" @click=switchPasswordVisability()>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.59" clip-path="url(#clip0_8_25)">
        <path d="M7.39575 14.8691L5.86704 14.459L6.49008 12.1323C5.55747 11.7883 4.69072 11.2871 3.92746 10.6503L2.223 12.3555L1.10279 11.2353L2.80804 9.53088C1.84543 8.37802 1.19865 6.99498 0.931 5.51713L2.489 5.23292C3.08987 8.5595 6.00004 11.0833 9.5 11.0833C12.9992 11.0833 15.9101 8.5595 16.511 5.23292L18.069 5.51633C17.8017 6.99439 17.1552 8.37771 16.1927 9.53088L17.8972 11.2353L16.777 12.3555L15.0725 10.6503C14.3093 11.2871 13.4425 11.7883 12.5099 12.1323L13.133 14.4598L11.6042 14.8691L10.9804 12.5416C10.0006 12.7095 8.99939 12.7095 8.01958 12.5416L7.39575 14.8691Z" fill="white"/>
      </g>
      </svg>
    </i>

    <i v-else @click=switchPasswordVisability()>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.59" clip-path="url(#clip0_8_29)">
      <path d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.608 21 2.122 17.12 1.181 12C2.121 6.88 6.608 3 12 3ZM12 19C14.0395 18.9996 16.0184 18.3068 17.6129 17.0352C19.2073 15.7635 20.3229 13.9883 20.777 12C20.3212 10.0133 19.2049 8.24 17.6106 6.97003C16.0163 5.70005 14.0383 5.00853 12 5.00853C9.9617 5.00853 7.98369 5.70005 6.38938 6.97003C4.79506 8.24 3.67877 10.0133 3.223 12C3.6771 13.9883 4.79267 15.7635 6.38714 17.0352C7.98161 18.3068 9.96053 18.9996 12 19ZM12 16.5C10.8065 16.5 9.66193 16.0259 8.81802 15.182C7.97411 14.3381 7.5 13.1935 7.5 12C7.5 10.8065 7.97411 9.66193 8.81802 8.81802C9.66193 7.97411 10.8065 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.663 14.5 13.2989 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.2989 9.76339 12.663 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2322 10.2322C9.76339 10.7011 9.5 11.337 9.5 12C9.5 12.663 9.76339 13.2989 10.2322 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z" fill="white"/>
      </g>
      </svg>
    </i>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
      return {
        password_state: "password",
        my_value: ""
      }
    },
  methods: {
    switchPasswordVisability() {
      this.password_state = this.password_state == "password" ? "text" : "password";
    }
  }
}
</script>

<style scoped>
#container {
  position: relative;
  margin-bottom: 5px;
  margin-top: -3.5px;
}


input {
  font-size: 1em;
  width: 70%;
  height: 7vh;
  border-radius: 16px;
  padding-left: 10%;
  padding-right: 10%;
  background-color: #46464650;
  border: solid 0px black;
  color: white;
}
input:focus {
    outline:none;
}


i {
  position: absolute;
  right: 15%;
  transform: translateY(-50%);
  width: 30px;
  top: 50%;
  padding-left: 10px;
}
</style>
