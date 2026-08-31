import React, { createContext, useContext, useState, useEffect } from 'react';
import type { StakeholderRole, UserAuthSession } from '../types/auth';
import { DEMO_USERS } from '../data/dashboardMockData';

interface AuthContextType {
  user: UserAuthSession | null;
  role: StakeholderRole;
  login: (role: StakeholderRole, officialId?: string) => void;
  logout: () => void;
  switchDemoRole: (role: StakeholderRole) => void;
  isAuthenticated: boolean;
  canAccessRoute: (requiredRole: StakeholderRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAuthSession | null>(() => {
    try {
      const saved = localStorage.getItem('mplads_auth_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load session', e);
    }
    // Default demo session: MP
    return DEMO_USERS['mp'];
  });

  const activeRole: StakeholderRole = user?.role || 'mp';

  useEffect(() => {
    if (user) {
      localStorage.setItem('mplads_auth_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('mplads_auth_session');
    }
  }, [user]);

  const login = (role: StakeholderRole, officialId?: string) => {
    const baseUser = DEMO_USERS[role];
    const sessionUser: UserAuthSession = {
      ...baseUser,
      officialId: officialId || baseUser.officialId,
      authenticatedAt: new Date().toISOString()
    };
    setUser(sessionUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (role: StakeholderRole) => {
    const newSession = DEMO_USERS[role];
    setUser({
      ...newSession,
      authenticatedAt: new Date().toISOString()
    });
  };

  const canAccessRoute = (requiredRole: StakeholderRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: activeRole,
        login,
        logout,
        switchDemoRole,
        isAuthenticated: !!user,
        canAccessRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
