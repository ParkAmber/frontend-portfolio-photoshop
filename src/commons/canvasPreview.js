// import { PixelCrop } from "react-image-crop";

// const TO_RADIANS = Math.PI / 180;

// export async function canvasPreview(
//   image, //canvasRef.current,
//   canvas, //previewCanvasRef.current,
//   crop, //completedCrop,
//   // scale = 1,
//   rotate,
//   blur,
//   filter
//   // amount
// ) {
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     throw new Error("No 2d context");
//   }

//   const scaleX = image.naturalWidth / image.width;
//   const scaleY = image.naturalHeight / image.height;
//   // devicePixelRatio slightly increases sharpness on retina devices
//   // at the expense of slightly slower render times and needing to
//   // size the image back down if you want to download/upload and be
//   // true to the images natural size.
//   const pixelRatio = window.devicePixelRatio;
//   // const pixelRatio = 1

//   canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
//   canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

//   ctx.scale(pixelRatio, pixelRatio);
//   let blurPlus = 0;
//   if (blur === 0) {
//     blurPlus = 0;
//   } else {
//     blurPlus = blur + 15;
//   }

//   // ctx.filter = `blur(${blurPlus}px)`;
//   ctx.filter = `blur(${blurPlus}px) ${filter}(10)`;
//   console.log(filter, blur);
//   ctx.imageSmoothingQuality = "high";

//   const cropX = crop.x * scaleX;
//   const cropY = crop.y * scaleY;

//   const rotateRads = rotate * TO_RADIANS;
//   const centerX = image.naturalWidth / 2;
//   const centerY = image.naturalHeight / 2;

//   ctx.save();

//   // 5) Move the crop origin to the canvas origin (0,0)
//   ctx.translate(-cropX, -cropY);
//   // 4) Move the origin to the center of the original position
//   ctx.translate(centerX, centerY);
//   // 3) Rotate around the origin
//   // ctx.rotate(rotateRads);
//   ctx.rotate(rotateRads);
//   // 2) Scale the image
//   ctx.scale(1, 1);
//   // 1) Move the center of the image to the origin (0,0)
//   ctx.translate(-centerX, -centerY);
//   ctx.drawImage(
//     image,
//     0,
//     0,
//     image.naturalWidth,
//     image.naturalHeight,
//     0,
//     0,
//     image.naturalWidth,
//     image.naturalHeight
//   );

//   ctx.restore();
// }

import { PixelCrop } from "react-image-crop";

const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate,
  // blur,
  clickedFilter,
  blurAmount,
  filterAmount
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);

  let blurplus;
  if (blurAmount === 0) {
    blurplus = blurAmount * 10;
  } else {
    blurplus = blurAmount * 30;
  }

  // ctx.filter = `blur(${blurplus}px)`;
  ctx.filter = clickedFilter
    ? `blur(${blurplus}px) ${clickedFilter}(${filterAmount})`
    : `blur(${blurplus}px)`;
  console.log(blurplus, clickedFilter, ctx.filter);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}
