export function useImagePreloader() {
    const images = ref({});
  
    function importAllImages() {
      const context = import.meta.glob("/public/images/**/*.{png,jpg,jpeg,webp,gif,svg}", {
        eager: true,
        as: "url"  
      });
  
      Object.keys(context).forEach((key) => {
        const imageName = key
          .replace("/public/images/", "") 
          .replace(/\//g, "-");          
        
        images.value[imageName] = context[key];
      });
      const allImagesLoaded = Object.keys(images.value).length === Object.keys(context).length;
      if (allImagesLoaded) {
        console.log(`✅ All Images Loaded`);
      } else {
        console.log(`❌ Some Images Failed To Load`);
      }
    }
  
    importAllImages();
  
    return { images };
}