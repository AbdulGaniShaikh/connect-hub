import { HttpStatusCode } from 'axios';
import Spinner from 'components/shared/Spinner';
import useIsLoggedIn from 'hooks/useIsLoggedIn';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, toastService } from 'service';

const ForgotPassword = () => {
  const [loadingContinue, setLoadingContinue] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = React.useState('');
  const navigate = useNavigate();
  useIsLoggedIn();

  const onContinueClick = (event) => {
    event.preventDefault();
    setLoadingContinue(true);
    if (otpSent) {
      resetPassword(event.target.email.value, event.target.password.value, otp);
    } else {
      sendOtpToResetPassword(event.target.email.value);
    }
  };

  const resetPassword = (email, password, otp) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      toastService.error('Enter valid email address');
      return;
    }
    if (otp.length !== 6) {
      toastService.error('OTP length can only be 6.');
      return;
    }
    otp = 0 + +otp;
    authService
      .resetPassword(email, password, otp)
      .then((res) => {
        toastService.success('Password was reset. Login with your new password to access your account.');
        navigate('/login');
      })
      .catch((error) => {
        const res = error.response;
        if (res) {
          toastService.error(res.data?.message);
        }
      })
      .finally(() => {
        setLoadingContinue(false);
      });
  };

  const sendOtpToResetPassword = (email) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      toastService.error('Enter valid email address');
      return;
    }
    authService
      .sendOtpToResetPassword(email)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setOtpSent(true);
        }
      })
      .catch((error) => {
        const res = error.response;
        if (res) {
          toastService.error(res.data?.message);
        }
      })
      .finally(() => {
        setLoadingContinue(false);
      });
  };

  function matchIsNumeric(text) {
    const isNumber = typeof text === 'number';
    const isString = typeof text === 'string';
    return (isNumber || (isString && text !== ' ')) && !isNaN(Number(text));
  }

  return (
    <div className="flex justify-center px-5 h-screen items-center">
      <form
        onSubmit={onContinueClick}
        className="flex flex-col gap-y-6 justify-evenly bg-white p-10 shadow-lg rounded-3xl w-120 max-sm:w-full"
      >
        <div>
          <h1 className="font-medium text-4xl	">Forgot Password</h1>
          <p className="text-sm pt-1">
            Enter the email associated with your account and we'll send you OTP to reset your password.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
            placeholder="name@example.com"
            required
          />
        </div>
        {otpSent && (
          <>
            <div className="flex flex-col justify-center items-start">
              <label className="block mb-2 text-sm font-medium text-gray-900">O T P</label>
              <MuiOtpInput
                TextFieldsProps={{ size: 'small', placeholder: '1' }}
                length={6}
                value={otp}
                validateChar={matchIsNumeric}
                onChange={(e) => setOtp(e)}
              />
              <p
                className="mt-2.5 text-primaryColor text-sm place-self-end w-fit cursor-pointer"
                onClick={() => {
                  sendOtpToResetPassword(email);
                }}
              >
                Resend OTP
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                New password
              </label>
              <input
                type="password"
                id="password"
                placeholder="New password"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
                required
              />
            </div>
          </>
        )}

        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="flex justify-center text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center"
          >
            {loadingContinue && <Spinner />}
            {!otpSent ? 'Continue' : 'Reset Password'}
          </button>
          <p
            className="mt-2.5 text-primaryColor text-sm place-self-end w-fit cursor-pointer"
            onClick={() => {
              setOtpSent(!otpSent);
            }}
          >
            {otpSent ? 'I dont have otp' : 'I already have OTP'}
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
