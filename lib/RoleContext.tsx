'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface RoleContextType {
  user: User;
  setRole: (role: UserRole) => void;
}

const mockUser: User = {
  id: '1',
  email: 'admin@standrews.com',
  fullName: 'Alex Gichau',
  role: 'ADMIN',
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(mockUser);

  const setRole = (role: UserRole) => {
    setUser({ ...user, role });
  };

  return (
    <RoleContext.Provider value={{ user, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
