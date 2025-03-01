<template>
    <GeneralContainer ref="container">
        <!-- background images -->

        <div class="absolute top-0 left-0">
            <img :src="images['coffee-02-bg-coffee02.jpg']">
        </div>

        <!-- Colors -->
        <div class="absolute flex flex-col gap-[6%] w-[5.3%] h-[46%] top-[23%] left-[77.8%]">
            <div v-for="arrow,color in brushColors" class="colorpalette" @click="setColor(color,arrow)" :style="{ backgroundColor: color }"></div>
        </div>

        <!-- Arrow -->
        <div class="absolute left-[67%] w-[17%] pointer-events-none" :style="{top: currentArrowPos + '%'}">
            <img :src="images['coffee-02-arrow.png']">
        </div>

        <!-- Faces Menu -->
        <div class="absolute top-[10%] left-[-18%] w-[67%] pointer-events-none">
            <img :src="images['coffee-02-frame.png']">
        </div>

        <div class="absolute top-[32%] left-[8%] w-[12.5%] space-y-[5%] flex flex-col">
            <div @click="currentFaceIndex != 2 ? currentFaceIndex += 1 : currentFaceIndex = 0" class="flex justify-center">
                <img class="w-[60%]" :src="images['coffee-02-arrow-up.png']">
            </div>

            <div class="relative">
                <div>
                <img :src="images['coffee-02-plain-faceboard.png']">
                </div>
                <div @click="setFace(`${facesList[currentFaceIndex]}`)" class="absolute top-[5%]">
                    <img :src="images[`coffee-02-eye-${facesList[currentFaceIndex]}.png`]">
                </div>
            </div>

            <div @click="currentFaceIndex != 0 ? currentFaceIndex -= 1 : currentFaceIndex = 2" class="flex justify-center">
                <img class="w-[60%]" :src="images['coffee-02-arrow-down.png']">
            </div>

            <div @click="clearCanvas" class="flex justify-center">
                <img class="w-[70%]" :src="images['coffee-02-delete-btn.png']">
            </div>
        </div>

        <!-- Save Button -->
        <div @click="saveDrawing" class="absolute top-[77%] right-[3%] w-[16%]">
            <img :src="images['coffee-02-save-btn.png']">
        </div>

        <!-- Drawing Canvas -->
        <div class="absolute top-[30%] left-[28.5%] w-[45%]">
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
            ref="drawingCanvas" @touchstart="startDrawing" @touchmove="draw" @touchcancel="stopDrawing" @touchend="stopDrawing"
            class="absolute left-[18%] top-[5%] rounded-[100%]" :style="{width: canvasWidth + '%', height: canvasHeight + '%'}"
          ></canvas>
        </div>

        <!-- fg fade in -->
        <GeneralLoading :progress="progressPercent" :class="isLoaded ? 'fade-out' : '' "></GeneralLoading>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-[210]" :class="isGoingToNext ? 'fade-in' : 'opacity-0 pointer-events-none' "></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const isGoingToNext = ref(false)

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
    const canvas = drawingCanvas.value;
    context.value = canvas.getContext('2d');
    context.value.lineCap = 'round';
});


// brush color
const brushSize = ref(8);
const brushColors = {
    '#b78cc0': 16.5,
    '#fbcedb': 27.5,
    '#d3eefc': 40,
    '#f8f7b2': 52.5
};
const currentBrushColor = ref('#b78cc0');

function setColor(newColor, newArrow) {
  currentBrushColor.value = newColor;
  setArrow(newArrow);
}
// arrow
const currentArrowPos = ref(16.5);
function setArrow(newPosition) {
  currentArrowPos.value = newPosition;
}

//faces
const facesList = ['heart', 'cat', 'wink'];
const currentFaceIndex = ref(0);

const currentFace = ref('blank');

function setFace(faceName) {
  currentFace.value = faceName;
}

//Drawing Canvas
const drawingCanvas = ref(null);
const context = ref(null);
const canvasWidth = ref(62);
const canvasHeight = ref(58);
let drawingCanvasBound = null

const isDrawing = ref(false);

function getBound() {
    const drawingCanvasElement = drawingCanvas.value?.$el || drawingCanvas.value;
    drawingCanvasBound = drawingCanvasElement.getBoundingClientRect();
}

function startDrawing(e) {
  isDrawing.value = true;

  drawingCanvasBound == null ? getBound() : console.log('gotten');

  context.value.beginPath();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const pcX = (clientX - drawingCanvasBound.left) / drawingCanvasBound.width * 100;
  const pcY = (clientY - drawingCanvasBound.top) / drawingCanvasBound.height * 100;
  context.value.moveTo(pcX*3, pcY*1.5);

};

function draw(e) {
  if (!isDrawing.value) return;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const pcX = (clientX - drawingCanvasBound.left) / drawingCanvasBound.width * 100;
  const pcY = (clientY - drawingCanvasBound.top) / drawingCanvasBound.height * 100;
  context.value.lineTo(pcX*3, pcY*1.5);

  context.value.strokeStyle = currentBrushColor.value;
  context.value.lineWidth = brushSize.value;
  context.value.stroke();
};

function stopDrawing() {
  isDrawing.value = false;
  context.value.closePath();
};

function clearCanvas() {
  context.value.clearRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height);
  currentFace.value = 'blank';
};


function saveDrawing() {
  const dataURL = drawingCanvas.value.toDataURL('image/png');

  localStorage.setItem('savedDrawing', dataURL);
  localStorage.setItem('savedFace', currentFace.value);

  isGoingToNext.value = true
}

</script>

<style scoped>
.colorpalette {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: 0.2px solid black;
    border-radius: 100%;
}
</style>