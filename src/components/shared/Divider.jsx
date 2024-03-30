import React from 'react';

const Divider = ({ className = '' }) => {
  return <div className={`w-full h-px bg-lightHover dark:bg-darkHover ${className}`} />;
};

export default Divider;
