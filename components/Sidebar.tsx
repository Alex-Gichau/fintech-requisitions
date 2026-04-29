'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Wallet, 
  Users, 
  Settings,
  LogOut,
  Church,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ role, isCollapsed, onToggle }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      href: '/',
      roles: ['CHURCH_GROUP', 'APPROVER_L1', 'APPROVER_L2', 'FINANCE', 'ADMIN'] 
    },
    { 
      label: 'My Requisitions', 
      icon: FileText, 
      href: '/requisitions',
      roles: ['CHURCH_GROUP'] 
    },
    { 
      label: 'Approvals', 
      icon: CheckSquare, 
      href: '/approvals',
      roles: ['APPROVER_L1', 'APPROVER_L2', 'ADMIN'] 
    },
    { 
      label: 'Disbursements', 
      icon: Wallet, 
      href: '/disbursements',
      roles: ['FINANCE', 'ADMIN'] 
    },
    { 
      label: 'Users', 
      icon: Users, 
      href: '/users',
      roles: ['ADMIN'] 
    },
    { 
      label: 'Reports', 
      icon: TrendingUp, 
      href: '/reports',
      roles: ['FINANCE', 'ADMIN'] 
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      href: '/settings',
      roles: ['CHURCH_GROUP', 'APPROVER_L1', 'APPROVER_L2', 'FINANCE', 'ADMIN'] 
    },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:flex flex-col h-full bg-card border-r border-border shadow-sm transition-all duration-300 relative",
        isCollapsed ? "w-20" : "w-64"
      )}>
        {/* Toggle Button */}
        <button 
          onClick={onToggle}
          className="absolute -right-3 top-20 bg-white border border-border rounded-full p-1 shadow-sm text-muted hover:text-primary transition-all z-20"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={cn("p-6 flex items-center gap-3 overflow-hidden transition-all duration-300", isCollapsed ? "justify-center" : "")}>
          <div className="bg-primary p-2 rounded-xl shrink-0">
            <Church className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in duration-500">
              <h1 className="font-bold text-lg text-primary tracking-tight whitespace-nowrap">St Andrews</h1>
              <p className="text-xs text-muted font-medium whitespace-nowrap">Requisition System</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                pathname === item.href
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-muted hover:bg-accent hover:text-foreground",
                isCollapsed ? "justify-center" : ""
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0",
                pathname === item.href ? "text-white" : "text-muted group-hover:text-primary"
              )} />
              {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto overflow-hidden">
          <button className={cn(
            "flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-200",
            isCollapsed ? "justify-center" : ""
          )}>
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="animate-in fade-in duration-300">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Floating Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <div className="bg-white/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-2 flex items-center justify-between">
          {filteredItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 relative min-w-[56px]",
                pathname === item.href
                  ? "text-primary bg-primary/5"
                  : "text-muted hover:text-foreground"
              )}
            >
              {pathname === item.href && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full animate-bounce" />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-transform",
                pathname === item.href ? "scale-110" : ""
              )} />
              <span className="text-[10px] font-bold uppercase tracking-tighter truncate w-full text-center">
                {item.label === 'Dashboard' ? 'Home' : item.label.split(' ')[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
