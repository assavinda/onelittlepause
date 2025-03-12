<template>
    <div class="absolute top-0 left-0 w-full h-[16%] z-[300] p-[1%]">
        <div class="flex justify-between">
            <div @click="reloadPage" class="w-[6%]">
                <img :src="images['general-home-icon.png']">
            </div>
            <div @click="$emit('popup')" class="w-[5%]">
                <img :src="images['general-info-icon.png']">
            </div>
        </div>
    </div>
</template>

<script setup>
const images = inject('preloaded')

function reloadPage() {
    window.location.reload()
}

</script>

<style scoped>

</style>