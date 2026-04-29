'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  ArrowUpRight,
  MoreVertical,
  Download,
  Activity,
  FileText,
  X
} from 'lucide-react';
import { useRole } from '@/lib/RoleContext';
import StatusBadge from '@/components/StatusBadge';
import { useRequisitions } from '@/lib/RequisitionContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Requisition } from '@/types';
import RequisitionDetailModal from '@/components/RequisitionDetailModal';

export default function RequisitionsPage() {
  const { user } = useRole();
  const { requisitions } = useRequisitions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReq, setSelectedReq] = useState<Requisition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (req: Requisition) => {
    setSelectedReq(req);
    setIsModalOpen(true);
  };

  // Filter based on role
  const roleFilteredRequisitions = React.useMemo(() => {
    if (user.role === 'CHURCH_GROUP') {
      return requisitions.filter(req => req.requesterId === user.id);
    }
    return requisitions;
  }, [requisitions, user.id, user.role]);

  const filteredRequisitions = roleFilteredRequisitions.filter(req => 
    req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.requesterName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Requisitions</h2>
          <p className="text-muted-foreground mt-1 font-medium">Manage and track all project funding requests.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border text-foreground px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-accent transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <Link 
            href="/requisitions/new"
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <PlusCircle className="w-4 h-4" />
            New Requisition
          </Link>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-accent/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by ID, title, or group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <select className="flex-1 sm:flex-none px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold text-muted-foreground focus:outline-none focus:border-primary/30 transition-all">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Disbursed</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-accent/50 text-[10px] font-bold text-muted uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Project Title</th>
                <th className="px-6 py-4">Group</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRequisitions.map((req) => (
                <tr 
                  key={req.id} 
                  onClick={() => handleViewDetails(req)}
                  className={cn(
                    "hover:bg-accent/30 transition-colors group cursor-pointer",
                    selectedReq?.id === req.id ? "bg-primary/5 border-l-4 border-l-primary" : ""
                  )}
                >
                  <td className="px-6 py-4 text-xs font-bold text-primary">{req.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-foreground">{req.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-medium">{req.requesterName}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">Ksh {req.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground font-medium">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border bg-accent/10 flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">
            Showing <span className="font-bold text-foreground">{filteredRequisitions.length}</span> of <span className="font-bold text-foreground">{roleFilteredRequisitions.length}</span> requisitions
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-bold text-muted-foreground opacity-50 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-bold text-muted-foreground opacity-50 cursor-not-allowed">
              Next
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
