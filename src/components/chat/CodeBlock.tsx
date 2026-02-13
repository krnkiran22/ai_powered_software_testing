"use client";

import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
    language: string;
    value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{language}</span>
                <button
                    onClick={copyToClipboard}
                    className="text-slate-500 hover:text-slate-200 transition-colors p-1"
                    title="Copy code"
                >
                    {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <CopyIcon className="w-4 h-4" />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-slate-300">
                <code>{value}</code>
            </pre>
        </div>
    );
};
