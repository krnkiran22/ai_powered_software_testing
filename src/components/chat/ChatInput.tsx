"use client";

import React, { useState, useRef } from 'react';
import { SendIcon, CodeIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';

interface ChatInputProps {
    onSendMessage: (content: string, code?: { language: string; value: string }) => void;
    isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        onSendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="relative group">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask a question or describe a bug..."
                        className="pr-24 py-4 min-h-[60px] max-h-[200px] resize-none bg-slate-900 border-slate-700/50 group-hover:border-slate-600 transition-colors shadow-inner"
                    />
                    <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-500 hover:text-sky-400"
                            title="Attach Code"
                        >
                            <CodeIcon className="w-5 h-5" />
                        </Button>
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim() || isLoading}
                            className="h-9 w-9 rounded-lg"
                        >
                            <SendIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between px-1">
                    <span>Shift + Enter for new line • Enter to send</span>
                    <span className="flex items-center">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 mr-1" /> AI Assistant Online
                    </span>
                </div>
            </form>
        </div>
    );
};
