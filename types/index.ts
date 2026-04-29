export type UserRole = 'CHURCH_GROUP' | 'APPROVER_L1' | 'APPROVER_L2' | 'FINANCE' | 'ADMIN';

export type RequisitionStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'PENDING_L1' 
  | 'PENDING_L2' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'DISBURSED';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  groupName?: string;
}

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
  attachmentUrl?: string;
}

export interface Comment {
  id: string;
  requisitionId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
  action?: 'APPROVE' | 'REJECT' | 'COMMENT';
}
