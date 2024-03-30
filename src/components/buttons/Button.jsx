import Spinner from 'components/shared/Spinner';
import React from 'react';

const Button = ({
  onClick = () => {},
  text = 'Button',
  loading = false,
  icon = '',
  className = 'bg-primaryColor hover:bg-primaryColorDark focus:ring-4 ring-lightHover dark:ring-darkHover'
}) => {
  return (
    <button
      className={`flex items-center justify-center ${className} focus:outline-none hover:ring-4 ease-linear duration-200 font-medium mt-2 rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center`}
      onClick={onClick}
    >
      {loading && <Spinner />}
      {!loading && icon !== '' && <i className={`${icon} mr-2`}></i>}
      {text}
    </button>
  );
};

export default Button;
