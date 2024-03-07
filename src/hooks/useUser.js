import { storageService, userService } from 'service';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './../redux/slices/userInfoSlice';
import { setInbox } from './../redux/slices/messageSlice';
import { useNavigate } from 'react-router-dom';
import useSocket from 'hooks/useSocket';
import { useEffect } from 'react';
import useLogout from 'hooks/useLogout';
import chatService from 'service/chatService';
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
      logout();
      return;
    }
  };

  const fetchInbox = async () => {
    try {
      const res = await chatService.fetchInbox(userId, 0);
      if (!res.data.empty) {
        dispatch(setInbox([...res.data.content]));
      }
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      logout();
      return;
    }
    getUserInfo();
    // fetchInbox();

    return disconnect;
  }, []);
};

export default useUser;
