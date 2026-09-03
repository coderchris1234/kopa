import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

/**
 * Auth provider component
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('kopa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      name: 'Christobel Nwachukwu',
      email,
      username: 'christobel',
      profileImage: null,
      bio: 'Founder, builder, and creator sharing ideas and building products for Africa.'
    };
    
    localStorage.setItem('kopa_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const signup = async (name, email, password) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      name,
      email,
      username: name.toLowerCase().replace(/\s+/g, ''),
      profileImage: null,
      bio: ''
    };
    
    localStorage.setItem('kopa_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('kopa_user');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('kopa_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
