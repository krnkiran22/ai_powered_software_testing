"use client";

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { AnalysisResult } from '@/hooks/useAnalysis';
import { ChartIcon } from '@/components/icons';

interface AnalysisBarChartProps {
    data: AnalysisResult['models'];
}

export const AnalysisBarChart = ({ data }: AnalysisBarChartProps) => {
    const chartData = data.map(m => ({
        name: m.name,
        probability: m.prediction,
        fill: m.status === 'safe' ? "#10b981" : m.status === 'warning' ? "#f59e0b" : "#ef4444"
    }));

    return (
        <Card className="mt-12 border-slate-800 bg-slate-900/30 overflow-hidden" hover={false}>
            <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center">
                        <ChartIcon className="w-5 h-5 mr-3 text-sky-400" />
                        Probability Variance Map
                    </h3>
                    <p className="text-xs text-slate-500">Cross-model verification of defect probability</p>
                </div>
            </div>
            <CardBody className="h-[400px] w-full p-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
                                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            fontSize={11}
                            fontWeight={600}
                            tickLine={false}
                            axisLine={false}
                            dy={15}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={11}
                            fontWeight={600}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}%`}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e293b',
                                borderRadius: '12px',
                                fontSize: '13px',
                                color: '#f8fafc',
                                padding: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ fontWeight: 'bold' }}
                        />
                        <Bar
                            dataKey="probability"
                            radius={[8, 8, 0, 0]}
                            barSize={70}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.fill}
                                    fillOpacity={0.8}
                                    stroke={entry.fill}
                                    strokeWidth={2}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};
