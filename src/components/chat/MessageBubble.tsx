"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useChat';
import { SparklesIcon, BrainIcon } from '@/components/icons';
import { CodeBlock } from './CodeBlock';

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isAssistant = message.role === 'assistant';

    return (
        <div className={cn(
            "flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300",
            isAssistant ? "justify-start" : "justify-end"
        )}>
            <div className={cn(
                "flex max-w-[85%] md:max-w-[75%]",
                isAssistant ? "flex-row" : "flex-row-reverse"
            )}>
                {/* Avatar */}
                <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-1",
                    isAssistant ? "mr-3 bg-violet-500/20 text-violet-400" : "ml-3 bg-sky-500/20 text-sky-400"
                )}>
                    {isAssistant ? <BrainIcon className="w-5 h-5" /> : <div className="text-xs font-bold">U</div>}
                </div>

                {/* Content */}
                <div className="flex flex-col">
                    <div className={cn(
                        "text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500",
                        isAssistant ? "text-left" : "text-right"
                    )}>
                        {isAssistant ? "AI Assistant" : "You"}
                    </div>

                    <div className={cn(
                        "p-4 rounded-2xl text-sm leading-relaxed",
                        isAssistant
                            ? "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none"
                            : "bg-sky-600 text-white rounded-tr-none"
                    )}>
                        {/* Handle simple markdown-like parts (code blocks) */}
                        {renderContent(message.content)}

                        {message.code && (
                            <CodeBlock language={message.code.language} value={message.code.value} />
                        )}
                    </div>

                    <div className={cn(
                        "text-[10px] text-slate-600 mt-1",
                        isAssistant ? "text-left" : "text-right"
                    )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple renderer for standard markdown code blocks and bold text
function renderContent(content: string) {
    const parts = content.split(/(```[\s\S]*?```)/);

    return parts.map((part, i) => {
        if (part.startsWith('```')) {
            const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
            if (match) {
                const lang = match[1] || 'plaintext';
                const code = match[2];
                return <CodeBlock key={i} language={lang} value={code} />;
            }
        }

        // Handle bold text **text**
        const boldParts = part.split(/(\*\*.*?\*\*)/);
        return (
            <span key={i}>
                {boldParts.map((bp, j) => {
                    if (bp.startsWith('**') && bp.endsWith('**')) {
                        return <strong key={j} className="text-slate-50">{bp.slice(2, -2)}</strong>;
                    }
                    return bp;
                })}
            </span>
        );
    });
}
