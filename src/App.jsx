import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { WrapCenter } from "./components";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./hook/auth/Auth";
export const AuthContext = React.createContext();
function App() {
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
