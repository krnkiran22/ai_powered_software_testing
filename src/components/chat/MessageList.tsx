"use client";

import React, { useRef, useEffect } from 'react';
import { Message } from '@/hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
    messages: Message[];
    isLoading: boolean;
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto px-4 py-8 space-y-2 scroll-smooth"
        >
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
                <div className="flex justify-start">
                    <TypingIndicator />
                </div>
            )}
        </div>
    );
};
