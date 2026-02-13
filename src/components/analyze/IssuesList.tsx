"use client";

import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface Issue {
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    line: number;
    description: string;
}

interface IssuesListProps {
    issues: Issue[];
}

export const IssuesList = ({ issues }: IssuesListProps) => {
    if (issues.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 opacity-50">
                <p className="text-sm">No critical issues found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {issues.map((issue, i) => (
                <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2 hover:bg-slate-800 transition-colors cursor-pointer group"
                >
                    <div className="flex items-center justify-between">
                        <Badge
                            variant={issue.severity === 'HIGH' ? 'red' : issue.severity === 'MEDIUM' ? 'amber' : 'sky'}
                            className="text-[9px]"
                        >
                            {issue.severity}
                        </Badge>
                        <span className="text-[10px] font-mono text-slate-500">LINE {issue.line}</span>
                    </div>
                    <p className="text-xs text-slate-300 group-hover:text-slate-100 transition-colors">
                        {issue.description}
                    </p>
                    <div className="pt-1">
                        <button className="text-[10px] text-sky-500 hover:text-sky-400 font-bold uppercase tracking-widest">
                            View Code
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
