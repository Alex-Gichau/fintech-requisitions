'use client';

import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Filter, 
  Calendar,
  PieChart as PieIcon,
  BarChart3,
  Activity
} from 'lucide-react';
import { useRequisitions } from '@/lib/RequisitionContext';
import { useRole } from '@/lib/RoleContext';

const COLORS = ['#1e3a8a', '#d97706', '#10b981', '#ef4444', '#6366f1', '#8b5cf6'];

export default function ReportsPage() {
  const { user } = useRole();
  const { requisitions } = useRequisitions();

  // Data Processing: Spending by Group
  const groupData = useMemo(() => {
    const data: Record<string, number> = {};
    requisitions.forEach(req => {
      if (req.status === 'APPROVED' || req.status === 'DISBURSED') {
        data[req.requesterName] = (data[req.requesterName] || 0) + req.amount;
      }
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [requisitions]);

  // Data Processing: Status Distribution
  const statusData = useMemo(() => {
    const data: Record<string, number> = {};
    requisitions.forEach(req => {
      data[req.status] = (data[req.status] || 0) + 1;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [requisitions]);

  // Data Processing: Monthly Trend (Mocked for better visualization)
  const trendData = [
    { month: 'Jan', amount: 450000 },
    { month: 'Feb', amount: 520000 },
    { month: 'Mar', amount: 380000 },
    { month: 'Apr', amount: totalAmountInCurrentMonth() },
  ];

  function totalAmountInCurrentMonth() {
    return requisitions
      .filter(r => r.status === 'DISBURSED' || r.status === 'APPROVED')
      .reduce((sum, r) => sum + r.amount, 0);
  }

  if (user.role !== 'ADMIN' && user.role !== 'FINANCE') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <h3 className="text-xl font-bold text-foreground">Access Restricted</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          You do not have permission to view high-level analytics and reports.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Analytics & Reports</h2>
          <p className="text-muted-foreground mt-1 font-medium">Visual insights into church project funding and expenditure.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border text-foreground px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-accent transition-all">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
            <Download className="w-4 h-4" />
            Full Financial Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending by Group */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Spending by Church Group</h3>
            </div>
            <button className="text-xs font-bold text-primary hover:underline">View Details</button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `Ksh ${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`Ksh ${value.toLocaleString()}`, 'Total Funding']}
                />
                <Bar dataKey="value" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <PieIcon className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Request Status</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Total Volume</span>
              <span className="text-sm font-bold">{requisitions.length} Requests</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Completion Rate</span>
              <span className="text-sm font-bold text-green-600">
                {((requisitions.filter(r => r.status === 'DISBURSED').length / requisitions.length) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Funding Trends */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Funding Trends (2026)</h3>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
              <TrendingUp className="w-4 h-4" />
              +14.2% Growth
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `Ksh ${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#1e3a8a" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
