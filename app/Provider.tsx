'use client';

import { CanvasProvider } from './context/canvasProvider';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <CanvasProvider>{children}</CanvasProvider>;
};

export default Provider;
