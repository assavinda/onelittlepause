<template>
    <GeneralContainer>
        <!-- background images -->

        <div class="absolute top-0 left-0 w-full">
            <img :src="images['zones-zones-bg.png']">
        </div>

        <GeneralMenubar @popup="isSuggestShow = true"/>

        <div class="absolute bottom-[0%] left-[58%] w-[34%]">
            <img :src="images['zones-girl.png']">
        </div>

        <div class="absolute top-[60%] left-[65.2%] w-[19%] fan">
            <img :src="images['zones-fan.png']">
        </div>

        <div class="absolute top-[80%] left-[59.6%] w-[31.2%]">
            <img :src="images['zones-girl-arm.png']">
        </div>

        <!-- buttons -->

        <button @click="isGameSelected = true; game = 'Bath01'" class="absolute top-[5%] left-[15%] w-[36%] cursor-pointer transition-all hover:scale-[1.02]">
            <img :src="images['zones-bathtime.png']">
        </button>

        <button @click="isGameSelected = true; game = 'Coffee01'" class="absolute top-[45%] left-[15%] w-[36%] cursor-pointer transition-all hover:scale-[1.02]">
            <img :src="images['zones-superrelax.png']">
        </button>

        <!-- Suggestion -->
        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center backdrop-blur-xs transition-all duration-300" :class="isSuggestShow ? 'opacity-100' : 'opacity-0 pointer-events-none'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute w-[60%] top-[20%]">
                <img :src="images['zones-howto.png']">
            </div>
            <div class="absolute top-[58%] w-[8%] cursor-pointer transition-all hover:scale-[1.05]" @click="isSuggestShow = false">
                <img :src="images['general-X-icon.png']">
            </div>
        </div>

        <!-- fg fade in -->
        <GeneralLoading :progress="progressPercent" :class="isLoaded ? 'fade-out' : '' "></GeneralLoading>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage',game)" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none" :class="isGameSelected ? 'fade-in' : 'opacity-0 pointer-events-none' "></div>


    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const game = ref('')
const isGameSelected = ref(false);
const isSuggestShow = ref(true)

// check if all img has loaded
const isLoaded = ref(false);
const progressPercent = ref(0)

let emit = defineEmits()

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

watch(isLoaded, (newValue) => {
    if (newValue == true) {
        emit('playthemesong','game-musicloop1')
    }
});

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