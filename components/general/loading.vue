<template>
    <section class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-[500]">
        <div class="flex flex-col w-full h-full justify-center place-items-center transition-opacity duration-300" :class="progress >= 100 ? 'opacity-0' : 'opacity-100' ">
            <div class="w-[20%] mb-[2%]">
                <img :src="images['general-logo.png']">
            </div>
            <div class="w-[40%] bg-gray-200 rounded-full h-[2%]">
                <div class="bg-red-500 h-full rounded-full transition-all duration-300" :style="{width: progress + '%'}"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
const images = inject('preloaded')
const props = defineProps(['progress'])
</script>

<style scoped>
.responsive-text {
    font-size: 5.03703703vh;
}

@media (max-aspect-ratio: 16/9) {
    .responsive-text {
        font-size: 2.83333333vw;
    }
}
</style>