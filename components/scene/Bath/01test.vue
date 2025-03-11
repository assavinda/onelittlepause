<template>
    <GeneralContainer ref="container">
        <!-- background images -->
        <div class="absolute top-0 left-0">
            <img :src="images['bath-01-bg-bath-game01.webp']">
        </div>

        <div class="absolute top-[-5%] left-[0%] w-full h-full">
            <div class="absolute top-[5%] left-[10%] w-[20%] z-[10]">
                <img :src="images['bath-01-scorebar.png']">
            </div>

            <div class="absolute top-[10%] left-[14.5%] w-[14.6%] h-[5%] bg-pink-200 z-[5]">
                <div class="h-full bg-pink-400" :style="{width: cleanValue + '%'}"></div>
            </div>
        </div>
        <!-- Time -->
        <div class="absolute top-[7%] right-[10%] w-[17%]">
            <img :src="images['bath-01-time.png']">
        </div>

        <div class="absolute top-[14%] left-[77.3%] w-[30%]">
            <p class="time-text responsive-text text-yellow-600 "> 00:{{timeString}} </p>
        </div>
        
        <!-- Face -->

        <div class="absolute top-[-0.56%] left-0 w-[100%] face">
            <img :src="images['bath-01-face.webp']">
        </div>

        <div class="absolute top-[45%] left-[23%] w-[6%] bubbles">
            <img :src="images['bath-01-bubble2.webp']">
        </div>

        <div class="absolute top-[40%] left-[30%] w-[3.5%] bubbles">
            <img :src="images['bath-01-bubble2.webp']">
        </div>

        <div class="absolute top-[10%] left-[28%] w-[5%] bubbles">
            <img :src="images['bath-01-bubble2.webp']">
        </div>

        <div class="absolute top-[20%] left-[72%] w-[3.5%] bubbles">
            <img :src="images['bath-01-bubble2.webp']">
        </div>

        <div class="absolute top-[30%] left-[68%] w-[2%] bubbles">
            <img :src="images['bath-01-bubble2.webp']">
        </div>

        <!-- Mood -->
        <div class="absolute top-[30%] left-0 w-[100%]">
            <div class="flex flex-col space-y-[3%] justify-center">
                <div class="w-full absolute left-0 flex justify-center" :class="currentMood == 'smile' ? 'top-[-3.5%]' : 'top-[0.8%]'">
                    <div class="w-[6%] absolute top-0 left-[39.5%]" :class="currentMood == 'smile' ? 'scale-y-[-1] scale-x-[-1] eyebrows-r': 'scale-x-[1] eyebrows' ">
                        <img :src="images['bath-01-eyebrow.webp']">
                    </div>
                    <div class="w-[6%] absolute top-0 right-[39.5%]" :class="currentMood == 'smile' ? 'scale-y-[-1] scale-x-[1] eyebrows-r': 'scale-x-[-1] eyebrows' ">
                        <img :src="images['bath-01-eyebrow.webp']">
                    </div>     
                </div>
                <div class="w-full flex justify-center" :class="currentMood == 'smile' ? 'rotate-[-2deg]' : ''">
                    <div class="w-[21%] eyes">
                        <img :src="images[`bath-01-eye-${currentMood}.webp`]">
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <div class="w-[11%] mouth">
                        <img :src="images[`bath-01-mouth-${currentMood}.webp`]">
                    </div>
                </div>
            </div>
        </div>

        <!-- Acnes & Blackpoint -->
        <div class="absolute top-0 left-0 w-full h-full" :style="{ opacity: acneScale }">
            <div class="relative w-full h-full">
                <div class="absolute top-[60%] left-[40%] w-[3%]" :style="{ scale: acneScale }">
                    <img :src="images['bath-01-acne.webp']">
                </div>
                <div class="absolute top-[60%] left-[58%] w-[1.2%]" :style="{ scale: acneScale }">
                    <img :src="images['bath-01-acne.webp']">
                </div>
                <div class="absolute top-[30%] left-[51%] w-[2%]" :style="{ scale: acneScale }">
                    <img :src="images['bath-01-acne.webp']">
                </div>
                <div class="absolute top-[36%] left-[48%] w-[1.5%]" :style="{ scale: acneScale }">
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
        <div class="absolute top-[19%] left-[26.5%] w-[35%]" :class="isCleaning ? 'opacity-100' : 'opacity-0' ">
            <img class="bubble-eyes" :src="images['bath-01-bubble-eye2.webp']">
        </div>

        <div class="absolute top-[19%] left-[38.5%] w-[35%] scale-x-[-1]" :class="isCleaning ? 'opacity-100' : 'opacity-0' ">
            <img class="bubble-eyes" :src="images['bath-01-bubble-eye2.webp']">
        </div>


        <div class="absolute top-[14%] left-[27%] w-[45%] face">
            <img :src="images['bath-01-nose.png']">
        </div>

        <!-- Hands -->
        <div class="absolute bottom-[-40%] left-0 w-full h-full">
            <div class="relative w-full h-full">
                <div id="right" @touchstart="startDrag" class="absolute scale-x-[-1] w-[35%] hands" :style="{ left: `${pos.right.left}%`, bottom: `${pos.right.bottom}%` }">
                    <img :src="images['bath-01-handL.png']">
                </div>
                <div id="left" @touchstart="startDrag" class="absolute w-[35%] hands" :style="{ left: `${pos.left.left}%` , bottom: `${pos.left.bottom}%` }">
                    <img :src="images['bath-01-handL.png']">
                </div>
            </div>
        </div>

        <div class="absolute bottom-0 left-0">
            <img :src="images['bath-01-bg-bar.png']">
        </div>

        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center pointer-events-none backdrop-blur-xs transition-all duration-300" :class="isSuccess ? 'opacity-100' : 'opacity-0'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute top-0 left-0">
                <img @transitionend="console.log('lets go')" :src="images['coffee-01-perfect.png']" class="transition-all duration-700" :class="isSuccess ? 'scale-[1]' : 'scale-[3]'">
            </div>
        </div>

        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center pointer-events-none backdrop-blur-xs transition-all duration-300" :class="isFailed ? 'opacity-100' : 'opacity-0'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute top-0 left-0">
                <img @transitionend="isFailed ? restart() : console.log('pass')" :src="images['coffee-01-failed.png']" class="transition-all duration-700" :class="isFailed ? 'scale-[1]' : 'scale-[3]'">
            </div>
        </div>

        <!-- Next Button -->
        <div @touchstart="isGoingToNext = true" class="absolute top-[52%] left-[78%] w-[20%]" :class="isSuccess ? 'opacity-100 z-[201] next' : 'opacity-75 z-[199] pointer-events-none'">
            <img :src="images['bath-01-next.webp']">
        </div>

        <!-- fg fade in -->
        <GeneralLoading :progress="progressPercent" :class="isLoaded ? 'fade-out' : '' "></GeneralLoading>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-[210]" :class="isGoingToNext ? 'fade-in' : 'opacity-0' "></div>
    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const isGoingToNext = ref(false)
const isCleaning = ref(false)

// check if all img has loaded
const isLoaded = ref(false);
const progressPercent = ref(0)

onMounted(() => {
    checkImagesLoaded((progress) => {
        if (isLoaded.value == true) return 

        if (progress == 100) {
            setTimeout(() => {
                isLoaded.value = true;
            },1200)
            console.log("all images loaded");
        }
        else {
            console.log(progressPercent.value)
        }
        progressPercent.value = progress
    });
});

const cleanValue = ref(0)
const time = ref(15)
const timeString = ref('15')

const transitionCount = ref(0)

const acneScale = ref(1)

onMounted(() => {
    countDown()
})

let timeInterval

function countDown() {
    timeInterval = null
    timeInterval = setInterval(() => {
        time.value -= 1;
        if (time.value <= 0) {
            timeString.value = '00';
            stopTime()
        } else if (time.value <= 9) {
            timeString.value = '0' + time.value.toString();
        } else {
            timeString.value = time.value.toString();
        }
    }, 1000);
}


function stopTime() {
    clearInterval(timeInterval)
}

const isSuccess = ref(false)
const isFailed = ref(false)

watch(cleanValue, (newValue) => {
    acneScale.value = (100 - newValue) / 100;
    if (newValue >= 100 && time.value > 0) {
        isDragable.value = false
        currentMood.value = 'smile'
        stopTime()
        setTimeout(() => {
            isSuccess.value = true
        },1000)
    }
});

watch(time, (newValue) => {
    if (newValue <= 0) {
        if (cleanValue.value < 100) {
            isDragable.value = false
            currentMood.value = 'angry'
            setTimeout(() => {
                isFailed.value = true
            },1000)
        }
    }
})

function restart() {
    console.log('retart')
    transitionCount.value = 0
    setTimeout(() => {
        cleanValue.value = 0;
        isFailed.value = false;
        isDragable.value = true;
        time.value = 15
        timeString.value = '15'
        countDown()
    }, 1200);
}
//mood
const currentMood = ref('angry')

//drag system
const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const pos = ref({'right' : {'left' :63.5, 'bottom' : 0} , 'left' : {'left': 1.8, 'bottom' : 0}})
const prevPos = ref({ x: 0, y: 0, time: 0 });
const speed = ref({ x: 0, y: 0 });

const isDragable = ref(true);

function startDrag(e) {
    if (!isDragable.value) return;
    
    containerBounds == null ? getBound() : console.log('gotten');
    const touch = e.touches?.[0] || e.changedTouches?.[0] || e;
    const clientX = touch.clientX;
    const clientY = touch.clientY;
    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.bottom) / container.value.height * 100;

    const target = e.target.closest("div");

    pos.value[target.id]['left'] = pcX - 15
    pos.value[target.id === 'right' ? 'left' : 'right']['left'] = -(pcX - 80)

    pos.value[target.id]['bottom'] = -(pcY + 40)
    pos.value[target.id === 'right' ? 'left' : 'right']['bottom'] = -(pcY + 40)

    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
}

function onDrag(e) {
    if (!isDragable.value) {
        stopDrag();
        return;
    }

    const touch = e.touches?.[0] || e.changedTouches?.[0] || e;
    const clientX = touch.clientX;
    const clientY = touch.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.bottom) / container.value.height * 100;

    const target = e.target.closest("div");

    // Get current time
    const now = performance.now();
    const deltaTime = (now - prevPos.value.time) / 1000; // Convert ms to seconds

    if (deltaTime > 0) {
        // Calculate speed in X and Y directions
        speed.value.x = Math.abs(pcX - prevPos.value.x) / deltaTime;
        speed.value.y = Math.abs(pcY - prevPos.value.y) / deltaTime;

        // Calculate overall speed
        speed.value.total = Math.sqrt(speed.value.x ** 2 + speed.value.y ** 2);
    }

    // Update previous position and time
    prevPos.value = { x: pcX, y: pcY, time: now };

    pos.value[target.id]['left'] = pcX - 15;
    pos.value[target.id === 'right' ? 'left' : 'right']['left'] = -(pcX - 80);

    pos.value[target.id]['bottom'] = -(pcY + 40);
    pos.value[target.id === 'right' ? 'left' : 'right']['bottom'] = -(pcY + 40);

    if (pos.value['right']['left'] >= 30 && pos.value['right']['left'] <= 55) {
        isCleaning.value = true
        if (speed.value.total.toFixed(2) >= 200 && speed.value.total.toFixed(2) < 400) {
            cleanValue.value += 0.1
        }
        else if (speed.value.total.toFixed(2) >= 400 && speed.value.total.toFixed(2) < 600) {
            cleanValue.value += 0.4
        }
        else if (speed.value.total.toFixed(2) >= 600) {
            cleanValue.value += 0.8
        }
        else if (speed.value.total.toFixed(2) < 200) {
            cleanValue.value += 0.05
        }
    }
    else {
        isCleaning.value = false
    }
}



function stopDrag() {
    isCleaning.value = false
    pos.value = {'right' : {'left' :63.5, 'bottom' : 0} , 'left' : {'left': 1.8, 'bottom' : 0}}

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}



</script>

<style scoped>

@keyframes bubble-eyes {
    0% {
        transform: scale(1);
        opacity: 0.95;
    }
    100% {
        transform: scale(1.1);
        opacity: 1;
    }
}

.bubble-eyes {
    animation: bubble-eyes alternate infinite 0.1s ease-in-out;
}

@keyframes mouth {
    0% {
        transform: scaleY(1)
    }
    100% {
        transform: scaleY(1.05)
    }
}

.mouth {
    animation: mouth alternate infinite 0.5s ease-in-out;
    transform-origin: top;
}

.eyes {
    animation: mouth alternate-reverse infinite 0.5s ease-in-out;
    transform-origin: bottom;
}

@keyframes eyebrows {
    0% {
        transform: translateY(0%) rotate(0deg)
    }
    100% {
        transform: translateY(-20%) rotate(8deg)
    }
}

.eyebrows {
    animation: eyebrows alternate-reverse infinite 0.5s ease-in-out;
    transform-origin: center;
}

.eyebrows-r {
    animation: eyebrows alternate infinite 0.5s ease-in-out;
    transform-origin: center;
}

@keyframes body {
    0% {
        transform: scaleX(1)
    }
    100% {
        transform: scaleX(1.01)
    }
}

.face {
    animation: body alternate-reverse infinite 0.5s ease-in-out;
    transform-origin: center;
}

@keyframes hands {
    0% {
        transform: scaleY(1)
    }
    100% {
        transform: scaleY(1.01)
    }
}

.hands {
    animation: hands alternate infinite 0.5s ease-in-out;
    transform-origin: bottom;
}

@keyframes bubbles {
    0% {
        transform: scale(1)
    }
    100% {
        transform: scale(1.05)
    }
}

.bubbles {
    animation: bubbles alternate infinite 0.5s ease-in-out;
    transform-origin: bottom;
}

.responsive-text {
    font-size: 6.04444444vh;
    font-family: 'wintermouse', sans-serif;
}

@media (max-aspect-ratio: 16/9) {
    .responsive-text {
        font-size: 3.4vw;
        font-family: 'wintermouse', sans-serif;
    }
}
</style>