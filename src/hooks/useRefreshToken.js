import { useEffect } from 'react';
import { authService } from 'service';

var interval = null;

const useRefreshToken = () => {
  // 60 * 1000 * 8 === 480000 i.e. 8 minute
  const INTERVAL = 60 * 1000 * 8;
  const consumeRefreshToken = async () => {
    try {
      await authService.consumeRefreshToken();
    } catch (ignored) {
      clearInterval(interval);
    }
  };
  if (interval === null) {
    interval = setInterval(consumeRefreshToken, INTERVAL);
  }
  useEffect(() => {
    return () => {
      if (interval !== null) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, []);
};

export default useRefreshToken;
