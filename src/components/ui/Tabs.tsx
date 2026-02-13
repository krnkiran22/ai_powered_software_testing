"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
    tabs: {
        id: string;
        label: string;
        icon?: React.ReactNode;
    }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export const Tabs = ({ tabs, activeTab, onTabChange, className }: TabsProps) => {
    return (
        <div className={cn("flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "flex-1 flex items-center justify-center space-x-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                        activeTab === tab.id
                            ? "bg-slate-800 text-slate-100 shadow-sm border border-slate-700"
                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                    )}
                >
                    {tab.icon}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );
};
