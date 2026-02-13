"use client";

import React from 'react';

interface RiskGaugeProps {
    level: string;
    probability: number;
}

export const RiskGauge = ({ probability }: RiskGaugeProps) => {
    const radius = 70;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (probability / 100) * circumference;

    const getColor = () => {
        if (probability < 30) return "#10b981"; // emerald-500
        if (probability < 70) return "#f59e0b"; // amber-500
        return "#ef4444"; // red-500
    };

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                <circle
                    stroke="#1e293b"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={getColor()}
                    fill="transparent"
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-slate-50">{probability}%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Defect Chance</span>
            </div>
        </div>
    );
};
