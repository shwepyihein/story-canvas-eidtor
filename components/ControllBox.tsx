import { useCanvas } from '@/app/context/canvasContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FileX, SmilePlus, Type, Image as UploadImage } from 'lucide-react';
import ColorSheetBox from './BgColorBox';

const ControlBox = () => {
  const { bgOpen, bgImage, setBgImage, emoji, addEmoji, setBgOpen } =
    useCanvas();

  const handleClick = (v: string) => {
    addEmoji(v);
  };

  const handleUpload = (e: any) => {
    console.log(e.target.files[0]);
    const Url = URL.createObjectURL(e.target.files[0]);
    setBgImage(Url);
  };

  return (
    <div className="absolute flex flex-col gap-5 items-center w-14  py-2   z-30 right-5 top-5 bg-white rounded-md ">
      <div>
        <Type size={16} />
      </div>
      <div>
        {!bgImage ? (
          <label htmlFor="upload">
            <input
              onChange={handleUpload}
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
            <UploadImage size={16} />
          </label>
        ) : (
          <div>
            <FileX size={16} />
          </div>
        )}
      </div>
      <div>
        <ColorSheetBox />
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild className="bg-transparent">
            <SmilePlus size={16} />
          </PopoverTrigger>
          <PopoverContent className="top-10 mr-5 px-3 min-w-[200px] overflow-hidden overflow-y-scroll max-h-[150px] gap-2 grid grid-cols-5 mt-5 py-2 bg-white">
            {emoji?.map((item: any, idx: any) => (
              <p
                onClick={() => {
                  const unicodeValue = item.unicode[0].replace('U+', '0x');
                  const emojiCharacter = String.fromCodePoint(
                    parseInt(unicodeValue, 16)
                  );
                  console.log(emojiCharacter);
                  handleClick(emojiCharacter);
                }}
                dangerouslySetInnerHTML={{ __html: item.htmlCode[0] }}
                className="col-span-1 hover:bg-gray-300 cursor-pointer text-center rounded-md hover:shadow-sm"
                key={idx}
              ></p>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ControlBox;
