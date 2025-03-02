<template>
    <section class="containerx">
        <!-- bg holder -->
        <div>
            <img :src="images['home-homeground-bg.png']" class="holder">
        </div>
        
        <slot></slot>
    </section>
</template>

<script setup>
const images = inject("preloaded");

</script>

<style scoped>

</style>