# ⛪ St Andrews Requisition System

A premium, role-based requisition management platform designed for St Andrews to streamline project funding applications, multi-level approvals, and financial record-keeping.

## 🌟 Overview

The **St Andrews Requisition System** bridges the gap between church ministry ideas and financial fulfillment. It provides a transparent, secure, and efficient workflow for church groups to apply for funding, while giving administrators and finance teams the tools they need to maintain strict financial oversight.

## 🚀 Key Features

- **📝 Smart Applications**: Clean, multi-field forms for project descriptions and financial requirements.
- **⚖️ Multi-Level Approval**: Integrated L1 and L2 approval hierarchy to ensure accountability.
- **💰 Finance Hub**: Dedicated module for processing disbursements and tracking payouts.
- **👥 Role-Based Access**: Specialized interfaces for Church Groups, Approvers, Finance, and Admins.
- **📊 Real-time Dashboard**: Instant visibility into total funding, pending requests, and system activity.

## 🛠️ How It Works

### 1. Submission 📝
Church groups submit a detailed funding request, including project goals, requested amount, and expected dates.

### 2. Multi-Stage Review ✅
The requisition moves through the approval pipeline:
- **Level 1**: Initial verification by departmental heads.
- **Level 2**: Final review for major projects or specific budget categories.

### 3. Finance Fulfillment 💸
Once approved, the finance team receives the requisition in their payout queue. They process the disbursement and mark it as completed.

### 4. Record & Report 📈
The system maintains a permanent audit trail of all actions, allowing for quick generation of financial reports and group funding histories.

---

## 💻 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State**: React Context API

## 🚀 Deployment

This project is configured for automatic deployment to **GitHub Pages** via GitHub Actions.

### Setup Instructions
1.  **Repository Settings**: Go to your GitHub repository -> **Settings** -> **Pages**.
2.  **Build and Deployment**: Set **Source** to `GitHub Actions`.
3.  **Push to Main**: Any push to the `main` branch will trigger the `.github/workflows/deploy.yml` workflow to build and deploy the site.

The site will be available at: `https://Alex-Gichau.github.io/fintech-requisitions`