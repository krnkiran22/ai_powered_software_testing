"use client";

import { useState, useCallback } from 'react';

export interface AnalysisResult {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    probability: number;
    metrics: {
        loc: number;
        complexity: number;
        halsteadVolume: number;
        halsteadDifficulty: number;
        operators: number;
        operands: number;
    };
    models: {
        name: string;
        prediction: number;
        status: 'safe' | 'warning' | 'danger';
    }[];
    issues: {
        severity: 'HIGH' | 'MEDIUM' | 'LOW';
        line: number;
        description: string;
    }[];
    recommendations: string[];
}

export const useAnalysis = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const analyzeCode = useCallback(async (code: string) => {
        if (!code.trim()) return;

        setIsAnalyzing(true);
        setResult(null);

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error during analysis:', error);
            // Optionally set an error state here if the UI supports it
        } finally {
            setIsAnalyzing(false);
        }
    }, []);

    const clearAnalysis = useCallback(() => {
        setResult(null);
    }, []);

    return {
        isAnalyzing,
        result,
        analyzeCode,
        clearAnalysis,
    };
};
