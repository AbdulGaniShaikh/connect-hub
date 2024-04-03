import { useTransition, animated } from '@react-spring/web';
import React, { useEffect, useRef, useState } from 'react';

const Menu = ({ children = [], cancelItem = 'false' }) => {
  const [visible, setVisible] = useState(false);
  const transition = useTransition(visible, {
    from: {
      origin: 'top',
      scale: 0,
      opacity: 0
    },
    enter: {
      scale: 1,
      opacity: 1
    },
    leave: {
      scale: 0,
      opacity: 0
    }
  });

  const newRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });
  return (
    <div ref={newRef} className="relative select-none">
      <div
        className="flex items-center justify-center cursor-pointer size-7 rounded-full hover:bg-lightHover dark:hover:bg-darkHover duration-300"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>

      {transition((style, item) => {
        return (
          item && (
            <animated.div
              style={style}
              className="absolute p-1 bg-lightBg dark:bg-darkBg drop-shadow-xl rounded-md right-0 origin-top-right border dark:border-darkHover overflow-hidden"
            >
              {children.map((child, index) => (
                <div
                  onClick={() => {
                    setVisible(false);
                  }}
                  key={index}
                >
                  {child}
                </div>
              ))}
              {cancelItem && (
                <MenuItem
                  onClick={() => {
                    setVisible(false);
                  }}
                  value="Cancel"
                  icon="fa-solid fa-xmark"
                />
              )}
            </animated.div>
          )
        );
      })}
    </div>
  );
};

const MenuItem = ({ value = '', icon = '', onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-start items-center hover:bg-lightHover dark:hover:bg-darkHover px-4 py-2 rounded-sm cursor-pointer whitespace-nowrap"
    >
      {icon && <i className={icon + ' mr-2 fa-sm'}></i>}
      {value}
    </div>
  );
};

export { MenuItem };

export default Menu;
