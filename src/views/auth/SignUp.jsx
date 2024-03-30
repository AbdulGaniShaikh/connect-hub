import Waves from 'assets/side-wave.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService, toastService } from 'service';
import { HttpStatusCode } from 'axios';
import useIsLoggedIn from 'hooks/useIsLoggedIn';
import SubmitButton from 'components/buttons/SubmitButton';
import StrongPasswordInput from 'components/shared/StrongPasswordInput';
import TextInput from 'components/shared/TextInput';
import { isValidEmail, isValidPassword, isValidUsername } from 'utility/inputValidators';
import PasswordInput from 'components/shared/PasswordInput';
import hashPassword from 'utility/hashPassword';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  useIsLoggedIn();
  const onClick = async (setLoading) => {
    try {
      var v1, v2, v3, v4;
      if ((v1 = !isValidUsername(username))) {
        setUsernameError('username can only contain lowercase letters or _');
      }
      if ((v2 = !isValidEmail(email))) {
        setEmailError('email is not valid');
      }
      if ((v3 = !isValidPassword(password))) {
        setPasswordError('password should meet all requirements');
      }
      if ((v4 = password.trim() !== repeatPassword.trim())) {
        setRepeatPasswordError('password doesn`t match');
      }
      if (v1 || v2 || v3 || v4) {
        return;
      }

      setLoading(true);

      const hash = hashPassword(password);

      const form = {
        username,
        email,
        password: hash
      };
      await authService.signUp(form);
      toastService.success('Registered successfully');
      navigate('/unverified-account');
    } catch (error) {
      const res = error.response;
      if (!res) {
        toastService.internalServerError();
      } else if (res.status === HttpStatusCode.BadRequest) {
        for (var property in res.data) {
          if (res.data.hasOwnProperty(property)) {
            toastService.error(res.data[property]);
          }
        }
      } else {
        if (res.data.message) toastService.error(res.data.message);
        else toastService.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1">
      <img src={Waves} alt="waves" className="z-10 fixed top-0 rotate-180" />
      <div className="z-10 min-h-screen flex justify-center items-center mx-10 max-md:my-10">
        <div className="grid grid-flow-row grid-cols-2 max-md:grid-cols-1 bg-lightBg text-colorOnLight dark:bg-darkBg dark:text-colorOnDark rounded-3xl border border-lightHover dark:border-darkHover p-10 shadow-lg  gap-3 max-sm:w-full">
          <div className="col-span-2 max-md:col-span-1">
            <h1 className="font-medium text-4xl	">ConnectHub</h1>
            <p>Create a new account.</p>
          </div>

          <TextInput
            id="username"
            hint="username"
            label="Username"
            val={username}
            error={usernameError}
            onChange={(e) => {
              setUsername(e.trim());
              if (isValidUsername(e.trim())) {
                setUsernameError('');
              }
            }}
            key={1}
          />

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
            key={2}
          />

          <StrongPasswordInput
            val={password}
            label="Password"
            id="password"
            hint={'Type your password'}
            onChange={(val) => {
              setPassword(val);
              if (isValidPassword(val)) {
                setPasswordError('');
              }
            }}
            error={passwordError}
          />

          <PasswordInput
            val={repeatPassword}
            label="Repeat password"
            id="oldPassword"
            hint={'Repeat password'}
            error={repeatPasswordError}
            onChange={(val) => {
              setRepeatPassword(val);
              if (password.trim() === val.trim()) {
                setRepeatPasswordError('');
              }
            }}
          />
          <div className="flex py-2.5 mt-2.5 text-sm">
            <p>Already have an account?</p>
            <Link to="/login">
              <p className="text-primaryColor">&nbsp;Sign In.</p>
            </Link>
          </div>
          <div className="flex justify-center items-center w-full">
            <SubmitButton text="Sign Up" onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
