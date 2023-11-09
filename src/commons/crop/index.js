import { useEffect, useState, useRef } from "react";
import * as S from "../../../src/styles/photoshop.style";
import CropIcon from "@mui/icons-material/Crop";

export default function CropPage(props) {
  //   const onClickCrop = () => {
  //     props.setIsCropped(true);
  //     props.setIsFiltered(false);
  //     console.log(props.setIsCropped);
  //   };
  return (
    <div>
      <S.IconItemv>
        <CropIcon
          style={{
            color: props.openMenu === "crop" ? "#fff" : "#8C8C8C",
            fontSize: "4rem",
            cursor: "pointer",
          }}
          onClick={props.onClickCrop}
          id="crop"
        />
      </S.IconItemv>
    </div>
  );
}
