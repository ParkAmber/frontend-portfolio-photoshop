import { useEffect, useState, useRef } from "react";
import * as S from "../../../src/styles/photoshop.style";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import { canvasPreview } from "./canvasPreview";
// import { useDebounceEffect } from "./useDebounceEffect";

export default function IconRightPage(props) {
  const [crop, setCrop] = useState();
  //   const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  //   const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  console.log(props.blurAngle);
  return (
    <>
      {props.isCropped ? (
        <S.CanvasContainer>
          <ReactCrop
            crop={props.crop}
            onChange={(_, percentCrop) => props.setCrop(percentCrop)}
            onComplete={(c) => props.setCompletedCrop(c)}
            aspect={props.aspect}
          >
            <img
              ref={props.imgRef}
              alt="Crop me"
              src={props.imgSrc}
              style={{
                transform: `scale(${props.scale}) rotate(${props.rotationAngle}deg)`,
                filter: `blur(${props.blurAngle}px) ${props.filter}(${props.amount})`,
                display: props.isClicked ? "none" : "block",
              }}
              onLoad={props.onImageLoad}
            />
          </ReactCrop>
        </S.CanvasContainer>
      ) : (
        <S.CanvasContainer>
          <img
            ref={props.imgRef}
            alt="Img me"
            src={props.imgSrc}
            style={{
              transform: `scale(${props.scale}) rotate(${props.rotationAngle}deg)`,
              filter: `blur(${props.blurAngle}px) ${props.filter}(${props.amount})`,
              // filter: `blur(${blurAngle}px) grayscale(${grayscale}%) contrast(${contrast}%) invert(${invert}%) saturate(${saturate}) sepia(${sepia}%)`,
              display: props.isClicked ? "none" : "block",
              color: "#000",
            }}
            onLoad={props.onImageLoad}
          />
        </S.CanvasContainer>
      )}
      {!!props.completedCrop && (
        <>
          <div>
            <button onClick={props.onClickDone}>Done!</button>
            <button onClick={props.onClickAgain}>Try again!</button>
            <S.PreviewCanvasContainer>
              <canvas
                ref={props.previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: props.completedCrop.width,
                  height: props.completedCrop.height,
                  display: props.isClicked ? "block" : "none",
                }}
              />
            </S.PreviewCanvasContainer>

            <button onClick={props.onDownloadCropClick}>Download Crop</button>
          </div>
          <button onClick={props.onClickUndo}>Undo</button>
        </>
      )}
    </>
  );
}
