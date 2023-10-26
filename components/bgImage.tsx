import { useEffect, useState } from 'react';
import { Image as KonasImage } from 'react-konva';

const BgImage = ({ imageUrl }: any) => {
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
    };
  }, [imageUrl]);

  const stageWidth = window.innerWidth;
  const stageHeight = window.innerHeight;

  return <KonasImage image={image} width={stageWidth} height={stageHeight} />;
};
export default BgImage;
