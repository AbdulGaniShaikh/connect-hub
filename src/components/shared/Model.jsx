import { useTransition, animated } from '@react-spring/web';
import useScrollBlock from 'hooks/useScrollBlock';
import { useEffect } from 'react';

const Model = ({ children, onClose, show = false }) => {
  const transition = useTransition(show, {
    from: {
      opacity: 0,
      y: 1000
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: 1000
    }
  });
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (show) blockScroll();
    else allowScroll();
  }, [show]);

  return (
    <div className="z-20">
      {show && (
        <div
          onClick={onClose}
          style={{ background: 'rgba(0,0,0,0.2)' }}
          className="fixed left-0 top-0 h-full w-full"
        ></div>
      )}
      {transition((style, item) => {
        return (
          item && (
            <animated.div
              style={style}
              className="fixed p-10 h-full max-md:w-full max-md:left-0 max-xl:w-1/2 max-xl:left-1/4 ease-in-out duration-75 w-1/3 top-0 left-1/3"
            >
              {children}
            </animated.div>
          )
        );
      })}
    </div>
  );
};

export default Model;
