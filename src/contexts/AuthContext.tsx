import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { api } from '~/services/index.service';

interface AuthContextProps {
  loadingLogin: boolean;
  token: string;
  email: string;
  login(email: string): Promise<void>;
  erro: boolean;
  setErro: Dispatch<SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [email, setEmail] = useState<string>('');
  const [erro, setErro] = useState<boolean>(false);

  const login = async (email: string) => {
    setLoadingLogin(true);
    await api
      .post('/register', { email })
      .then((res) => {
        setEmail(email);
        setToken(res.data.user.token);
        localStorage.setItem('token', res.data.user.token);
        localStorage.setItem('email', email);
      })
      .catch(() => setErro(true));
    setLoadingLogin(false);
  };

  return (
    <AuthContext.Provider value={{ loadingLogin, token, email, login, erro, setErro }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
