import { useEffect, useState } from 'react';
import { Image as KonasImage } from 'react-konva';

const BackgroundImage = ({ imageUrl }: any) => {
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
  const imageWidth = image ? image.width : 0;
  const imageHeight = image ? image.height : 0;

  const scale = Math.min(stageWidth / imageWidth, stageHeight / imageHeight);

  return (
    <KonasImage
      image={image}
      x={(stageWidth - imageWidth * scale) / 2}
      y={(stageHeight - imageHeight * scale) / 2}
      width={imageWidth * scale}
      height={imageHeight * scale}
    />
  );
};
export default BackgroundImage;
