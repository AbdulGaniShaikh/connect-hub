import Waves from './../../assets/side-wave.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from './../../components/shared/Spinner';
import { authService, storageService, toastService } from './../../service';
import { HttpStatusCode } from 'axios';
import useIsLoggedIn from 'hooks/useIsLoggedIn';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  useIsLoggedIn();
  const signUp = (event) => {
    event.preventDefault();
    setLoading(true);

    const form = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    };

    authService
      .signUp(form)
      .then((res) => {
        if (res.status === HttpStatusCode.Created) {
          toastService.success('Registered successfully');
          navigate('/');
        }
      })
      .catch((error) => {
        let res = error?.response;
        console.log(error);
        if (res?.status === HttpStatusCode.BadRequest) {
          for (var property in res.data) {
            if (res.data.hasOwnProperty(property)) {
              toastService.error(res.data[property]);
            }
          }
        } else {
          if (res.data.message) toastService.error(res.data.message);
          else toastService.error(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-slate-50 grid grid-cols-1">
      <img src={Waves} alt="waves" className="z-10 fixed top-0 rotate-180" />
      <div className="z-30 h-screen flex justify-start items-center mx-10">
        <div className="w-1/4 max-sm:hidden mx-auto">
          <h1 className="font-bold  text-6xl">Welcome to ConnectHub</h1>
          <p className="font-medium text-3xl">Be Imagine, Be Artistic, and let’s Engage</p>
        </div>
        <form onSubmit={signUp} className="bg-white p-10 w-120 shadow-lg rounded-3xl max-sm:w-full">
          <h1 className="font-medium text-4xl	">ConnectHub</h1>
          <p>Create a new account.</p>
          <div className="mb-5 mt-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>

            <input
              type="text"
              id="username"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
              placeholder="tehgan"
              required
            />
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

          <div className="pb-5"></div>

          <button
            type="submit"
            className="flex justify-center text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center"
          >
            {isLoading && <Spinner />}
            Sign Up
          </button>
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
