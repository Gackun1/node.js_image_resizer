const fs = require("fs");
const sharp = require("sharp");

const inputDir = "src/img/";
const outputDir = "dist/img/";
const outputImage = [
  { name: "150x150", w: 150, h: 150 },
  { name: "300x300", w: 300, h: 300 },
  { name: "500x500", w: 500, h: 500 },
  { name: "800x800", w: 800, h: 800 },
];

const files = fs.readdirSync(inputDir, (err, files) => {
  if (err) {
    throw err;
  }
  const fileList = files.filter((file) => {
    return fs.statSync(`${inputDir}${file}`).isFile() && /.*\.(png|jpg|gif|bmp)/.test(file);
  });
  return fileList;
});

files.forEach((file) => {
  outputImage.forEach((output) => {
    sharp(`${inputDir}${file}`)
      .resize(output.w, output.h)
      .toFile(`${outputDir}${output.name}-${file}`, (err, info) => {
        if (err) {
          throw err;
        }
        console.log(info);
      });
  });
});
