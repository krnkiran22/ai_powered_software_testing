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
        <Card className="mt-8 border-slate-800" hover={false}>
            <CardHeader>
                <h3 className="text-sm font-bold text-slate-100 italic tracking-widest uppercase">Model Comparison Visualization</h3>
            </CardHeader>
            <CardBody className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}%`}
                        />
                        <Tooltip
                            cursor={{ fill: '#ffffff10' }}
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                fontSize: '12px',
                                color: '#f8fafc'
                            }}
                            itemStyle={{ color: '#38bdf8' }}
                        />
                        <Bar dataKey="probability" radius={[4, 4, 0, 0]} barSize={60}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};
