const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function compressImage(file) {
    const outputDir = path.join(__dirname, "..", 'uploads');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    const compressedFile = path.join(outputDir, `compressed-${file.fileName}.jpg`);

    await sharp(file.path)
        .resize(800)
        .jpeg({ quality: 70 })
        .toFile(compressedFile)

    return compressedFile;

}

module.exports = compressImage;