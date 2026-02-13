"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ModelPrediction {
    name: string;
    prediction: number;
    status: 'safe' | 'warning' | 'danger';
}

interface ModelComparisonProps {
    models: ModelPrediction[];
}

export const ModelComparison = ({ models }: ModelComparisonProps) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {models.map((model) => (
                <div key={model.name} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center group hover:bg-slate-800 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2">{model.name}</span>
                    <div className="flex items-center space-x-2">
                        <span className={cn(
                            "text-xl font-extrabold",
                            model.status === 'safe' ? "text-emerald-400" :
                                model.status === 'warning' ? "text-amber-400" : "text-red-400"
                        )}>
                            {model.prediction}%
                        </span>
                        <div className={cn(
                            "w-2 h-2 rounded-full",
                            model.status === 'safe' ? "bg-emerald-500" :
                                model.status === 'warning' ? "bg-amber-500" : "bg-red-500"
                        )} />
                    </div>
                </div>
            ))}
        </div>
    );
};
