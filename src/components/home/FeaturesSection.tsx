import React from 'react';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { ChatIcon, AnalyzeIcon, CheckIcon, SparklesIcon, BugIcon, ChartIcon, ShieldIcon } from '@/components/icons';

export const FeaturesSection = () => {
    const features = [
        {
            title: "AI Chat Assistant",
            icon: <ChatIcon className="w-10 h-10 text-sky-400" />,
            description: "Ask anything about software testing, debugging, or best practices. Our AI assistant is trained on millions of lines of code and documentation.",
            items: [
                "Generate unit test cases instantly",
                "Debug complex code logic",
                "Explain testing methodologies",
                "Code review and optimization"
            ],
            link: "/chat",
            cta: "Open Chat",
            color: "sky"
        },
        {
            title: "Code Defect Analyzer",
            icon: <AnalyzeIcon className="w-10 h-10 text-violet-400" />,
            description: "Upload your code to detect potential defects using 4 state-of-the-art machine learning models with industry-leading accuracy.",
            items: [
                "Deep Learning & Random Forest",
                "SVM & Bayes Network analysis",
                "Complexity & Halstead metrics",
                "Detailed recommendation reports"
            ],
            link: "/analyze",
            cta: "Analyze Now",
            color: "violet"
        }
    ];

    return (
        <section className="py-24 bg-slate-900/50">
            <Container>
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-50 tracking-tight">
                        Two Powerful Tools, One Quality Platform
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Everything you need to ensure software reliability and minimize technical debt.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="group overflow-visible relative" glow>
                            <div className={feature.color === 'sky' ? 'absolute -top-4 -left-4 w-24 h-24 bg-sky-500/10 blur-2xl rounded-full' : 'absolute -top-4 -left-4 w-24 h-24 bg-violet-500/10 blur-2xl rounded-full'} />
                            <CardBody className="p-10 space-y-8">
                                <div className="flex items-start justify-between">
                                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        {feature.icon}
                                    </div>
                                    <SparklesIcon className="w-6 h-6 text-slate-700" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-slate-50 tracking-tight">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {feature.items.map((item) => (
                                        <li key={item} className="flex items-center text-sm text-slate-300">
                                            <div className="mr-3 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0">
                                                <CheckIcon className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4">
                                    <Link href={feature.link}>
                                        <Button variant={feature.color === 'sky' ? 'primary' : 'secondary'} className="w-full sm:w-auto group/btn">
                                            <span>{feature.cta}</span>
                                            <div className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</div>
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* Mini Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24 pt-24 border-t border-slate-800">
                    {[
                        { icon: <BugIcon />, title: "Bug Detection", desc: "Identify critical defects" },
                        { icon: <ChartIcon />, title: "Metrics Analysis", desc: "Line-by-line code metrics" },
                        { icon: <ShieldIcon />, title: "Deep Learning", desc: "90% prediction accuracy" },
                        { icon: <SparklesIcon />, title: "AI Generation", desc: "Automatic test cases" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-4">
                            <div className="p-2 rounded-lg bg-slate-800 text-sky-400">
                                {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
