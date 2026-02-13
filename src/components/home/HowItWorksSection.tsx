import React from 'react';
import { Container } from '@/components/layout/Container';
import { UploadIcon, AnalyzeIcon, CheckIcon } from '@/components/icons';

export const HowItWorksSection = () => {
    const steps = [
        {
            number: "01",
            title: "Upload Your Code",
            description: "Paste your code snippet or upload a complete file. We support Python, JavaScript, TypeScript, Java, and more.",
            icon: <UploadIcon className="w-6 h-6" />,
            color: "bg-sky-500/20 text-sky-400 border-sky-500/30"
        },
        {
            number: "02",
            title: "AI Analysis",
            description: "Our ensemble of machine learning models analyzes code metrics and patterns to predict potential defect areas.",
            icon: <AnalyzeIcon className="w-6 h-6" />,
            color: "bg-violet-500/20 text-violet-400 border-violet-500/30"
        },
        {
            number: "03",
            title: "Get Results & Fixes",
            description: "Receive a detailed report with risk probabilities, code metrics, and actionable suggestions to improve quality.",
            icon: <CheckIcon className="w-6 h-6" />,
            color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }
    ];

    return (
        <section className="py-24 bg-slate-950">
            <Container>
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-50 tracking-tight">
                        Simple 3-Step Process
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Get from code to quality assurance in less than 2 seconds with our automated pipeline.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[20%] right-[20%] h-px bg-gradient-to-r from-sky-500/50 via-violet-500/50 to-emerald-500/50 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, i) => (
                            <div key={step.number} className="flex flex-col items-center text-center space-y-6 group">
                                <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center border ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-500 z-10 bg-slate-900`}>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                                        {step.number}
                                    </div>
                                    {step.icon}
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-slate-100">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed px-4 md:px-0">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow for mobile/tablet */}
                                {i < steps.length - 1 && (
                                    <div className="md:hidden text-slate-700">
                                        ↓
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
