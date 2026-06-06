
<script setup>
import { store } from '@/store/store';
import SymbolIcon from './SymbolIcon.vue';

const props = defineProps({
  name: {
    type: String,
    default: undefined
  },
  secret: {
    type: String,
    default: undefined
  },
  id: {
    type: Number,
    default: undefined
  },
  algo: {
    type: String,
    default: undefined
  }
});

const emit = defineEmits(['open2FA', 'openTwoFaOTPModal']);

async function copyOtp() {
  let otp_code;
  if (props.algo === "SHA256") {
    otp_code = getSHA_OTP(props.secret);
  } else {
    otp_code = getTOTP(props.secret);
  }

  emit("openTwoFaOTPModal", otp_code);
}

function open2FAView() {
  store.temp.curr_2fa_name = props.name;
  store.temp.curr_2fa_secret = props.secret;
  store.temp.curr_2fa_id = props.id;
  emit("open2FA");
}
</script>

<template>
  <div
    id="container"
    class="ripple2"
  >
    <svg
      id="icon"
      width="50"
      height="40"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4316 9.16096L14.9138 8.6788C16.5115 7.08106 16.5115 4.49061 14.9138 2.89286C13.3161 1.29512 10.7256 1.29512 9.12787 2.89287L7.19923 4.82151C5.60149 6.41925 5.60149 9.0097 7.19923 10.6074C7.49684 10.9051 7.8289 11.1472 8.18256 11.334"
        stroke="yellow"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M3.37514 8.64568L2.89299 9.12784C1.29524 10.7256 1.29524 13.316 2.89299 14.9138C4.49073 16.5115 7.08118 16.5115 8.67892 14.9138L10.6076 12.9851C12.2053 11.3874 12.2053 8.79694 10.6076 7.1992C10.195 6.7866 9.71618 6.48055 9.20537 6.28105"
        stroke="yellow"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <p id="name">
      {{ name }}
    </p>
    <div
      id="back"
      @click="open2FAView()"
    />
    <symbol-icon
      id="keyIcon"
      icon="password"
      class="ripple"
      @click="copyOtp()"
    />
  </div>
</template>


<style scoped>
#container {
    position: relative;
    border-top: #ffffff20 1px solid;
    border-bottom: #ffffff20 1px solid;
    width: 110%;
    height: 90px;
    display: flex;
    cursor: pointer;
    color: white;
    border-radius: 10px;
    margin-bottom: -1px;
}

#name {
    position: absolute;
    left: 60px;
    top: 15px;
    font-size: 1.2em;

}

#keyIcon {
    position: absolute;
    right: 15px;
    top: 46px;
    transform: translateY(-50%);
    margin-right:0;
    cursor: pointer;
    border-radius: 15px;
    padding: 10px;

}


#icon {
    position: absolute;
    top: 45px;
    left: 7px;
}

#back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

svg {
    transform: translateY(-50%);
    margin-right:0;
    cursor: pointer;
    top: 35px;
    border-radius: 15px;
    padding: 10px;
}

@media (max-width : 700px) {
    .ripple {
        background-position: center;
        transition: background 0.5s;
    }
    .ripple:hover {
        background: #0E0E0E radial-gradient(circle, transparent 1%, #0E0E0E 1%) center/15000%;
    }
    .ripple:active {
        background-color: white;
        background-size: 100%;
        transition: background 1s;
    }

    .ripple2 {
        background-position: center;
        transition: background 1s;
    }
    .ripple2:active {
        background-color: #1E1E1E;
        background-size: 100%;
        transition: background 0s;
    }
}



@media (min-width : 700px) {
    .ripple {
        background-position: center;
        transition: background 0.5s;
    }
    .ripple:hover {
        background: #ffffff90 radial-gradient(circle, transparent 1%, #545454 1%) center/15000%;
    }
    .ripple:active {
        background-color: #ffffff90;
        background-size: 100%;
        transition: background 0s;
    }

    .ripple2 {
        background-position: center;
        transition: background 1s;
    }
    .ripple2:hover {
        background: #1E1E1E radial-gradient(circle, transparent 1%, #545454a0 1%) center/15000%;
    }
    .ripple2:active {
        background-color: #1E1E1E;
        background-size: 100%;
        transition: background 0s;
    }
}


</style>
  