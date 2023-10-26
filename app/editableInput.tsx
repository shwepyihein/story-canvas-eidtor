import { useEffect, useRef } from 'react';
import { Html } from 'react-konva-utils';

function getStyle(width: any, height: any) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: 'none',
    padding: '0px',
    margin: '0px',
    background: 'none',
    outline: 'none',
    resize: 'none',
    colour: 'black',
    fontSize: '24px',
    fontFamily: 'sans-serif',
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: '-4px',
  };
}

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
  handleClose,
}: any) {
  const style = getStyle(width, height);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, []);

  return (
    <Html
      groupProps={{ x, y }}
      divProps={{
        style: {
          opacity: 1,
          width: `${width}px`,
          height: `${height}px`,
          transform: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
        },
      }}
    >
      <textarea
        autoFocus
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="bg-transparent text- text-white outline-none border-none"
        // style={style}
      />
      <button
        className="bg-white text-center shadow py-2 text-sm px-5  rounded-lg absolute top-5 right-10 "
        onClick={handleClose}
      >
        Done
      </button>
    </Html>
  );
}
