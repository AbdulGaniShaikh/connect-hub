import { useDispatch } from 'react-redux';
import { setUserInfo } from './../redux/slices/userInfoSlice';
import { authService, storageService, toastService, userService } from 'service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailImg from 'assets/images/email.svg';
import useLogout from 'hooks/useLogout';
import useErrorBehavior from 'hooks/useErrorBehavior';
import NegativeButton from 'components/buttons/NegativeButton';

const UnverifiedAccount = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogout();
  const defaultErrorBehavior = useErrorBehavior();

  const resendVerificationLink = async (email) => {
    try {
      await authService.resendVerificationLink(email);
      toastService.success('Account verification mail was sent successfully');
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  const loadData = async (userId) => {
    try {
      const res = await userService.getUser(userId);
      dispatch(setUserInfo(res.data.payload));
      if (res.data.payload.verified) {
        navigate('/');
      }
      setEmail(res.data.payload.email);
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  useEffect(() => {
    var userId = storageService.getUserId();
    if (!userId) {
      logout();
    }
    loadData(userId);
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
        <div>
          <NegativeButton text="Logout" onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default UnverifiedAccount;
