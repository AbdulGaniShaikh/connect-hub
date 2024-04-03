import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearRequests } from './../redux/slices/friendRequestsSlice';
import { clearAll } from './../redux/slices/messageSlice';
import { clearUser } from './../redux/slices/userInfoSlice';
import { authService, toastService } from 'service';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await authService.logout();
      dispatch(clearRequests());
      dispatch(clearAll());
      dispatch(clearUser());
      navigate('/auth/login');
    } catch (error) {
      if (!error.response) {
        toastService.error('Server is not up. Try again later');
      }
    }
  };
  return [logout];
};

export default useLogout;
