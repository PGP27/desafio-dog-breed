import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '~/services/index.service';

interface AuthContextProps {
  loading: boolean;
  token: string;
  email: string;
  login(email: string): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [email, setEmail] = useState<string>('');

  const login = async (email: string) => {
    setLoading(true);
    await api
      .post('/register', { email })
      .then((res) => {
        setEmail(email);
        setToken(res.data.user.token);
        localStorage.setItem('token', res.data.user.token);
      })
      .catch((err) => {});
    setLoading(false);
  };

  return <AuthContext.Provider value={{ loading, token, email, login }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
