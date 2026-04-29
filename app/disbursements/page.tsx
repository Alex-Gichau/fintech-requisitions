'use client';

import React from 'react';
import { 
  Wallet, 
  Search, 
  ArrowRightCircle, 
  CheckCircle2, 
  History,
  Download,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { useRequisitions } from '@/lib/RequisitionContext';
import { useRole } from '@/lib/RoleContext';
import { cn } from '@/lib/utils';

export default function DisbursementsPage() {
  const { user } = useRole();
  const { requisitions, updateStatus } = useRequisitions();
  
  const stats = React.useMemo(() => {
    const ready = requisitions.filter(r => r.status === 'APPROVED');
    const disbursed = requisitions.filter(r => r.status === 'DISBURSED');
    const pending = requisitions.filter(r => r.status.startsWith('PENDING'));
    
    return {
      readyAmount: ready.reduce((sum, r) => sum + r.amount, 0),
      readyCount: ready.length,
      disbursedAmount: disbursed.reduce((sum, r) => sum + r.amount, 0),
      disbursedCount: disbursed.length,
      pendingCount: pending.length,
      pendingAmount: pending.reduce((sum, r) => sum + r.amount, 0),
    };
  }, [requisitions]);

  const isFinance = ['FINANCE', 'ADMIN'].includes(user.role);

  if (!isFinance) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Finance Only</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          This section is restricted to the finance team. Please contact the administrator for access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Disbursements</h2>
          <p className="text-muted-foreground mt-1 font-medium">Process approved requisitions and manage payouts.</p>
        </div>
        <button className="bg-white border border-border text-foreground px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-accent transition-all">
          <Download className="w-4 h-4" />
          Financial Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Ready for Payout</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">Ksh {stats.readyAmount.toLocaleString()}</h3>
          <p className="text-xs text-muted-foreground mt-2 font-medium">{stats.readyCount} approved requisitions</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Total Disbursed</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">Ksh {stats.disbursedAmount.toLocaleString()}</h3>
          <p className="text-xs text-muted-foreground mt-2 font-medium">{stats.disbursedCount} requisitions processed</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">In Approval Pipeline</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">Ksh {stats.pendingAmount.toLocaleString()}</h3>
          <p className="text-xs text-muted-foreground mt-2 font-medium">{stats.pendingCount} unapproved requisitions</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Financial Overview Queue</h3>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search requisitions..." 
                className="pl-9 pr-4 py-2 bg-accent/50 border border-border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-accent/50 text-[10px] font-bold text-muted uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requisitions.map((req) => (
                <tr key={req.id} className="hover:bg-accent/30 transition-colors group">
                  <td className="px-6 py-4 text-xs font-bold text-primary">{req.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-foreground">{req.title}</div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{req.requesterName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">Ksh {req.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-6 py-4">
                    {req.status === 'APPROVED' ? (
                      <button 
                        onClick={() => updateStatus(req.id, 'DISBURSED')}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                      >
                        Process Payout
                        <ArrowRightCircle className="w-4 h-4" />
                      </button>
                    ) : req.status === 'DISBURSED' ? (
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        Disbursed
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground font-bold text-[10px] uppercase tracking-wider italic">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Awaiting Approval
                      </div>
                    )}
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
