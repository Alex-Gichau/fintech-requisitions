'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  PlusCircle,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { useRequisitions } from '@/lib/RequisitionContext';
import { useRole } from '@/lib/RoleContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import RequisitionDetailModal from '@/components/RequisitionDetailModal';
import { Requisition } from '@/types';

export default function Dashboard() {
  const { user } = useRole();
  const { requisitions, getBudgetForGroup, budgets } = useRequisitions();
  const [selectedReq, setSelectedReq] = useState<Requisition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (req: Requisition) => {
    setSelectedReq(req);
    setIsModalOpen(true);
  };

  // Mini trend data
  const miniTrendData = [
    { day: 'Mon', val: 40000 },
    { day: 'Tue', val: 30000 },
    { day: 'Wed', val: 90000 },
    { day: 'Thu', val: 45000 },
    { day: 'Fri', val: 120000 },
    { day: 'Sat', val: 20000 },
    { day: 'Sun', val: 10000 },
  ];

  // Filter requisitions based on role
  const displayedRequisitions = React.useMemo(() => {
    if (user.role === 'CHURCH_GROUP') {
      return requisitions.filter(req => req.requesterId === user.id);
    }
    return requisitions;
  }, [requisitions, user.id, user.role]);

  // Stats logic based on displayed data
  const pendingCount = displayedRequisitions.filter(r => r.status.startsWith('PENDING')).length;
  const approvedCount = displayedRequisitions.filter(r => r.status === 'APPROVED').length;
  const totalAmount = displayedRequisitions
    .filter(r => r.status === 'DISBURSED' || r.status === 'APPROVED')
    .reduce((sum, r) => sum + r.amount, 0);

  const stats = [
    { title: 'Total Requisitions', value: displayedRequisitions.length.toString(), icon: FileText, description: 'Submitted this year' },
    { title: 'Pending Approval', value: pendingCount.toString(), icon: Clock, description: 'Awaiting review' },
    { title: 'Approved', value: approvedCount.toString(), icon: CheckCircle, description: 'Ready for disbursement' },
    { title: 'Total Funded', value: `Ksh ${(totalAmount / 1000).toFixed(1)}K`, icon: TrendingUp, trend: { value: 12, isUp: true } },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Overview</h2>
          <p className="hidden md:block text-muted-foreground mt-1 font-medium text-sm">Welcome back, {user.fullName}. Here's what's happening with your requisitions.</p>
        </div>
        <Link 
          href="/requisitions/new"
          className="bg-primary text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <PlusCircle className="w-4 h-4" />
          New
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Budget Tracking Section */}
      <div className="bg-card border border-border rounded-2xl shadow-sm p-5 md:p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Budget Tracking</h3>
              <p className="text-xs text-muted-foreground font-medium">Real-time visualization of spent vs allocated funds.</p>
            </div>
          </div>
          <div className="px-3 py-1.5 bg-accent/50 rounded-lg text-[10px] font-bold text-muted uppercase tracking-wider border border-border/50">
            FY 2026 Allocation
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.role === 'CHURCH_GROUP' || user.group ? (() => {
            const groupName = user.group || 'Youth Ministry';
            const { allocated, spent, remaining } = getBudgetForGroup(groupName);
            const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;
            
            return (
              <div className="lg:col-span-3 p-5 bg-accent/20 rounded-2xl border border-border/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-border">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{groupName} Budget</h4>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Approved Deductions Active</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-foreground">Ksh {remaining.toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-muted uppercase">Remaining</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Spent: Ksh {spent.toLocaleString()}</span>
                    <span className="text-primary">Allocated: Ksh {allocated.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden border border-border shadow-inner">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000 ease-out rounded-full",
                        percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-primary"
                      )}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })() : (
            <>
              {(user.role === 'ADMIN' || user.role === 'FINANCE' ? budgets : budgets.slice(0, 3)).map(b => {
                const group = b.group;
                const { allocated, spent, remaining } = getBudgetForGroup(group);
                const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;
                return (
                  <div key={group} className="p-4 bg-white border border-border/60 rounded-xl shadow-sm hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-foreground">{group}</span>
                      <span className={cn(
                        "text-[10px] font-bold",
                        percentage > 90 ? "text-red-500" : percentage > 70 ? "text-amber-500" : "text-primary"
                      )}>
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-accent/50 rounded-full overflow-hidden mb-3">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-primary"
                        )} 
                        style={{ width: `${Math.min(percentage, 100)}%` }} 
                      />
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[9px] font-bold text-muted uppercase">Remaining</div>
                        <div className="text-sm font-black text-foreground">Ksh {(remaining/1000).toFixed(0)}k</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-bold text-muted uppercase">Allocated</div>
                        <div className="text-[10px] font-medium text-muted-foreground">Ksh {(allocated/1000).toFixed(0)}k</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Recent Requisitions */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-base md:text-lg">Recent Requisitions</h3>
            <Link href="/requisitions" className="text-primary text-[10px] md:text-xs font-bold flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-accent/50 text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-4 py-3 md:px-6 md:py-3">ID</th>
                  <th className="px-4 py-3 md:px-6 md:py-3">Title</th>
                  <th className="px-4 py-3 md:px-6 md:py-3 hidden sm:table-cell">Group</th>
                  <th className="px-4 py-3 md:px-6 md:py-3">Amount</th>
                  <th className="px-4 py-3 md:px-6 md:py-3">Status</th>
                  <th className="px-6 py-3 hidden md:table-cell">Date</th>
                  <th className="px-4 py-3 md:px-6 md:py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayedRequisitions.slice(0, 5).map((req) => (
                  <tr 
                    key={req.id} 
                    onClick={() => handleViewDetails(req)}
                    className="hover:bg-accent/30 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-primary">{req.id}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{req.title}</div>
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-xs text-muted-foreground font-medium hidden sm:table-cell">{req.requesterName}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-bold text-foreground">
                      Ksh {req.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground font-medium hidden md:table-cell">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-right">
                      <button className="p-1.5 md:p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm flex flex-col">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="font-bold text-base md:text-lg">Weekly Volume</h3>
            <p className="text-[10px] md:text-xs text-muted-foreground font-medium mt-1">Activity trend</p>
          </div>
          <div className="h-40 w-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miniTrendData}>
                <Area type="monotone" dataKey="val" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.1} strokeWidth={2} />
                <Tooltip 
                  contentStyle={{ display: 'none' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="p-6 pt-0 space-y-6">
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs font-bold text-foreground">Top Group</span>
              <span className="text-xs font-bold text-primary">Youth Ministry</span>
            </div>
            {[
              { title: 'Requisition Approved', desc: 'Youth Camp 2026 was approved by Admin', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
              { title: 'New Comment', desc: 'Finance added a comment to Sound System', time: '5 hours ago', icon: FileText, color: 'text-blue-600 bg-blue-50' },
              { title: 'Funds Disbursed', desc: 'Ksh 75,000 sent to Outreach Group', time: '1 day ago', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
              { title: 'Requisition Rejected', desc: 'Bible Study Materials was rejected', time: '2 days ago', icon: XCircle, color: 'text-red-600 bg-red-50' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={cn("p-2 rounded-lg shrink-0", activity.color)}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-none">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{activity.desc}</p>
                  <span className="text-[10px] font-medium text-muted mt-2 block italic">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto p-6 pt-0">
            <button className="w-full py-2.5 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:bg-accent hover:text-foreground transition-all">
              View All Notifications
            </button>
          </div>
        </div>
      </div>

      <RequisitionDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        requisition={selectedReq}
      />
    </div>
  );
}
