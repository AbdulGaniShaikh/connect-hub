import React from 'react';
import serverDown from 'assets/images/server-down.svg';
import { Link } from 'react-router-dom';

const ServerDown = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-center select-none gap-5">
      <p className="text-4xl">OOPS! SERVER IS NOT RUNNING</p>
      <img src={serverDown} alt="Not found" className="w-3/4 md:w-120" />
      <div className="text-xl w-full md:w-120">
        Server is not running. Please try again after sometime when server is up and running.
        <div>or</div>
        <div>
          You can try to contact the{' '}
          <Link to="https://github.com/AbdulGaniShaikh" target="_blank" className="text-primaryColor">
            developer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerDown;
