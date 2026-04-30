'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Shield, Building2, Mail, User, Key, Edit3, Lock } from 'lucide-react';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: any) => void;
  initialData?: any;
}

const ROLES: { value: UserRole; label: string }[] = [
  { value: 'CHURCH_GROUP', label: 'Church Group' },
  { value: 'APPROVER_L1', label: 'L1 Approver' },
  { value: 'APPROVER_L2', label: 'L2 Approver' },
  { value: 'FINANCE', label: 'Finance Team' },
  { value: 'ADMIN', label: 'Administrator' },
];

const MINISTRIES = [
  'Youth Ministry',
  'Elders Board',
  'Worship Team',
  'Outreach & Missions',
  'Sunday School',
  'Men\'s Fellowship',
  'Women\'s Guild',
  'Finance Department',
  'District 1',
  'District 2',
  'District 3',
];

export default function AddUserModal({ isOpen, onClose, onAdd, initialData }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'CHURCH_GROUP' as UserRole,
    group: MINISTRIES[0],
    authCode: '',
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || initialData.name || '',
        email: initialData.email,
        role: initialData.role,
        group: initialData.group,
        authCode: '', // Always reset for edit/add for security
      });
    } else {
      setFormData({ fullName: '', email: '', role: 'CHURCH_GROUP', group: MINISTRIES[0], authCode: '' });
    }
  }, [initialData, isOpen]);

  // Generate a random system code for approvers
  const generatedCode = React.useMemo(() => {
    if (initialData?.systemCode) return initialData.systemCode;
    if (!formData.role.startsWith('APPROVER')) return null;
    const prefix = formData.role === 'APPROVER_L1' ? 'L1' : 'L2';
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SA-${prefix}-${rand}`;
  }, [formData.role, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...initialData,
      ...formData,
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      systemCode: generatedCode,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-border"
          >
            <div className="p-6 border-b border-border bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-primary/10">
                  {initialData ? <Edit3 className="w-5 h-5 text-primary" /> : <UserPlus className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-none">
                    {initialData ? 'Edit System User' : 'Add New System User'}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-wider">
                    {initialData ? 'Update Permissions' : 'Onboarding & Permissions'}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-primary/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-accent/30 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                    placeholder="Enter user's full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-accent/30 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                    placeholder="name@standrews.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Shield className="w-3 h-3" /> Assigned Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                      className="w-full px-4 py-3 bg-accent/30 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                    >
                      {ROLES.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Ministry/District */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Building2 className="w-3 h-3" /> Ministry/District
                    </label>
                    <select
                      value={formData.group}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      className="w-full px-4 py-3 bg-accent/30 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                    >
                      {MINISTRIES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Approver System Code (Conditional) */}
                {generatedCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-2">
                        <Key className="w-3 h-3" /> System Assigned Code
                      </span>
                      <span className="text-sm font-black text-amber-900 font-mono tracking-tighter">
                        {generatedCode}
                      </span>
                    </div>
                    <p className="text-[9px] text-amber-600 font-medium">
                      This unique code will be required for all final approval signatures by this user.
                    </p>
                  </motion.div>
                )}

                {/* Auth Approval Code */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-3 h-3 text-red-500" /> Admin Approval Code
                  </label>
                  <input
                    required
                    type="password"
                    value={formData.authCode}
                    onChange={(e) => setFormData({ ...formData, authCode: e.target.value })}
                    className="w-full px-4 py-3 bg-red-50/30 border border-red-100/50 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-red-300 focus:ring-4 focus:ring-red-500/5 transition-all font-mono"
                    placeholder="••••••••"
                  />
                  <p className="text-[9px] text-muted-foreground italic">
                    Required to authorize this administrative action.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-accent text-muted-foreground rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  {initialData ? <Edit3 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {initialData ? 'Save Changes' : 'Create User Account'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
