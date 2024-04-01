import { useNavigate } from 'react-router-dom';
import { authService, toastService } from 'service';

const useLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await authService.logout();
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
