'use client';

import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, 
  Scan, 
  Keypad, 
  X, 
  ShieldCheck,
  ShieldAlert,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  requisitionTitle: string;
  amount: number;
  actionType: 'APPROVE' | 'REJECT';
}

const ApprovalModal = ({ isOpen, onClose, onConfirm, requisitionTitle, amount, actionType }: ApprovalModalProps) => {
  const [step, setStep] = useState<'CHOICE' | 'AUTHENTICATING' | 'SUCCESS'>('CHOICE');
  const [authMethod, setAuthMethod] = useState<'BIOMETRIC' | 'PIN' | null>(null);
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setStep('CHOICE');
      setAuthMethod(null);
      setPin('');
    }
  }, [isOpen]);

  const handleBiometric = () => {
    setAuthMethod('BIOMETRIC');
    setStep('AUTHENTICATING');
    // Simulate biometric scan
    setTimeout(() => {
      setStep('SUCCESS');
      setTimeout(() => {
        onConfirm();
        onClose();
      }, 1500);
    }, 2000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      setStep('AUTHENTICATING');
      setTimeout(() => {
        setStep('SUCCESS');
        setTimeout(() => {
          onConfirm();
          onClose();
        }, 1500);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-border"
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Secure {actionType === 'APPROVE' ? 'Approval' : 'Rejection'}</h3>
            </div>
            <button onClick={onClose} className="text-muted hover:text-foreground p-1 rounded-full hover:bg-accent transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8">
            {step === 'CHOICE' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">You are {actionType === 'APPROVE' ? 'approving' : 'rejecting'}:</p>
                  <h4 className="font-bold text-foreground text-lg">{requisitionTitle}</h4>
                  <div className="inline-block px-4 py-1 bg-primary/5 rounded-full text-primary font-bold text-lg">
                    Ksh {amount.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={handleBiometric}
                    className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-border rounded-2xl hover:border-primary hover:bg-primary/5 hover:scale-105 transition-all group"
                  >
                    <div className="p-3 bg-accent rounded-full text-muted group-hover:text-primary transition-colors">
                      <Fingerprint className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">Biometric</span>
                  </button>
                  <button 
                    onClick={() => setAuthMethod('PIN')}
                    className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-border rounded-2xl hover:border-primary hover:bg-primary/5 hover:scale-105 transition-all group"
                  >
                    <div className="p-3 bg-accent rounded-full text-muted group-hover:text-primary transition-colors">
                      <Scan className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">Face ID</span>
                  </button>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground font-bold tracking-widest">OR USE PIN</span>
                  </div>
                </div>

                <form onSubmit={handlePinSubmit} className="space-y-4">
                  <input 
                    type="password"
                    maxLength={4}
                    placeholder="Enter 4-digit PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-4 bg-accent/50 border border-border rounded-2xl text-center text-2xl font-bold tracking-[1em] focus:outline-none focus:border-primary transition-all"
                  />
                  <button 
                    disabled={pin.length !== 4}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 disabled:shadow-none transition-all"
                  >
                    Confirm with PIN
                  </button>
                </form>
              </div>
            )}

            {step === 'AUTHENTICATING' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {authMethod === 'BIOMETRIC' ? <Fingerprint className="w-6 h-6 text-primary/40" /> : <ShieldCheck className="w-6 h-6 text-primary/40" />}
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl text-foreground">Verifying Identity</h4>
                  <p className="text-sm text-muted-foreground mt-2">Please wait while we secure your signature...</p>
                </div>
              </div>
            )}

            {step === 'SUCCESS' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in zoom-in-95 duration-500">
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center shadow-lg",
                  actionType === 'APPROVE' ? "bg-green-100 text-green-600 shadow-green-100/50" : "bg-red-100 text-red-600 shadow-red-100/50"
                )}>
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-2xl text-foreground">Authenticated!</h4>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    Requisition has been securely {actionType === 'APPROVE' ? 'approved' : 'rejected'}.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-accent/30 border-t border-border flex items-center gap-2 justify-center">
            <ShieldAlert className="w-3 h-3 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
              Encrypted biometric signature protected by St Andrews Security
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ApprovalModal;
