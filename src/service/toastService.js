import { toast, Bounce } from 'react-toastify';

const settings = {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  theme: 'light',
  transition: Bounce
};

const error = (message) => {
  toast.error(message, settings);
};

const success = (message) => {
  toast.success(message, settings);
};

const info = (message) => {
  toast.info(message, settings);
};

const warn = (message) => {
  toast.warn(message, settings);
};

const toastService = {
  error,
  success,
  info,
  warn
};

export default toastService;
