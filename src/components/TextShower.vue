<template>
    <div class="containerTextShower"> 
        <p v-if="this.is_pssw != 'true'">{{ this.text }}</p>
        
        <div v-else>
            <input id="pssw" :type=this.display_type placeholder="" v-model="this.password"/>
            <div id="posIcon">
                <i v-if="this.display_type == 'password'" @click=switchPasswordVisability()>
                    <svg id="eyeIcon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.59" clip-path="url(#clip0_8_25)">
                        <path d="M7.39575 14.8691L5.86704 14.459L6.49008 12.1323C5.55747 11.7883 4.69072 11.2871 3.92746 10.6503L2.223 12.3555L1.10279 11.2353L2.80804 9.53088C1.84543 8.37802 1.19865 6.99498 0.931 5.51713L2.489 5.23292C3.08987 8.5595 6.00004 11.0833 9.5 11.0833C12.9992 11.0833 15.9101 8.5595 16.511 5.23292L18.069 5.51633C17.8017 6.99439 17.1552 8.37771 16.1927 9.53088L17.8972 11.2353L16.777 12.3555L15.0725 10.6503C14.3093 11.2871 13.4425 11.7883 12.5099 12.1323L13.133 14.4598L11.6042 14.8691L10.9804 12.5416C10.0006 12.7095 8.99939 12.7095 8.01958 12.5416L7.39575 14.8691Z" fill="white"/>
                    </g>
                    </svg>
                </i>
    
                <i v-else id="eyeIcon" @click=switchPasswordVisability()>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.59" clip-path="url(#clip0_8_29)">
                        <path d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.608 21 2.122 17.12 1.181 12C2.121 6.88 6.608 3 12 3ZM12 19C14.0395 18.9996 16.0184 18.3068 17.6129 17.0352C19.2073 15.7635 20.3229 13.9883 20.777 12C20.3212 10.0133 19.2049 8.24 17.6106 6.97003C16.0163 5.70005 14.0383 5.00853 12 5.00853C9.9617 5.00853 7.98369 5.70005 6.38938 6.97003C4.79506 8.24 3.67877 10.0133 3.223 12C3.6771 13.9883 4.79267 15.7635 6.38714 17.0352C7.98161 18.3068 9.96053 18.9996 12 19ZM12 16.5C10.8065 16.5 9.66193 16.0259 8.81802 15.182C7.97411 14.3381 7.5 13.1935 7.5 12C7.5 10.8065 7.97411 9.66193 8.81802 8.81802C9.66193 7.97411 10.8065 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.663 14.5 13.2989 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.2989 9.76339 12.663 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2322 10.2322C9.76339 10.7011 9.5 11.337 9.5 12C9.5 12.663 9.76339 13.2989 10.2322 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z" fill="white"/>
                    </g>
                    </svg>
                </i>
            </div>

        </div>

        <div id="copyIcon" @click=copyContent()>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.59" clip-path="url(#clip0_1_12674)">
                <path  d="M7 6V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H17V21C17 21.552 16.55 22 15.993 22H4.007C3.87513 22.0008 3.7444 21.9755 3.62232 21.9256C3.50025 21.8757 3.38923 21.8022 3.29566 21.7093C3.20208 21.6164 3.12779 21.5059 3.07705 21.3841C3.02632 21.2624 3.00013 21.1319 3 21L3.003 7C3.003 6.448 3.453 6 4.01 6H7ZM5.003 8L5 20H15V8H5.003ZM9 6H17V16H19V4H9V6Z" fill="white" />
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
    setup() {
      const toast = useToast();
      return { toast }
    },
props: ["text", "is_pssw"],
data() {
    return {
        password: this.text,
        display_type: "text"
    }
  },
  methods: {
    switchPasswordVisability() {
        if (this.display_type == "text") {
            this.display_type = "password";
        } else {
            this.display_type = "text";
        }
    }, 
    copyContent() {
        this.toast.info("Copied to Clipboard!");
        navigator.clipboard.writeText(this.text);
    }
  }, beforeMount() {
    if (this.is_pssw == "true")
    {
        this.display_type = "password";
    }
  }
}
</script>

<style scoped>
.containerTextShower {
    position: relative;
    font-size: 1em;
    width: calc(100% - 50px);
    padding-left: 50px;
    padding-top: 15px;
    padding-bottom: 5px;
    border-radius: 16px;
    background-color: #D9D9D90b;
    color: white;
    margin-bottom: 5px;
    overflow-wrap: break-word;
}

p {
    width: 70%;
    top: 50px;
    transform: translateY(-15%);
}

#pssw {
    width: 60%;
    background-color: transparent;
    border: none;
    color: white;
    pointer-events: none;
}

#copyIcon {
    position: absolute;
    right: 15px;
    top: 32px;
    transform: translateY(-25%);
    cursor: pointer;
}

#eyeIcon {
    position: absolute;
    right: 15px;
    transform: translateY(-175%);
    cursor: pointer;
}

#posIcon {
    position: absolute;
    right: 45px;
    width: 30px;
}

i {
    cursor: pointer;
}

input {
    padding-bottom: 15px;
    padding-top: 15px;
}
</style>
