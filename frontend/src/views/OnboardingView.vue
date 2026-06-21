<script setup>
import { DBL_onboardingOff } from "@/dexie.js";
import { useRouter } from "vue-router";

const router = useRouter();
const stage = ref(0);

function turnOnboardingOff() {
  DBL_onboardingOff();
  router.push({ name: "login" });
}
</script>

<template>
  <div id="ContainerOnboarding">
    <transition
      name="slide-right-left"
      mode="out-in"
    >
      <div
        v-if="stage === 4"
        class="stage"
      >
        <div class="stageInnerContainer">
          <h1>Have Fun</h1>
          <p>
            The End! 🎉<br>
            I hope you have a blast exploring all the awesome features our app offers. There are also many more, from starring ⭐ your favorite passwords to generating rock-solid 🪨 secure passwords, there's so much to discover we didn't even tackle in this tutorial.<br>
            Dive in and let your curiosity lead the way—it's super intuitive and fun to use. Enjoy the journey and stay secure! 🚀🔐<br><br>
            For any questions, contact <strong>p4s3r0@gmail.com</strong><br><br>
            Cheers,<br>
            p4s3r0
          </p>
          <div style="height: 120px;" />
          <div id="actionButtons">
            <Button
              label="Skip Tutorial"
              class="leftButton"
              icon="pi pi-forward"
              icon-pos="left"
              style="background-color: white"
              @click="turnOnboardingOff()"
            />
            <Button
              label="Next"
              class="rightButton"
              icon="pi pi-caret-right"
              icon-pos="left"
              style="background-color: white"
              @click="turnOnboardingOff()"
            />
          </div>
        </div>
      </div>
    </transition>

    <transition
      name="slide-right-left"
      mode="out-in"
    >
      <div
        v-if="stage === 3"
        class="stage"
      >
        <div class="stageInnerContainer">
          <h1>Shortcuts</h1>
          <p>
            Copying your username and password is a breeze! 🌬️<br>
            Just hit the copy button, and voilà - it's instantly saved to your clipboard without exposing it on your screen. 👀🔐 No more awkwardly revealing sensitive info while trying to log in. <br>
            It's quick, secure, and keeps your details private. 🖱️✨
          </p>
          <img src="../../images/Onboarding/Shortcut.png">
          <div style="height: 120px;" />
          <div id="actionButtons">
            <Button
              label="Skip Tutorial"
              class="leftButton"
              icon="pi pi-forward"
              icon-pos="left"
              style="background-color: white"
              @click="turnOnboardingOff()"
            />
            <Button
              label="Next"
              class="rightButton"
              icon="pi pi-caret-right"
              icon-pos="left"
              style="background-color: white"
              @click="stage+=1"
            />
          </div>
        </div>
      </div>
    </transition>

    <transition
      name="slide-right-left"
      mode="out-in"
    >
      <div
        v-if="stage === 2"
        class="stage"
      >
        <div class="stageInnerContainer">
          <h1>Navigation</h1>
          <p>
            Navigating between folders, passwords, and 2FA codes has never been easier! 🌟<br>
            Simply click on the icons to switch between your folders, passwords and 2FAs. <br>
            Need a quick password? Just tap the password icon! 🚀 It's all designed to be intuitive and user-friendly, so managing your digital life feels effortless and fun! 😊
          </p>
          <img src="../../images/Onboarding/Navigation.png">
          <div style="height: 120px;" />
          <div id="actionButtons">
            <Button
              label="Skip Tutorial"
              class="leftButton"
              icon="pi pi-forward"
              icon-pos="left"
              style="background-color: white"
              @click="turnOnboardingOff()"
            />
            <Button
              label="Next"
              class="rightButton"
              icon="pi pi-caret-right"
              icon-pos="left"
              style="background-color: white"
              @click="stage+=1"
            />
          </div>
        </div>
      </div>
    </transition>

    <transition
      name="slide-right-left"
      mode="out-in"
    >
      <div
        v-if="stage === 1"
        class="stage"
      >
        <div class="stageInnerContainer">
          <h1>Adding Data</h1>
          <p>
            Who knew a password manager could be so cool 🆒? <br>
            It's not just a digital vault for your passwords. You can jazz 🎷 things up by organizing your passwords into neat folders 📂, because who doesn't love a little order in their chaos? <br>
            You can also add two-factor 2️⃣ authentication (2FA) codes to keep those sneaky hackers 🏴‍☠️ at bay. <br>
            It's like giving your passwords a security team 🔐!<br><br>

            At the Home Page simply click the plus button at the left and add your things.
          </p>
          <img src="../../images/Onboarding/add.png">
          <div style="height: 120px;" />
          <div id="actionButtons">
            <Button
              label="Skip Tutorial"
              class="leftButton"
              icon="pi pi-forward"
              icon-pos="left"
              style="background-color: white"
              @click="turnOnboardingOff()"
            />
            <Button
              label="Next"
              class="rightButton"
              icon="pi pi-caret-right"
              icon-pos="left"
              style="background-color: white"
              @click="stage+=1"
            />
          </div>
        </div>
      </div>
    </transition>

    <transition
      name="slide-right-left"
      mode="out-in"
    >
      <div
        v-if="stage === 0"
        class="stage"
      >
        <div class="stageInnerContainer">
          <h1>Welcome</h1>
          <h3>
            to P4ssword-M4nager! 🎉
          </h3>
          <p>
            Say goodbye to sticky notes and hello to the secure and encrypted passwords with your own master key. 🗝️✨ <br>
            Let us handle the heavy lifting while you enjoy peace of mind. <br>
            Ready to join the password party? Your digital life just got safer and more fun! 😄🔒<br><br>
            We recommend to install the app. <br>
            If you are on <strong>Android</strong>📱 or <strong>Desktop</strong>🖥, use the Chrome Browser, tap the three dots at the top right corner and hit "Install" or "Add to Home Screen".<br>
            If you are on <strong>iOS</strong>📱, tap the share button and hit "Add to Home Screen".<br>
          </p>
          <div id="actionButtons">
            <Button
              label="Skip Tutorial"
              class="leftButton"
              icon="pi pi-forward"
              icon-pos="left"
              style="background-color: white"
              @click="turnOnboardingOff()"
            />
            <Button
              label="Next"
              class="rightButton"
              icon="pi pi-caret-right"
              icon-pos="left"
              style="background-color: white"
              @click="stage+=1"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.stage {
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 800px;
    height: 100svh;
}


.stageInnerContainer {
    position: relative;
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
    height: 100svh;
    margin-top: 10vh;
}

#actionButtons {
    position: fixed;
    bottom: 25px;
    width: 100%;
}

button {
    min-width: 100px;
    min-height: 68px;
    background-color: var(--surface-0);
    border: 1px white solid;
    cursor: pointer;
    border-radius: 10px;
    color: var(--surface-0);
}

.leftButton {
    margin-right: 20px;
}

.rightButton {

}

img {
    width: 100%;
    max-width: 800px;
}


/* Transition for entering and leaving active state */
.slide-right-left-enter-active, .slide-right-left-leave-active {
    transition: transform 1s ease, opacity 3s ease;
}

/* Initial state for entering */
.slide-right-left-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

/* End state for entering */
.slide-right-left-enter-to {
    opacity: 1;
    transform: translateX(0);
}

/* Initial state for leaving */
.slide-right-left-leave {
    opacity: 1;
    transform: translateX(0);
}

/* End state for leaving */
.slide-right-left-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
</style>






