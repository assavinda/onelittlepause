<template>
    <GeneralContainer ref="container">
        <!-- background images -->
        <div class="absolute top-0 left-0">
            <img :src="images['bath-02-bg-all.png']">
        </div>

        <!-- Score Bar -->
        <div class="absolute top-[-5%] left-[60%] w-full h-full">
            <div class="absolute top-[5%] left-[10%] w-[20%] z-[10]">
                <img :src="images['bath-01-scorebar.png']">
            </div>

            <div class="absolute top-[10%] left-[14.5%] w-[14.6%] h-[5%] bg-pink-200 z-[5]">
                <div class="h-full bg-pink-400" :style="{width: 100 + '%'}"></div>
            </div>
        </div>

        <!-- bubbles -->
        <div class="absolute top-[35%] left-[0%] w-full h-full">
            <div class="absolute top-[0%] left-[5%] bubble-r w-[90%] z-[10]">
                <img :src="images['bath-02-bubble-back.png']">
            </div>

            <div class="absolute top-[6%] scale-x-[0.9] left-[5%] bubble w-[90%] z-[10]">
                <img :src="images['bath-02-bubble-front.png']">
            </div>

            <div class="absolute top-[17%] left-[5%] bubble-r w-[90%] z-[12]">
                <img :src="images['bath-02-bubble-front.png']">
            </div>
        </div>

        <!-- girl -->
        <div class="absolute top-[0%] left-[0%] w-full h-full">
            <div class="absolute top-0 left-[10%] z-[11] girl">
                <img :src="images['bath-02-girlnoface.png']">
            </div>

            <!-- mood -->
            <div class="absolute top-[17%] left-[35.2%] z-[11] w-[30%] girl">
                <img :src="images['bath-02-face-smile.png']">
            </div>

            <div class="absolute bottom-[3%] left-[32%] w-[35%] z-[13] girl">
                <img :src="images['bath-02-hand.png']">
            </div>
        </div>

        <!-- shelf -->
        <div class="absolute top-[33%] left-[3%] w-[40%] z-[13]">
            <img :src="images['bath-02-shelf.png']">
        </div>

        <!-- heartbreak -->
        <div class="absolute top-[17.5%] right-[1.85%] w-[5%] h-[24.5%] z-[10] flex flex-col items-center space-y-[40%] border-2">
            <div v-for="heartbreak in 3" class="w-[70%]">
                <img :src="images['bath-02-star-yellow.png']">
            </div>
        </div>

        <!-- shower -->
        <div @touchstart="startDrag" class="absolute w-[50%] z-[14]" :style="{ top: `${showerpos.top}%`, left: `${showerpos.left}%`}">
            <img :src="images['bath-02-fakbua.png']">
        </div>

        <!-- temp -->
        <div class="absolute bottom-[6%] left-[22.5%] w-[56.7%] h-[7.5%] z-[20]">
            <input
                @touchstart="stopSponge"
                @touchend="startSponge"
                type="range"
                :min="sliderMin"
                :max="sliderMax"
                :step="sliderStep"
                v-model="slide"
                class="slider"
                :style="sliderStyle"
            />
        </div>

        <div class="border-2 w-[10%] h-[20%] bg-amber-400 absolute bottom-0 left-0">
            <button>
                eafe
            </button>
        </div>


    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const currentMood = ref('smile')

//drag system
const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const showerpos = ref({ top: 65, left: 80.2 })
const isDragable = ref(true)

function startDrag(e) {
    if (!isDragable.value) return;
    
    containerBounds == null ? getBound() : console.log('gotten');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    showerpos.value.left = pcX - 5
    showerpos.value.top = pcY - 5

    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
}

function onDrag(e) {
    if (!isDragable.value) {
        stopDrag()
        return
    }
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    showerpos.value.left = pcX - 5
    showerpos.value.top = pcY - 5
}

function stopDrag() {
    showerpos.value.left = 80.2
    showerpos.value.top = 65

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}

//slider
const slide = ref(0);

const sliderMin = ref(0);
const sliderMax = ref(100);
const sliderStep = ref(1);

const sliderStyle = computed(() => {
    const percentage = ((slide.value - sliderMin.value) / (sliderMax.value - sliderMin.value)) * 100;
    return {
        background: `linear-gradient(to right, #fbcedb ${percentage}%, #eb5d50 ${percentage}%)`,
    };
});

</script>

<style scoped>
@keyframes bubble {
    0% {
        transform: scaleY(1) scaleX(1.02);
    }
    100% {
        transform: scaleY(1.02) scaleX(1);
    }
}

.bubble {
    animation: bubble alternate infinite 0.8s ease-in-out;
    transform-origin: bottom;
}

.bubble-r {
    animation: bubble alternate-reverse infinite 0.8s ease-in-out;
    transform-origin: bottom;
}

@keyframes girl {
    0% {
        transform: scaleX(1);
    }
    100% {
        transform: scaleX(1.01);
    }
}

.girl {
    animation: girl alternate infinite 0.5s ease-in-out;
    transform-origin: bottom;
}

.slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;
    outline: none;
    transition: background 0.3s ease;
    border: 1px solid black;
    box-shadow: 0 0 0 5% black;

    @apply rounded-full
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 17%;
    height: auto;
    background-image: url(/images/bath-02/sponge.png);
    background-size: contain;
    background-repeat: no-repeat;
    aspect-ratio: 80 / 50;
    cursor: pointer;
    transition: background 0.3s ease;
}

.slider::-moz-range-thumb {
    width: 17%;
    height: auto;
    background-image: url(/images/bath-02/letter-sponge.png);
    background-size: contain;
    background-repeat: no-repeat;
    aspect-ratio: 80 / 60;
    cursor: pointer;
}

</style>