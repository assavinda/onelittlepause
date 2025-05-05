<template>
  <section class="flex h-screen w-screen bg-black justify-center">

    <audio ref="themesong" loop>
      <source :src="`./sounds/${currentThemeSong}.mp3`" type="audio/mpeg">
    </audio>

    <audio ref="soundeffects" v-if="currentSoundEffect != ''">
      <source :src="`./sounds/${currentSoundEffect}.mp3`" type="audio/mpeg">
    </audio>

    <SceneHome v-if="currentScene === 'Home'" @nextpage="setScene('Intro'); pauseThemeSong()" @togglesound="toggleSound" @playthemesong="playThemeSong" :SoundState="SoundState"/>

    <SceneIntro v-if="currentScene === 'Intro'" @nextpage="setScene('Zones')" :SoundState="SoundState"/>

    <SceneZones v-if="currentScene === 'Zones'" @nextpage="setScene" @playthemesong="playThemeSong"/>

    <!-- Bath Games Section -->
    <SceneBath01test v-if="currentScene === 'Bath01'" @nextpage="setScene('Bath02')" @sound="playSoundEffect"></SceneBath01test>

    <SceneBath02test v-if="currentScene === 'Bath02'" @nextpage="setScene('Bath03')" @sound="playSoundEffect"></SceneBath02test>

    <SceneBath03 v-if="currentScene === 'Bath03'" @nextpage="setScene('Bath04')"></SceneBath03>

    <SceneBath04 v-if="currentScene === 'Bath04'" @nextpage="setScene('Bath05')"></SceneBath04>



    <!-- Coffee Games Section -->
    <SceneCoffee01 v-if="currentScene === 'Coffee01'" @nextpage="setScene('Coffee02')" @sound="playSoundEffect"></SceneCoffee01>

    <SceneCoffee02 v-if="currentScene === 'Coffee02'" @nextpage="setScene('Coffee03')" @sound="playSoundEffect"></SceneCoffee02>

    <SceneCoffee03 v-if="currentScene === 'Coffee03'" @nextpage="setScene('')" @sound="playSoundEffect"></SceneCoffee03>

    
  </section>
</template>

<script setup>
onMounted(() => {
  // Prevent pinch-to-zoom
  const preventPinch = (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  };
  document.addEventListener("gesturestart", preventPinch, { passive: false });
  document.addEventListener("gesturechange", preventPinch, { passive: false });

  // Prevent double-tap zoom
  let lastTouchTime = 0;
  const preventDoubleTap = (event) => {
    const now = Date.now();
    if (now - lastTouchTime <= 300) {
      event.preventDefault(); // Prevent zoom
    }
    lastTouchTime = now;
  };

  document.addEventListener("touchstart", preventDoubleTap, { passive: false });

  document.addEventListener("mousedown", () => {
    playSoundEffect("click");
  });
});


// use head
useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "./images/general/logo.png",
    },
  ],
  title: "One Little Pause",
});

//use image preloader
const { images } = useImagePreloader();
provide("preloaded", images);

//--SCENES MANAGEMENT--

//current scene (state)
const currentScene = ref('Home');

//set scene function
function setScene(sceneName) {
  currentScene.value = sceneName;
}

//sounds management
const SoundState = ref('off')

function toggleSound() {
  SoundState.value == 'off' ? SoundState.value = 'on' : SoundState.value = 'off'
  console.log(SoundState.value)
}

watch(SoundState, (State) => {
  if (State == 'off') {
    pauseThemeSong();
  }
});


//theme songs
const themesong = ref(null);
const currentThemeSong = ref('game-musicloop1')

function playThemeSong(sound) {
  if (SoundState.value == 'off') return;

  console.log('play')
  themesong.value.load();
  themesong.value.play();
};

function pauseThemeSong() {

  themesong.value.pause();
};

//sound effects
const soundeffects = ref(null)
const currentSoundEffect = ref('')

function playSoundEffect(sound) {
  if (SoundState.value == 'off') return;
  currentSoundEffect.value = sound;
  nextTick(() => {
    soundeffects.value.load();
    soundeffects.value.play();
  });
};

function pauseSoundEffect() {
  soundeffects.value.pause();
};
</script>

<style>

* {
    will-change: auto !important;
}

html, body {
    overscroll-behavior: none;
    touch-action: pan-x pan-y;
}

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

@keyframes nextbtn {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.1);
    }
}

.next {
    animation: nextbtn 0.5s infinite alternate ease;
}
</style>