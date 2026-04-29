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
    <header className="h-16 md:h-20 border-b border-border bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-[180px] md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 md:pl-10 pr-4 py-1.5 md:py-2 bg-accent/30 border border-transparent rounded-xl text-xs md:text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-xs md:text-sm font-bold text-foreground leading-none">{user.name}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-1">
              {user.role.replace('_', ' ')}
            </p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
