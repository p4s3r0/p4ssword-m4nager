<template>
    <div id="ContainerOnboarding">
        <transition name="slide-right-left" mode="out-in">
            <div class="stage" v-if="stage === 4">
                <div class="stageInnerContainer">
                    <h1>Have Fun</h1>
                    <p>The End! 🎉<br>
                        I hope you have a blast exploring all the awesome features our app offers. There are also many more, from starring ⭐ your favorite passwords to generating rock-solid 🪨 secure passwords, there's so much to discover we didn't even tackle in this tutorial.<br>
                        Dive in and let your curiosity lead the way—it's super intuitive and fun to use. Enjoy the journey and stay secure! 🚀🔐<br><br>
                        For any questions, contact <strong>p4s3r0@gmail.com</strong><br><br>
                        Cheers,<br>
                        p4s3r0
                    </p>
                    <div style="height: 120px;"></div>
                    <div id="actionButtons">
                        <button class="ripple" @click="stage = 0">Restart Tutorial</button>
                        <button class="ripple" @click="turnOnboardingOff()">Login</button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="slide-right-left" mode="out-in">
            <div class="stage" v-if="stage === 3">
                <div class="stageInnerContainer">
                    <h1>Shortcuts</h1>
                    <p>Copying your username and password is a breeze! 🌬️<br>
                        Just hit the copy button, and voilà - it's instantly saved to your clipboard without exposing it on your screen. 👀🔐 No more awkwardly revealing sensitive info while trying to log in. <br>
                        It's quick, secure, and keeps your details private. 🖱️✨</p>
                    <img src="../../images/Onboarding/Shortcut.png">
                    <div style="height: 120px;"></div>
                    <div id="actionButtons">
                        <button class="ripple" @click="turnOnboardingOff()">Skip Tutorial</button>
                        <button class="ripple" @click="stage += 1">Next</button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="slide-right-left" mode="out-in">
            <div class="stage" v-if="stage === 2">
                <div class="stageInnerContainer">
                    <h1>Navigation</h1>
                    <p>Navigating between folders, passwords, and 2FA codes has never been easier! 🌟<br>
                        Simply click on the icons to switch between your folders, passwords and 2FAs. <br>
                        Need a quick password? Just tap the password icon and voilà! 🚀 It's all designed to be intuitive and user-friendly, so managing your digital life feels effortless and fun! 😊</p>
                    <img src="../../images/Onboarding/Navigation.png">
                    <div style="height: 120px;"></div>
                    <div id="actionButtons">
                        <button class="ripple" @click="turnOnboardingOff()">Skip Tutorial</button>
                        <button class="ripple" @click="stage += 1">Next</button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="slide-right-left" mode="out-in">
            <div class="stage" v-if="stage === 1">
                <div class="stageInnerContainer">
                    <h1>Adding Data</h1>
                    <p>Who knew a password manager could be so cool 🆒? <br>
                        It's not just a digital vault for your passwords. You can jazz 🎷 things up by organizing your passwords into neat folders 📂, because who doesn't love a little order in their chaos? <br>
                        You can also add two-factor 2️⃣ authentication (2FA) codes to keep those sneaky hackers 🏴‍☠️ at bay. <br>
                        It's like giving your passwords a security team 🔐!<br><br>

                    At the Home Page simply click the plus button at the left and add your things.
                    </p>
                    <img src="../../images/Onboarding/add.png">
                    <div style="height: 120px;"></div>
                    <div id="actionButtons">
                        <button class="ripple" @click="turnOnboardingOff()">Skip Tutorial</button>
                        <button class="ripple" @click="stage += 1">Next</button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="slide-right-left" mode="out-in">
            <div class="stage" v-if="stage === 0">
                <div class="stageInnerContainer">
                    <h1>Welcome</h1>
                    <h3>
                        to P4ssword-M4nager! 🎉
                    </h3>
                    <p>
                        Say goodbye to sticky notes and hello to secure, encrypted passwords with your master key. 🗝️✨ <br>
                        Let us handle the heavy lifting while you enjoy peace of mind. <br>
                        Ready to join the password party? Your digital life just got safer and more fun! 😄🔒<br><br>
                        We recommend to install the app, if you are on <strong>Android</strong>📱 or <strong>Desktop</strong>🖥, use the Chrome Browser, tap the three dots at the top right corner and hit "Install" or "Add to Home Screen".<br>
                        If you are on <strong>iOS</strong>📱, tap the share button and hit "Add to Home Screen".<br>
                    </p>
                    <div style="height: 120px;"></div>
                    <div id="actionButtons">
                        <button class="ripple" @click="turnOnboardingOff()">Skip Tutorial</button>
                        <button class="ripple" @click="stage += 1">Next</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
import { DBL_onboardingOff } from "@/dexie.js";
export default {
    name: 'Onboarding',
    data() {
        return {
            stage: 0
        }
    },
    methods: {
        turnOnboardingOff() {
            DBL_onboardingOff();
            this.$router.push("/");
        }
    },
}
</script>

<style scoped>
#ContainerOnboarding {
}
.stage {
    position: absolute;
    top: 0;
    left: auto;
    right: auto;
    padding: 0px;
    margin: 0;
    width: 100%;
    max-width: 800px;
    height: 100svh;
}


.stageInnerContainer {
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
    height: 100svh;
    margin-top: 10vh;
    margin-bottom: 10vh;
}

#actionButtons {
    display: flex;
    width: 80%;
    justify-content: space-between;
    position: absolute;
    bottom: 50px;
}

button {
    min-width: 100px;
    min-height: 68px;
    background-color: var(--background-color);
    color: white;
    border: 1px white solid;
    cursor: pointer;
    border-radius: 10px;

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






