import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json({
                error: 'GROQ_API_KEY is not configured in environment variables.'
            }, { status: 500 });
        }

        // Initialize the OpenAI client with Groq configuration
        const client = new OpenAI({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        });

        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
        }

        const systemPrompt = `You are an expert software testing assistant with deep knowledge of:
- Test-driven development (TDD)
- Unit testing, integration testing, and E2E testing
- Testing frameworks (Jest, Pytest, JUnit, Mocha, etc.)
- Code quality and best practices
- Bug detection and debugging strategies
- Test coverage optimization

Help developers with:
- Writing effective test cases
- Debugging code issues
- Suggesting testing strategies
- Reviewing code for potential bugs
- Explaining testing concepts

Be concise, practical, and provide code examples when helpful. Format code snippets using markdown code blocks.`;

        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages.map((msg: any) => ({
                    role: msg.role,
                    content: msg.content
                }))
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error('Empty response from AI');
        }

        return NextResponse.json({ content });

    } catch (error: any) {
        console.error('Chat error:', error);
        return NextResponse.json({ 
            error: error.message || 'Failed to process chat message' 
        }, { status: 500 });
    }
}
