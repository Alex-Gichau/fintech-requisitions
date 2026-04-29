'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Paperclip,
  X,
  AlertCircle,
  Church,
  Calculator
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRequisitions } from '@/lib/RequisitionContext';

export default function NewRequisitionPage() {
  const router = useRouter();
  const { addRequisition } = useRequisitions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: 'General',
    expectedDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and add to context
    setTimeout(() => {
      addRequisition({
        title: formData.title,
        description: formData.description,
        amount: parseFloat(formData.amount),
        status: 'PENDING_L1', // Default status for new requests
      });
      setIsSubmitting(false);
      router.push('/requisitions');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link 
          href="/requisitions"
          className="p-2 hover:bg-accent rounded-full transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">New Funding Request</h2>
          <p className="text-muted-foreground text-sm font-medium">Fill in the details below to submit a new requisition for approval.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Project Basics */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Church className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted">Project Information</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Project Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Annual Youth Camp 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-accent/30 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Detailed Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what the funds will be used for and why they are needed..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-accent/30 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Financials */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted">Financial Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Requested Amount (Ksh)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">Ksh</span>
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full pl-14 pr-4 py-3 bg-accent/30 border border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Expected Disbursement Date</label>
                <input
                  required
                  type="date"
                  value={formData.expectedDate}
                  onChange={(e) => setFormData({...formData, expectedDate: e.target.value})}
                  className="w-full px-4 py-3 bg-accent/30 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-foreground ml-1 block">Supporting Documents (Optional)</label>
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-pointer">
              <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <Paperclip className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-bold text-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG or XLSX (max 10MB)</p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              Ensure all details are accurate. Once submitted, the requisition will go through the multilevel approval process. You can track its status in the dashboard.
            </p>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-white border border-border rounded-xl text-sm font-bold text-foreground hover:bg-accent transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit for Approval
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
