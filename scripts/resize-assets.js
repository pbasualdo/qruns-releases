import { Jimp } from 'jimp';
import path from 'path';

async function resizeImage(sourcePath, width, height, outputName) {
  try {
    const image = await Jimp.read(sourcePath);
    image.cover({ w: width, h: height });
    const outputPath = path.join(path.dirname(sourcePath), outputName);
    await image.write(outputPath);
    console.log(`Successfully created: ${outputPath} (${width}x${height})`);
  } catch (error) {
    console.error(`Error resizing ${outputName}:`, error);
  }
}

const posterSource = "C:/Users/Administrator/.gemini/antigravity/brain/b91ee7da-92b1-4099-8e96-dadee3f0ec1c/store_poster_art_9_16_1769786322715.png";
const boxSource = "C:/Users/Administrator/.gemini/antigravity/brain/b91ee7da-92b1-4099-8e96-dadee3f0ec1c/store_box_art_1_1_1769786343922.png";
const tileSource = "C:/Users/Administrator/.gemini/antigravity/brain/b91ee7da-92b1-4099-8e96-dadee3f0ec1c/store_tile_icon_v2_1_1_1769786504126.png";

async function main() {
  // Poster Resizes
  await resizeImage(posterSource, 720, 1080, "store_poster_720x1080.png");
  await resizeImage(posterSource, 1440, 2160, "store_poster_1440x2160.png");
  
  // Box Art Resizes
  await resizeImage(boxSource, 1080, 1080, "store_box_1080x1080.png");
  await resizeImage(boxSource, 2160, 2160, "store_box_2160x2160.png");

  // Tile Icon Resizes
  await resizeImage(tileSource, 300, 300, "store_tile_300x300.png");
  await resizeImage(tileSource, 150, 150, "store_tile_150x150.png");
  await resizeImage(tileSource, 71, 71, "store_tile_71x71.png");
}

main();
