'use client';

import React from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Shield, 
  MoreVertical,
  Mail,
  UserCircle
} from 'lucide-react';
import { useRole } from '@/lib/RoleContext';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';

export default function UsersPage() {
  const { user } = useRole();
  
  const mockUsers = [
    { id: '1', name: 'Alex Gichau', email: 'alex@standrews.com', role: 'ADMIN' as UserRole, group: 'System' },
    { id: '2', name: 'John Doe', email: 'john@standrews.com', role: 'CHURCH_GROUP' as UserRole, group: 'Youth Ministry' },
    { id: '3', name: 'Jane Smith', email: 'jane@standrews.com', role: 'APPROVER_L1' as UserRole, group: 'Elders Board' },
    { id: '4', name: 'Robert Finance', email: 'robert@standrews.com', role: 'FINANCE' as UserRole, group: 'Finance Dept' },
    { id: '5', name: 'Mary Worship', email: 'mary@standrews.com', role: 'CHURCH_GROUP' as UserRole, group: 'Worship Team' },
  ];

  if (user.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <Shield className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Admin Access Required</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          You do not have administrative privileges to access user management.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">User Management</h2>
          <p className="text-muted-foreground mt-1 font-medium">Manage system users, roles, and administrative rights.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-accent/20 flex items-center justify-between">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-accent/50 text-[10px] font-bold text-muted uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Group/Department</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-accent/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserCircle className="w-5 h-5" />
                      </div>
                      <div className="text-sm font-bold text-foreground">{u.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                      u.role === 'ADMIN' ? "bg-red-50 text-red-700 border-red-100" :
                      u.role === 'FINANCE' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      "bg-blue-50 text-blue-700 border-blue-100"
                    )}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{u.group}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-muted" />
                      {u.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
