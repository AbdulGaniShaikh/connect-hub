import { toastService } from 'service';
import useLogout from 'hooks/useLogout';

const useErrorBehavior = () => {
  const [logout] = useLogout();
  const defaultErrorBehavior = (error) => {
    const res = error.response;
    if (!res) {
      toastService.internalServerError();
      return;
    }
    if (res.status >= 500) {
      toastService.internalServerError();
    }
    if (res.data.logout) {
      logout();
      return;
    }
    toastService.error(res.data.message);
  };
  return defaultErrorBehavior;
};

export default useErrorBehavior;
