import styled from "@emotion/styled";

export const Wrapper = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
`;
export const IconWrapper = styled.div`
  display: flex;
`;
export const ResetBtn = styled.button`
  padding: 0.2vw 1vw;
  border: 2px solid #8c8c8c;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  margin-top: 30px;
  background: none;
  text-align: center;
  font-size: 1em;
  &:hover {
    color: #000;
    background: #fff;
  }
`;
export const IconLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 1vw;
  padding: 0 40px;
  width: 10vw;
  // height: 800px;
  border-right: 1px solid #8c8c8c;
`;
export const IconName = styled.p`
  color: #fff;
  font-size: 12px;
  margin: 0;
`;
export const IconItemv = styled.button`
  width: 2.5vw;
  height: 2.5vw;
  margin-top: 30px;
  background: none;
  border: none;
`;
export const IconRight = styled.div`
  width: 80vw;
`;
export const Title = styled.h2`
  width: 10vw;
  font-weight: 500;
  padding: 0.3vw 1vw;
  border: 2px solid #8c8c8c;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  margin: 40px;
  text-align: center;
  font-size: 1.2em;
  &:hover {
    color: #000;
    background: #fff;
  }
`;
export const CanvasContainer = styled.div`
  z-index: 100;
  position: relative;
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 0;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
`;
export const PreviewCanvasContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // position: absolute;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;
export const Image = styled.img`
  width: 100%;
`;
export const Canvas = styled.canvas`
  width: 50vw;
  max-height: 80vh;
`;

// filter
export const FilterCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 140px;
  margin-left: 60px;
`;
export const FilterList = styled.div`
  padding: 10px;
  margin: 20px;
  // border: 2px solid #fff;
`;

//draw
export const DrawCon = styled.div`
  position: absolute;
  z-index: 100;
  width: 60vw;
  height: 70vh;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid red;
`;
export const previewDraw = styled.div`
  position: absolute;
  z-index: 1000;
  width: 60vw;
  height: 70vh;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid blue;
`;
export const CanvasDraw = styled.canvas`
  // width: 80%;
  // height: 80%;
  top: 0;
  left: 0;
  // border: 1px solid red;
`;
// style={{width:"400px" ,height:"400px",  border: "1px solid red"}}

// done btn
// done btn
export const DoneBtnCon = styled.div`
  // position: absolute;
  // bottom: 2vw;
  // margin-left: 15vw;
  margin-top: 10px;
  text-align: center;
`;
export const DoneBtn = styled.button`
  padding: 5px 20px;
  border: 2px solid #8c8c8c;
  border-radius: 30px;
  background: none;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  &:hover {
    color: #000;
    background: #fff;
  }
`;
// export const DoneBtnCon = styled.div`
//   position: absolute;
//   bottom: 2vw;
//   margin-left: 15vw;
// `;
// export const DoneBtn = styled.button`
//   padding: 5px 20px;
//   border: 2px solid #8c8c8c;
//   border-radius: 30px;
//   background: none;
//   color: #fff;
//   cursor: pointer;
//   margin-top: 10px;
//   text-align: center;
//   &:hover {
//     color: #000;
//     background: #fff;
//   }
// `;
