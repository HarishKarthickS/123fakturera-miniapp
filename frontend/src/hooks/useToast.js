import { toast } from 'react-toastify';

const useToast = () => {
  const showSuccess = (message, options = {}) => {
    toast.success(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,...options});
  };

  const showError = (message, options = {}) => {
    toast.error(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,...options});
  };

  const showInfo = (message, options = {}) => {
    toast.info(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,...options});
  };

  const showWarning = (message, options = {}) => {
    toast.warn(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,...options});
  };

  const showCustom = (message, options = {}) => {
    toast(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,...options});
  };

  const clearAll = () => {
    toast.dismiss();
  };

  const clearToast = (toastId) => {
    toast.dismiss(toastId);
  };

  return {showSuccess,showError,showInfo,showWarning,showCustom,clearAll,clearToast};
};

export default useToast;