"use client";

import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    CheckIcon,
    WarningIcon,
    ErrorIcon,
    DownloadIcon,
    CodeIcon,
    AnalyzeIcon,
    ChartIcon
} from '@/components/icons';
import { AnalysisResult } from '@/hooks/useAnalysis';
import { RiskGauge } from './RiskGauge';
import { ModelComparison } from './ModelComparison';
import { MetricsCard } from './MetricsCard';
import { IssuesList } from './IssuesList';
import { Button } from '@/components/ui/Button';

interface ResultsPanelProps {
    result: AnalysisResult | null;
    isAnalyzing: boolean;
}

export const ResultsPanel = ({ result, isAnalyzing }: ResultsPanelProps) => {
    if (isAnalyzing) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6" hover={false}>
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-sky-500 animate-spin" />
                    <AnalyzeIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-sky-400" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-100">Deep Analysis in Progress</h3>
                    <p className="text-sm text-slate-400 max-w-xs">Extracting metrics and running ML models against our PROMISE dataset...</p>
                </div>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                </div>
            </Card>
        );
    }

    if (!result) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6" hover={false}>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-700">
                    <ChartIcon className="w-16 h-16" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-400">Waiting for Data</h3>
                    <p className="text-sm text-slate-500 max-w-sm">Upload a file or paste your code snippet on the left to start the AI analysis.</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Overview Card */}
            <Card glow hover={false}>
                <CardBody className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-700">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Overall Risk Level</h3>
                            <RiskGauge level={result.riskLevel} probability={result.probability} />
                            <Badge
                                variant={result.riskLevel === 'LOW' ? 'emerald' : result.riskLevel === 'MEDIUM' ? 'amber' : 'red'}
                                size="md"
                                className="mt-6 px-6 py-1 text-sm"
                            >
                                {result.riskLevel} RISK
                            </Badge>
                        </div>
                        <div className="p-8 space-y-6 bg-slate-900/50">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Model Predictions</h3>
                            <ModelComparison models={result.models} />
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Metrics & Issues Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card hover={false} className="border-slate-800">
                    <CardHeader className="py-4 px-6 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-100 flex items-center">
                            <CodeIcon className="w-4 h-4 mr-2 text-sky-400" />
                            Code Metrics
                        </h3>
                    </CardHeader>
                    <CardBody className="p-6">
                        <MetricsCard metrics={result.metrics} />
                    </CardBody>
                </Card>

                <Card hover={false} className="border-slate-800">
                    <CardHeader className="py-4 px-6 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-100 flex items-center">
                            <WarningIcon className="w-4 h-4 mr-2 text-amber-500" />
                            Issues Found
                        </h3>
                        <Badge variant="slate">{result.issues.length}</Badge>
                    </CardHeader>
                    <CardBody className="p-6">
                        <IssuesList issues={result.issues} />
                    </CardBody>
                </Card>
            </div>

            {/* Recommendations */}
            <Card hover={false} className="border-slate-800 bg-slate-900/30">
                <CardBody className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-50">AI Recommendations</h3>
                            <p className="text-sm text-slate-400">Actionable steps to improve your code quality and reliability.</p>
                        </div>
                        <Button variant="outline" className="space-x-2">
                            <DownloadIcon className="w-4 h-4" />
                            <span>Download Report</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.recommendations.map((rec, i) => (
                            <div key={i} className="flex items-start p-4 rounded-lg bg-slate-800/50 border border-slate-800 group hover:border-sky-500/30 transition-colors">
                                <div className="mr-3 mt-0.5 p-1 rounded-full bg-sky-500/10 text-sky-400">
                                    <CheckIcon className="w-3 h-3" />
                                </div>
                                <span className="text-sm text-slate-300">{rec}</span>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
