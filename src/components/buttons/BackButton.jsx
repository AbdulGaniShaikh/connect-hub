import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className="p-2 hover:bg-lightHover dark:hover:bg-darkHover inline-block aspect-square rounded-full size-10 cursor-pointer"
    >
      <i className="fa-solid fa-arrow-left fa-lg"></i>
    </div>
  );
};

export default BackButton;
