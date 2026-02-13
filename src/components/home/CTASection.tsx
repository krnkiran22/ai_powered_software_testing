import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SparklesIcon } from '@/components/icons';

export const CTASection = () => {
    return (
        <section className="py-24">
            <Container>
                <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 p-12 lg:p-24 text-center space-y-8">
                    {/* Background effects */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-primary opacity-[0.03] -z-10" />
                    <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[150%] bg-sky-500/10 blur-[120px] rounded-full -rotate-12" />
                    <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[150%] bg-violet-500/10 blur-[120px] rounded-full -rotate-12" />

                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-50 tracking-tight leading-tight">
                            Ready to Find Bugs Before <br className="hidden md:block" />
                            <span className="text-gradient">Your Users Do?</span>
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Join thousands of developers using AI to ensure code quality and software reliability.
                            Start for free today with our comprehensive testing toolkit.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/analyze">
                            <Button size="lg" className="px-10 h-14 text-lg">
                                <SparklesIcon className="w-5 h-5 mr-3" />
                                Get Started Free
                            </Button>
                        </Link>
                        <Link href="/docs">
                            <Button variant="outline" size="lg" className="px-10 h-14 text-lg">
                                Read Documentation
                            </Button>
                        </Link>
                    </div>

                    <p className="text-slate-500 text-sm">
                        No credit card required • Open source friendly • Enterprise ready
                    </p>
                </div>
            </Container>
        </section>
    );
};
