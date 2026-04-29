'use client';

import React from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Shield, 
  MoreVertical,
  Mail,
  UserCircle,
  Key,
  ShieldCheck,
  Building2,
  Edit3,
  Trash2
} from 'lucide-react';
import { useRole } from '@/lib/RoleContext';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import AddUserModal from '@/components/AddUserModal';

export default function UsersPage() {
  const { user } = useRole();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [users, setUsers] = React.useState([
    { id: '1', name: 'Alex Gichau', email: 'alex@standrews.com', role: 'ADMIN' as UserRole, group: 'System', systemCode: null },
    { id: '2', name: 'John Doe', email: 'john@standrews.com', role: 'CHURCH_GROUP' as UserRole, group: 'Youth Ministry', systemCode: null },
    { id: '3', name: 'Jane Smith', email: 'jane@standrews.com', role: 'APPROVER_L1' as UserRole, group: 'Elders Board', systemCode: 'SA-L1-4921' },
    { id: '4', name: 'Robert Finance', email: 'robert@standrews.com', role: 'FINANCE' as UserRole, group: 'Finance Dept', systemCode: null },
    { id: '5', name: 'Mary Worship', email: 'mary@standrews.com', role: 'CHURCH_GROUP' as UserRole, group: 'Worship Team', systemCode: null },
    { id: '6', name: 'David District', email: 'david@standrews.com', role: 'APPROVER_L2' as UserRole, group: 'District 1', systemCode: 'SA-L2-8832' },
  ]);
  
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  
  const userStats = [
    { title: 'Total Users', value: users.length.toString(), icon: Users, description: 'Active system users' },
    { title: 'Administrators', value: users.filter(u => u.role === 'ADMIN').length.toString(), icon: Shield, description: 'Security oversight' },
    { title: 'Approvers', value: users.filter(u => u.role.startsWith('APPROVER')).length.toString(), icon: Key, description: 'Signatories' },
    { title: 'Ministry Groups', value: '12', icon: UserCircle, description: 'Verified entities' },
  ];

  const approvers = users.filter(u => u.role.startsWith('APPROVER'));

  const handleSaveUser = (userData: any) => {
    const exists = users.find(u => u.id === userData.id);
    if (exists) {
      setUsers(users.map(u => u.id === userData.id ? userData : u));
    } else {
      setUsers([...users, userData]);
    }
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to remove this user from the system?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEditClick = (u: any) => {
    setSelectedUser(u);
    setIsModalOpen(true);
  };

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
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">User Management</h2>
          <p className="text-muted-foreground mt-1 font-medium text-sm">Manage system users, roles, and administrative rights.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all w-fit"
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {userStats.map((stat, i) => (
          <div key={i} className="p-4 md:p-6 bg-card border border-border rounded-2xl shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-muted uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-xl md:text-2xl font-black text-foreground mt-1">{stat.value}</h3>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1.5 font-medium">{stat.description}</p>
              </div>
              <div className="bg-primary/5 p-2 rounded-xl">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-accent/20 flex items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-accent/50 text-[10px] font-bold text-muted uppercase tracking-wider">
                <th className="px-4 py-3 md:px-6 md:py-4">User</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Role</th>
                <th className="px-6 py-4 hidden md:table-cell">Group/Department</th>
                <th className="px-6 py-4 hidden sm:table-cell">Email</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-accent/30 transition-colors group">
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/5">
                        <UserCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-bold text-foreground">{u.name}</div>
                        <div className="text-[9px] md:hidden text-muted-foreground font-medium">{u.group}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap",
                      u.role === 'ADMIN' ? "bg-red-50 text-red-700 border-red-100" :
                      u.role === 'FINANCE' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      u.role.startsWith('APPROVER') ? "bg-amber-50 text-amber-700 border-amber-100" :
                      "bg-blue-50 text-blue-700 border-blue-100"
                    )}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm font-medium text-muted-foreground hidden md:table-cell">{u.group}</td>
                  <td className="px-6 py-4 text-xs md:text-sm text-foreground hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground/60" />
                      {u.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleEditClick(u)}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approver Directory Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Approver Directory</h3>
            <p className="text-xs text-muted-foreground font-medium">Manage system-assigned security codes for signatories.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvers.map((app) => (
            <div key={app.id} className="p-5 bg-white border border-border rounded-2xl shadow-sm hover:border-amber-200 transition-all group relative">
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={() => handleEditClick(app)}
                  className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDeleteUser(app.id)}
                  className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-amber-600 group-hover:bg-amber-50 transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{app.name}</h4>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{app.role.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">{app.group}</span>
                </div>
                <div className="px-2 py-1 bg-slate-100 rounded text-[9px] font-black text-slate-500 font-mono">
                  {app.systemCode}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }} 
        onAdd={handleSaveUser}
        initialData={selectedUser}
      />
    </div>
  );
}
