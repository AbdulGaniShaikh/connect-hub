import Waves from 'assets/side-wave.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService, toastService } from 'service';
import useIsLoggedIn from 'hooks/useIsLoggedIn';
import { setUserInfo } from './../../redux/slices/userInfoSlice';
import { HttpStatusCode } from 'axios';
import { useDispatch } from 'react-redux';
import SubmitButton from 'components/shared/SubmitButton';
import PasswordInput from 'components/shared/PasswordInput';
import TextInput from 'components/shared/TextInput';
import { isValidEmail } from 'utility/inputValidators';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useIsLoggedIn();

  const onClick = async (setLoading) => {
    try {
      var v1, v2;
      if ((v1 = !isValidEmail(email))) {
        setEmailError('email is not valid');
      }
      if ((v2 = password.trim().length === 0)) {
        setPasswordError('password cannot be empty');
      }

      if (v1 || v2) {
        return;
      }
      setLoading(true);
      const res = await authService.login(email, password);
      dispatch(setUserInfo(res.data));
      toastService.success('Logged In successfully');
      navigate('/');
    } catch (error) {
      let res = error.response;
      if (!res) {
        toastService.error('Internal server error');
      }
      if (res.status === HttpStatusCode.BadRequest) {
        for (var property in res.data) {
          if (res.data.hasOwnProperty(property)) {
            toastService.error(res.data[property]);
          }
        }
      } else {
        if (res.data.message) toastService.error(res.data?.message);
        else toastService.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1">
      <img src={Waves} alt="waves" className="z-10 fixed top-0 rotate-180" />
      <div className="z-10 min-h-screen flex justify-center items-center mx-10">
        <div className="grid grid-flow-row bg-white gap-3 p-10 shadow-lg rounded-3xl w-120 max-sm:w-full">
          <div>
            <h1 className="font-medium text-4xl	">ConnectHub</h1>
            <p>Log in to your account.</p>
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
          <div>
            <PasswordInput
              val={password}
              label="Password"
              id="password"
              hint={'Type your password'}
              onChange={(val) => {
                setPassword(val);
                if (val.trim().length > 0) {
                  setPasswordError('');
                }
              }}
              error={passwordError}
            />
            <Link to="/forgot-password">
              <p className="inline-block text-sm gap-x-10 text-primaryColor">Forgot password?</p>
            </Link>
          </div>

          <div className="flex justify-center items-center w-full">
            <SubmitButton text="Login" onClick={onClick} />
          </div>
          <div className="flex text-sm">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <p className="text-primaryColor">&nbsp;Create one.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
