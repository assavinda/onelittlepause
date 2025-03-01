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
        
        <div class="absolute top-[0%] left-[21%] w-[25%] bow">
            <img :src="images['zones-bow.png']">
        </div>

        <!-- buttons -->

        <button @click="isGameSelected = true; game = 'Bath01'" class="absolute top-[20%] left-[15%] w-[36%]">
            <img :src="images['zones-bathtime.png']">
        </button>

        <button @click="isGameSelected = true; game = 'Coffee01'" class="absolute top-[50%] left-[15%] w-[36%]">
            <img :src="images['zones-superrelax.png']">
        </button>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-white fade-out pointer-events-none"></div>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage',game)" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none" :class="isGameSelected ? 'fade-in' : 'opacity-0 pointer-events-none' "></div>


    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const game = ref('')
const isGameSelected = ref(false);
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

@keyframes bow {
    0% {
        rotate: 5deg;
    }
    100% {
        rotate: 0deg;
    }
}

.bow {
    animation: bow 0.5s infinite alternate ease-in-out;
    transform-origin: center;
}
</style>