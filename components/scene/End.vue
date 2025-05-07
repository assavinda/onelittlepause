<template>
    <GeneralContainer>
        <div class="absolute top-0 left-0 w-full h-full bg-black">
            
        </div>

        <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center fade-in">
            <img :src="images['end-coscilogo.png']" class="w-[80%]">
            <div @click="reloadPage" class="p-[1.2%] bg-white text-pink-500 border-2 border-pink-500 rounded-2xl cursor-pointer responsive-text hover:scale-[1.05]">
                Play Again
            </div>
        </div>
    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");

function reloadPage() {
    window.location.reload();
}
</script>

<style scoped>
.responsive-text {
    font-size: 3.4816vh;
    font-family: 'wintermouse', sans-serif;
}

@media (max-aspect-ratio: 16/9) {
    .responsive-text {
        font-size: 1.9584vw;
        font-family: 'wintermouse', sans-serif;
    }
}
</style>