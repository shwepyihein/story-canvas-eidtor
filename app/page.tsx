'use client';

import ControlBox from '@/components/ControllBox';
import BackgroundImage from '@/components/backgroundImage';
import BgImage from '@/components/bgImage';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import { useCanvas } from './context/canvasContext';
import Rectangle from './textBox';

const App = () => {
  const { bgImage, stageRef } = useCanvas();

  const [selectedId, selectShape] = React.useState(null);

  const {
    width,
    height,
    handleExport,
    currentBg,
    rectangleList,
    setRectangleList,
  } = useCanvas();

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <div>
      {selectedId === null && <ControlBox />}
      {/* @ts-ignore */}
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{ background: bgImage ? 'black' : currentBg }}
      >
        <Layer>
          {bgImage ? (
            <BackgroundImage imageUrl={bgImage} />
          ) : (
            <BgImage imageUrl={currentBg} />
          )}
          {rectangleList.map((rect: any, i: number) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                width={width}
                selectShape={selectShape}
                height={height}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs: any) => {
                  const rects = rectangleList.slice();
                  rects[i] = newAttrs;
                  console.log(newAttrs);
                  console.log(newAttrs);
                  setRectangleList(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
      {selectedId === null && (
        <Button className="absolute bottom-3  right-3" onClick={handleExport}>
          Download
        </Button>
      )}
    </div>
  );
};

export default App;
