<template>
    <GeneralContainer ref="container">
        <!-- background images -->
        <div class="absolute top-0 left-0 w-full">
            <img :src="images['bath-02-BG-2.png']">
        </div>

        <GeneralMenubar/>

        <!-- Score Bar -->
        <div class="absolute top-[-5%] left-[60%] w-full h-full">
            <div class="absolute top-[5%] left-[10%] w-[20%] z-[10]">
                <img :src="images['bath-01-scorebar.png']">
            </div>

            <div class="absolute top-[8.1%] left-[10%] w-[5%] z-[10]" :class="currentMood != 'smile' ? 'opacity-100' : 'opacity-0' ">
                <img :src="images['bath-02-heartbroken.png']">
            </div>

            <div class="absolute top-[10%] left-[14.5%] w-[14.6%] h-[5%] bg-pink-200 z-[5]">
                <div class="h-full bg-pink-400" :style="{width: cleanValue + '%'}"></div>
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
            <div class="absolute top-[14%] left-[36.5%] z-[11] girl w-[28%]">
                <img :src="images['bath-02-girlnoface.png']">
            </div>

            <!-- mood -->
            <div class="absolute top-[27%] left-[45.5%] z-[11] w-[10%] girl" :class="currentMood == 'smile' ? 'opacity-100' : 'opacity-0'">
                <img :src="images['bath-02-face-smile.png']">
            </div>

            <div class="absolute top-[25.6%] left-[45.2%] z-[11] w-[11%] girl" :class="currentMood != 'smile' ? 'opacity-100' : 'opacity-0'">
                <img :src="images['bath-02-face-sad.png']">
            </div>

            <div class="absolute bottom-[3%] left-[32%] w-[35%] z-[13] girl">
                <img :src="images['bath-02-hand.png']">
            </div>
        </div>

        <!-- bubbles -->
        <div class="absolute top-[10%] left-[45%] w-[15%] z-[11] bubble">
            <img :src="images['bath-02-bubble-head.png']">
        </div>

        <div class="absolute top-[35%] left-[32%] w-[35%] z-[11] bubble-r">
            <img :src="images['bath-02-bubble2.png']">
        </div>

        <div class="absolute top-[29%] left-[35%] w-[32%] z-[12] bubble">
            <img :src="images['bath-02-bubble1.png']">
        </div>

        <!-- shelf -->
        <div class="absolute top-[33%] left-[3%] w-[40%] z-[13]">
            <img :src="images['bath-02-shelf.png']">
        </div>

        <!-- shower -->
        <div @touchstart="startDrag" class="absolute w-[50%] z-[20]" :style="{ top: `${showerpos.top}%`, left: `${showerpos.left}%`}">
            <img :src="images['bath-02-fakbua.png']">
        </div>

        <div class="absolute w-[12%] z-[19]" :class="isCleaning ? 'opacity-75' : 'opacity-0'" :style="{ top: `${showerpos.top + 10}%`, left: `${showerpos.left - 2}%`}">
            <img :src="images['bath-02-namm.png']">
        </div>

        <!-- temp -->
        <div class="absolute bottom-[-0.25%] left-[0.05%] w-[100%] z-[16]">
            <img :src="images['bath-02-temperature.png']">
        </div>

        <div class="absolute bottom-[6.15%] left-[23.3%] w-[55%] z-[16]">
            <img :src="images['bath-02-tempbar.png']">
        </div>

        <div class="absolute bottom-[5.85%] left-[22.6%] w-[56.31%] h-[7.35%] z-[20]">
            <input
            @touchstart="isSliderDragging = true"
            @touchend="onSliderRelease($event)"
                type="range"
                :min="sliderMin"
                :max="sliderMax"
                :step="sliderStep"
                v-model="slide"
                class="slider"
            />
        </div>

        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center pointer-events-none backdrop-blur-xs transition-all duration-300" :class="isSuccess ? 'opacity-100' : 'opacity-0'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute top-0 left-0">
                <img @transitionend="console.log('lets go')" :src="images['coffee-01-perfect.png']" class="transition-all duration-700" :class="isSuccess ? 'scale-[1]' : 'scale-[3]'">
            </div>
        </div>

        <!-- Next Button -->
        <div @touchstart="isGoingToNext = true" class="absolute top-[78%] left-[87%] w-[12%]" :class="isSuccess ? 'opacity-100 z-[201] next' : 'opacity-75 z-[199] pointer-events-none'">
            <img :src="images['bath-02-next.png']">
        </div>

        <!-- fg fade in -->
        <GeneralLoading :progress="progressPercent" :class="isLoaded ? 'fade-out' : '' "></GeneralLoading>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-[210]" :class="isGoingToNext ? 'fade-in' : 'opacity-0' "></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')

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

const currentMood = ref('smile')
const cleanValue = ref(0)
const isSuccess = ref(false)
const isGoingToNext = ref(false)
const isCleaning = ref(false)

watch(cleanValue, (newValue) => {
    if (newValue >= 99) {
        isSuccess.value = true
    }
});

//drag system
const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const showerpos = ref({ top: 65, left: 80.2 })
const isCoolingDown = ref(false)

watch(isCoolingDown, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            isCoolingDown.value = false
        },1000)
    }
});

const isDragable = ref(true)

const isSliderDragging = ref(false)

watch(isSliderDragging, (newValue) => {
    if (newValue) {
        isDragable.value = false
    }
    else {
        isDragable.value = true
    }
});

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

    if (showerpos.value.left > 34 && showerpos.value.left < 56) {
        if (canShower.value) {
            if (isCoolingDown.value) {
                console.log('cooldown')
            }
            else {
                cleanValue.value += 33.33
                isCoolingDown.value = true
                currentMood.value = 'smile'
                isCleaning.value = true
            }
        }
        else {
            if (isCoolingDown.value) {
                console.log('cooldown')
            }
            else {
                if (cleanValue.value > 0) {
                    cleanValue.value -= 33.33
                    isCoolingDown.value = true
                    currentMood.value = 'sad'
                    isCleaning.value = true
                    setTimeout(() => {
                        currentMood.value = 'smile'
                    },700)
                }
                if (cleanValue.value <= 0) {
                    cleanValue.value = 0
                    isCoolingDown.value = true
                    currentMood.value = 'sad'
                    isCleaning.value = true
                    setTimeout(() => {
                        currentMood.value = 'smile'
                    },700)
                }
            }
        }
    }
    else {
        isCleaning.value = false
    }
}

function stopDrag() {
    showerpos.value.left = 80.2
    showerpos.value.top = 65
    isCleaning.value = false

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}

//slider
const slide = ref(0);

const sliderMin = ref(0);
const sliderMax = ref(100);
const sliderStep = ref(1);

const canShower = ref(false)

let interval
onMounted(() => {
    interval = setInterval(() => {
        if (!isSliderDragging.value) {
            slide.value = Math.min(slide.value + 1, sliderMax.value);
        }
    }, 50);
})

watch(slide, (newValue) => {
    if (newValue >= 46 && newValue <= 62) {
        canShower.value = true
    }
    else {
        canShower.value = false
    }
});

 
function onSliderRelease(e) {
    if (!e || !e.target) return;

    slide.value = Number(e.target.value);
    isSliderDragging.value = false;
}

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
    transition: background 0.3s ease, transform 0.2s ease;

    @apply rounded-full
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8.5%;
    height: auto;
    background: none; /* Remove background */
    background-image: url(/images/bath-02/sponge.png);
    background-size: contain;
    background-repeat: no-repeat;
    border: none; /* Remove any default borders */
    box-shadow: none; /* Ensure no shadow */
    aspect-ratio: 45 / 50;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.slider::-moz-range-thumb {
    width: 8.5%;
    height: auto;
    background: none;
    background-image: url(/images/bath-02/letter-sponge.png);
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    box-shadow: none;
    aspect-ratio: 45 / 50;
    cursor: pointer;
}

.slider:active::-webkit-slider-thumb {
    transform: scale(1.1);
}

</style>