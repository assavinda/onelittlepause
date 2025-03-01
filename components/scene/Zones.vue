<template>
    <GeneralContainer>
        <!-- background images -->

        <div class="absolute top-0 left-0">
            <img :src="images['zones-zones-bg.png']">
        </div>

        <div class="absolute top-[0%] left-[39%] w-[72%]">
            <img :src="images['zones-girl.png']">
        </div>

        <div class="absolute top-[15%] left-[40.7%] w-[72%] fan">
            <img :src="images['zones-fan.png']">
        </div>

        <div class="absolute top-[30%] left-[39.3%] w-[72.2%]">
            <img :src="images['zones-girl-arm.png']">
        </div>
        

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-white fade-out pointer-events-none"></div>
    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
</script>

<style scoped>
@keyframes fan {
    0% {
        rotate: 3deg;
    }
    100% {
        rotate: -3deg;
    }
}

.fan {
    animation: fan 1s infinite alternate ease-in-out;
    transform-origin: 50% 80%;
}
</style>