import Waves from 'assets/side-wave.svg';
import StrongPasswordInput from 'components/shared/StrongPasswordInput';
import SubmitButton from 'components/shared/SubmitButton';
import TextInput from 'components/shared/TextInput';
import useErrorBehavior from 'hooks/useErrorBehavior';
import useIsLoggedIn from 'hooks/useIsLoggedIn';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, toastService } from 'service';
import { isValidEmail, isValidPassword } from 'utility/inputValidators';

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  const defaultErrorBehavior = useErrorBehavior();

  useIsLoggedIn();

  const onClick = (setLoadingContinue) => {
    if (otpSent) {
      resetPassword(email, password, otp, setLoadingContinue);
    } else {
      sendOtpToResetPassword(email, setLoadingContinue);
    }
  };

  const resetPassword = async (email, password, otp, setLoadingContinue) => {
    var v1, v2;
    if ((v1 = !isValidEmail(email))) {
      setEmailError('email is not valid');
    }
    if ((v2 = !isValidPassword(password))) {
      setPasswordError('password cannot be empty');
    }
    if (otp.length !== 6) {
      toastService.error('OTP length can only be 6.');
      return;
    }
    if (v1 || v2) {
      return;
    }

    otp = 0 + +otp;
    try {
      setLoadingContinue(true);
      await authService.resetPassword(email, password, otp);
      toastService.success('Password was reset. Login with your new password to access your account.');
      navigate('/login');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoadingContinue(false);
    }
  };

  const sendOtpToResetPassword = async (email, setLoadingContinue) => {
    if (!isValidEmail(email)) {
      setEmailError('email is not valid');
      return;
    }

    try {
      setLoadingContinue(true);
      await authService.sendOtpToResetPassword(email);
      setOtpSent(true);
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoadingContinue(false);
    }
  };

  function matchIsNumeric(text) {
    const isNumber = typeof text === 'number';
    const isString = typeof text === 'string';
    return (isNumber || (isString && text !== ' ')) && !isNaN(Number(text));
  }

  return (
    <div className="grid grid-cols-1">
      <img src={Waves} alt="waves" className="z-10 fixed top-0 rotate-180" />
      <div className="z-10 min-h-screen flex justify-center items-center mx-10 max-md:my-10">
        <div className="grid grid-flow-row grid-cols-2 max-md:grid-cols-1 bg-white p-10 shadow-lg rounded-3xl gap-3 max-sm:w-full">
          <div className="col-span-2 max-md:col-span-1">
            <h1 className="font-medium text-4xl	">Forgot Password</h1>
            <p>Enter the email associated with your account and we'll send you OTP to reset your password.</p>
          </div>

          <TextInput
            id="email"
            hint="name@example.com"
            label="Email"
            val={email}
            error={emailError}
            onChange={(e) => {
              setEmail(e.trim());
              if (isValidEmail(e.trim())) {
                setEmailError('');
              }
            }}
            key={1}
          />
          {otpSent && (
            <>
              <StrongPasswordInput
                val={password}
                label="New Password"
                id="newPassword"
                hint={'Type your new password'}
                onChange={(val) => {
                  setPassword(val);
                  if (isValidPassword(val)) {
                    setPasswordError('');
                  }
                }}
                error={passwordError}
              />
              <div className="flex flex-col justify-center items-start">
                <label className="block mb-2 text-sm font-medium text-gray-900">O T P</label>
                <MuiOtpInput
                  TextFieldsProps={{ size: 'small', placeholder: '1' }}
                  length={6}
                  value={otp}
                  validateChar={matchIsNumeric}
                  onChange={(e) => setOtp(e)}
                />
              </div>
            </>
          )}

          <div className={otpSent ? 'flex justify-center items-end' : 'flex justify-center items-center'}>
            <SubmitButton text={otpSent ? 'Reset password' : 'Send OTP'} onClick={onClick} />
          </div>
          <div className="flex flex-row justify-between">
            <p
              className="text-primaryColor text-sm place-self-end cursor-pointer"
              onClick={() => {
                setOtpSent(!otpSent);
              }}
            >
              {otpSent ? 'I dont have otp' : 'I already have OTP'}
            </p>
            {otpSent && (
              <p
                className="text-primaryColor text-sm place-self-end cursor-pointer"
                onClick={() => {
                  sendOtpToResetPassword(email);
                }}
              >
                Resend OTP
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
