'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { UserRole } from '@/types';

interface HeaderProps {
  user: {
    name: string;
    role: UserRole;
  };
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-white flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search requisitions..."
            className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-muted hover:text-primary hover:bg-accent rounded-full transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground leading-none">{user.name}</p>
            <p className="text-[11px] font-bold text-muted uppercase tracking-wider mt-1">
              {user.role.replace('_', ' ')}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white shadow-md shadow-primary/20">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
