<template>
    <GeneralContainer ref="container">
        <!-- background images -->

        <div class="absolute top-0 left-0">
            <img :src="images['coffee-01-bg-coffee01.jpg']">
        </div>

        <!-- ML frame -->
        <div class="absolute top-[7%] left-[37%] w-[26%]">
            <img :src="images['coffee-01-ml-frame.png']">
        </div>

        <!-- Steam -->
        <div class="absolute top-[35%] left-[0%] w-[29%] steam">
            <img :src="images['coffee-01-steam.png']">
        </div>

        <!-- Coffee Mix -->
        <div class="absolute top-[15%] left-[17.7%] w-[65%] z-[10]">
            <img :src="images['coffee-01-cup-coffee.png']">
        </div>

        <div class="absolute top-[55%] left-[43%] w-[25%] z-[16]">
            <img :src="images['coffee-01-reflect.png']">
        </div>

        <!-- Coffee Pour -->
        <div class="absolute top-[59.7%] left-[15%] w-[75%] h-[75%] pointer-events-none z-[17]" :class="isPouring ? 'opacity-100' : 'opacity-0'" :style="{ transform: `scaleY(${fill+36.8}%)`, transformOrigin: 'top' }">
            <img ref="pourimg" :src="images[coffeeCurrentFrame]">
            <!-- there is an animation here -->
        </div>

        <!-- Water Pour -->
        <img :src="images[waterCurrentFrame]" class="absolute w-[10%] opacity-0 z-[1]" :class="isPouring ? 'opacity-50' : 'opacity-0'" :style="{ top: `${waterpos.top}%`, left: `${waterpos.left}%`, height: `${waterheight}%`}">
        <!-- there is an animation here -->

        <!-- Coffee Filter -->
        <div class="absolute top-[15.8%] left-[19.85%] w-[65%] z-[12] pointer-events-none">
            <img :src="images['coffee-01-coffee-filter.png']">
        </div>

        <!-- Coffee Mask -->

        <div class="mask-coffee absolute bottom-[12.9%] left-[39.4%] z-[11] w-[21.6%]">
            <img ref="coffeeFill" class="w-[100%]" :src="images['coffee-01-coffee-fill.png']" :style=" { transform: `translateY(${fill+7}%)` }">
            <div class="flex justify-center">
                <div class="absolute w-[75%] z-[12]" :style="{ top: `${fill-9}%` }"> 
                    <img :src="images['coffee-01-surface.png']">
                </div>
            </div>
        </div>

        <!-- Pot (Dragable) -->
        <div @touchstart="startDrag" class="absolute left-0 top-0 w-[30%] z-[190] cursor-grab" :class="isPouring ? 'rotate-[-42deg]' : '' " :style="{ top: `${pos.top}%`, left: `${pos.left}%`}">
            <img :src="images['coffee-01-potnew.png']">
        </div>

        <!-- ML text -->
        <div class="absolute flex top-[22.5%] left-[43%] w-[15%]">
            <div class="text-center w-full">
                <p class="responsive-text text-white">
                    {{ coffeeVolume }} ML
                </p>
            </div>
        </div>

        <!-- Next Button -->
        <div @click="isGoingToNext = true" class="absolute top-[72%] left-[80%] w-[20%] cursor-pointer" :class="isSuccess ? 'opacity-100 z-[201] next' : 'opacity-75 pointer-events-none'">
            <img :src="images['coffee-01-butt.png']">
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

        <!-- Suggestion -->
        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center backdrop-blur-xs transition-all duration-300" :class="isSuggestShow ? 'opacity-100' : 'opacity-0 pointer-events-none'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute w-[65%] top-[-3%]">
                <img :src="images['coffee-01-suggest-coffee01.png']">
            </div>
            <div class="absolute top-[70%] w-[8%] cursor-pointer" @click="isSuggestShow = false">
                <img :src="images['general-X-icon.png']">
            </div>
        </div>

        <!-- fg fade in -->
        <GeneralLoading :progress="progressPercent" :class="isLoaded ? 'fade-out' : '' "></GeneralLoading>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-[210]" :class="isGoingToNext ? 'fade-in' : 'opacity-0 pointer-events-none' "></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const isSuccess = ref(false);
const isFailed = ref(false);
const isGoingToNext = ref(false);
const isSuggestShow = ref(true);

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

// drag system ----------------------------------------------------------
const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const pos = ref({ top: 50, left: 56.2 })
const waterpos = ref({ top: 71, left: 57 });
const waterheight = ref(0);

const isPouring = ref(false);
const isDragable = ref(true);

function startDrag(e) {
    if (!isDragable.value) return;
    
    containerBounds == null ? getBound() : console.log('gotten');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    pos.value.left = pcX - 17.5
    pos.value.top = pcY - 30
    waterpos.value.left = pcX - 21
    waterpos.value.top = pcY

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

    pos.value.left = pcX - 17.5
    pos.value.top = pcY - 30
    waterpos.value.left = pcX - 24
    waterpos.value.top = pcY + 1

    if (pos.value.left <= 59 && pos.value.left >= 51 && pos.value.top <= 2) {
        isPouring.value = true;
        waterheight.value = 11 - pos.value.top;
    } else {
        isPouring.value = false;
    }
}

function stopDrag() {
    pos.value.left = 56.2
    pos.value.top = 50
    waterpos.value.left = 57
    waterpos.value.top = 71
    isPouring.value = false;
    console.log(isPouring.value);

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}

// pouring system ----------------------------------------------------------
const fill = ref(100)
const coffeeVolume = ref(0);
let pourSpeed = ref(50);
let pourInterval

watch(isPouring, (newVal) => {
    if (newVal) {
        [animateWater, animateCoffee].forEach(fn => fn());
        pourCoffee();
    } else {
        clearTimeout(pourInterval);
        [pourInterval, waterInterval, coffeeInterval].forEach(clearInterval);
        pourSpeed.value = 50;
    }
});

function pourCoffee() {
    pourInterval = setTimeout(() => {
        coffeeVolume.value += 1;
        fill.value = 100 - coffeeVolume.value / 2;

        if (coffeeVolume.value >= 40 && coffeeVolume.value < 80) {
            pourSpeed.value = 60;
        }
        else if (coffeeVolume.value >= 80 && coffeeVolume.value < 100) {
            pourSpeed.value = 70;
        }
        else if (coffeeVolume.value >= 100 && coffeeVolume.value < 110) {
            pourSpeed.value = 80;
        }
        else if (coffeeVolume.value >= 110 && coffeeVolume.value < 120) {
            pourSpeed.value = 100;
        }
        else if (coffeeVolume.value >= 120 && coffeeVolume.value < 160) {
            pourSpeed.value = 120;
        }

        console.log("Pour Speed:", pourSpeed.value);

        if (isPouring.value) {
            pourCoffee();
        }
    }, pourSpeed.value);
}

watch(coffeeVolume, (newVal) => {
    if (newVal > 150) {
        setTimeout(() => {
            isFailed.value = true;
            console.log('failed');
        },1000)
    }
    else if (newVal == 150) {
        setTimeout(() => {
            recheck()
        },1000)
    }

})

function recheck() {
    if (isPouring.value == false && coffeeVolume.value == 150) {
        isSuccess.value = true;
        console.log('success');
    }
}

watch(isFailed, (newVal) => {
    if (newVal) {
        isDragable.value = false;
        [pourInterval, waterInterval, coffeeInterval].forEach(clearInterval);
    }
})

//animate water & coffee

let framerate = 80;

const waterCurrentFrame = ref('coffee-01-waterpour3.png')
let waterInterval

function animateWater() {
    let frame = 1;
    waterInterval = setInterval(() => {
        if (frame > 3) frame = 1;
        waterCurrentFrame.value = `coffee-01-waterpour${frame}.png`;
        frame++;
    }, framerate);
}

const coffeeCurrentFrame = ref('coffee-01-cfpour3.png')
let coffeeInterval

function animateCoffee() {
    let frame = 1;
    coffeeInterval = setInterval(() => {
        if (frame > 3) frame = 1;
        coffeeCurrentFrame.value = `coffee-01-cfpour${frame}.png`;
        frame++;
    }, framerate);
}

function restart() {
    setTimeout(() => {
        isSuccess.value = false;
        isFailed.value = false;
        isDragable.value = true;
        coffeeVolume.value = 0;
        fill.value = 100;
    }, 1500)
}

</script>

<style scoped>
.responsive-text {
    font-size: 6.04444444vh;
}

@media (max-aspect-ratio: 16/9) {
    .responsive-text {
        font-size: 3.4vw;
    }
}

.mask-coffee {
    -webkit-mask-image: url(/images/coffee-01/mask.png);
    mask-image: url(/images/coffee-01/mask.png);
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
}

@keyframes steam {
    0% {
        transform: translateY(0%);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateY(-20%);
        opacity: 0;
    }
}

.steam {
    animation: steam 1.5s infinite normal ease;
    transform-origin: top;
}
</style>