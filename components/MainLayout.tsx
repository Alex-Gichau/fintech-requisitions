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
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Role Switcher for Demo Purposes */}
            <div className="mb-6 p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Demo Mode:</span>
                <div className="flex gap-2">
                  {(['CHURCH_GROUP', 'APPROVER_L1', 'APPROVER_L2', 'FINANCE', 'ADMIN'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        user.role === r
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white text-muted border border-border hover:border-primary/30 hover:text-primary'
                      }`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium italic">
                Note: This switcher is for development/demonstration purposes only.
              </p>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
