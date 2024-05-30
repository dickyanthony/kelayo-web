import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/auth/Auth';

const useSnackbar = () => {
  const { logout } = useAuth();
  const openSnackbarSuccess = (message = 'Success') => {
    toast.success(message);
  };

  const openSnackbarError = (message = 'Error') => {
    let msg = message;

    if ((msg = 'ERR_CANCELED')) {
      return;
    }
    if (msg === '403') {
      console.log('true');
      logout();
      msg = ' Sesi Telah Habis, Silahkan Login Kembali!';
    }

    toast.error(msg);
  };

  return { openSnackbarSuccess, openSnackbarError, Toaster };
};

export default useSnackbar;
