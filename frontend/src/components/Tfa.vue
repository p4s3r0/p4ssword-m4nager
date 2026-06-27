
<script setup>
import { DECRYPT } from "@/plugins/encryption";
import { getSHA_OTP, getTOTP } from "@/db";
import PMIconButton from "@/components/PMIconButton.vue";
import TfaDialog from "@/views/home/tfas/_dialogs/TfaDialog.vue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";
import { useDialog } from "primevue";
import TfaShowOtpDialog from "@/views/home/tfas/_dialogs/TfaShowOtpDialog.vue";

const props = defineProps({
  tfa: {
    type: Object,
    default: () => {}
  },
});

const dialog = useDialog();

const emit = defineEmits(['open2FA', 'openTwoFaOTPModal', 'reload']);

async function copyOtp() {
  let otp_code;
  if (props.tfa.algo === "SHA256") {
    otp_code = getSHA_OTP(DECRYPT(props.tfa.enc_secret));
  } else {
    otp_code = getTOTP(DECRYPT(props.tfa.enc_secret));
  }

  dialog.open(TfaShowOtpDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "OTP Code",
    },
    data: {
      otpCode: otp_code,
    }
  });
};

function open2FAView() {
  dialog.open(TfaDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: props.tfa.name,
    },
    data: {
      tfa: props.tfa,
    },
    onClose: (opt) => {
      if (opt?.data?.reload) {
        emit("reload");
      }
    },
  });
}
</script>

<template>
  <div
    class="tfa-container ripple"
    @click="open2FAView()"
  >
    <div class="left">
      <i class="pi pi-link" />

      <p class="name">
        {{ props.tfa.name }}
      </p>
    </div>

    <PMIconButton
      icon="pi-key"
      class="ripple2"
      @click.stop="copyOtp()"
    />
  </div>
</template>


<style scoped>
.tfa-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--surface-100);
  border-radius: var(--border-radius-4);
  padding: var(--gap-4) calc(var(--gap-4) + 2px) var(--gap-4) var(--gap-4);
  border: 1px solid var(--surface-200);
  height: 80px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(0.99);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: var(--surface-300);
  }

  .left {
    display: flex;
    align-items: center;
    gap: var(--gap-4);
    padding: var(--gap-2);
  }

  .name {
    font-size: 1.2em;
    margin: 0;
  }
}
</style>
  