<template>
    <GeneralContainer>
        <section class="absolute top-0 left-0">
            <video ref="videoRef" class="w-full" :muted="SoundState === 'off'" playsinline>
                <source src="/video/Intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>

        <div @click="$emit('nextpage')" class="absolute bottom-[5%] right-[5%] p-[1.2%] bg-white text-pink-500 border-2 border-pink-500 rounded-2xl cursor-pointer responsive-text hover:scale-[1.05]">
            Skip Intro
        </div>
    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const videoRef = ref(null)
const { SoundState } = defineProps({ SoundState: String });
const emit = defineEmits()
onMounted(() => {
    setTimeout(() => {
        if (videoRef.value) {
            const playPromise = videoRef.value.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Video play failed:", error);
                });
            }
        }
    }, 500);

    videoRef.value?.addEventListener("ended", () => {
        emit('nextpage')
    });
});
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