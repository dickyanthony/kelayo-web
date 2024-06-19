import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './hook/auth/Auth';
import router from './router';

export const AuthContext = React.createContext();
function App() {
  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT;
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </AuthProvider>
    </>
  );
}

export default App;
