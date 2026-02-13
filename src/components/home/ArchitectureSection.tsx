import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import {
    NextJsIcon,
    PythonIcon,
    TensorFlowIcon,
    DatabaseIcon,
    LayersIcon,
    SparklesIcon,
    ServerIcon
} from '@/components/icons';

export const ArchitectureSection = () => {
    return (
        <section className="py-24 bg-slate-900/30">
            <Container>
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-50 tracking-tight">
                        System Architecture
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A modern distributed system built for speed, scalability, and high-precision AI inference.
                    </p>
                </div>

                <Card className="p-8 lg:p-16 border-slate-800 bg-slate-950/50" hover={false}>
                    <div className="max-w-4xl mx-auto relative">
                        {/* Diagram Flow */}
                        <div className="flex flex-col items-center space-y-12">

                            {/* Frontend Layer */}
                            <div className="flex flex-col items-center space-y-4 w-full">
                                <div className="px-6 py-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center space-x-3 shadow-glow">
                                    <NextJsIcon className="w-6 h-6" />
                                    <span className="font-bold tracking-tight">FRONTEND: Next.js + Tailwind</span>
                                </div>
                                <div className="h-12 w-px bg-gradient-to-b from-sky-500 to-violet-500" />
                            </div>

                            {/* API / Backend Layer */}
                            <div className="flex flex-col items-center space-y-4 w-full">
                                <div className="px-6 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center space-x-3">
                                    <PythonIcon className="w-6 h-6" />
                                    <span className="font-bold tracking-tight">BACKEND: Python FastAPI</span>
                                </div>
                                <div className="flex justify-center space-x-32 relative">
                                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-violet-500" />
                                    <div className="h-12 w-[200px] border-x border-t border-violet-500 rounded-t-3xl mt-0" />
                                </div>
                            </div>

                            {/* Worker / Model Layer */}
                            <div className="flex justify-center space-x-8 md:space-x-16 w-full">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="px-4 py-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center space-y-3 w-32 md:w-40">
                                        <SparklesIcon className="w-8 h-8 text-amber-400" />
                                        <span className="text-xs font-bold text-slate-300">Claude AI</span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest text-center">Chat & Tips</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <div className="px-4 py-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center space-y-3 w-32 md:w-40 shadow-glow">
                                        <TensorFlowIcon className="w-8 h-8 text-violet-400" />
                                        <span className="text-xs font-bold text-slate-300">ML Engine</span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest text-center">Defect Prediction</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-12 w-px bg-slate-700" />

                            {/* Data Layer */}
                            <div className="flex flex-col items-center space-y-4 w-full">
                                <div className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center space-x-3">
                                    <DatabaseIcon className="w-6 h-6" />
                                    <span className="font-bold tracking-tight">DATA: PostgreSQL + Redis</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </Card>
            </Container>
        </section>
    );
};
