import { Jimp } from 'jimp';
import path from 'path';

async function resizePoster(sourcePath, width, height, outputName) {
  try {
    const image = await Jimp.read(sourcePath);
    // Use cover to ensure dimensions are exact while preserving center content
    image.cover({ w: width, h: height });
    const outputPath = path.join(path.dirname(sourcePath), outputName);
    await image.write(outputPath);
    console.log(`Successfully created: ${outputPath} (${width}x${height})`);
  } catch (error) {
    console.error(`Error resizing ${outputName}:`, error);
  }
}

const source = "C:/Users/Administrator/.gemini/antigravity/brain/b91ee7da-92b1-4099-8e96-dadee3f0ec1c/store_poster_art_9_16_1769786322715.png";

async function main() {
  await resizePoster(source, 720, 1080, "store_poster_720x1080.png");
  await resizePoster(source, 1440, 2160, "store_poster_1440x2160.png");
}

main();
