'use client';

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Search, 
  CheckCircle, 
  XCircle, 
  Eye,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { useRequisitions } from '@/lib/RequisitionContext';
import { useRole } from '@/lib/RoleContext';
import { cn } from '@/lib/utils';
import ApprovalModal from '@/components/ApprovalModal';
import RequisitionDetailModal from '@/components/RequisitionDetailModal';
import { Requisition } from '@/types';

export default function ApprovalsPage() {
  const { user } = useRole();
  const { requisitions, updateStatus } = useRequisitions();
  const [selectedReq, setSelectedReq] = useState<Requisition | null>(null);
  const [actionType, setActionType] = useState<'APPROVE' | 'REJECT'>('APPROVE');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const pendingRequisitions = requisitions.filter(req => 
    req.status === 'PENDING_L1' || req.status === 'PENDING_L2'
  );

  const handleApproveClick = (req: Requisition) => {
    setActionType('APPROVE');
    setSelectedReq(req);
  };

  const handleRejectClick = (req: Requisition) => {
    setActionType('REJECT');
    setSelectedReq(req);
  };

  const handleViewDetails = (req: Requisition) => {
    setSelectedReq(req);
    setIsDetailModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (selectedReq) {
      if (actionType === 'APPROVE') {
        const nextStatus = selectedReq.status === 'PENDING_L1' ? 'PENDING_L2' : 'APPROVED';
        updateStatus(selectedReq.id, nextStatus);
      } else {
        updateStatus(selectedReq.id, 'REJECTED');
      }
    }
  };

  const canApprove = ['APPROVER_L1', 'APPROVER_L2', 'ADMIN'].includes(user.role);

  if (!canApprove) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Access Denied</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          You do not have the required permissions to access the approvals module. 
          Please contact the administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Pending Approvals</h2>
        <p className="text-muted-foreground mt-1 font-medium">Review and take action on requisitions awaiting your approval.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pendingRequisitions.map((req) => (
          <div key={req.id} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden hover:border-primary/30 transition-all group">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/5 p-2 rounded-xl">
                    <CheckSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">{req.id}</h4>
                    <h3 className="text-lg font-bold text-foreground line-clamp-1">{req.title}</h3>
                  </div>
                </div>
                <StatusBadge status={req.status} />
              </div>

              <div className="p-4 bg-accent/30 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-bold uppercase tracking-wider">Amount Requested</span>
                  <span className="text-lg font-bold text-foreground">Ksh {req.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-bold uppercase tracking-wider">Requester</span>
                  <span className="text-foreground font-semibold">{req.requesterName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-bold uppercase tracking-wider">Submitted On</span>
                  <span className="text-foreground font-semibold">{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground font-medium line-clamp-2 leading-relaxed italic">
                  "{req.description}"
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => handleApproveClick(req)}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/10"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button 
                  onClick={() => handleRejectClick(req)}
                  className="flex-1 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button 
                  onClick={() => handleViewDetails(req)}
                  className="p-2.5 bg-accent/50 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendingRequisitions.length === 0 && (
          <div className="lg:col-span-2 py-20 bg-card border border-border border-dashed rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="bg-green-50 p-4 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground">All caught up!</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              There are no requisitions currently awaiting your approval. Great job!
            </p>
          </div>
        )}
      </div>

      <ApprovalModal 
        isOpen={!!selectedReq && !isDetailModalOpen}
        onClose={() => setSelectedReq(null)}
        onConfirm={handleConfirmAction}
        requisitionTitle={selectedReq?.title || ''}
        amount={selectedReq?.amount || 0}
        actionType={actionType}
      />

      <RequisitionDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedReq(null);
        }}
        requisition={selectedReq}
      />
    </div>
  );
}
