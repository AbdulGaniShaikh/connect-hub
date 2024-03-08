import React from 'react';
import serverDown from 'assets/images/server-down.svg';
import { Link } from 'react-router-dom';

const ServerDown = ({ title, image, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full select-none">
      <p className="text-4xl">OOPS! SERVER IS NOT RUNNING</p>
      <img src={serverDown} alt="Not found" className="h-96 " />
      <p className="text-xl w-120 text-center">
        Server is not running. Please try again after sometime when server is up and running.
        <p>or</p>
        <p>
          You can try to contact the{' '}
          <Link to="https://github.com/AbdulGaniShaikh" target="_blank" className="text-primaryColor">
            developer
          </Link>
        </p>
      </p>
    </div>
  );
};

export default ServerDown;
