const { Jimp } = require('jimp');
const path = require("path");
const fs = require("fs");

const ICON_PATH = path.join(__dirname, "../build/icon.png");
const OUTPUT_DIR = path.join(__dirname, "../build/appx");

async function ensureDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
  }
}

async function generate() {
  console.log("Generating AppX assets...");
  try {
    await ensureDir();

    // Load the icon
    const image = await Jimp.read(ICON_PATH);

    // Define targets
    const targets = [
      { name: "Square44x44Logo.png", w: 44, h: 44 },
      { name: "Square150x150Logo.png", w: 150, h: 150 },
      { name: "Wide310x150Logo.png", w: 310, h: 150, fit: "contain" },
      { name: "StoreLogo.png", w: 50, h: 50 },
    ];

    for (const target of targets) {
      const dest = path.join(OUTPUT_DIR, target.name);
      const clone = image.clone();

      if (target.fit === "contain") {
        clone.contain({ w: target.w, h: target.h });
      } else {
        clone.resize({ w: target.w, h: target.h });
      }

      // Write to file
      if (typeof clone.write === 'function') {
          await clone.write(dest);
      } else {
           // default to PNG
           const buffer = await clone.getBuffer('image/png');
           await fs.promises.writeFile(dest, buffer);
      }

      console.log(`Generated ${target.name}`);
    }

    console.log("All assets generated successfully in build/appx");
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

generate();
