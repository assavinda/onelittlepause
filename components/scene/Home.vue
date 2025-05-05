<template>
    <GeneralContainer>

        <!-- background images -->

        <div class="absolute top-0 left-0">
            <img :src="images['home-home-bg.png']">
        </div>

        <div class="absolute top-[27%] left-[5%] w-[47%]">
            <img :src="images['home-building-01.webp']">
        </div>

        <div class="absolute top-[24%] left-[50%] w-[47%] rotate-[5deg]">
            <img :src="images['home-building-02.webp']">
        </div>

        <div class="absolute top-0 left-0">
            <img :src="images['home-homeground-bg.webp']">
        </div>

        <div class="absolute top-[13%] left-[41.5%] w-[37%] smoke">
            <img :src="images['home-smoke.webp']">
        </div>

        <div class="absolute top-[31%] left-[25.5%] w-[47%]">
            <img :src="images['home-house.webp']">
        </div>

        <div class="absolute top-[35%] left-[50%] w-[65%] rotate-[5deg] carpink">
            <img :src="images['home-car-pink.webp']">
        </div>

        <div class="absolute top-[35%] left-[-10%] w-[67%] rotate-[5deg] carpurple">
            <img :src="images['home-car-purple.webp']">
        </div>

        <div class="absolute top-[-4%] left-[29%] w-[40%] logo">
            <img :src="images['home-logo.webp']">
        </div>

        <div class="w-full h-full absolute top-0 left-0"></div>

        <div @click="$emit('togglesound'); $emit('playthemesong','game-musicloop1')" class="absolute top-[2%] right-[2%] w-[5%] transition-all cursor-pointer hover:scale-[1.09]">
            <img :src="images['home-sound1.png']">
        </div>

        <div v-if="SoundState == 'off'" class="absolute top-[2.3%] right-[2.5%] w-[4%] pointer-events-none">
            <img :src="images['home-x.png']">
        </div>

        <!-- play button -->

        <button @click="isStartGame = true" class="absolute top-[80%] left-[39%] w-[20%] cursor-pointer transition-all playbtn hover:scale-[1.05]">
            <img :src="images['home-play-btn.webp']">
        </button>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none" :class="isStartGame ? 'fade-in' : 'opacity-0 pointer-events-none' "></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const isStartGame = ref(false);
const { SoundState } = defineProps({ SoundState: String });
</script>

<style scoped>
@keyframes car {
    0% {
        rotate: -4deg;
    }
    100% {
        rotate: 4deg;
    }
}

.carpink {
    animation: car 0.5s infinite alternate ease-in-out;
    transform-origin: center;
}

.carpurple {
    animation: car 0.5s infinite alternate-reverse ease-in-out;
    transform-origin: center;
}

@keyframes smoke {
    0% {
        transform: scaleY(1);
        translate: 0% 0%;
        opacity: 1;
    }
    100% {
        transform: scaleY(0.8);
        translate: 5% -1%;
        opacity: 0.25;
    }
}

.smoke {
    animation: smoke 1s infinite ease-in-out;
    transform-origin: 0% 0%;
}

@keyframes logo {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.05);
    }
}

.logo {
    animation: logo 0.5s infinite alternate ease-in-out;
    transform-origin: center;
}

@keyframes playbtn {
    0% {
        rotate: 2deg;
    }
    100% {
        rotate: -2deg;
    }
}

.playbtn {
    animation: playbtn 0.2s infinite alternate ease-in-out;
    transform-origin: center;
}
</style>