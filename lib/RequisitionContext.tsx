'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Requisition, RequisitionStatus, Budget } from '@/types';
import { mockRequisitions as initialData } from './mockData';

const INITIAL_BUDGETS: Budget[] = [
  { group: 'ICT', allocated: 2000000 },
  { group: 'Youth Ministry', allocated: 1500000 },
  { group: 'Worship Team', allocated: 1200000 },
  { group: 'Outreach & Missions', allocated: 2500000 },
  { group: 'Sunday School', allocated: 800000 },
  { group: 'Men\'s Fellowship', allocated: 1000000 },
  { group: 'Women\'s Guild', allocated: 1000000 },
];

interface RequisitionContextType {
  requisitions: Requisition[];
  budgets: Budget[];
  addRequisition: (requisition: Omit<Requisition, 'id' | 'createdAt' | 'updatedAt' | 'requesterId' | 'requesterName'>) => void;
  updateStatus: (id: string, status: RequisitionStatus) => void;
  getRequisitionById: (id: string) => Requisition | undefined;
  getBudgetForGroup: (group: string) => { allocated: number; spent: number; remaining: number };
}

const RequisitionContext = createContext<RequisitionContextType | undefined>(undefined);

export const RequisitionProvider = ({ children }: { children: ReactNode }) => {
  const [requisitions, setRequisitions] = useState<Requisition[]>(initialData);
  const [budgets] = useState<Budget[]>(INITIAL_BUDGETS);

  const addRequisition = (data: Omit<Requisition, 'id' | 'createdAt' | 'updatedAt' | 'requesterId' | 'requesterName'>) => {
    const newReq: Requisition = {
      ...data,
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      requesterId: 'user-1',
      requesterName: 'Youth Ministry', // Default for demo
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRequisitions([newReq, ...requisitions]);
  };

  const updateStatus = (id: string, status: RequisitionStatus) => {
    setRequisitions(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status, updatedAt: new Date().toISOString() } 
          : req
      )
    );
  };

  const getRequisitionById = (id: string) => {
    return requisitions.find(req => req.id === id);
  };

  const getBudgetForGroup = (groupName: string) => {
    const budget = budgets.find(b => b.group === groupName) || { group: groupName, allocated: 0 };
    const spent = requisitions
      .filter(r => r.requesterName === groupName && (r.status === 'APPROVED' || r.status === 'DISBURSED'))
      .reduce((sum, r) => sum + r.amount, 0);
    
    return {
      allocated: budget.allocated,
      spent,
      remaining: budget.allocated - spent
    };
  };

  return (
    <RequisitionContext.Provider value={{ requisitions, budgets, addRequisition, updateStatus, getRequisitionById, getBudgetForGroup }}>
      {children}
    </RequisitionContext.Provider>
  );
};

export const useRequisitions = () => {
  const context = useContext(RequisitionContext);
  if (context === undefined) {
    throw new Error('useRequisitions must be used within a RequisitionProvider');
  }
  return context;
};
