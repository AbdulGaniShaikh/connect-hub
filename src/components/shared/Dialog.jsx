import { useRef } from 'react';

const Dialog = ({ children }) => {
  const contentRef = useRef(null);
  const dialogDiv = useRef(null);

  const onOutsideClick = () => {};

  return (
    <div className="z-10 m-auto">
      <div
        onClick={onOutsideClick}
        style={{ background: 'rgba(0,0,0,0.2)' }}
        className="fixed left-0 top-0 h-full w-full hidden"
        ref={dialogDiv}
      ></div>
      <div
        ref={contentRef}
        className="p-10 h-full ease-in-out duration-300 translate-y-full w-1/3 z-20 fixed left-1/2 -translate-x-1/2 top-0"
      >
        <children />
      </div>
    </div>
  );
};

export default Dialog;
