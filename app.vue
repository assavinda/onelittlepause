<template>
  <section class="flex h-screen w-screen bg-black justify-center">

    <SceneHome v-if="currentScene === 'Home'" @nextpage="setScene('Zones')" />

    <SceneZones v-if="currentScene === 'Zones'" @nextpage="setScene" />

    <!-- Bath Games Section -->

    <!-- Coffee Games Section -->
    <SceneCoffee01 v-if="currentScene === 'Coffee01'"></SceneCoffee01>
    
  </section>
</template>

<script setup>

//use image preloader
const { images } = useImagePreloader();
provide("preloaded", images);

//--SCENES MANAGEMENT--

//current scene (state)
const currentScene = ref('Coffee01');

//set scene function
function setScene(sceneName) {
  currentScene.value = sceneName;
}
</script>

<style>
body {
  overflow: hidden;
  font-family: "Kanit", serif;
}

img {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.fade-out {
  animation: fade 0.7s ease forwards;
}

.fade-in {
  animation: fade 0.7s reverse ease forwards;
}
</style>