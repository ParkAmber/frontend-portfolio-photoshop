import useImage from "use-image";
import { useState, useEffect, useRef } from "react";
import { Image as KonvaImage, Group } from "react-konva";
import { useHoverDirty, useLongPress } from "react-use";

export const IndividualSticker = ({ image, onDelete, onDragEnd }) => {
  const imageRef = useRef(null);
  const isHovered = useHoverDirty(imageRef);
  const [stickerImage] = useImage(image.src);
  const [deleteImage] = useImage("/clear-24px 2.png");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const onLongPress = () => {
    setShowDeleteButton(true);
  };

  image.resetButtonRef.current = () => {
    setShowDeleteButton(false);
  };
  const longPressEvent = useLongPress(onLongPress, { delay: 200 });
  const [isDragging, setIsDragging] = useState(false);

  const stickerWidth = image.width;
  const stickerHeight = stickerImage
    ? (image.width * stickerImage.height) / stickerImage.width
    : 0;

  useEffect(() => {
    if (isHovered) {
      setShowDeleteButton(true);
    } else {
      setTimeout(() => {
        setShowDeleteButton(false);
      }, 2000);
    }
  }, [isHovered]);

  return (
    <Group
      draggable
      x={image.x}
      y={image.y}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event) => {
        setIsDragging(false);
        onDragEnd(event);
      }}
      // style={{ opacity: 0 }}
    >
      <KonvaImage
        ref={imageRef}
        width={image.width}
        height={stickerHeight}
        image={stickerImage}
        {...longPressEvent}
        // style={{ opacity: 0 }}
      />
      {showDeleteButton && !isDragging && (
        <KonvaImage
          onTouchStart={onDelete}
          onClick={onDelete}
          image={deleteImage}
          width={20}
          height={20}
          // style={{ marginTop: "200px" }}
          offsetY={stickerHeight / 2 - 20}
          offsetX={-stickerWidth / 2 - 20}
          // style={{ opacity: 0 }}
        />
      )}
    </Group>
  );
};
