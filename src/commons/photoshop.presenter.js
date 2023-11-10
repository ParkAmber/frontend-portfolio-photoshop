import * as S from "../../src/styles/photoshop.style";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import CachedIcon from "@mui/icons-material/Cached";
import GestureIcon from "@mui/icons-material/Gesture";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import CropIcon from "@mui/icons-material/Crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import App from "./sticker/index";
import Head from "next/head";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
export default function PhotoshopUI(props) {
  useDebounceEffect(
    async () => {
      if (
        props.completedCrop?.width &&
        props.completedCrop?.height &&
        props.imgRef.current &&
        props.previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          props.imgRef.current,
          props.previewCanvasRef.current,
          props.completedCrop,
          props.scale,
          props.rotate,
          // blur,
          props.clickedFilter,
          props.blurAmount,
          props.filterAmount
        );
      }
    },
    100,
    [
      props.completedCrop,
      props.scale,
      props.rotate,
      props.imgSrc,
      props.clickedFilter,
      props.blurAmount,
      props.filterAmount,
      props.blur,
      props.isReset,
    ]
  );
  function onImageLoad(e) {
    if (props.aspect) {
      const { width, height } = e.currentTarget;
      props.setCrop(centerAspectCrop(width, height, props.aspect));
    }
  }
  return (
    <div>
      <Head>
        <meta property='og:title' content='photoshop website portfolio' />
        <meta
          property='pg:description'
          content='Hello this is photoshop website portfolio page'
        />
        <meta
          property='og:image'
          content='https://storage.googleapis.com/webportfolio-backend-storage/photoshop-preview.png'
        />
        <link rel='icon' href='/logo2.png' />
      </Head>
      <S.Wrapper>
        <S.IconWrapper>
          <S.IconLeft>
            <S.IconItemv>
              <CachedIcon
                style={{
                  color: props.isClicked === "rotate" ? "#fff" : "#8C8C8C",
                  fontSize: "1.5vw",
                }}
                onClick={props.onClickRotate}
                id='rotate'
                disabled={!props.drawDone}
              />
            </S.IconItemv>
            <S.IconName
              style={{
                color: props.isClicked === "rotate" ? "#fff" : "#8C8C8C",
              }}>
              Rotate
            </S.IconName>
            <S.IconItemv>
              <WaterDropOutlinedIcon
                style={{
                  color: props.isClicked === "blur" ? "#fff" : "#8C8C8C",
                  fontSize: "1.5vw",
                }}
                onClick={props.onClickBlur}
                id='blur'
              />
            </S.IconItemv>
            <S.IconName
              style={{
                color: props.isClicked === "blur" ? "#fff" : "#8C8C8C",
              }}>
              Blur
            </S.IconName>
            <S.IconItemv>
              <FilterNoneIcon
                style={{
                  color: props.isClicked === "filter" ? "#fff" : "#8C8C8C",
                  fontSize: "1.5vw",
                }}
                onClick={props.onClickFilter}
                id='filter'
              />
            </S.IconItemv>
            <S.IconName
              style={{
                color: props.isClicked === "filter" ? "#fff" : "#8C8C8C",
              }}>
              Filter
            </S.IconName>
            <S.IconItemv>
              <GestureIcon
                style={{
                  color: props.isClicked === "draw" ? "#fff" : "#8C8C8C",
                  fontSize: "1.5vw",
                }}
                onClick={props.onClickDraw}
                id='draw'
              />
            </S.IconItemv>
            <S.IconName
              style={{
                color: props.isClicked === "draw" ? "#fff" : "#8C8C8C",
              }}>
              Draw
            </S.IconName>

            <S.IconItemv>
              <CropIcon
                style={{
                  color: props.isClicked === "crop" ? "#fff" : "#8C8C8C",
                  fontSize: "1.5vw",
                }}
                onClick={props.onClickCrop}
                id='crop'
              />
            </S.IconItemv>
            <S.IconName
              style={{
                color: props.isClicked === "crop" ? "#fff" : "#8C8C8C",
              }}>
              Crop
            </S.IconName>
            <S.IconItemv>
              <TextFieldsIcon
                onClick={props.onClickText}
                style={{
                  color: props.isClicked === "text" ? "#fff" : "#8C8C8C",
                  fontSize: "1.5vw",
                }}
                id='text'
              />
            </S.IconItemv>
            <S.IconName
              style={{
                color: props.isClicked === "text" ? "#fff" : "#8C8C8C",
                // fontSize: "1.5vw",
              }}>
              text
            </S.IconName>
            <S.IconItemv>
              <SentimentSatisfiedAltIcon
                onClick={props.onClickSticker}
                style={{
                  color: props.isClicked === "sticker" ? "#fff" : "#8C8C8C",
                  fontSize: "1.5vw",
                }}
                id='sticker'
              />
            </S.IconItemv>
            <S.IconName
              style={{
                color: props.isClicked === "sticker" ? "#fff" : "#8C8C8C",
                // fontSize: "1.5vw",
              }}>
              Sticker
            </S.IconName>
            <S.ResetBtn onClick={props.onClickReset}>Reset</S.ResetBtn>
          </S.IconLeft>
          <S.IconRight>
            <div>
              <S.Title onClick={props.onClickImage}>Select Photo</S.Title>

              <input
                type='file'
                accept='image/*'
                onChange={props.onSelectFile}
                style={{ display: "none" }}
                ref={props.fileRef}
              />
              <div>
                {props.stickerClicked && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: props.drawDone ? "1000" : "100",
                      zIndex: props.textDone ? "1000" : "100",
                      // border: "2px solid green",
                      left: "30vw",
                    }}>
                    <App
                      style={{
                        position: "absolute",
                        zIndex: props.drawDone ? "1000" : "100",
                        zIndex: props.textDone ? "1000" : "100",
                      }}
                      isClicked={props.isClicked}
                      isReset={props.isReset}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: "100",
                  top: "50%",
                  // border: "1px solid red",
                  // left: "15vw",
                  display: "flex",
                  margin: "0 auto",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <canvas
                  ref={props.canvasRef}
                  id='canvas'
                  style={{
                    position: "absolute",
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            </div>
            <div>
              {props.isClicked === "draw" && (
                <S.DoneBtnCon>
                  <label>
                    <input
                      type='color'
                      value={props.color}
                      onChange={(e) => props.setColor(e.target.value)}
                    />
                  </label>
                  <div>
                    <S.DoneBtn onClick={props.onClickRemoveDraw}>
                      Done
                    </S.DoneBtn>
                  </div>
                </S.DoneBtnCon>
              )}
            </div>
            <div>
              {props.isClicked === "text" && (
                <S.DoneBtnCon>
                  <label>
                    <input
                      type='color'
                      value={props.textColor}
                      onChange={(e) => props.setTextColor(e.target.value)}
                    />
                  </label>
                  <div>
                    <S.DoneBtn onClick={props.onClickRemoveText}>
                      Done
                    </S.DoneBtn>
                  </div>
                </S.DoneBtnCon>
              )}
            </div>
          </S.IconRight>
          {/* crop */}
          <div
            className='App'
            style={{
              // marginTop: "5vw",
              marginRight: "5vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div style={{ opacity: props.isClicked === "crop" ? 1 : 0 }}>
              {!!props.isCrop && (
                <ReactCrop
                  src='/image.png'
                  crop={props.crop}
                  onChange={(_, percentCrop) => props.setCrop(percentCrop)}
                  onComplete={(c) => {
                    props.setCompletedCrop(c);
                    // updateCroppedImage(c);
                  }}
                  aspect={props.aspect}>
                  <img
                    ref={props.imgRef}
                    alt='Crop me'
                    // src="/y사진.png"
                    src={props.imgSrc}
                    style={{
                      transform: `scale(${props.scale}) rotate(${props.rotate}deg)`,
                      // filter: `blur(${blurplus}px)`,
                      filter: props.clickedFilter
                        ? `blur(${props.blurplus}px) ${props.clickedFilter}(${props.filterAmount})`
                        : `blur(${props.blurplus}px)`,
                      width: "30vw",
                      // height: "400px",
                    }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
            </div>
            {!!props.completedCrop && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "30%",
                    margin: "0 auto",
                    opacity: `${props.opacity}`,
                    // transform: `rotate(${rotate}deg)`,
                    // zIndex: "-100",
                  }}>
                  <canvas
                    ref={props.previewCanvasRef}
                    style={{
                      border: "1px solid black",
                      objectFit: "contain",
                      width: props.completedCrop.width,
                      height: props.completedCrop.height,
                    }}
                  />
                  {/* <button onClick={setIsCropBtnClicked(true)}>Done</button> */}
                </div>
              </>
            )}
          </div>
        </S.IconWrapper>
        <div>
          {props.isClicked === "filter" && (
            <S.FilterCon>
              <S.FilterList
                onClick={() => props.setClickedFilter("")}
                style={{ cursor: "pointer" }}>
                <img
                  src={props.imgSrc}
                  style={{
                    width: "4vw",
                    borderRadius: "10px",
                  }}
                />
                <div
                  id='none'
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "10px",
                  }}>
                  None
                </div>
              </S.FilterList>
              <S.FilterList
                onClick={() => props.setClickedFilter("grayscale")}
                style={{ cursor: "pointer" }}>
                <img
                  src={props.imgSrc}
                  style={{
                    width: "4vw",
                    borderRadius: "10px",
                    filter: "grayscale(10)",
                  }}
                />
                <div
                  id='grayscale'
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "10px",
                  }}>
                  grayscale
                </div>
              </S.FilterList>

              <S.FilterList
                onClick={() => props.setClickedFilter("invert")}
                style={{ cursor: "pointer" }}>
                <img
                  src={props.imgSrc}
                  style={{
                    width: "4vw",
                    borderRadius: "10px",
                    filter: "invert(10)",
                  }}
                />
                <div
                  id='invert'
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "10px",
                  }}>
                  invert
                </div>
              </S.FilterList>

              <S.FilterList
                onClick={() => props.setClickedFilter("sepia")}
                style={{ cursor: "pointer" }}>
                <img
                  src={props.imgSrc}
                  style={{
                    width: "4vw",
                    borderRadius: "10px",
                    filter: "sepia(10)",
                  }}
                />
                <div
                  id='sepia'
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "10px",
                  }}>
                  sepia
                </div>
              </S.FilterList>
            </S.FilterCon>
          )}
        </div>
      </S.Wrapper>
    </div>
  );
}
