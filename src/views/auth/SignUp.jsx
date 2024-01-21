import OAuthGoogleButton from '../../components/auth/OAuthGoogleButton';
import Waves from './../../assets/side-wave.svg';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="bg-slate-50 grid grid-cols-1">
      <img src={Waves} alt="waves" className="z-10 fixed top-0 rotate-180" />
      <div className="z-30 h-screen flex justify-start items-center mx-10">
        <div className="w-1/4 max-sm:hidden mx-auto">
          <h1 className="font-bold  text-6xl">Welcome to ConnectHub</h1>
          <p className="font-medium text-3xl">Be Imagine, Be Artistic, and let’s Engage</p>
        </div>
        <form className="bg-white p-10 w-120 shadow-lg rounded-3xl max-sm:w-full">
          <h1 className="font-medium text-4xl	">ConnectHub</h1>
          <p>Create a new account.</p>
          <div className="flex gap-x-2.5 mt-6 mb-5">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                Last Name
              </label>

              <input
                type="text"
                id="lastName"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="mb-5">
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

          <button
            type="submit"
            className="text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center"
          >
            Sign Up
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
            <p>Already have an account?</p>
            <Link to="/login">
              <p className="text-primaryColor">&nbsp;Sign In.</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
