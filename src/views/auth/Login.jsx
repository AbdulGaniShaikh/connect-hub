// import { useState } from 'react';
import OAuthGoogleButton from '../../components/auth/OAuthGoogleButton';
import Waves from '../../assets/side-wave.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-slate-50 grid grid-cols-1">
      <img src={Waves} alt="waves" className="z-10 fixed top-0 rotate-180" />
      <div className="z-30 h-screen flex justify-start items-center mx-10">
        <form className="bg-white p-10 shadow-lg rounded-3xl w-120 max-sm:w-full">
          <h1 className="font-medium text-4xl	">ConnectHub</h1>
          <p>Log in to your account.</p>
          <div className="mb-5 mt-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>

            <input
              type="email"
              id="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Type your password"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
              required
            />
          </div>
          <div className="flex justify-between mb-5">
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password">
              <p className="inline-block text-sm gap-x-10 text-primaryColor">Forgot password?</p>
            </Link>
          </div>
          <button
            type="submit"
            className="text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center"
          >
            Login
          </button>
          <div className="grid grid-cols-3 items-center ">
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
            <p className="justify-self-center">or</p>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
          </div>
          <div className="flex justify-center items-center">
            <OAuthGoogleButton />
          </div>
          <div className="flex py-2.5 mt-2.5 text-sm">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <p className="text-primaryColor">&nbsp;Create one.</p>
            </Link>
          </div>
        </form>
        <div className="w-1/4 max-sm:hidden mx-auto bg-blob">
          <h1 className="font-bold  text-6xl">Welcome to ConnectHub</h1>
          <p className="font-medium text-3xl">Be Imagine, Be Artistic, and let’s Engage</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
