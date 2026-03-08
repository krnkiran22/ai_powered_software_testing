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
    ChartIcon,
    SparklesIcon,
    BugIcon,
    InfoIcon,
    LightningIcon
} from '@/components/icons';
import { AnalysisResult } from '@/hooks/useAnalysis';
import { RiskGauge } from './RiskGauge';
import { ModelComparison } from './ModelComparison';
import { MetricsCard } from './MetricsCard';
import { IssuesList } from './IssuesList';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ResultsPanelProps {
    result: AnalysisResult | null;
    isAnalyzing: boolean;
}

export const ResultsPanel = ({ result, isAnalyzing }: ResultsPanelProps) => {
    if (isAnalyzing) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8 bg-slate-900 border-slate-800" hover={false}>
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-[6px] border-slate-800 border-t-sky-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnalyzeIcon className="w-10 h-10 text-sky-400" />
                    </div>
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-100">Analyzing Codebase</h3>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                        Scanning for vulnerabilities and architectural defects...
                    </p>
                </div>
            </Card>
        );
    }

    if (!result) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8 bg-slate-900 border-slate-800" hover={false}>
                <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 text-slate-500">
                    <ChartIcon className="w-16 h-16" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-300">Analysis Engine Ready</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Input your code on the left to generate a professional assessment report.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-900 border-slate-800 p-4" hover={false}>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-sky-400 border border-slate-700">
                            <ShieldIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Level</p>
                            <p className={cn(
                                "text-lg font-bold",
                                result.riskLevel === 'LOW' ? "text-emerald-400" :
                                    result.riskLevel === 'MEDIUM' ? "text-amber-400" : "text-red-400"
                            )}>{result.riskLevel}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-slate-900 border-slate-800 p-4" hover={false}>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-amber-500 border border-slate-700">
                            <WarningIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Issues Found</p>
                            <p className="text-lg font-bold text-slate-100">{result.issues.length} Potential</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-slate-900 border-slate-800 p-4" hover={false}>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-purple-400 border border-slate-700">
                            <SparklesIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Metric Analysis</p>
                            <p className="text-lg font-bold text-slate-100">AI Verified</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Insights Card */}
            <Card hover={false} className="border-slate-800 overflow-hidden bg-slate-900">
                <div className="grid grid-cols-1 xl:grid-cols-2">
                    <div className="p-10 flex flex-col items-center justify-center border-b xl:border-b-0 xl:border-r border-slate-800">
                        <RiskGauge level={result.riskLevel} probability={result.probability} />
                        <div className="mt-8 text-center space-y-1">
                            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-sm">Defect Distribution</h4>
                            <p className="text-[10px] text-slate-500">Cross-verified repository metrics</p>
                        </div>
                    </div>
                    <div className="p-10 space-y-8 bg-slate-950/20">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Ensemble Logic Results</h3>
                            <Badge variant="slate" className="text-[9px]">ENGINE V2</Badge>
                        </div>
                        <ModelComparison models={result.models} />
                    </div>
                </div>
            </Card>

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <div className="flex items-center space-x-2 px-2">
                        <CodeIcon className="w-3.5 h-3.5 text-sky-400" />
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Static Analytics</h3>
                    </div>
                    <Card hover={false} className="bg-slate-900 border-slate-800 min-h-[464px]">
                        <CardBody className="p-6">
                            <MetricsCard metrics={result.metrics} />

                            <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                                    <InfoIcon className="w-3 h-3 mr-2" />
                                    Security Context
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    Metrics processed via Groq LLM to identify high-risk patterns in structural complexity.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center space-x-2 px-2">
                        <BugIcon className="w-3.5 h-3.5 text-red-500" />
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Validated Defects</h3>
                    </div>
                    <Card hover={false} className="bg-slate-900 border-slate-800 min-h-[464px]">
                        <CardBody className="p-6">
                            <IssuesList issues={result.issues} />
                        </CardBody>
                    </Card>
                </section>
            </div>

            {/* Recommendations Section */}
            <section className="space-y-4 pb-8">
                <div className="flex items-center space-x-2 px-2">
                    <LightningIcon className="w-3.5 h-3.5 text-amber-500" />
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Mitigation Roadmap</h3>
                </div>
                <Card hover={false} className="bg-slate-900 border-slate-800">
                    <CardBody className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.recommendations.map((rec, i) => (
                                <div key={i} className="flex items-start p-5 rounded-xl bg-slate-800/30 border border-slate-700 hover:border-slate-600 transition-colors">
                                    <div className="mr-4 mt-0.5 p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
                                        <CheckIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-sm text-slate-300 font-medium leading-relaxed">{rec}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center">
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Groq Engine v2.4 Certified</p>
                            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-100">
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                <span>Export Assessment</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
};

// Internal icons helper
const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
