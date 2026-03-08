import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client with Groq configuration
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json({
                error: 'GROQ_API_KEY is not configured in environment variables. Please add it to .env.local'
            }, { status: 500 });
        }

        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Code is required' }, { status: 400 });
        }

        const systemPrompt = `
You are an expert software security researcher and bug hunter.
Analyze the following code for potential bugs, security vulnerabilities, and logic defects.
Return your analysis strictly as a JSON object with the following structure:
{
    "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
    "probability": number (0-100),
    "metrics": {
        "loc": number,
        "complexity": number (estimated cyclomatic complexity),
        "halsteadVolume": number,
        "halsteadDifficulty": number,
        "operators": number,
        "operands": number
    },
    "models": [
        { "name": "Deep Learning", "prediction": number, "status": "safe" | "warning" | "danger" },
        { "name": "Random Forest", "prediction": number, "status": "safe" | "warning" | "danger" },
        { "name": "SVM", "prediction": number, "status": "safe" | "warning" | "danger" },
        { "name": "Bayes Network", "prediction": number, "status": "safe" | "warning" | "danger" }
    ],
    "issues": [
        { "severity": "HIGH" | "MEDIUM" | "LOW", "line": number, "description": string }
    ],
    "recommendations": [string]
}

Ensure the response is valid JSON and nothing else. Do not include any markdown formatting like \`\`\`json.
`;

        const userPrompt = `Analyze this code:\n\n${code}`;

        // Standard Groq models: llama-3.3-70b-versatile, llama-3.1-8b-instant, etc.
        // The user suggested "openai/gpt-oss-20b", which might be available via a specific provider or setup.
        // We'll use llama-3.3-70b-versatile as a high-quality default.
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.1,
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error('Empty response from AI');
        }

        // Clean content in case the model adds markdown tags despite instructions
        const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
        const analysisResult = JSON.parse(cleanContent);
        return NextResponse.json(analysisResult);

    } catch (error: any) {
        console.error('Analysis error:', error);
        return NextResponse.json({ error: error.message || 'Failed to analyze code' }, { status: 500 });
    }
}
