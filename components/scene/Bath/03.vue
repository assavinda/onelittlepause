<template>
    <GeneralContainer ref="container">
        <div class="absolute top-0 left-0 w-full">
            <img :src="images['bath-03-BG.webp']">
        </div>

        <GeneralMenubar @popup="isSuggestShow = true"/>

        <div class="absolute bottom-[11%] left-[10%] w-[27%]">
            <img :src="images['bath-03-clothesline2.webp']">
        </div>

        <div class="absolute bottom-[11%] right-[10%] w-[26%]">
            <img :src="images['bath-03-clothesline.webp']">
        </div>

        <div id="dressImg" class="w-full h-full absolute top-0 left-0">
            <div class="absolute top-[15%] left-[42.6%] w-[14%]">
                <img :src="images['bath-03-girl.webp']">
            </div>

            <!-- Clothes List -->
            <div @touchstart="startDrag" @mousedown="startDrag" id="c3" class="absolute w-[9%] cursor-grab" :style="{left: `${pos.c3.left}%`, top: `${pos.c3.top}%`}">
                <img :src="images['bath-03-c3.webp']">
            </div>

            <div @touchstart="startDrag" @mousedown="startDrag" id="c2" class="absolute w-[7%] cursor-grab" :style="{left: `${pos.c2.left}%`,top: `${pos.c2.top}%`,transform: wearing.includes('c2') ? 'rotate(5deg)' : ''}">
                <img :src="images['bath-03-c2.webp']" />
            </div>

            <div @touchstart="startDrag" @mousedown="startDrag" id="c1" class="absolute w-[10.8%] cursor-grab" :style="{left: `${pos.c1.left}%`, top: `${pos.c1.top}%`}">
                <img :src="images['bath-03-c1.webp']">
            </div>

            <div @touchstart="startDrag" @mousedown="startDrag" id="c4" class="absolute w-[10%] cursor-grab" :style="{left: `${pos.c4.left}%`,top: `${pos.c4.top}%`,transform: wearing.includes('c4') ? 'rotate(-7deg)' : 'rotate(-10deg)'}">
                <img :src="images['bath-03-c4.webp']" />
            </div>
        
            <div @touchstart="startDrag" @mousedown="startDrag" id="c6" class="absolute w-[9.3%] cursor-grab" :style="{left: `${pos.c6.left}%`, top: `${pos.c6.top}%`, transform: 'rotate(7deg)'}">
                <img :src="images['bath-03-c6.webp']">
            </div>

            <div @touchstart="startDrag" @mousedown="startDrag" id="c5" class="absolute top-[34%] left-[18.2%] w-[10.6%] cursor-grab" :style="{left: `${pos.c5.left}%`, top: `${pos.c5.top}%`}">
                <img :src="images['bath-03-c5.webp']">
            </div>
        </div>

        <div class="absolute top-[68%] left-[5.9%] w-[15%]">
            <img :src="images['bath-03-box.webp']">
        </div>

       <div class="absolute top-[88%] left-[20%] w-[12%]">
            <img :src="images['bath-03-shoes.webp']">
        </div>

        <!-- Next Button -->
        <div @click="captureDressImg" class="absolute top-[58%] left-[78%] w-[20%] cursor-pointer">
            <img :src="images['bath-01-next.webp']">
        </div>

        <!-- Suggestion -->
        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center backdrop-blur-xs transition-all duration-300" :class="isSuggestShow ? 'opacity-100' : 'opacity-0 pointer-events-none'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute w-[45%] top-[10%]">
                <img :src="images['bath-03-popup-bath03.png']">
            </div>
            <div class="absolute top-[68%] left-[47.2%] w-[5%] cursor-pointer transition-all hover:scale-[1.05]" @click="isSuggestShow = false; countDown()">
                <img :src="images['general-buttonX.png']">
            </div>
        </div>

        <!-- fg fade in -->
        <GeneralLoading :progress="progressPercent" :class="isLoaded ? 'fade-out' : '' "></GeneralLoading>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-[210]" :class="isGoingToNext ? 'fade-in' : 'opacity-0' "></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const isGoingToNext = ref(false)
const isSuggestShow = ref(true)

const wearing = ref([])

// check if all img has loaded
const isLoaded = ref(false);
const progressPercent = ref(0)

onMounted(() => {
    checkImagesLoaded((progress) => {
        if (isLoaded.value == true) return 

        if (progress == 100) {
            setTimeout(() => {
                isLoaded.value = true;
            },1200)
            console.log("all images loaded");
        }
        else {
            console.log(progressPercent.value)
        }
        progressPercent.value = progress
    });
});

// drag system ----------------------------------------------------------
const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const pos = ref({ 
    c1: { left: 71.5, top: 38 },
    c2: { left: 66.2, top: 41 },
    c3: { left: 79.8, top: 37.3 },
    c4: { left: 10.8, top: 31.8 },
    c5: { left: 17.9, top: 32 },
    c6: { left: 26.2, top: 32 }
});

const origin = ref({ 
    c1: { left: 71.5, top: 38 },
    c2: { left: 66.2, top: 41 },
    c3: { left: 79.8, top: 37.3 },
    c4: { left: 10.8, top: 31.8 },
    c5: { left: 17.9, top: 32 },
    c6: { left: 26.2, top: 32 }
});

const destination = ref({ 
    c1: { left: 44.34, top: 30.81 },
    c2: { left: 46.24, top: 31.04 },
    c3: { left: 45.17, top: 31.05 },
    c4: { left: 44.65, top: 43.83 },
    c5: { left: 44.45, top: 45.42 },
    c6: { left: 45.31, top: 45.27 }
});

function startDrag(e) {
    containerBounds == null ? getBound() : console.log('gotten');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    const target = e.target.id;
    const targetDestination = destination.value[target];
    const targetOrigin = origin.value[target];

    e.target.style.zIndex = 100;

    if (wearing.value.includes(target)) {
        if (pos.value[target].left >= targetOrigin.left - 5 && pos.value[target].left <= targetOrigin.left + 5 &&
            pos.value[target].top >= targetOrigin.top - 5 && pos.value[target].top <= targetOrigin.top + 5) {
            //เข้าใกล้ destination ในระยะ 5
            pos.value[target].left = targetOrigin.left;
            pos.value[target].top = targetOrigin.top;
            wearing.value = wearing.value.filter(item => item !== target);
            stopDrag()
        }
        
        else {
            pos.value[target].left = pcX - 5;
            pos.value[target].top = pcY - 5
        }
    }
    else {
        if (pos.value[target].left >= targetDestination.left - 5 && pos.value[target].left <= targetDestination.left + 5 &&
            pos.value[target].top >= targetDestination.top - 5 && pos.value[target].top <= targetDestination.top + 5) {
            //เข้าใกล้ destination ในระยะ 5
            pos.value[target].left = targetDestination.left;
            pos.value[target].top = targetDestination.top;
            wearing.value.push(target);
            stopDrag()
        }
        else {
            pos.value[target].left = pcX - 5;
            pos.value[target].top = pcY - 5
        }
    }

    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    const target = e.target.id;
    const targetDestination = destination.value[target];
    const targetOrigin = origin.value[target];

    if (wearing.value.includes(target)) {
        if (pos.value[target].left >= targetOrigin.left - 5 && pos.value[target].left <= targetOrigin.left + 5 &&
            pos.value[target].top >= targetOrigin.top - 5 && pos.value[target].top <= targetOrigin.top + 5) {
            //เข้าใกล้ destination ในระยะ 5
            pos.value[target].left = targetOrigin.left;
            pos.value[target].top = targetOrigin.top;
            wearing.value = wearing.value.filter(item => item !== target);
            e.target.style.zIndex = 10;
            stopDrag()
        }
        else {
            pos.value[target].left = pcX - 5;
            pos.value[target].top = pcY - 5
        }
    }
    else {
        if (pos.value[target].left >= targetDestination.left - 5 && pos.value[target].left <= targetDestination.left + 5 &&
            pos.value[target].top >= targetDestination.top - 5 && pos.value[target].top <= targetDestination.top + 5) {
            //เข้าใกล้ destination ในระยะ 5
            pos.value[target].left = targetDestination.left;
            pos.value[target].top = targetDestination.top;
            wearing.value.push(target);
            e.target.style.zIndex = 10;
            if (target == 'c4' || target == 'c5' || target == 'c6') {
                if (wearing.value.includes('c1') || wearing.value.includes('c4') || wearing.value.includes('c5') || wearing.value.includes('c6')) {
                    wearing.value = wearing.value.filter(item => item === target || item === 'c2' || item === 'c3');
                }
                ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].forEach(item => {
                    if (!wearing.value.includes(item)) {
                        pos.value[item].left = origin.value[item].left;
                        pos.value[item].top = origin.value[item].top;
                    }
                });
            }
            else if (target == 'c2' || target == 'c3') {
                if (wearing.value.includes('c1') || wearing.value.includes('c2') || wearing.value.includes('c3')) {
                    wearing.value = wearing.value.filter(item => item === target || item === 'c4' || item === 'c5' || item === 'c6');
                }
                ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].forEach(item => {
                    if (!wearing.value.includes(item)) {
                        pos.value[item].left = origin.value[item].left;
                        pos.value[item].top = origin.value[item].top;
                    }
                });
            }
            else if (target == 'c1') {
                if (wearing.value.includes('c1') || wearing.value.includes('c2') || wearing.value.includes('c3')) {
                    wearing.value = wearing.value.filter(item => item === target);
                }
                ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].forEach(item => {
                    if (!wearing.value.includes(item)) {
                        pos.value[item].left = origin.value[item].left;
                        pos.value[item].top = origin.value[item].top;
                    }
                });
            }
            stopDrag()
        }
        else {
            pos.value[target].left = pcX - 5;
            pos.value[target].top = pcY - 5
        }
    }
}

function stopDrag(e) {
    if (e) {
        e.target.style.zIndex = 10;
        const target = e.target.id;
        const targetDestination = destination.value[target];
        const targetOrigin = origin.value[target];
        if (wearing.value.includes(target)) {
            if (pos.value[target].left >= targetOrigin.left - 5 && pos.value[target].left <= targetOrigin.left + 5 &&
                pos.value[target].top >= targetOrigin.top - 5 && pos.value[target].top <= targetOrigin.top + 5) {
                //เข้าใกล้ destination ในระยะ 5
                pos.value[target].left = targetOrigin.left;
                pos.value[target].top = targetOrigin.top;
                wearing.value = wearing.value.filter(item => item !== target);
                stopDrag()
            }
            
            else {
                pos.value[target].left = targetOrigin.left;
                pos.value[target].top = targetOrigin.top;
                wearing.value = wearing.value.filter(item => item !== target);
            }
        }
        else {
            if (pos.value[target].left >= targetDestination.left - 5 && pos.value[target].left <= targetDestination.left + 5 &&
                pos.value[target].top >= targetDestination.top - 5 && pos.value[target].top <= targetDestination.top + 5) {
                //เข้าใกล้ destination ในระยะ 5
                pos.value[target].left = targetDestination.left;
                pos.value[target].top = targetDestination.top;
                wearing.value.push(target);
                stopDrag()
            }
            else {
                pos.value[target].left = targetOrigin.left;
                pos.value[target].top = targetOrigin.top;
            }
        }
    }

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
}

import html2canvas from 'html2canvas'

async function captureDressImg() {
  const target = document.getElementById('dressImg')
  if (!target) return

  const imgs = target.querySelectorAll('img')
  await Promise.all([...imgs].map(img =>
    new Promise(resolve => (img.complete ? resolve() : img.onload = resolve))
  ))

  const fullCanvas = await html2canvas(target, {
    backgroundColor: null,
    scale: 10,
  })

  const width = fullCanvas.width
  const height = fullCanvas.height
  const cropWidth = width * 0.2
  const cropHeight = height * 1
  const startX = (width - cropWidth) / 2
  const startY = (height - cropHeight) / 2

  const croppedCanvas = document.createElement('canvas')
  croppedCanvas.width = cropWidth
  croppedCanvas.height = cropHeight

  const ctx = croppedCanvas.getContext('2d')
  ctx.drawImage(
    fullCanvas,
    startX, startY, cropWidth, cropHeight,
    0, 0, cropWidth, cropHeight
  )

  const imgData = croppedCanvas.toDataURL('image/png')

  // Save to localStorage
  sessionStorage.setItem('capturedDress', imgData)

  isGoingToNext.value = true
}

</script>

<style scoped>

</style>