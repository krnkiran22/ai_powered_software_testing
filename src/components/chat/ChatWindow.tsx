"use client";

import React from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Card } from '@/components/ui/Card';
import { BrainIcon, TrashIcon, AnalyzeIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const ChatWindow = () => {
    const { messages, sendMessage, isLoading, clearChat } = useChat();

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            <Card className="flex-grow flex flex-col border-slate-800 shadow-2xl relative overflow-hidden" hover={false}>
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                            <BrainIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-100 tracking-tight">AI Testing Assistant</h2>
                            <div className="flex items-center text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                                Active
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={clearChat} className="text-slate-500 hover:text-red-400">
                            <TrashIcon className="w-4 h-4 mr-2" />
                            Clear
                        </Button>
                        <div className="w-px h-4 bg-slate-800 mx-2" />
                        <Link href="/analyze">
                            <Button variant="outline" size="sm" className="space-x-2">
                                <AnalyzeIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Code Analysis</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Message List */}
                <MessageList messages={messages} isLoading={isLoading} />

                {/* Chat Input */}
                <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
            </Card>
        </div>
    );
};
