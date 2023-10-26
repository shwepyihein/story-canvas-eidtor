'use client';
import { createContext, useContext } from 'react';

export const defaultProps: any = {};

const CanvasContext = createContext({
  ...defaultProps,
  changeBackground: () => {},
});

const useCanvas = () => {
  const canvas = useContext(CanvasContext);
  return canvas;
};

export { CanvasContext, useCanvas };
