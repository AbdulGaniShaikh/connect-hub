import React from 'react';
import Button from './Button';

const PositiveButton = ({ onClick, text = 'Button', loading = false, icon = '' }) => {
  return (
    <Button
      text={text}
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 focus:ring-4 ring-green-300"
      loading={loading}
      icon={icon}
    />
  );
};

export default PositiveButton;
