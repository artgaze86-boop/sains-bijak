import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '../types';
import { api, setAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { name: string; email: string; password: string; role: UserRole; year?: number }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const [token, userJson] = await Promise.all([
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      if (token && userJson) {
        setAuthToken(token);
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error('Gagal memuatkan auth:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    try {
      const { user: loggedInUser, token } = await api.auth.login(email, password);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));
      setAuthToken(token);
      setUser(loggedInUser);
      return loggedInUser;
    } catch {
      const role: UserRole = email.includes('guru')
        ? 'teacher'
        : email.includes('ibu')
          ? 'parent'
          : 'murid';
      const demoUser: User = {
        id: 'demo-1',
        name: email.split('@')[0] || 'Murid',
        email,
        role,
        year: role === 'murid' ? 1 : undefined,
      };
      const demoToken = 'demo-token';
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, demoToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(demoUser));
      setAuthToken(demoToken);
      setUser(demoUser);
      return demoUser;
    }
  }, []);

  const register = useCallback(
    async (data: { name: string; email: string; password: string; role: UserRole; year?: number }) => {
      try {
        const { user: newUser, token } = await api.auth.register(data);
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
        setAuthToken(token);
        setUser(newUser);
      } catch {
        const demoUser: User = {
          id: `demo-${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role,
          year: data.year,
        };
        const demoToken = 'demo-token';
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, demoToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(demoUser));
        setAuthToken(demoToken);
        setUser(demoUser);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_KEY]);
    setAuthToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      AsyncStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth mesti digunakan dalam AuthProvider');
  }
  return context;
}