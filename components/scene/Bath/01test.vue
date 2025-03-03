<template>
    <GeneralContainer ref="container">
        <!-- background images -->
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
            <p class="time-text responsive-text text-yellow-600 "> 00:{{timeString}} </p>
        </div>
        
        <!-- Face -->

        <div class="absolute top-[-0.56%] left-0 w-[100%] face">
            <img :src="images['bath-01-face.webp']">
        </div>

        <!-- Mood -->
        <div class="absolute top-[30%] left-0 w-[100%]">
            <div class="flex flex-col space-y-[3%] justify-center">
                <div class="w-full absolute top-[0.8%] left-0 flex justify-center">
                    <div class="w-[6%] absolute top-0 left-[39.5%] eyebrows" :class="currentMood == 'smile' ? 'scale-y-[-1] scale-x-[-1]': 'scale-x-[1]' ">
                        <img :src="images['bath-01-eyebrow.webp']">
                    </div>
                    <div class="w-[6%] absolute top-0 right-[39.5%] eyebrows" :class="currentMood == 'smile' ? 'scale-y-[-1] scale-x-[1]': 'scale-x-[-1]' ">
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

        <!-- Hands -->
        <div class="absolute bottom-[7.85%] left-0 w-[100%]">
            <div class="relative">
                <div id="right" @touchstart="startDrag" class="absolute bottom-0 scale-x-[-1] w-[25%]" :style="{ left: `${pos.right}%` }">
                    <img :src="images['bath-01-arm1.webp']">
                </div>
                <div id="left" @touchstart="startDrag" class="absolute bottom-0 w-[25%]" :style="{ left: `${pos.left}%` }">
                    <img :src="images['bath-01-arm1.webp']">
                </div>
            </div>
        </div>


    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')

const cleanValue = ref(0)
const time = ref(15)
const timeString = ref('15')

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

const pos = ref({'right' : 63.5 , 'left' : 11.8})

const isDragable = ref(true);

function startDrag(e) {
    if (!isDragable.value) return;
    
    containerBounds == null ? getBound() : console.log('gotten');
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pcX = (clientX - container.value.left) / container.value.width * 100;

    const target = e.target.closest("div");

    pos.value[target.id] = pcX - 15
    pos.value[target.id === 'right' ? 'left' : 'right'] = -(pcX - 90)

    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
}

function onDrag(e) {
    if (!isDragable.value) {
        stopDrag()
        return
    }
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pcX = (clientX - container.value.left) / container.value.width * 100;

    const target = e.target.closest("div");

    pos.value[target.id] = pcX - 15
    pos.value[target.id === 'right' ? 'left' : 'right'] = -(pcX - 90)
}

function stopDrag() {
    pos.value = {'right' : 63.5 , 'left' : 11.8}

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}

</script>

<style scoped>

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