"use client";

import { Badge } from '@/components/ui/Badge';
import { WarningIcon, ErrorIcon, InfoIcon } from '@/components/icons';

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
            <div className="flex flex-col items-center justify-center py-10 opacity-50 space-y-3">
                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckIcon className="w-6 h-6" />
                </div>
                <p className="text-sm text-slate-400">No security issues or bugs detected.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 pr-2 max-h-[400px] overflow-y-auto custom-scrollbar">
            {issues.map((issue, i) => (
                <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            {issue.severity === 'HIGH' ? (
                                <ErrorIcon className="w-4 h-4 text-red-500" />
                            ) : issue.severity === 'MEDIUM' ? (
                                <WarningIcon className="w-4 h-4 text-amber-500" />
                            ) : (
                                <InfoIcon className="w-4 h-4 text-sky-500" />
                            )}
                            <Badge
                                variant={issue.severity === 'HIGH' ? 'red' : issue.severity === 'MEDIUM' ? 'amber' : 'sky'}
                                className="text-[10px] font-bold"
                            >
                                {issue.severity === 'HIGH' ? 'CRITICAL' : issue.severity}
                            </Badge>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-800 px-2 py-0.5 rounded">
                            L{issue.line}
                        </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {issue.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

// Simple icon components for fallback if not in icons.ts
const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);
