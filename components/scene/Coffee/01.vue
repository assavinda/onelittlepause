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
        <div class="absolute top-[59.7%] left-[15%] w-[75%] h-[75%] pointer-events-none z-[17]">
            <img ref="pourimg" :src="images['coffee-01-cfpour3.png']">
            <!-- there is an animation here -->
        </div>

        <!-- Water Pour -->
        <div class="absolute top-0 left-0 w-[10%] opacity-0 z-[1]">
            <img :src="images['coffee-01-water-pour.png']">
            <!-- there is an animation here -->
        </div>

        <!-- Coffee Filter -->
        <div class="absolute top-[15.8%] left-[19.85%] w-[65%] z-[12] pointer-events-none">
            <img :src="images['coffee-01-coffee-filter.png']">
        </div>

        <!-- Coffee Mask -->

        <div class="mask-coffee absolute bottom-[12.9%] left-[39.4%] z-[11] w-[21.6%] opacity-0">
            <img ref="coffeeFill" class="w-[100%]" :src="images['coffee-01-coffee-fill.png']">
            <div class="flex justify-center">
                <div class="absolute w-[75%] z-[12]"> 
                    <img :src="images['coffee-01-surface.png']">
                </div>
            </div>
        </div>

        <!-- Pot (Dragable) -->
        <div ref="pot" @touchstart="startDrag" class="absolute left-0 top-0 w-[30%] z-[190] cursor-grab" :style="{ top: `${pos.top}%`, left: `${pos.left}%`}">
            <img :src="images['coffee-01-potnew.png']">
        </div>

        <!-- ML text -->
        <div class="absolute flex top-[22.5%] left-[43%] w-[15%]">
            <div class="text-center w-full">
                <p class="responsive-text text-white">
                    ML
                </p>
            </div>
        </div>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-white fade-out pointer-events-none"></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");

// drag system ----------------------------------------------------------
const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

//pot management
const pot = ref(null);
const pos = ref({ top: 50, left: 56.2 })

function startDrag(e) {

    containerBounds == null ? getBound() : console.log('gotten');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    pos.value.left = pcX - 17.5
    pos.value.top = pcY - 30

    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
}

function onDrag(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    pos.value.left = pcX - 17.5
    pos.value.top = pcY - 30

}

function stopDrag() {
    pos.value.left = 56.2
    pos.value.top = 50

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
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
</style>