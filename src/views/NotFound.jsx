import React from 'react';
import notFoundImage from 'assets/images/notFound.svg';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full select-none">
      <p className="text-4xl">OOPS! PAGE NOT FOUND</p>
      <img src={notFoundImage} alt="Not found" className="h-96" />
      <p className="text-xl w-120 text-center">
        Sorry, the page you are looking for doesn't exists. The link you followed is probably broken or page has been
        removed.
      </p>
    </div>
  );
};

export default NotFound;
