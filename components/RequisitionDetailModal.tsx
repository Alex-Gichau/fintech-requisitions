'use client';

import React from 'react';
import { 
  X, 
  FileText, 
  Activity, 
  Calendar, 
  User, 
  DollarSign,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Requisition } from '@/types';
import StatusBadge from './StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

interface RequisitionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  requisition: Requisition | null;
}

const RequisitionDetailModal = ({ isOpen, onClose, requisition }: RequisitionDetailModalProps) => {
  if (!requisition) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-border"
          >
            {/* Header */}
            <div className="p-6 border-b border-border bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">{requisition.id}</span>
                    <StatusBadge status={requisition.status} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mt-1">{requisition.title}</h3>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-red-50 hover:text-red-500 text-muted-foreground rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6">
                  {/* Description Section */}
                  <div>
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4 text-primary" />
                      Project Description
                    </h4>
                    <div className="text-foreground leading-relaxed font-medium bg-accent/30 p-6 rounded-[1.5rem] border border-border text-base italic">
                      "{requisition.description}"
                    </div>
                  </div>

                  {/* Financial Breakdown Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-primary/5 rounded-[1.5rem] border border-primary/10 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-xl text-primary shadow-sm">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Amount</span>
                      </div>
                      <div className="text-2xl font-black text-primary">
                        Ksh {requisition.amount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-border shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-xl text-slate-600 shadow-sm">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Submitted</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {new Date(requisition.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                  {/* Group Profile */}
                  <div className="p-6 bg-accent/20 rounded-[1.5rem] border border-border">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
                      <User className="w-3 h-3" />
                      Ministry
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20">
                        {requisition.requesterName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-foreground leading-tight text-sm">{requisition.requesterName}</div>
                        <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Verified Group</div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Audit History */}
                  <div className="p-6 bg-white border border-border rounded-[1.5rem] shadow-sm">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                      Timeline
                    </h4>
                    <div className="space-y-6 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                      <div className="flex gap-3 items-start relative z-10">
                        <div className="w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-md flex items-center justify-center">
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-foreground uppercase tracking-wider">Submitted</div>
                          <div className="text-[9px] text-muted-foreground font-medium">{new Date(requisition.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      {requisition.status !== 'PENDING_L1' && (
                        <div className="flex gap-3 items-start relative z-10">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-4 border-white shadow-md flex items-center justify-center",
                            requisition.status === 'REJECTED' ? "bg-red-500" : "bg-blue-500"
                          )}>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-foreground uppercase tracking-wider">
                              {requisition.status === 'REJECTED' ? 'REJECTED' : 'L1 APPROVED'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 bg-slate-50 border-t border-border flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-white border border-border rounded-2xl font-bold text-sm text-foreground hover:bg-accent transition-all"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RequisitionDetailModal;
