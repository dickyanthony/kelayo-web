import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const useSnackbar = () => {
  const openSnackbarSuccess = (message = "Success") => {
    toast.success(message);
  };

  const openSnackbarError = (message = "Error") => {
    toast.error(message);
  };

  return { openSnackbarSuccess, openSnackbarError, Toaster };
};

export default useSnackbar;
