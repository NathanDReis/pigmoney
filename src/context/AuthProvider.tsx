import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { api } from '@/src/services/api';

type User = {
  email: string,
  fullName: string,
  userName: string,
  telephone: string,
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

type TokenPayload = {
  exp: number;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredAuth() {
      const storedToken = await SecureStore.getItemAsync('token');
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedToken) {
        const isValid = validateToken(storedToken);
        if (!isValid) {
          await signOut();
          return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    }
    loadStoredAuth();

    api.interceptors.response.use(
      response => response, // adicionar descriptografia aqui no futuro e fazer todo envio do back ser criptografado
      async error => {
        if (error.response?.status === 401) {
          await signOut();
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      const userData = response.data.user;

      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  function validateToken(token: string) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
