<template>
    <GeneralContainer>
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
            <p class="time-text text-responsive text-yellow-600 "> 00:{{timeString}} </p>
        </div>

        

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')

const cleanValue = ref(0)
const time = ref(15)
const timeString = ref('15')


</script>

<style scoped>

</style>