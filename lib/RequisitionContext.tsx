'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Requisition, RequisitionStatus } from '@/types';
import { mockRequisitions as initialData } from './mockData';

interface RequisitionContextType {
  requisitions: Requisition[];
  addRequisition: (requisition: Omit<Requisition, 'id' | 'createdAt' | 'updatedAt' | 'requesterId' | 'requesterName'>) => void;
  updateStatus: (id: string, status: RequisitionStatus) => void;
  getRequisitionById: (id: string) => Requisition | undefined;
}

const RequisitionContext = createContext<RequisitionContextType | undefined>(undefined);

export const RequisitionProvider = ({ children }: { children: ReactNode }) => {
  const [requisitions, setRequisitions] = useState<Requisition[]>(initialData);

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

  return (
    <RequisitionContext.Provider value={{ requisitions, addRequisition, updateStatus, getRequisitionById }}>
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
