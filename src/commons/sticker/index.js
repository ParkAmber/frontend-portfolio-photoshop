import { createRef, useState, useCallback, useEffect } from "react";
// import "./styles.css";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { IndividualSticker } from "./individualSticker";
import { stickersData } from "./stickers.data";

export default function App(props) {
  useEffect(() => {
    if (props.isReset) {
      console.log("is resettttttttt");
    }
    clear();
  }, [props.isReset]);
  // const [background] = useImage("example-image.jpg");
  const [images, setImages] = useState([]);

  const addStickerToPanel = ({ src, width, x, y }) => {
    setImages((currentImages) => [
      ...currentImages,
      {
        width,
        x,
        y,
        src,
        resetButtonRef: createRef(),
      },
    ]);
    console.log(props.isReset, "hiiiiiiiiiiiiii");
    // if (props.isReset) {
    //   setImages([]);
    // }
  };

  const resetAllButtons = useCallback(() => {
    images.forEach((image) => {
      if (image.resetButtonRef.current) {
        image.resetButtonRef.current();
      }
    });
  }, [images]);

  const handleCanvasClick = useCallback(
    (event) => {
      if (event.target.attrs.id === "backgroundImage") {
        resetAllButtons();
      }
    },
    [resetAllButtons]
  );
  const clear = () => {
    setImages([]);
  };
  return (
    <div
      style={{
        width: "28vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stage
        width={500}
        height={500}
        style={
          {
            // border: "2px solid green",
            // display: props.isReset ? "none" : "block",
          }
        }
        onClick={handleCanvasClick}
        onTap={handleCanvasClick}
      >
        <Layer>
          <KonvaImage
            // image={background}
            height={200}
            width={200}
            id="backgroundImage"
          />
          {images.map((image, i) => {
            return (
              <IndividualSticker
                onDelete={() => {
                  const newImages = [...images];
                  newImages.splice(i, 1);
                  setImages(newImages);
                }}
                onDragEnd={(event) => {
                  image.x = event.target.x();
                  image.y = event.target.y();
                }}
                key={i}
                image={image}
                // style={{ opacity: 0 }}
                // isReset={props.isReset}
              />
            );
          })}
        </Layer>
      </Stage>
      <div
        style={{
          // opacity: props.isClicked === "sticker" ? 1 : 0,
          visibility: props.isClicked === "sticker" ? "visible" : "hidden",
          marginTop: "6vw",
        }}
      >
        {stickersData.map((sticker, i) => {
          return (
            <button
              className="button"
              style={{ background: "none", border: "none" }}
              onMouseDown={() => {
                addStickerToPanel({
                  src: sticker.url,
                  width: sticker.width,
                  x: 100,
                  y: 100,
                });
              }}
              key={i}
            >
              <img alt={sticker.alt} src={sticker.url} width={sticker.width} />
            </button>
          );
        })}
      </div>
      {/* <h4 className="heading">Click/Tap to add sticker to photo!</h4> */}
    </div>
  );
}
