import React from 'react';
import Button from './Button';

const NegativeButton = ({ onClick, text = 'Button', loading = false, icon = '' }) => {
  return (
    <Button
      text={text}
      onClick={onClick}
      className="bg-red-500 hover:bg-red-600 focus:ring-4 ring-red-300"
      loading={loading}
      icon={icon}
    />
  );
};

export default NegativeButton;
