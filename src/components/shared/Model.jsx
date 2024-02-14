import useScrollBlock from 'hooks/useScrollBlock';
import { useEffect } from 'react';

const Model = ({ children, onClose }) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return allowScroll;
  });

  return (
    <div className="z-10">
      <div
        onClick={onClose}
        style={{ background: 'rgba(0,0,0,0.2)' }}
        className="fixed left-0 top-0 h-full w-full"
      ></div>
      <div className="p-10 h-full max-md:w-full max-xl:w-1/2 ease-in-out duration-300 w-1/3 z-20 fixed left-1/2 -translate-x-1/2 top-0">
        {children}
      </div>
    </div>
  );
};

export default Model;
