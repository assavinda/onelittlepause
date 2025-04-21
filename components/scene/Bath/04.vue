<template>
    <GeneralContainer ref="container">
        <div class="absolute top-0 left-0 w-full">
            <img :src="images['bath-04-BG.jpg']">
        </div>

        <div class="absolute bottom-[2.25%] left-[8%] w-[33%] transition-all duration-700 " :class="previewImg ? 'opacity-0 pointer-events-none' : 'opacity-100'">
            <img :src="images['bath-04-frame.png']">
        </div>

        <div @click="isBookOpen = true" class="transition-all" :class="isBookOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'">
            <div class="absolute bottom-[26%] right-[17%] w-[33%] cursor-pointer book">
                <img :src="images['bath-04-book-close.png']">
            </div>

            <div class="absolute bottom-[53%] right-[28%] w-[15%] cursor-pointer book">
                <img :src="images['bath-04-open.png']">
            </div>

            <div class="absolute bottom-[40%] right-[6%] w-[12%] bookwink">
                <img :src="images['bath-04-winkbook1.png']">
            </div>

            <div class="absolute bottom-[40%] left-[40%] w-[12%] scale-x-[-1] bookwink">
                <img :src="images['bath-04-winkbook1.png']">
            </div>
        </div>

        <div id="stickerImg" class="transition-all duration-700  w-full h-full absolute top-0 left-0" :class="!isBookOpen || previewImg ? 'opacity-0 pointer-events-none' : 'opacity-100'">
            <div id="book" class="absolute bottom-[24%] right-[3.5%] w-[60%]">
                <img :src="images['bath-04-book-open.png']">
            </div>

            <div class="absolute bottom-[32%] right-[37%] w-[10%]">
                <img :src="images['bath-04-pencil.png']">
            </div>

            <div class="absolute top-[34%] right-[41.7%] w-[15%] h-[20%]" style="transform: rotate(4deg);">
                <textarea class="responsive-text focus:outline-none resize-none h-full w-full text-center"></textarea>
            </div>

            <div v-for="(position, key) in pos" :key="key" @touchstart="startDrag" @mousedown="startDrag" :id="key" class="absolute w-[5%] cursor-grab" :style="{left: `${position.left}%`, top: `${position.top}%`}">
                <img :src="images[`bath-04-${key}.png`]">
            </div>
        </div>

        <div class="absolute bottom-[6%] left-[35%] w-[36%]">
            <img :src="images['bath-04-prop.png']">
        </div>

        <div :class="previewImg ? 'opacity-0 pointer-events-none' : 'opacity-100'">
            <div class="absolute top-[19%] left-[16.2%] w-[4%] particles">
                <img :src="images['bath-04-star.png']">
            </div>

            <div class="absolute top-[30%] left-[30.2%] w-[4%] particles-r">
                <img :src="images['bath-04-star.png']">
            </div>

            <div class="absolute top-[36%] left-[16.2%] w-[3%] rotate-[-10deg] particles">
                <img :src="images['bath-04-wink.png']">
            </div>

            <div class="absolute top-[46%] left-[31.2%] w-[3%] particles">
                <img :src="images['bath-04-wink.png']">
            </div>

            <div class="absolute top-[55%] left-[16.2%] w-[4%] rotate-[-30deg] particles-r">
                <img :src="images['bath-04-star.png']">
            </div>

            <div class="absolute top-[62%] left-[29.2%] w-[4.8%] rotate-[-70deg] particles">
                <img :src="images['bath-04-star.png']">
            </div>

            <div class="absolute top-[72%] left-[17.2%] w-[3.5%] rotate-[-10deg] particles-r">
                <img :src="images['bath-04-wink.png']">
            </div>
        </div>

        <img :src="savedImg" alt="Captured Dress" class="absolute top-0 left-[15.2%] w-[19%] transition-all duration-700 " :class="previewImg ? 'opacity-0 pointer-events-none' : 'opacity-100'"/>

        <div :class="previewImg ? 'opacity-0 pointer-events-none' : 'opacity-100'">
            <div class="absolute bottom-[7.3%] left-[20.8%] w-[3.5%]">
                <img :src="images['bath-04-shoes.png']">
            </div>

            <div class="absolute bottom-[7.3%] left-[24.7%] w-[3.5%] scale-x-[-1]">
                <img :src="images['bath-04-shoes.png']">
            </div>

            <div class="absolute top-[30%] left-[8%] w-[10%] textbubble">
                <img :src="images['bath-04-relex.png']">
            </div>

            <div class="absolute top-[17%] left-[30%] w-[10%] textbubble">
                <img :src="images['bath-04-cute.png']">
            </div>
        </div>

        <!-- Capture button -->
        <button @click="captureBookOnly" class="absolute top-[60%] right-[14%] w-[10%] cursor-pointer transition-all duration-500 hover:scale-[1.05]" :class="!isBookOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'">
            <img :src="images['bath-04-savee.png']">
        </button>

        <!-- Preview result -->
        <div class="absolute w-full h-full top-0 left-0 z-[998] flex justify-center place-items-center transition-all duration-700 origin-[80%] " :class="previewImg ? 'opacity-100 scale-[1]' : 'opacity-0 pointer-events-none scale-[0.2]'">
            <div id="SaveImg" class="w-[80%]">
                <img :src="previewImg">
                <div class="absolute top-[15.4%] right-[14.8%] w-[31%]">
                    <img :src="images['bath-04-bookopenpart.png']">
                </div>
                <img :src="savedImg" alt="Captured Dress" class="absolute top-[13%] right-[25%] w-[12%]"/>
                <div class="absolute bottom-[28.8%] right-[31.3%] w-[2.1%]">
                    <img :src="images['bath-04-shoes.png']">
                </div>

                <div class="absolute bottom-[28.8%] right-[28.85%] w-[2.1%]" style="transform: scaleX(-1);">
                    <img :src="images['bath-04-shoes.png']">
                </div>
            </div>
            <button @click="saveAsPNG" class="absolute top-[73%] right-[26%] w-[10%] cursor-pointer transition-all duration-500 hover:scale-[1.05]" :class="!isBookOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'">
                <img :src="images['bath-04-savee.png']">
            </button>
        </div>
        
    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const savedImg = sessionStorage.getItem('capturedDress')

const isBookOpen = ref(false)

// drag system ----------------------------------------------------------
const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const pos = ref({ 
    e1: { left: 73, top: 25 },
    e2: { left: 78.2, top: 25 },
    e3: { left: 84, top: 25 },
    e4: { left: 73, top: 35 },
    e5: { left: 78.2, top: 35 },
    e6: { left: 84, top: 35 },
    e7: { left: 76.2, top: 45 },
    e8: { left: 82, top: 45 }
});

const currentDraggingId = ref(null)

function startDrag(e) {
  containerBounds == null ? getBound() : console.log('gotten')

  const targetEl = e.target.closest?.('[id]')
  const targetId = targetEl?.id
  if (!targetId || !pos.value[targetId]) return

  currentDraggingId.value = targetId
  targetEl.style.zIndex = 100

  updatePosition(e)

  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  if (!currentDraggingId.value) return
  updatePosition(e)
}

function stopDrag(e) {
  if (e) {
    const targetEl = e.target.closest?.('[id]')
    if (targetEl) targetEl.style.zIndex = 10
  }

  currentDraggingId.value = null
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function updatePosition(e) {
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY

  const pcX = (clientX - container.value.left) / container.value.width * 100
  const pcY = (clientY - container.value.top) / container.value.height * 100

  const id = currentDraggingId.value
  if (!id || !pos.value[id]) return

  pos.value[id].left = pcX - 2.5
  pos.value[id].top = pcY - 4
}


import html2canvas from 'html2canvas'

const previewImg = ref(null)

async function captureBookOnly() {
  const target = document.getElementById('stickerImg')
  const bookEl = document.getElementById('book')

  if (!target || !bookEl) return console.warn('ไม่เจอหนังสือ')

  // รอโหลดรูปให้ครบก่อน
  const imgs = target.querySelectorAll('img')
  await Promise.all([...imgs].map(img =>
    new Promise(resolve => (img.complete ? resolve() : img.onload = resolve))
  ))

  // แคปทั้งพื้นที่ก่อน
  const fullCanvas = await html2canvas(target, {
    backgroundColor: null,
    scale: 3, // เพิ่มความชัด
  })

  // หาตำแหน่งและขนาดของหนังสือ
  const targetRect = target.getBoundingClientRect()
  const bookRect = bookEl.getBoundingClientRect()

  const scale = 3 // ต้องตรงกับ html2canvas scale
  const cropX = (bookRect.left - targetRect.left) * scale
  const cropY = (bookRect.top - targetRect.top) * scale
  const cropWidth = bookRect.width * scale
  const cropHeight = bookRect.height * scale

  // สร้าง canvas ใหม่ แล้วครอปเฉพาะหนังสือ
  const croppedCanvas = document.createElement('canvas')
  croppedCanvas.width = cropWidth
  croppedCanvas.height = cropHeight

  const ctx = croppedCanvas.getContext('2d')
  ctx.drawImage(fullCanvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

  const croppedImgData = croppedCanvas.toDataURL('image/png')
  previewImg.value = croppedImgData

  localStorage.setItem('capturedBook', croppedImgData)
  console.log('Captured only the book area')
}

//save
function saveAsPNG() {
    const element = document.getElementById("SaveImg");
    
    if (element) {
        
        const scaleFactor = 6;

        html2canvas(element, {
            scale: scaleFactor,
        }).then((canvas) => {
            
            const dataUrl = canvas.toDataURL("image/png");

            
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'dressed-image.png'; 
            link.click();

            reloadPage()
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        console.error("Error");
    }
}

function reloadPage() {
    window.location.reload()
}



</script>

<style scoped>

@keyframes textbubble {
    0% {
        transform: scale(1) rotate(0deg);
    }
    100% {
        transform: scale(1.02) rotate(-4deg);
    }
}

.textbubble {
    animation: textbubble 0.3s infinite alternate ease-in-out;
    transform-origin: center;
}

.textbubble-r {
    animation: textbubble 0.3s infinite alternate-reverse ease-in-out;
    transform-origin: center;
}

@keyframes particles {
    0% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
    100% {
        opacity: 0.5;
        transform: scale(1.05) rotate(-10deg);
    }
}

.particles {
    animation: particles 0.5s infinite alternate ease-in-out;
    transform-origin: center;
}

.particles-r {
    animation: particles 0.5s infinite alternate-reverse ease-in-out;
    transform-origin: center;
}

@keyframes book {
    0% {
        transform: rotate(2.5deg);
    }
    100% {
        transform: rotate(-2.5deg);
    }
}

.book {
    animation: book 0.5s infinite alternate ease-in-out;
    transform-origin: center;
}

@keyframes bookwink {
    0% {
        transform: scale(0.8);
        opacity: 0.2;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
    
}

.bookwink {
    animation: bookwink 0.5s infinite alternate ease-in-out;
    transform-origin: center;
}

.responsive-text {
    font-size: 2.90133333vh;
    font-family: 'ddinya', sans-serif;
}

@media (max-aspect-ratio: 16/9) {
    .responsive-text {
        font-size: 1.632vw;
        font-family: 'ddinya', sans-serif;
    }
}
</style>