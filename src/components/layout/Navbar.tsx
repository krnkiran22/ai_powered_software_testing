"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';
import {
    MenuIcon,
    CloseIcon,
    GitHubIcon,
    SparklesIcon,
    AnalyzeIcon,
    ChatIcon
} from '@/components/icons';
import { cn } from '@/lib/utils';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/', icon: null },
        { name: 'Chat', href: '/chat', icon: <ChatIcon className="w-4 h-4 mr-2" /> },
        { name: 'Analyze', href: '/analyze', icon: <AnalyzeIcon className="w-4 h-4 mr-2" /> },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <Container>
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <SparklesIcon className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-50 tracking-tight">
                            Software Defect <span className="text-sky-500">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                                    pathname === link.href
                                        ? "text-sky-400 bg-sky-500/10"
                                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                                )}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        <div className="w-px h-6 bg-slate-800 mx-4" />
                        <Link href="https://github.com" target="_blank">
                            <Button variant="outline" size="sm" className="space-x-2">
                                <GitHubIcon className="w-4 h-4" />
                                <span>GitHub</span>
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 focus:outline-none"
                        >
                            {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block px-4 py-3 rounded-md text-base font-medium flex items-center",
                                    pathname === link.href
                                        ? "text-sky-400 bg-sky-500/10"
                                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                                )}
                            >
                                <span className="mr-3 opacity-70 scale-125">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 px-4">
                            <Link href="https://github.com" target="_blank" className="block w-full">
                                <Button variant="outline" className="w-full space-x-2">
                                    <GitHubIcon className="w-5 h-5" />
                                    <span>GitHub</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
