<template>
    <div id="symbolIcon">
        <!-- FOLDER ICON -->
        <div v-if="this.icon === 'folder'" :class="this.size">
            <svg viewBox="0 -960 960 960" >
                <path
                    d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
            </svg>
        </div>

        <!-- PASSWORD ICON -->
        <div v-else-if="this.icon === 'password'" :class="this.size">
            <svg viewBox="0 -960 960 960" >
                <path
                    d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
            </svg>
        </div>

        <!-- 2FA ICON -->
        <div v-else-if="this.icon === '2fa'" :class="this.size">
            <svg viewBox="0 -960 960 960" >
                <path
                    d="M634-320q-14 0-24-10t-10-24v-132q0-14 10-24t24-10h6v-40q0-33 23.5-56.5T720-640q33 0 56.5 23.5T800-560v40h6q14 0 24 10t10 24v132q0 14-10 24t-24 10H634Zm46-200h80v-40q0-17-11.5-28.5T720-600q-17 0-28.5 11.5T680-560v40ZM280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v160h-80v-40H280v480h400v-40h80v160q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-640h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z" />
            </svg>
        </div>

        <!-- ADD ICON -->
        <div v-else-if="this.icon === 'add'" :class="this.size">
            <svg viewBox="0 -960 960 960" >
                <path
                    d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
        </div>

        <!-- USER ICON -->
        <div v-else-if="this.icon === 'user'" :class="this.size">
            <svg id="userIcon">
                <circle cx="7" cy="4" r="3" stroke="white" stroke-width="1" stroke-linecap="round"/>
                <path d="M13 14C13 16.7614 9.76142 17 7 17C4.23858 17 1 16.7614 1 14C1 11.2386 4.23858 9 7 9C9.76142 9 13 11.2386 13 14Z" stroke="white" stroke-width="1" stroke-linecap="round"/>
            </svg>
        </div>

        <!-- LOCK ICON -->
        <div v-else-if="this.icon === 'lock'" :class="this.size">
            <svg viewBox="0 -960 960 960">
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
            </svg>
        </div>

        <!-- DOWNLOAD ICON -->
        <div v-else-if="this.icon === 'download'" :class="this.size">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960"  fill="#e8eaed">
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
            </svg>
        </div>


        <!-- UPLOAD ICON -->
        <div v-else-if="this.icon === 'upload'" :class="this.size">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
        </div>

        <!-- TRASH CAN ICON -->
        <div v-else-if="this.icon === 'trash'" :class="this.size">
            <svg viewBox="0 -960 960 960">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </div>
    </div>
</template>

<script>

export default {
name: 'symbolIcon',
props: {
    icon: {
        type: String,
        default: ""
    },
    size: {
        type: String,
        default: "medium"
    }
}
}
</script>

<style scoped>
svg {
    fill: #e8eaed;
}
.small {
    height: 20px;
    widows: 20px;
}

.medium {
    height: 24px;
    width: 24px;
}

.big {
    height: 28px;
    widows: 28px;
}

#userIcon {
    transform: translate(5px, 3px);
    height: 28px;
    width: 28px;
    scale: 1.2;
}
</style>