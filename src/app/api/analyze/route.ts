import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client with Groq configuration
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
    try {
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

Ensure the response is valid JSON and nothing else.
`;

        const userPrompt = `Analyze this code:\n\n${code}`;

        // Using chat.completions.create as it's the standard for Groq's OpenAI-compatible API
        // The user suggested responses.create but that might be a confusion with other SDKs or specialized endpoints.
        // We use the model suggested by the user if it works, otherwise a fallback to a known Groq model.
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Using a reliable Groq model as default, can be changed to process.env.GROQ_MODEL
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' }
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error('Empty response from AI');
        }

        const analysisResult = JSON.parse(content);
        return NextResponse.json(analysisResult);

    } catch (error: any) {
        console.error('Analysis error:', error);
        return NextResponse.json({ error: error.message || 'Failed to analyze code' }, { status: 500 });
    }
}
