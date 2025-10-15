import { createContext, useContext, useState } from 'react';
import { api } from '@/src/services/api';

type User = { 
  email: string,
  name: string,
  photoURL?: string 
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(response.data.user);
    } catch (error: any) {
      console.log("Erro no login:", error.response?.data || error.message);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
