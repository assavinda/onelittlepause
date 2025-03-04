<template>
    <GeneralContainer>
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

            <div class="absolute bottom-[3%] left-[32%] w-[35%] z-[13] girl">
                <img :src="images['bath-02-hand.png']">
            </div>
        </div>

        <!-- shelf -->
        <div class="absolute top-[33%] left-[3%] w-[40%] z-[13]">
            <img :src="images['bath-02-shelf.png']">
        </div>

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
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

</style>