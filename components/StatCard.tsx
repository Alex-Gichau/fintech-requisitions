'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, description, trend, className }: StatCardProps) => {
  return (
    <div className={cn("p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2 font-medium">{description}</p>
          )}
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-3 text-xs font-bold",
              trend.isUp ? "text-green-600" : "text-red-600"
            )}>
              <span>{trend.isUp ? '+' : '-'}{trend.value}%</span>
              <span className="text-muted-foreground font-medium">from last month</span>
            </div>
          )}
        </div>
        <div className="bg-primary/5 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
