import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Check if user exists in localStorage (from previous signup)
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = storedUsers.find(user => user.email === email);
      
      if (!existingUser) {
        throw new Error('No account found with this email address');
      }
      
      if (existingUser.password !== password) {
        throw new Error('Invalid password');
      }
      
      // Create user data for login (without password)
      const userData = {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        firmName: existingUser.firmName,
        position: existingUser.position,
        state: existingUser.state,
        phone: existingUser.phone,
        joinDate: existingUser.joinDate,
        subscription: existingUser.subscription,
        trialEnds: existingUser.trialEnds,
      };

      const token = 'demo-token-' + Date.now();

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Basic validation
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }
      
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = storedUsers.find(user => user.email === userData.email);
      
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }
      
      // For demo purposes, we'll simulate a successful signup
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        joinDate: new Date().toISOString(),
        subscription: 'Trial',
        trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      };

      // Store user credentials for future login validation
      storedUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));

      // For signup, we'll just return success without auto-login
      // User will need to login separately
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
