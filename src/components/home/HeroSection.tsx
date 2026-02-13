import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { SparklesIcon, AnalyzeIcon } from '@/components/icons';

export const HeroSection = () => {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sky-400 text-sm font-medium animate-fade-in">
                            <SparklesIcon className="w-4 h-4 mr-2" />
                            <span>Next-Gen Defect Prediction</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-50 tracking-tight leading-[1.1]">
                            AI-Powered Software <br />
                            <span className="text-gradient">Testing & Prediction</span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Detect bugs before they reach production. Chat with AI about testing
                            strategies or analyze your source code with 90% accuracy using
                            Deep Learning models trained on PROMISE datasets.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link href="/chat">
                                <Button size="lg" className="px-8 space-x-2">
                                    <SparklesIcon className="w-5 h-5" />
                                    <span>Start Chat</span>
                                </Button>
                            </Link>
                            <Link href="/analyze">
                                <Button variant="outline" size="lg" className="px-8 space-x-2">
                                    <AnalyzeIcon className="w-5 h-5" />
                                    <span>Analyze Code</span>
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-4 flex items-center justify-center lg:justify-start space-x-8 opacity-60">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-slate-200">90%</span>
                                <span className="text-xs uppercase tracking-wider">Accuracy</span>
                            </div>
                            <div className="w-px h-8 bg-slate-800" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-slate-200">4</span>
                                <span className="text-xs uppercase tracking-wider">ML Models</span>
                            </div>
                            <div className="w-px h-8 bg-slate-800" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-slate-200">&lt;2s</span>
                                <span className="text-xs uppercase tracking-wider">Analysis</span>
                            </div>
                        </div>
                    </div>

                    {/* Animated Code Preview */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                                {/* Window Header */}
                                <div className="bg-slate-800/50 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono">analysis_engine.py</div>
                                    <div className="w-12" />
                                </div>

                                {/* Code Body */}
                                <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
                                    <div className="animate-pulse-slow">
                                        <span className="text-violet-400">def</span> <span className="text-sky-400">analyze_code</span>(source):<br />
                                        &nbsp;&nbsp;<span className="text-slate-500"># Extracting metrics...</span><br />
                                        &nbsp;&nbsp;metrics = extract_metrics(source)<br /><br />
                                        &nbsp;&nbsp;<span className="text-slate-500"># Running ML models</span><br />
                                        &nbsp;&nbsp;prediction = model.predict(metrics) <br />
                                        &nbsp;&nbsp;<span className="text-emerald-400 ml-4 font-bold animate-bounce inline-block">← AI analyzing...</span><br /><br />
                                        &nbsp;&nbsp;<span className="text-violet-400">return</span> {"{"}<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-400">&quot;risk_level&quot;</span>: prediction.risk,<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-400">&quot;probability&quot;</span>: <span className="text-sky-400">0.92</span><br />
                                        &nbsp;&nbsp;{"}"}
                                    </div>
                                </div>

                                {/* Status Bar */}
                                <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center text-[10px] text-emerald-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                                            SYSTEM READY
                                        </span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">PROMISE DATASET V5</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">UTF-8</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
