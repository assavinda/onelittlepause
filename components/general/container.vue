<template>
    <section class="relative w-fit h-fit overflow-hidden bg-white">
        <!-- bg holder -->
        <div>
            <img :src="images['home-homeground-bg.png']" class="max-w-screen max-h-screen object-contain opacity-0">
        </div>
        
        <slot></slot>
    </section>
</template>

<script setup>
const images = inject("preloaded");

</script>

<style scoped>

</style>