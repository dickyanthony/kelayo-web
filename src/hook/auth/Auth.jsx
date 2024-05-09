import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const useAuth = () => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
  });

  const login = () => dispatch({ type: "LOGIN" });
  const logout = () => dispatch({ type: "LOGOUT" });

  return { authState, login, logout };
};

const AuthProvider = ({ children }) => {
  const { authState } = useAuth();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

const useAuthState = () => {
  const authState = useContext(AuthContext);
  if (authState === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return authState;
};

export { AuthProvider, useAuth, useAuthState };
