import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from 'service/authService';

export default function useIsLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .isUserLoggedIn()
      .then((res) => {
        if (res.status === 200) {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }, []);
}
