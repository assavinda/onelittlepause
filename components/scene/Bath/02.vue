<template>
    <GeneralContainer ref="container">
        <!-- background images -->
        <div class="absolute top-0 left-0">
            <img :src="images['bath-02-BG-2.png']">
        </div>

        <!-- bubbles & girl -->
        <div class="absolute top-[8%] left-0">
            <img :src="images['bath-02-bubble-back.png']">
        </div>

        <div class="absolute top-0 left-[10%]">
            <img :src="images['bath-02-girlnoface.png']">
        </div>

        <div class="absolute top-0 left-[10%]">
            <img :src="images['bath-02-smile.png']">
        </div>

        <div class="absolute top-[15.5%] left-0">
            <img :src="images['bath-02-bubble-front.png']">
        </div>

        <div class="absolute bottom-[3%] left-[32%] w-[35%]">
            <img :src="images['bath-02-hand.png']">
        </div>

        <!-- shelf -->
        <div class="absolute top-[33%] left-[3%] w-[40%]">
            <img :src="images['bath-02-shelf.png']">
        </div>

        <div class="absolute top-[5%] right-[18%] w-[30%]">
            <img :src="images['bath-02-sponge-2.png']">
        </div>

        <!-- Score Bar -->
        <div class="absolute top-[2%] right-[10%] w-[20%] z-[10]">
            <img :src="images['bath-01-scorebar.png']">
        </div>

        <div class="absolute top-[7%] right-[10.9%] w-[14.6%] h-[5%] bg-pink-200 z-[5]">
            <div class="h-full bg-pink-400" :style="{width: cleanValue + '%'}"></div>
        </div>

        <!-- star -->

        <div class="absolute top-[17%] right-[2%] w-[5%] h-[30%] z-[10] flex flex-col items-center space-y-[40%]">
            <div v-for="star in starArray" class="w-[70%]">
                <img :src="images['bath-02-star-yellow.png']">
            </div>
        </div>

        <!-- fakbua -->
        <div @touchstart="startDrag" @touchend="stopDrag" class="absolute w-[50%] z-[14]" :class="isCoolingDown ? 'opacity-75' : '' " :style="{ top: `${pos.top}%`, left: `${pos.left}%`}">
            <img :src="images['bath-02-fakbua.png']">
        </div>

        <!-- temp -->

        <div class="absolute top-[84%] pointer-events-none w-[7%] z-[15]" :style="{left: spongeLeft + '%'}">
            <img :src="images['bath-02-sponge.png']">
        </div>

        <div @touchstart="isGoingToNext = true" class="absolute top-[80%] right-[0%] w-[12%]" :class="isSuccess ? 'opacity-100 z-[201] next' : 'opacity-75 z-[199] pointer-events-none'">
            <img :src="images['bath-02-next.png']">
        </div>

        <!-- popup -->
        <div class="absolute flex w-[100%] h-[100%] top-0 left-0 z-[200] justify-center pointer-events-none backdrop-blur-xs" :class="isSuccess ? 'opacity-100' : 'opacity-0'">
            <div class="w-full h-full opacity-25"></div>
            <div class="absolute top-0 left-0">
                <img :src="images['coffee-01-perfect.png']" :class="isSuccess ? 'scale-[1] opacity-100' : 'scale-[3] opacity-0'">
            </div>
        </div>

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const cleanValue = ref(0)
const isDragable = ref(true)

const isGoingToNext = ref(false)

const starArray = ref([])

const isCoolingDown = ref(false)

watch(() => starArray.value.length, (newLength) => {
    if(newLength >= 3) {
        starArray.value = []
        cleanValue.value += 33.3333333
    }
});

const isSuccess = ref(false)

watch(cleanValue, (newVal) => {
    if (newVal >= 99) {
        isSuccess.value = true
    }
})
//drag system
const container = ref(null);
let containerBounds = null;

const isCleaning = ref(true)
const spongeLeft = ref(18)
const spongeIsGoBack = ref(false)

function spongeMove() {
    if (spongeLeft.value > 18 && spongeLeft.value < 78) {
        if (spongeIsGoBack.value == true) {
            spongeLeft.value--
        }
        else {
            spongeLeft.value++
        }
    }
    else if (spongeLeft.value >= 78) {
        spongeIsGoBack.value = true
        spongeLeft.value--
    }
    else if (spongeLeft.value <= 18) {
        spongeIsGoBack.value = false
        spongeLeft.value++
    }
}

onMounted(() => {
    // setInterval(() => {
    //     spongeMove()
    // },50)
})

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const pos = ref({ top: 65, left: 80.2 })

function startDrag(e) {
    if (!isDragable.value) return;
    
    containerBounds == null ? getBound() : console.log('gotten');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    pos.value.left = pcX - 5
    pos.value.top = pcY - 5

    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
}

function onDrag(e) {
    if (!isDragable.value) {
        stopDrag()
        return
    }
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    pos.value.left = pcX - 5
    pos.value.top = pcY - 5

    if(pos.value.left > 34 && pos.value.left < 56) {
        if (spongeLeft.value >= 45 && spongeLeft.value <= 51) {
            if (isCleaning.value == false && isCoolingDown.value == false) {
                isCleaning.value = true
                isCoolingDown.value = true
                // setTimeout(() => {
                //     isCoolingDown.value = false
                // },2000)
                starArray.value.push('star')
                console.log('add 1 star')
            }
        }
        else {
            isCoolingDown.value = true
            isCleaning.value = false
        }
    }
    else {
        isCoolingDown.value = false
        isCleaning.value = false
    }
}

function stopDrag() {
    pos.value.left = 80.2
    pos.value.top = 65

    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}
</script>

<style scoped>

</style>