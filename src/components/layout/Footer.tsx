import React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { SparklesIcon, GitHubIcon } from '@/components/icons';

export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 py-12">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                                <SparklesIcon className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-50 tracking-tight">
                                Software Defect <span className="text-sky-500">AI</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                            Empowering developers with AI-driven testing and defect prediction.
                            Detect bugs before they reach production with our state-of-the-art machine learning models.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://github.com" className="text-slate-500 hover:text-slate-100 transition-colors">
                                <GitHubIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div className="space-y-4">
                        <h3 className="text-slate-100 font-semibold uppercase tracking-wider text-xs">Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Home</Link></li>
                            <li><Link href="/chat" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">AI Chat</Link></li>
                            <li><Link href="/analyze" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Code Analysis</Link></li>
                            <li><Link href="/docs" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Documentation</Link></li>
                        </ul>
                    </div>

                    {/* Research Column */}
                    <div className="space-y-4">
                        <h3 className="text-slate-100 font-semibold uppercase tracking-wider text-xs">Research</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Paper (IJITEE 2020)</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">PROMISE Dataset</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Model Benchmarks</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-slate-500 text-xs">
                        © 2024 Software Defect AI. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-xs text-slate-500">
                        <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
