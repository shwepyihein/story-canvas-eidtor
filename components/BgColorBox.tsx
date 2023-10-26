/* eslint-disable @next/next/no-img-element */
import { useCanvas } from '@/app/context/canvasContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PaintBucket } from 'lucide-react';

const ColorSheetBox = () => {
  const { changeBackground, bgOpen, setBgOpen, emoji } = useCanvas();
  console.log(bgOpen);

  const backList = [
    '/bg_1.png',
    '/bg_2.png',
    '/bg_3.png',
    '/bg_4.png',
    '/bg_5.png',
    '/bg_6.png',
  ];

  return (
    <Sheet open={bgOpen} onOpenChange={setBgOpen}>
      <SheetTrigger>
        <PaintBucket size={16} />
      </SheetTrigger>
      <SheetContent className="h-screen bg-white/10" side="bottom">
        <SheetHeader>
          <SheetTitle className="mt-5 text-start">
            Please Choose your Background-color
          </SheetTitle>
          <SheetDescription>
            <div className="grid mt-5 grid-cols-2 gap-5">
              {backList.map((item: any, idx: any) => (
                <div
                  onClick={() => {
                    changeBackground(item);
                    setBgOpen(false);
                  }}
                  key={idx}
                >
                  <img
                    className="cursor-pointer w-full active:border shadow-md border-gray-300 focus:border-5 focus:border-white h-56 rounded-lg"
                    src={item}
                    alt={item}
                  />
                </div>
              ))}
            </div>
            <div></div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ColorSheetBox;
