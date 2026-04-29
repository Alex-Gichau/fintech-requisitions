'use client';

import React from 'react';
import { RequisitionStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: RequisitionStatus;
  className?: string;
}

const statusConfig: Record<RequisitionStatus, { label: string; classes: string }> = {
  DRAFT: { label: 'Draft', classes: 'bg-slate-100 text-slate-700 border-slate-200' },
  SUBMITTED: { label: 'Submitted', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  PENDING_L1: { label: 'Pending L1', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  PENDING_L2: { label: 'Pending L2', classes: 'bg-orange-50 text-orange-700 border-orange-200' },
  APPROVED: { label: 'Approved', classes: 'bg-green-50 text-green-700 border-green-200' },
  REJECTED: { label: 'Rejected', classes: 'bg-red-50 text-red-700 border-red-200' },
  DISBURSED: { label: 'Disbursed', classes: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
      config.classes,
      className
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
