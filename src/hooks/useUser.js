import { HttpStatusCode } from 'axios';
import { authService, storageService, toastService, userService } from './../service';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './../redux/slices/userInfoSlice';
import { useNavigate } from 'react-router-dom';
// import chatService from 'service/chatService';
import useSocket from './useSocket';
import { useEffect } from 'react';

const useUser = () => {
  var userId = storageService.getUserId();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [publishMessage, connect, disconnect] = useSocket();

  useEffect(() => {
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
          connect(userId);
          if (!res.data.payload.verified) {
            navigate('/unverified-account');
          }
        }
      })
      .catch((error) => {
        toastService.error(error?.response?.message);
      });
    if (userId) return disconnect;
  });
};

export default useUser;
