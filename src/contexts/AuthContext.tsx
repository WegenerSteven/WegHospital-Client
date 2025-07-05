import React, { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { toast } from 'sonner';

export interface User {
  profileId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient' | 'user';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'patient' | 'user';
  // Doctor specific fields
  specialty?: string;
  yearsOfExperience?: number;
  phoneNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = 'http://localhost:3001/api/v1';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser && savedUser !== 'undefined') {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('refresh_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const authData: AuthResponse = await response.json();
      console.log('Login response:', authData);

      // Now we have user data from the backend response
      const userData: User = authData.user;

      setUser(userData);
      setToken(authData.accessToken);
      
      // Save to localStorage
      localStorage.setItem('auth_token', authData.accessToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      if(authData.refreshToken){
        localStorage.setItem('refresh_token', authData.refreshToken);
      }

      toast.success(`Welcome back, ${userData.firstName}!`);
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      // First create profile
      const profileResponse = await fetch(`${API_BASE_URL}/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      await profileResponse.json();

      // If role is doctor, create doctor profile
      if (data.role === 'doctor' && data.specialty && data.phoneNumber !== undefined && data.yearsOfExperience !== undefined) {
        const doctorResponse = await fetch(`${API_BASE_URL}/doctors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            specialty: data.specialty,
            yearsOfExperience: data.yearsOfExperience,
            password: data.password,
            status: true,
          }),
        });

        if (!doctorResponse.ok) {
          console.error('Failed to create doctor profile, but user profile created');
        }
      }

      toast.success('Registration successful! Please sign in.');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('refresh_token');
    toast.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
