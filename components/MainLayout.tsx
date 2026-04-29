'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useRole } from '@/lib/RoleContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, setRole } = useRole();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        role={user.role} 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={{ name: user.fullName, role: user.role }} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Role Switcher for Demo Purposes */}
            <div className="mb-6 p-3 md:p-4 bg-primary/5 border border-primary/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider whitespace-nowrap">Demo:</span>
                <div className="flex gap-1.5">
                  {(['CHURCH_GROUP', 'APPROVER_L1', 'APPROVER_L2', 'FINANCE', 'ADMIN'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`px-3 py-1.5 rounded-xl text-[9px] font-bold transition-all whitespace-nowrap ${
                        user.role === r
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'bg-white text-muted border border-border hover:border-primary/30 hover:text-primary'
                      }`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <p className="hidden md:block text-[10px] text-muted-foreground font-medium italic">
                Development switcher only.
              </p>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
