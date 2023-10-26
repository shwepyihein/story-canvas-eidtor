'use client';
import React, { useEffect } from 'react';
import { Text } from 'react-konva';
import { useCanvas } from './context/canvasContext';
import { EditableTextInput } from './editableInput';

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

const Rectangle = ({
  shapeProps,
  width,
  height,
  isSelected,
  onSelect,
  onChange,
  selectShape,
}: any) => {
  const {
    width: CenterWidth,
    handleChange,
    height: CenterHeight,
  } = useCanvas();
  const shapeRef = React.useRef<any>();

  function handleEscapeKeys(e: any) {
    console.log(e.keyCode);
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      selectShape(null);
    }
  }

  useEffect(() => {
    const text = shapeRef.current;

    const updateTextLayout = () => {
      const stageWidth = width;
      const stageHeight = height;
      text.width(stageWidth); // Set the text width to the stage width
      text.fontSize(24); // Set an initial font size
      text.lineHeight(1.2); // Set an appropriate line height
      const availableHeight = stageHeight - text.paddingY * 2;

      while (text.height() > availableHeight) {
        // Reduce font size until it fits
        text.fontSize(text.fontSize() - 1);
      }
    };

    updateTextLayout();
  }, []);

  return (
    <React.Fragment>
      {isSelected ? (
        <div>
          <EditableTextInput
            x={CenterWidth / 2 - 100}
            y={CenterHeight / 2 - 100}
            width={width}
            height={height}
            value={shapeProps.value}
            onChange={(e: any) => {
              onChange({
                ...shapeProps,
                value: e.target.value,
              });
            }}
            handleClose={() => {
              selectShape(null);
            }}
            onKeyDown={handleEscapeKeys}
          />
        </div>
      ) : (
        <Text
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          fontSize={28}
          {...shapeProps}
          draggable
          onDragEnd={(e: any) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          text={shapeProps.value}
          onTransformEnd={(e: any) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node: any = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
