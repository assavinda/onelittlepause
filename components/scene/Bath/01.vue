<template>
    <GeneralContainer ref="container">
        <!-- Background -->
        <div class="absolute top-0 left-0">
            <img :src="images['bath-01-bg-bath-game01.webp']">
        </div>

        <!-- Score Bar -->
        <div class="absolute top-[5%] left-[10%] w-[20%] z-[10]">
            <img :src="images['bath-01-scorebar.png']">
        </div>

        <div class="absolute top-[10%] left-[14.5%] w-[14.6%] h-[5%] bg-pink-200 z-[5]">
            <div class="h-full bg-pink-400" :style="{width: cleanValue + '%'}"></div>
        </div>

        <!-- Time -->
        <div class="absolute top-[7%] right-[10%] w-[17%]">
            <img :src="images['bath-01-time.png']">
        </div>

        <div class="absolute top-[14%] left-[78%] w-[30%]">
            <p class="time-text text-responsive text-yellow-600 "> 00:{{timeString}} </p>
        </div>
        
        <!-- Face -->

        <div class="absolute top-[-0.56%] left-0 w-[100%]">
            <img :src="images['bath-01-face.webp']">
        </div>

        <!-- Mood -->
        <div class="absolute top-[25%] left-0 w-[100%]">
            <div class="flex flex-col space-y-[3%] justify-center">
                <div class="w-full absolute top-[10.8%] left-0 flex justify-center">
                    <div class="w-[6%] absolute top-0 left-[39.5%]" :class="currentMood == 'smile' ? 'scale-y-[-1] scale-x-[-1]': 'scale-x-[1]' ">
                        <img :src="images['bath-01-eyebrow.webp']">
                    </div>
                    <div class="w-[6%] absolute top-0 right-[39.5%]" :class="currentMood == 'smile' ? 'scale-y-[-1] scale-x-[1]': 'scale-x-[-1]' ">
                        <img :src="images['bath-01-eyebrow.webp']">
                    </div>     
                </div>
                <div class="w-full flex justify-center" :class="currentMood == 'smile' ? 'rotate-[-2deg]' : ''">
                    <div class="w-[21%]">
                        <img :src="images[`bath-01-eye-${currentMood}.webp`]">
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <div class="w-[11%]">
                        <img :src="images[`bath-01-mouth-${currentMood}.webp`]">
                    </div>
                </div>
            </div>
        </div>

        <!-- Acnes & Blackpoint -->
        <div class="absolute top-0 left-0 w-full h-full" :style="{ opacity: acneOpacity }">
            <div class="relative w-full h-full">
                <div class="absolute top-[60%] left-[40%] w-[3%]" :style="{ scale: acneOpacity }">
                    <img :src="images['bath-01-acne.webp']">
                </div>
                <div class="absolute top-[60%] left-[58%] w-[1.2%]" :style="{ scale: acneOpacity }">
                    <img :src="images['bath-01-acne.webp']">
                </div>
                <div class="absolute top-[30%] left-[51%] w-[2%]" :style="{ scale: acneOpacity }">
                    <img :src="images['bath-01-acne.webp']">
                </div>
                <div class="absolute top-[36%] left-[48%] w-[1.5%]" :style="{ scale: acneOpacity }">
                    <img :src="images['bath-01-acne.webp']">
                </div>
                <div class="absolute w-[18%]" :class="currentMood == 'smile' ? 'rotate-[2deg] top-[40%] left-[41.5%]' : 'top-[36%] left-[41.8%]'">
                    <img :src="images['bath-01-under-eye.png']">
                </div>
                <div class="absolute top-[48%] left-[44%] w-[5%]">
                    <img :src="images['bath-01-blackpoint-L.webp']">
                </div>
                <div class="absolute top-[48%] left-[51%] w-[5%]">
                    <img :src="images['bath-01-blackpoint-R.webp']">
                </div>
            </div>
        </div>

        <!-- bubbles -->
        <div v-if="isCleaning" class="absolute top-[22%] left-[26.5%] w-[35%]">
            <img class="bubble-eyes" :src="images['bath-01-bubble-eye2.webp']">
        </div>

        <div v-if="isCleaning" class="absolute top-[22%] left-[38.5%] w-[35%] scale-x-[-1]">
            <img class="bubble-eyes" :src="images['bath-01-bubble-eye2.webp']">
        </div>

        <!-- Hands -->
        <div class="absolute bottom-[7.85%] left-0 w-[100%]">
            <div class="relative">
                <div id="leftarm" @touchstart="startDrag" class="absolute bottom-0 w-[25%]" :style="{ left: `${pos1.left}%` }">
                    <img :src="images['bath-01-arm1.webp']">
                </div>
                <div id="rightarm" @touchstart="startDrag" class="absolute bottom-0 w-[25%] scale-x-[-1]" :style="{ left: `${pos2.left}%` }">
                    <img :src="images['bath-01-arm1.webp']">
                </div>
            </div>
        </div>

        <!-- Next Button -->
        <div @touchstart="isGoingToNext = true" class="absolute top-[72%] left-[80%] w-[20%]" :class="isSuccess ? 'opacity-100 z-[201] next' : 'opacity-75 z-[199] pointer-events-none'">
            <img :src="images['bath-01-next.webp']">
        </div>

        <!-- Popups -->
        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center pointer-events-none backdrop-blur-xs transition-all duration-300" :class="isFailed ? 'opacity-100' : 'opacity-0'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute top-0 left-0">
                <img @transitionend="isFailed ? restart() : console.log('not here')" :src="images['coffee-01-failed.png']" class="transition-all duration-700" :class="isFailed ? 'scale-[1] opacity-100' : 'scale-[3] opacity-0'">
            </div>
        </div>

        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center pointer-events-none backdrop-blur-xs transition-all duration-300" :class="isSuccess ? 'opacity-100' : 'opacity-0'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute top-0 left-0">
                <img @transitionend="console.log('lets go')" :src="images['coffee-01-perfect.png']" class="transition-all duration-700" :class="isSuccess ? 'scale-[1] opacity-100' : 'scale-[3] opacity-0'">
            </div>
        </div>

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const currentMood = ref('angry')
const cleanValue = ref(0)
const isCleaning = ref(false)

let pos1 = ref({ left: 11.8, pcx: 0});
let pos2 = ref({ left: 63.5, pcx: 0});

const container = ref(null);
const acneOpacity = ref(1)
let containerBounds = null;

let time = 15
const timeString = ref('15')

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

function changeMood() {
    if (currentMood.value == 'angry') {
        currentMood.value = 'smile'
    }
    else {
        currentMood.value = 'angry'
    }
}

watch(cleanValue, (newValue) => {
    acneOpacity.value = (100 - newValue) / 100;
    if (newValue >= 100) {
        stopDrag();
        changeMood();
        clearInterval(timeInterval)
        isSuccess.value = true
    }
});

let timeInterval;

function countDown() {
    timeInterval = setInterval(() => {
        time -= 1
        if (time <= 0) {
            clearInterval(timeInterval)
            isFailed.value = true
            timeString.value = '00'
        }
        else if (time <= 9) {
            timeString.value = '0' + time.toString()
        }
        else {
            timeString.value = time.toString()
        }
    },1000)
}

function startDrag(e) {
    containerBounds == null ? getBound() : console.log('gotten');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const pcX = (clientX - container.value.left) / container.value.width * 100;

    let mainArm = null
    let anotherArm = null

    const targetElement = e.target.closest("div");
    if (targetElement.id == 'leftarm') {
        mainArm = pos1.value
        anotherArm = pos2.value
    }
    else {
        mainArm = pos2.value
        anotherArm = pos1.value
    }

    mainArm.left = pcX - 15
    anotherArm.left = -(pcX - 90)

    time == 15 ? countDown(): console.log('counting')

    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
}

function onDrag(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const pcX = (clientX - container.value.left) / container.value.width * 100;

    let mainArm = null
    let anotherArm = null

    const targetElement = e.target.closest("div");
    if (targetElement.id == 'leftarm') {
        mainArm = pos1.value
        anotherArm = pos2.value

    }
    else {
        mainArm = pos2.value
        anotherArm = pos1.value
    }

    mainArm.left = pcX - 15
    anotherArm.left = -(pcX - 90)


    const speed = Math.abs(pcX - mainArm.pcx) / (e.timeStamp - mainArm.timestamp || 1);

    mainArm.pcx = pcX;

    if (targetElement.id == 'leftarm' && pcX >= 30 && pcX <= 55) {
        isCleaning.value = true
        if ((speed * 100) >= 40) {
            if ((speed * 100) >= 50) {
                cleanValue.value += 0.2
                console.log(cleanValue.value)
            }
            else {
                cleanValue.value += 0.02
                console.log(cleanValue.value)
            }
        }
    }
    else if (targetElement.id == 'rightarm' && pcX <= 78 && pcX >= 55) {
        isCleaning.value = true
        if ((speed * 100) >= 40) {
            if ((speed * 100) >= 70) {
                cleanValue.value += 0.2
                console.log(cleanValue.value)
            }
            else {
                cleanValue.value += 0.02
                console.log(cleanValue.value)
            }
        }
    }
    else {
        isCleaning.value = false
    }
}

function stopDrag() {
    pos1.value.left = 11.8
    pos2.value.left = 63.5
    isCleaning.value = false


    console.log(cleanValue.value)

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}

const isSuccess = ref(false)
const isFailed = ref(false)

function restart() {
    cleanValue.value = 0
    time = 15
    timeString.value = '15'
    isFailed.value = false
}

</script>

<style scoped>
.time-text {
    font-family: 'wintermouse', sans-serif;
}

.text-responsive {
    font-size: 6vh;
}

@media (max-aspect-ratio: 16/9) {
    /* 3.9375 */
.text-responsive {
    font-size: 3vw;
}

}

@keyframes bubble-eyes {
    0% {
        transform: scale(1);
        opacity: 0.95;
        content: url(/images/bath-01/bubble-eye2.webp);
    }
    100% {
        transform: scale(1.1);
        opacity: 1;
        content: url(/images/bath-01/bubble-eye1.webp);
    }
}

.bubble-eyes {
    animation: bubble-eyes alternate infinite 0.1s ease-in-out;
}

@keyframes perfectOpacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 100;
    }
}

@keyframes perfectScale {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes failedOpacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 100;
    }
}

@keyframes failedScale {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.perfect-pop {
    animation: perfectScale 2s normal ease;
    animation-fill-mode: forwards;
    transform-origin: center;
}

.perfect-bg-fade {
    animation: perfectOpacity 1s normal ease;
    animation-fill-mode: forwards;
}

.failed-pop {
    animation: failedScale 2s normal ease;
    animation-fill-mode: forwards;
    transform-origin: center;
}

.failed-bg-fade {
    animation: failedOpacity 1s normal ease;
    animation-fill-mode: forwards;
}
</style>