<template>
    <GeneralContainer>
        <!-- background images -->

        <div class="absolute top-0 left-0">
            <img :src="images['coffee-03-bg-coffee03.jpg']">
        </div>

        <!-- Letter -->
        <div class="absolute top-[16%] left-[31.5%] w-[35%] h-[70%]">
            <img :src="images['coffee-03-letter-stack.png']" class="absolute top-[28%] left-[3%]">
            <img :src="images['coffee-03-letter-back.png']" class="absolute top-[-0.65%] left-[0%]">
            <div class="absolute top-[-40%] left-0 w-[100%] h-[100%] mask-letter">
                <div id="LetterImage" class="absolute top-[8%] left-[17%] w-[70%]" :style="{ transform: `translateY(${-slide}%)` }">
                    <img :src="images['coffee-03-paper-inletter.png']">

                    <div class="absolute top-[25%] left-[14%] w-[65%]">
                        <div>
                            <img :src="images['coffee-02-glasstodraw.png']">
                        </div>

                        <div class="absolute left-[34.2%] top-[-9%] w-[30%] pointer-events-none">
                            <img :src="images[`coffee-02-${currentFace}-eyes.png`]">
                        </div>

                        <div class="absolute left-[32.2%] top-[56%] w-[35%] pointer-events-none">
                            <img :src="images[`coffee-02-${currentFace}-mouth.png`]">
                        </div>

                        <canvas
                            ref="outputCanvas1"
                            class="absolute left-[18%] top-[5%] rounded-[100%]"
                            :style="{ width: canvasWidth + '%', height: canvasHeight + '%' }"
                        ></canvas>
                    </div>
                </div>
            </div>
            <img :src="images['coffee-03-letter-front.png']" class="absolute top-[26%] left-[0%]">
            <img :src="images['coffee-03-stamp.png']" class="absolute top-[30%] left-[16%] w-[60%]">
        </div>

        <!-- Slider -->
        <div class="absolute bottom-[14%] left-[29%] w-[100%] h-[5%]">
            <input
                type="range"
                :min="sliderMin"
                :max="sliderMax"
                :step="sliderStep"
                v-model="slide"
                class="slider"
                :style="sliderStyle"
            />
        </div>

        <!-- Save Button -->
        <div ref="savebtn" @click="saveAsPNG" class="absolute bottom-[5%] right-[5%] w-[10%] z-[120]" :class="isPopUpShow ? 'opacity-100 next' : 'opacity-70 pointer-events-none' ">
            <img :src="images['coffee-03-save-letter.png']">
        </div>

        <!-- Paper Popup -->
        <div ref="paperPopup" class="absolute top-0 left-0 w-[100%] h-[100%] backdrop-blur-xs z-[100] transition-all duration-500" :class="isPopUpShow ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <div class="relative w-[100%] flex justify-center pt-[7%]">
                <div class="relative w-[40%]">
                    <img :src="images['coffee-03-paper.png']">

                    <div class="absolute top-[30%] left-[17%] w-[65%]">
                        <div>
                            <img :src="images['coffee-02-glasstodraw.png']">
                        </div>

                        <div class="absolute left-[34.2%] top-[-9%] w-[30%] pointer-events-none">
                            <img :src="images[`coffee-02-${currentFace}-eyes.png`]">
                        </div>

                        <div class="absolute left-[32.2%] top-[56%] w-[35%] pointer-events-none">
                            <img :src="images[`coffee-02-${currentFace}-mouth.png`]">
                        </div>

                        <canvas
                            ref="outputCanvas2"
                            class="absolute left-[18%] top-[5%] rounded-[100%]"
                            :style="{ width: canvasWidth + '%', height: canvasHeight + '%' }"
                        ></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- fg fade in -->
        <GeneralLoading :progress="progressPercent" :class="isLoaded ? 'fade-out' : '' "></GeneralLoading>

    </GeneralContainer>
</template>

<script setup>
import html2canvas from 'html2canvas';

const images = inject("preloaded");

// check if all img has loaded
const isLoaded = ref(false);
const progressPercent = ref(0)

onMounted(() => {
    checkImagesLoaded((progress) => {
        if (isLoaded.value == true) return 

        if (progress == 100) {
            setTimeout(() => {
                isLoaded.value = true;
            },1000)
            console.log("all images loaded");
        }
        else {
            console.log(progressPercent.value)
        }
        progressPercent.value = progress
    });
    showDrawing();
    currentFace.value = localStorage.getItem('savedFace');
});


//canvas
const canvasWidth = ref(62);
const canvasHeight = ref(58);
const outputCanvas1 = ref(null);
const outputCanvas2 = ref(null);

//faces
const currentFace = ref('blank');

onMounted(() => {
    showDrawing();
    currentFace.value = localStorage.getItem('savedFace');
});

function showDrawing() {
    const outputContext1 = outputCanvas1.value.getContext('2d');
    const outputContext2 = outputCanvas2.value.getContext('2d');

    const img = new Image();
    img.src = localStorage.getItem('savedDrawing');

    img.onload = () => {
        const scaleFactor = 1;
        const scaledWidth1 = outputCanvas1.value.width * scaleFactor;
        const scaledHeight1 = outputCanvas1.value.height * scaleFactor;
        const scaledWidth2 = outputCanvas2.value.width * scaleFactor;
        const scaledHeight2 = outputCanvas2.value.height * scaleFactor;

        outputContext1.drawImage(img, 0, 0, scaledWidth1, scaledHeight1);
        outputContext2.drawImage(img, 0, 0, scaledWidth2, scaledHeight2);
    };
}

//slider
const sliderMin = ref(-100);
const sliderMax = ref(-40);
const sliderStep = ref(1);
const slide = ref(-100);

// others
const isPopUpShow = ref(false)

const sliderStyle = computed(() => {
    const percentage = ((slide.value - sliderMin.value) / (sliderMax.value - sliderMin.value)) * 100;
    return {
        background: `linear-gradient(to right, #fbcedb ${percentage}%, #eb5d50 ${percentage}%)`,
    };
});

watch(slide, (newValue) => {
    if (newValue == (-40)) {
        setTimeout(() => {
            isPopUpShow.value = true
        }, 1200);
    }
});

//save
function saveAsPNG() {
    const element = document.getElementById("LetterImage");
    
    if (element) {
        
        const scaleFactor = 6;

        html2canvas(element, {
            scale: scaleFactor,
        }).then((canvas) => {
            
            const dataUrl = canvas.toDataURL("image/png");

            
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'letter-image.png'; 
            link.click();
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        console.error("Error");
    }
}
</script>

<style scoped>
.mask-letter {
    -webkit-mask-image: url(/images/coffee-03/mask-letter.png);
    mask-image: url(/images/coffee-03/mask-letter.png);
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: cover;
    mask-size: cover;
}

.slider {
    -webkit-appearance: none;
    appearance: none;
    width: 40%;
    height: 100%;
    border-radius: 10px;
    outline: none;
    transition: background 0.3s ease;
    border: 1px solid black;
    box-shadow: 0 0 0 5% black;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15%;
    height: auto;
    background-image: url(/images/coffee-03/letter-thumb.png);
    background-size: contain;
    background-repeat: no-repeat;
    aspect-ratio: 80 / 50;
    cursor: pointer;
    transition: background 0.3s ease;
}

.slider::-moz-range-thumb {
    width: 10%;
    height: auto;
    background-image: url(/images/coffee-03/letter-thumb.png);
    background-size: contain;
    background-repeat: no-repeat;
    aspect-ratio: 80 / 60;
    cursor: pointer;
}
</style>