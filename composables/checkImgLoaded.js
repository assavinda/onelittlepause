export function checkImagesLoaded(callback) {
    const imgElements = document.querySelectorAll("img");
    const totalImages = imgElements.length;
    let loadedImages = 0;

    if (totalImages === 0) {
        callback(true);
        return;
    }

    function imageLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
            callback(true);
        }
    }

    imgElements.forEach((img) => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.onload = imageLoaded;
            img.onerror = imageLoaded;
        }
    });
}
