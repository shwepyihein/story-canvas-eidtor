'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { CanvasContext } from './canvasContext';

const CanvasProvider = ({ children }: any) => {
  const [rectangleList, setRectangleList] = useState<any>([]);

  const [width, setWidth] = useState<any>();
  const [height, setHeight] = useState<any>();
  const [currentBg, setCurrentBg] = useState('/bg_1.png');
  const [bgImage, setBgImage] = useState<any>(null);
  const [bgOpen, setBgOpen] = useState(false);
  const [emoji, setEmoji] = useState([]);
  const stageRef = useRef<any>(null);

  const getEmojiList = () => {
    axios.get('https://emojihub.yurace.pro/api/all').then((res) => {
      console.log(res);
      setEmoji(res.data.slice(0, 200));
    });
  };

  useEffect(() => {
    console.log('1231231');
    getEmojiList();
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const initialRectangles = [
      {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2,
        fill: 'white',
        id: v4(),
        type: 'text',
        value: 'Please Type Here',
      },
    ];
    setRectangleList(initialRectangles);
  }, []);

  const changeBackground = (v: string) => {
    setCurrentBg(v);
    setBgOpen(false);
  };

  const addEmoji = (v: string) => {
    setRectangleList([
      ...rectangleList,
      {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2,
        fill: 'white',
        id: v4(),
        type: 'emoji',
        value: v,
      },
    ]);
  };

  function downloadURI(uri: string) {
    var link = document.createElement('a');
    link.download = v4();
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    // we also can save uri as file
    // but in the demo on Konva website it will not work
    // because of iframe restrictions
    // but feel free to use it in your apps:
    downloadURI(uri);
  };

  return (
    <CanvasContext.Provider
      value={{
        width,
        height,
        changeBackground,
        setBgOpen,
        stageRef,
        bgOpen,
        currentBg,
        rectangleList,
        emoji,
        addEmoji,
        bgImage,
        setBgImage,
        handleExport,
        setRectangleList,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasProvider };
