<template>
    <GeneralContainer>
        <div class="absolute top-0 left-0 w-full">
            <NuxtImg src="./images/bath-03/BG.png" quality="80" format="webp"/>
        </div>

        <GeneralMenubar/>

        <div class="absolute top-[15%] left-[42.6%] w-[14%]">
            <NuxtImg src="./images/bath-03/girl.png" quality="80" format="webp"/>
        </div>

        <div class="absolute top-[31%] right-[3%] w-[45%]">
            <NuxtImg src="./images/bath-03/shirts.png" quality="80" format="webp"/>
        </div>

        <div class="absolute top-[20%] left-[-1%] w-[55%]">
            <NuxtImg src="./images/bath-03/pants.png" quality="80" format="webp"/>
        </div>

        <div class="absolute top-[68%] left-[5.9%] w-[15%]">
            <NuxtImg src="./images/bath-03/box.png" quality="80" format="webp"/>
        </div>

        <div class="absolute top-[88%] left-[20%] w-[12%]">
            <NuxtImg src="./images/bath-03/shoes.png" quality="80" format="webp"/>
        </div>

        <!-- Next Button -->
        <div @touchstart="isGoingToNext = true" class="absolute top-[58%] left-[78%] w-[20%]" :class="isSuccess ? 'opacity-100 z-[201] next' : 'opacity-75 z-[199] pointer-events-none'">
            <NuxtImg src="./images/bath-01/next.webp" quality="80" format="webp"/>
        </div>
    </GeneralContainer>
</template>

<script setup>
const isGoingToNext = ref(false)
// const isSuccess = ref(false)
</script>

<style scoped>

</style>