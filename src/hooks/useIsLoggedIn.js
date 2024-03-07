import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from 'service/authService';

export default function useIsLoggedIn() {
  const navigate = useNavigate();

  const isUserLoggedIn = async () => {
    try {
      const res = await authService.isUserLoggedIn();
      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {}
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);
}
