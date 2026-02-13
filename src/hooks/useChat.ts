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

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
            code,
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: simulateAIResponse(content, code),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1500);
    }, []);

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

function simulateAIResponse(content: string, code?: { language: string; value: string }): string {
    if (code) {
        return `I've analyzed your ${code.language} code. I found a potential risk of division by zero if the input \`b\` is 0. Here's a safer version with input validation:

\`\`\`python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
\`\`\`

Would you like me to generate unit tests for this function?`;
    }

    if (content.toLowerCase().includes('test')) {
        return "To write effective unit tests, you should follow the AAA pattern: Arrange, Act, and Assert. Would you like me to show you an example using Pytest or Jest?";
    }

    return "That's an interesting question about software testing. Based on best practices, you should aim for high branch coverage rather than just line coverage to ensure all logical paths are verified.";
}
