import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { MyChatBot } from './components';
import { AuthProvider } from './hook/auth/Auth';
import router from './router';

export const AuthContext = React.createContext();

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

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

  const shouldRenderChatbot = !['/login', '/register'].includes(pathname);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        {shouldRenderChatbot && <MyChatBot />}
        <Toaster position="bottom-right" />
      </AuthProvider>
    </>
  );
}

export default App;
