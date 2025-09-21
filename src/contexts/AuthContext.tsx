'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthResponse, AuthError } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  // Fetch current user on mount with retry logic and localStorage fallback
  useEffect(() => {
    const fetchUser = async (retryCount = 0) => {
      try {
        // Quick localStorage check first
        if (typeof window !== 'undefined' && retryCount === 0) {
          const storedUser = localStorage.getItem('user');
          const storedToken = localStorage.getItem('authToken');
          
          if (storedUser && storedToken) {
            try {
              const user = JSON.parse(storedUser);
              setUser(user);
              setLoading(false);
              console.log('Quick localStorage authentication success');
              return;
            } catch (e) {
              // Invalid stored data, clear it
              localStorage.removeItem('user');
              localStorage.removeItem('authToken');
              // Continue with server verification
            }
          }
        }

        // Try server verification with Bearer token from localStorage
        let response: Response | null = null;
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('authToken');
          if (storedToken) {
            response = await fetch('/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${storedToken}`,
              },
            });
          }
        }

        if (response && response.ok) {
          const data: AuthResponse = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            // Update localStorage with fresh user data
            if (typeof window !== 'undefined') {
              localStorage.setItem('user', JSON.stringify(data.user));
            }
            console.log('Server verification successful');
            return;
          }
        } else if (response && response.status === 401) {
          // Token expired or invalid, clear localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
          }
          setUser(null);
          console.log('Token expired, cleared localStorage');
          return;
        } else if (response && response.status >= 500 && retryCount < 2) {
          // Server error, retry up to 2 times
          setTimeout(() => fetchUser(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }

        // No token or verification failed
        setUser(null);
      } catch (error) {
        console.error('Error fetching user:', error);
        
        // Try localStorage fallback on network errors
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          const storedToken = localStorage.getItem('authToken');
          if (storedUser && storedToken) {
            try {
              const user = JSON.parse(storedUser);
              setUser(user);
              console.log('Using localStorage fallback due to network error');
            } catch (e) {
              localStorage.removeItem('user');
              localStorage.removeItem('authToken');
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
        
        // Retry on network errors
        if (retryCount < 2) {
          setTimeout(() => fetchUser(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }
      } finally {
        if (retryCount === 0) { // Only set loading false on first attempt
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, []);

  // Login function with enhanced error handling and localStorage fallback
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.user && data.token) {
        setUser(data.user);
        
        // Store token in localStorage as fallback for cookie issues
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function with enhanced validation
  const register = async (name: string, email: string, password: string, confirmPassword: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      // Client-side validation
      const errors: Record<string, string> = {};
      
      if (!name.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!email.trim()) {
        errors.email = 'Email is required';
      }
      
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      
      if (Object.keys(errors).length > 0) {
        return {
          success: false,
          message: 'Validation failed',
          errors
        };
      }
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          password, 
          confirmPassword 
        }),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function with localStorage-based cleanup
  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      // Call logout API with Bearer token
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if server request fails
    } finally {
      setUser(null);
      setLoading(false);
      
      // Clear localStorage data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
      }
    }
  };

  // Refresh user data using localStorage token
  const refreshUser = async () => {
    try {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data: AuthResponse = await response.json();
            if (data.success && data.user) {
              setUser(data.user);
              localStorage.setItem('user', JSON.stringify(data.user));
            }
          } else if (response.status === 401) {
            // Token expired, clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
