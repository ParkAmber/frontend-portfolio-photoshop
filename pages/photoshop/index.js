import { useRef, useEffect, useState } from "react";

import { fabric } from "fabric";

import "react-image-crop/dist/ReactCrop.css";

import PhotoshopUI from "../../src/commons/photoshop.presenter";

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

export default function Photoshop() {
  const fileRef = useRef(null);
  const history = [];
  const [clickedFilter, setClickedFilter] = useState(null);
  const [filterAmount, setFilterAmount] = useState(0);
  const [blur, setBlur] = useState("");
  const [rotate, setRotate] = useState(0);
  const [draw, setDraw] = useState(false);
  const [text, setText] = useState(false);

  const [drawnPaths, setDrawnPaths] = useState([]);
  const [textPaths, setTextPaths] = useState([]);

  const [isCrop, setIsCrop] = useState(false);

  // const [imgSrc, setImgSrc] = useState("/image.png");
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [aspect, setAspect] = useState(16 / 9);

  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const [color, setColor] = useState("#00aeff");
  const [textColor, setTextColor] = useState("#ff0000");

  const [blurAmount, setBlurAmount] = useState(0);

  const blurplus = blurAmount * 25;

  const [isClicked, setIsClicked] = useState("default");
  const [textClick, setTextClick] = useState(false);

  let filters = [];

  const [openMenu, setOpenMenu] = useState(null);
  const [tabChild, setTabChild] = useState("");

  const [drawDone, setDrawDone] = useState(true);
  const [textDone, setTextDone] = useState(true);

  const [stickerURLs, setStickerURLs] = useState([]);
  const [stickerClicked, setStickerClicked] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isReset, setIsReset] = useState(false);

  //sticker
  useEffect(() => {
    const previewCanvas = previewCanvasRef.current;

    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
    const canvasWidth = viewportWidth * 0.8; // 10vw
    const canvasHeight = viewportHeight * 0.7; // 10vh
    const canvas = new fabric.Canvas(canvasRef.current, {
      // width: 500,
      // height: 500,
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "transparent",
    });
    // canvas.filter = `blur(${blurAmount + 5}px) ${sepia}(10)`;
    console.log(blurAmount, clickedFilter);
    // const imageUrl = "/ic_profile-48px.png"; // Update with your image URL

    fabric.Image.fromURL(
      imgSrc,
      (image) => {
        // if (previewCanvas) return;
        image.scaleToHeight(500);
        image.scaleToWidth(canvas.width);

        if (filters.length > 0) {
          image.filters = filters;

          image.applyFilters();
        }
        // Apply rotation
        image.rotate(rotate);
        console.log(image, rotate);
        console.log(filters, blurplus);
        if (isCrop) {
          // Make the imgRef invisible
          // imgRef.current.style.display = "none";
          image.set("opacity", 0);
        }
        // image.applyFilters();

        // Add image to canvas
        canvas.add(image);

        // Add drawn paths to the canvas
        drawnPaths.forEach((path) => {
          canvas.add(path);
        });
        console.log(canvas);

        //Add draw
        if (draw) {
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.width = 5;
          canvas.freeDrawingBrush.color = color;

          canvas.on("path:created", function (e) {
            const path = e.path;
            setDrawnPaths((prevPaths) => [...prevPaths, path]);
            console.log(canvas);
          });
        }

        textPaths.forEach((tt) => {
          canvas.add(tt);
        });

        // Render canvas
        if (!canvas || !fabric) {
          console.log("canvas render failxxx");
          return;
        } else {
          canvas.renderAll();
          console.log("canvas render well!");
        }

        image.getElement();
      },
      { crossOrigin: "anonymous" }
    );
    // Resize canvas when the window is resized
    const handleResize = () => {
      const container = canvasRef.current.parentNode;
      const newWidth = window.innerWidth * 0.3;
      const newHeight = window.innerHeight * 0.7;
      if (window.innerWidth < 1024) {
        alert("Please run the website in a desktop view");
      }
      console.log(window.innerWidth);
      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    // Initial resizing
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose(); // Dispose of the canvas when component unmounts
    };
  }, [
    clickedFilter,
    filterAmount,
    blur,
    rotate,
    draw,
    drawnPaths,

    completedCrop,
    imgSrc,
    isCrop,

    blurAmount,
    text,
    isClicked,
    previewCanvasRef,
    textClick,
    stickerURLs,
    isReset,
  ]); // Empty dependency array to run the effect once on component mount

  // ///////////////crop
  useEffect(() => {
    console.log(clickedFilter);
    if (clickedFilter === "grayscale") {
      filters.push(new fabric.Image.filters.Grayscale());
    } else if (clickedFilter === "contrast") {
      filters.push(
        new fabric.Image.filters.Contrast({
          contrast: 10,
        })
      );
    } else if (clickedFilter === "invert") {
      filters.push(new fabric.Image.filters.Invert());
    } else if (clickedFilter === "saturate") {
      filters.push(
        new fabric.Image.filters.Saturation({
          saturation: 10,
        })
      );
    } else if (clickedFilter === "sepia") {
      filters.push(new fabric.Image.filters.Sepia());
    }

    if (blur) {
      filters.push(new fabric.Image.filters.Blur({ blur: `${blurAmount}` })); // Adjust the blur value
    }
  }, [
    clickedFilter,
    blur,
    blurAmount,
    isClicked,
    rotate,
    imgSrc,
    drawnPaths,
    textClick,
    text,
    drawDone,
    isReset,
  ]);

  useEffect(() => {
    // 2번째로 실행
    // setTimeout=>0.1초 후에 { setFade('end')}코드 실행해라!!
    setTimeout(() => {
      setOpenMenu(tabChild);
    }, 10);

    return () => {
      // 1번째로 실행
      //먼저 fade를 다 초기화 시켜줌!!(=>다 지워줌!!)
      setOpenMenu("");
    };
  }, [tabChild]);

  const tabMenu = (e) => {
    setTabChild(e.currentTarget.id);
  };

  // select file
  const onClickImage = () => {
    //==> document.getElementById("input").click()
    fileRef.current?.click(); //input태그 클릭됨!!
  };
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => setImgSrc(reader.result?.toString() || ""),
        setIsClicked(""),
        setRotate(0),
        setBlurAmount(0),
        setIsCrop(false),
        setClickedFilter(null),
        setOpenMenu(""),
        setOpacity(0),
        setIsReset(false)
      );
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log(e.target.files[0]);
  }

  const onClickRotate = (e) => {
    if (drawDone === false || textDone === false) {
      alert("please click the done button");
      return;
    }
    if (!imgSrc) {
      alert("please select photo");
      return;
    }
    setRotate((prev) => prev + 45);
    setIsClicked("rotate");
    setIsReset(false);
    tabMenu(e);
  };
  const onClickBlur = (e) => {
    if (drawDone === false || textDone === false) {
      alert("please click the done button");
      return;
    }
    if (!imgSrc) {
      alert("please select photo");
      return;
    }
    setBlur("Blur");
    setBlurAmount((prev) => prev + 0.05);
    setIsClicked("blur");
    setIsReset(false);
    tabMenu(e);
  };
  const onClickFilter = (e) => {
    // setClickedFilter("sepia");
    if (drawDone === false || textDone === false) {
      alert("please click the done button");
      return;
    }
    if (!imgSrc) {
      alert("please select photo");
      return;
    }
    setIsClicked("filter");
    setFilterAmount(30);
    setIsReset(false);
    tabMenu(e);
  };
  const onClickDraw = (e) => {
    if (drawDone === false || textDone === false) {
      alert("please click the done button");
      return;
    }
    if (!imgSrc) {
      alert("please select photo");
      return;
    }
    setIsClicked("draw");
    setDraw(true);
    setDrawDone(false);
    setIsReset(false);
    tabMenu(e);
    console.log(draw, drawDone, openMenu);
  };
  const onClickRemoveDraw = () => {
    setDraw(false);
    setDrawDone(true);
    // setIsReset(false);
  };
  const onClickCrop = (e) => {
    if (drawDone === false || textDone === false) {
      alert("please click the done button");
      return;
    }
    if (!imgSrc) {
      alert("please select photo");
      return;
    }
    setIsCrop(true);
    setIsReset(false);
    tabMenu(e);
    setIsClicked("crop");
    setOpacity(1);
  };

  const onClickText = (e) => {
    if (drawDone === false || textDone === false) {
      alert("please click the done button");
      return;
    }
    if (!imgSrc) {
      alert("please select photo");
      return;
    }
    textConstructor();
    setText((prev) => !prev);
    // setText(true);
    setIsClicked("text");
    setTextDone(false);
    tabMenu(e);
    setIsReset(false);
    console.log(isClicked, text, textDone);
  };
  const onClickRemoveText = () => {
    setText(false);
    setTextDone(true);
    setIsReset(false);
  };
  const textConstructor = () => {
    const iText = new fabric.IText("text", {
      left: 50,
      top: 50,
      fontSize: 20,

      fill: textColor,
    });

    // canvas.add(iText);
    setTextPaths((prevTexts) => [...prevTexts, iText]);
    console.log(isClicked, iText?.text, textPaths[0]?.text, textPaths);
  };
  const onClickSticker = (e) => {
    if (drawDone === false || textDone === false) {
      alert("please click the done button");
      return;
    }
    if (!imgSrc) {
      alert("please select photo");
      return;
    }
    setIsClicked("sticker");
    tabMenu(e);
    setStickerClicked(true);
    setIsReset(false);
    console.log(textDone, drawDone);
  };
  const onClickReset = () => {
    setIsClicked(""),
      setRotate(0),
      setBlurAmount(0),
      setIsCrop(false),
      setClickedFilter(null),
      setOpenMenu(""),
      setOpacity(0);
    setIsReset(true);
    setDraw(false);
    setDrawDone(true);
    console.log(openMenu);
    const copy = [...drawnPaths];
    copy.splice(0, drawnPaths.length);
    setDrawnPaths(copy);

    const textCopy = [...textPaths];
    textCopy.splice(0, textPaths.length);
    setTextPaths(textCopy);
  };

  return (
    <>
      {/* <div>hi</div> */}
      <PhotoshopUI
        isClicked={isClicked}
        onClickRotate={onClickRotate}
        drawDone={drawDone}
        textDone={textDone}
        onClickBlur={onClickBlur}
        onClickFilter={onClickFilter}
        onClickDraw={onClickDraw}
        onClickCrop={onClickCrop}
        onClickText={onClickText}
        onClickSticker={onClickSticker}
        onClickReset={onClickReset}
        onClickImage={onClickImage}
        onSelectFile={onSelectFile}
        imgRef={imgRef}
        fileRef={fileRef}
        stickerClicked={stickerClicked}
        textDone={textDone}
        isReset={isReset}
        canvasRef={canvasRef}
        color={color}
        setColor={setColor}
        onClickRemoveDraw={onClickRemoveDraw}
        textColor={textColor}
        setTextColor={setTextColor}
        onClickRemoveText={onClickRemoveText}
        scale={scale}
        clickedFilter={clickedFilter}
        filterAmount={filterAmount}
        blurplus={blurplus}
        blur={blur}
        // onImageLoad={onImageLoad}
        opacity={opacity}
        previewCanvasRef={previewCanvasRef}
        setClickedFilter={setClickedFilter}
        imgSrc={imgSrc}
        setCrop={setCrop}
        isCrop={isCrop}
        crop={crop}
        setCompletedCrop={setCompletedCrop}
        completedCrop={completedCrop}
        aspect={aspect}
        blurAmount={blurAmount}
        rotate={rotate}
        draw={draw}
        isReset={isReset}
        // ReactCrop={ReactCrop}
      />
    </>
  );
}
