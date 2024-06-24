import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.user };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
  });

  const login = (user) => {
    localStorage.setItem('token', JSON.stringify(user.token));

    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
