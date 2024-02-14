import { useDispatch } from 'react-redux';
import { setUserInfo } from './../redux/slices/userInfoSlice';
import { authService, storageService, toastService, userService } from 'service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import emailImg from 'assets/icons/email.svg';
import Spinner from 'components/shared/Spinner';

const UnverifiedAccount = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    var userId = storageService.getUserId();
    if (!userId) {
      authService
        .logout()
        .then(() => {
          navigate('/login');
          toastService.error('There was some error. Please login again.');
        })
        .catch((error) => {
          console.log(error);
        });
    }
    userService
      .getUser(userId)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          dispatch(setUserInfo(res.data.payload));
          if (res.data.payload.verified) {
            navigate('/');
          }
          setEmail(res.data.payload.email);
        }
      })
      .catch((error) => {
        toastService.error(error?.response?.message);
      });
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-y-5 items-center justify-center p-5">
        <div className="bg-blue-300 rounded-full p-5">
          <img src={emailImg} alt="email" className="h-40 object-cover" />
        </div>

        <h1 className="text-5xl text-center">Verify your email address!</h1>
        <p className="text-xl text-center">
          A verification mail has been sent to your mail <b>{email}</b>. <br />
          please check your mail and click the link provided in the email to complete your account registration.
        </p>
        <p className="text-center">
          If you do not recieve email in the next 5 mins. click{' '}
          <span className="text-primaryColor cursor-pointer" onClick={() => resendVerificationLink(email)}>
            here
          </span>{' '}
          to resend the verification mail
        </p>

        <button
          type="button"
          onClick={() => {
            setLoading(true);
            authService
              .logout()
              .then(() => {
                navigate('/login');
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          className="flex justify-center text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {loading && <Spinner />}
          Logout
        </button>
      </div>
    </div>
  );
};

export default UnverifiedAccount;
