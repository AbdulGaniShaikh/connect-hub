import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { authService, toastService } from 'service';
import { check, close } from 'assets/icons';

const VerifyAccount = () => {
  const { email } = useParams();
  const token = useSearchParams()[0].get('token');
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(0);
  useEffect(() => {
    setLoading(true);
    authService
      .verifyEmail(email, token)
      .then((res) => {
        setStatusCode(200);
      })
      .catch((error) => {
        const status = error.response?.status;
        console.log(status);
        if (status) {
          setStatusCode(status);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
        <Link to={'/login'} className="text-primaryColor">
          Login
        </Link>{' '}
        page to access the platfrom
      </p>
    </div>
  );
};

const NotFound = ({ email }) => {
  return (
    <div className="flex flex-col gap-y-3 items-center justify-center">
      <div className="bg-green-500 rounded-full p-5">
        <img src={close} alt="email" className="h-40 object-cover" />
      </div>
      <h1 className="text-5xl">Verification Error!</h1>
      <p className="text-xl text-center">
        Your email <b> {email} </b> cannot be verified. <br />
        Either the email provided doesn't exists or token is wrong. Please check the token or go to{' '}
        <Link to={'/sign-up'} className="text-primaryColor">
          Sign Up
        </Link>{' '}
        page to create new account.
      </p>
    </div>
  );
};

const Unauthorized = ({ email }) => {
  const resendVerificationLink = (email) => {
    authService
      .resendVerificationLink(email)
      .then(() => {
        toastService.success('Account verification mail was sent successfully');
      })
      .catch((error) => {
        const res = error.response;
        if (!res) {
          toastService.error('Some error occured');
          return;
        }
        if (res.status >= 500) {
          toastService.error('Internal Server Error Occured');
          return;
        }
        toastService.error(res.data?.message);
      });
  };
  return (
    <div className="flex flex-col gap-y-3 items-center justify-center">
      <div className="bg-green-500 rounded-full p-5">
        <img src={close} alt="email" className="h-40 object-cover" />
      </div>
      <h1 className="text-5xl">Verification Error!</h1>
      <p className="text-xl text-center">
        Your email <b> {email} </b> cannot be verified. <br />
        Seems the like token you provided is expired. Click{' '}
        <p className="text-primaryColor" onClick={resendVerificationLink}>
          here
        </p>{' '}
        to generate new token to verify your email
      </p>
    </div>
  );
};

export default VerifyAccount;
