import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { authService, toastService } from 'service';
import { check } from 'assets/icons';
import notFoundImage from 'assets/images/404.svg';
import useErrorBehavior from 'hooks/useErrorBehavior';

const VerifyAccount = () => {
  const { email } = useParams();
  const token = useSearchParams()[0].get('token');
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(0);

  const fetchVerificationStatus = async () => {
    setLoading(true);
    try {
      await authService.verifyEmail(email, token);
      setStatusCode(200);
    } catch (error) {
      const res = error.response;
      if (res) {
        toastService.error(res.data.message);
        const status = res?.status;
        if (status) {
          setStatusCode(status);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationStatus();
  }, [token, email]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!loading && (
        <>
          {statusCode === HttpStatusCode.Ok && <Success email={email} />}
          {statusCode === HttpStatusCode.NotFound && <NotFound email={email} />}
          {statusCode === HttpStatusCode.Unauthorized && <Unauthorized email={email} />}
        </>
      )}
    </div>
  );
};

const Success = ({ email }) => {
  return (
    <div className="flex flex-col gap-y-3 items-center justify-center">
      <div className="bg-green-500 rounded-full p-5">
        <img src={check} alt="email" className="h-40 object-cover" />
      </div>
      <h1 className="text-5xl">Email is Verified!!</h1>
      <p className="text-xl text-center">
        Your email <b>{email}</b> has been successfully verified. <br /> You can now go back to the{' '}
        <Link to={'/auth/login'} className="text-primaryColor">
          Login
        </Link>{' '}
        page to access the platfrom
      </p>
    </div>
  );
};

const NotFound = ({ email }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center p-5 text-center">
      <img src={notFoundImage} alt="Not found" className="w-3/4 md:w-120" />

      <h1 className="text-5xl">Verification Error!</h1>
      <p className="text-xl">
        Your email <b> {email} </b> cannot be verified. <br />
      </p>
      <p>
        Either the email provided doesn't exists or token is wrong. Please check the token or go to{' '}
        <Link to={'/auth/sign-up'} className="text-primaryColor">
          Sign Up
        </Link>{' '}
        page to create new account.
      </p>
    </div>
  );
};

const Unauthorized = ({ email }) => {
  const defaultErrorBehavior = useErrorBehavior();
  const resendVerificationLink = async (email) => {
    try {
      await authService.resendVerificationLink(email);
      toastService.success('Account verification mail was sent successfully');
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };
  return (
    <div className="flex flex-col gap-5 text-center items-center justify-center">
      <div className="bg-red-500 rounded-full p-5">
        <i className="fa-solid fa-close text-9xl"></i>
      </div>
      <h1 className="text-5xl">Verification Error!</h1>
      <p className="text-xl text-center">
        Your email <b> {email} </b> cannot be verified. <br />
        Seems the like token you provided is expired. Click{' '}
        <span className="text-primaryColor cursor-pointer" onClick={resendVerificationLink}>
          here
        </span>{' '}
        to generate new token to verify your email
      </p>
    </div>
  );
};

export default VerifyAccount;
