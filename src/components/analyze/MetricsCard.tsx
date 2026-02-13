"use client";

import React from 'react';

interface MetricsCardProps {
    metrics: {
        loc: number;
        complexity: number;
        halsteadVolume: number;
        halsteadDifficulty: number;
        operators: number;
        operands: number;
    };
}

export const MetricsCard = ({ metrics }: MetricsCardProps) => {
    const items = [
        { label: "Lines of Code", value: metrics.loc },
        { label: "Cyclomatic Complexity", value: metrics.complexity },
        { label: "Halstead Volume", value: metrics.halsteadVolume.toLocaleString() },
        { label: "Halstead Difficulty", value: metrics.halsteadDifficulty },
        { label: "Unique Operators", value: metrics.operators },
        { label: "Unique Operands", value: metrics.operands }
    ];

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm font-mono font-bold text-slate-100">{item.value}</span>
                </div>
            ))}
        </div>
    );
};
