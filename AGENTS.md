# St Andrews Requisition System

## Project Overview
A requisition system for St Andrews to facilitate church groups in applying for project funding, managing approvals, and maintaining financial records.

## Current Implementation Status (v1.0-alpha)
- **Framework**: Next.js 15 (App Router), Tailwind CSS 4.0, TypeScript.
- **State Management**: Fully functional client-side state using React Context (`RequisitionProvider`).
- **Core Modules**:
    - **Dashboard**: Dynamic stats and activity tracking.
    - **Requisitions**: Submission form and list view with search/filters.
    - **Approvals**: Multi-level (L1 -> L2) approval workflow.
    - **Disbursements**: Finance payout queue and tracking.
    - **User Management**: Role-based access control (RBAC).

## Key Workflows
- **Application**: Church Groups -> Submission -> Draft/Submitted.
- **Approval**: Approver L1 -> Approver L2 -> Approved.
- **Fulfillment**: Finance -> Disbursed -> Record Kept.

## Proposed Reporting Features
- **Group Financial Statements**: Automated monthly reports for each church group showing funding history.
- **Audit Trails**: Detailed history of every action (submission, comment, approval) for financial compliance.
- **Budget Tracking**: Real-time visualization of spent vs. allocated funds across departments.
- **Bottleneck Identification**: Reports showing average time requisitions spend in each approval stage.
- **Export Suite**: One-click generation of PDF/CSV reports for board meetings and audits.

## Technical Rules
- Use `useRequisitions` hook for data access.
- Use `useRole` hook for user identity and role-based logic.
- Maintain premium, "Church-themed" aesthetics in all new components.
