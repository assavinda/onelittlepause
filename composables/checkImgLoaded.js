export function checkImagesLoaded(callback) {
    const imgElements = document.querySelectorAll("img");
    const totalImages = imgElements.length;
    let loadedImages = 0;

    if (totalImages === 0) {
        callback(100); // ถ้าไม่มีรูปเลย ก็ถือว่าโหลดเสร็จ 100%
        return;
    }

    function imageLoaded() {
        loadedImages++;
        const progress = Math.round((loadedImages / totalImages) * 100);
        callback(progress); // ส่ง progress กลับไปให้ callback

        if (loadedImages === totalImages) {
            callback(100); // รูปทั้งหมดโหลดเสร็จ
        }
    }

    imgElements.forEach((img) => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.onload = imageLoaded;
            img.onerror = imageLoaded; // ถ้ามี error ก็ให้ถือว่าโหลดเสร็จ
        }
    });
}
