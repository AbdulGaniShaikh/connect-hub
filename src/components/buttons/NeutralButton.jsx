import React from 'react';
import Button from './Button';

const NeutralButton = ({ onClick, text = 'Button', loading = false, icon = '' }) => {
  return (
    <Button
      text={text}
      onClick={onClick}
      className="hover:bg-lightHover dark:hover:bg-darkHover focus:ring-4 ring-gray-300 dark:ring-darkVariant w-full"
      loading={loading}
      icon={icon}
    />
  );
};

export default NeutralButton;
