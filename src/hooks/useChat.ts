"use client";

import { useState, useCallback, useRef, useEffect } from 'react';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    code?: {
        language: string;
        value: string;
    };
}

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI testing assistant. I can help you with writing test cases, debugging code issues, testing best practices, or providing feedback on your snippets. Paste any code and I'll analyze it for you!",
            timestamp: new Date(),
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (content: string, code?: { language: string; value: string }) => {
        if (!content.trim() && !code) return;

        // Build the message content
        let messageContent = content;
        if (code) {
            messageContent = `${content}\n\n\`\`\`${code.language}\n${code.value}\n\`\`\``;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageContent,
            timestamp: new Date(),
            code,
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Call the chat API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();
            
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content,
                timestamp: new Date(),
            };
            
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error processing your message. Please try again.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const clearChat = useCallback(() => {
        setMessages([
            {
                id: '1',
                role: 'assistant',
                content: "Hello! I'm your AI testing assistant. I can help you with writing test cases, debugging code issues, testing best practices, or providing feedback on your snippets. Paste any code and I'll analyze it for you!",
                timestamp: new Date(),
            }
        ]);
    }, []);

    return {
        messages,
        sendMessage,
        isLoading,
        clearChat,
    };
};

