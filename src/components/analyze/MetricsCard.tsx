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
        { label: "Lines of Code", value: metrics.loc, icon: "LOC" },
        { label: "Complexity", value: metrics.complexity, icon: "CC" },
        { label: "Halstead Vol", value: metrics.halsteadVolume.toLocaleString(), icon: "HV" },
        { label: "Difficulty", value: metrics.halsteadDifficulty, icon: "HD" },
        { label: "Operators", value: metrics.operators, icon: "OP1" },
        { label: "Operands", value: metrics.operands, icon: "OP2" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">{item.label}</span>
                    <span className="text-lg font-mono font-bold text-sky-400">{item.value}</span>
                </div>
            ))}
        </div>
    );
};
