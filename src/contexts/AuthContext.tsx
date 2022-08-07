import React, { createContext, useContext, useState } from 'react';
import { AuthContextProps, AuthProviderProps } from '~/models';
import { api } from '~/services/index.service';

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [erro, setErro] = useState<boolean>(false);

  const login = async (email: string) => {
    setLoadingLogin(true);
    await api
      .post('/register', { email })
      .then((res) => {
        setToken(res.data.user.token);
        localStorage.setItem('token', res.data.user.token);
      })
      .catch(() => setErro(true));
    setLoadingLogin(false);
  };

  return (
    <AuthContext.Provider value={{ loadingLogin, token, login, erro, setErro }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
