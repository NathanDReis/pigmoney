import { api } from '@/services/api';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

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

  // Separe o carregamento inicial do interceptor
  useEffect(() => {
    async function loadStoredAuth() {
      try {
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
      } catch (error) {
        console.error('Erro ao carregar autenticação:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStoredAuth();
  }, []);

  // Interceptor em useEffect separado
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          await signOut();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup do interceptor
    return () => {
      api.interceptors.response.eject(interceptor);
    };
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
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
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