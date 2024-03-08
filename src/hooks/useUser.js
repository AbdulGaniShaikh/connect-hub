import { storageService, userService } from 'service';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './../redux/slices/userInfoSlice';
import { useNavigate } from 'react-router-dom';
import useSocket from 'hooks/useSocket';
import { useEffect } from 'react';
import useLogout from 'hooks/useLogout';
import useErrorBehavior from './useErrorBehavior';

const useUser = () => {
  var userId = storageService.getUserId();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogout();
  const [, connect, disconnect] = useSocket();
  const defaultErrorBehavior = useErrorBehavior();

  const getUserInfo = async () => {
    try {
      const res = await userService.getUser(userId);
      dispatch(setUserInfo(res.data.payload));
      if (!res.data.payload.verified) {
        navigate('/unverified-account');
      }
      connect(userId);
    } catch (error) {
      defaultErrorBehavior(error);
      return;
    }
  };

  useEffect(() => {
    if (!userId) {
      logout();
      return;
    }
    getUserInfo();
    return disconnect;
  }, [userId]);
};

export default useUser;
