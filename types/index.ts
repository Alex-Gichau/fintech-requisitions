export type UserRole = 'CHURCH_GROUP' | 'APPROVER_L1' | 'APPROVER_L2' | 'FINANCE' | 'ADMIN';

export type RequisitionStatus = 
  | 'DRAFT' 
  | 'PENDING_L1' 
  | 'PENDING_L2' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'DISBURSED';

export interface Requisition {
  id: string;
  requesterId: string;
  requesterName: string;
  title: string;
  description: string;
  amount: number;
  status: RequisitionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name?: string;
  fullName: string;
  email: string;
  role: UserRole;
  group?: string;
  systemCode?: string | null;
}
