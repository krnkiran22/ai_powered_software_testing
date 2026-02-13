"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { FileUploader } from './FileUploader';
import { CodeEditor } from './CodeEditor';
import { ResultsPanel } from './ResultsPanel';
import { useAnalysis } from '@/hooks/useAnalysis';
import { AnalyzeIcon, UploadIcon, CodeIcon, SparklesIcon } from '@/components/icons';
import { AnalysisBarChart } from './AnalysisBarChart';

export const AnalyzeContainer = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [code, setCode] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);
    const [language, setLanguage] = useState('python');

    const { isAnalyzing, result, analyzeCode, clearAnalysis } = useAnalysis();

    const handleFileSelect = (content: string, name: string) => {
        setCode(content);
        setFileName(name);
        // Try to detect language from extension
        const ext = name.split('.').pop();
        if (ext === 'py') setLanguage('python');
        else if (ext === 'js' || ext === 'jsx') setLanguage('javascript');
        else if (ext === 'ts' || ext === 'tsx') setLanguage('typescript');
        else if (ext === 'java') setLanguage('java');
        else if (ext === 'cpp' || ext === 'c') setLanguage('cpp');
    };

    const handleClear = () => {
        setCode('');
        setFileName(null);
        clearAnalysis();
    };

    const onAnalyze = () => {
        analyzeCode(code);
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Input Panel */}
                <div className="space-y-6">
                    <Card className="border-slate-800" hover={false}>
                        <CardHeader className="p-0">
                            <Tabs
                                tabs={[
                                    { id: 'upload', label: 'Upload File', icon: <UploadIcon className="w-4 h-4" /> },
                                    { id: 'paste', label: 'Paste Code', icon: <CodeIcon className="w-4 h-4" /> }
                                ]}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                className="border-none rounded-none rounded-t-xl"
                            />
                        </CardHeader>
                        <CardBody className="p-6">
                            {activeTab === 'upload' ? (
                                <FileUploader
                                    onFileSelect={handleFileSelect}
                                    selectedFileName={fileName}
                                    onRemove={handleClear}
                                />
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-2 px-1">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Interactive Editor</span>
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-sky-500"
                                        >
                                            <option value="python">Python</option>
                                            <option value="javascript">JavaScript</option>
                                            <option value="typescript">TypeScript</option>
                                            <option value="java">Java</option>
                                            <option value="cpp">C++</option>
                                        </select>
                                    </div>
                                    <CodeEditor
                                        value={code}
                                        onChange={(val) => setCode(val || '')}
                                        language={language}
                                    />
                                </div>
                            )}
                        </CardBody>
                        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
                            <Button variant="outline" size="sm" onClick={handleClear} disabled={!code || isAnalyzing}>
                                Clear
                            </Button>
                            <Button size="lg" className="px-10" onClick={onAnalyze} disabled={!code || isAnalyzing} isLoading={isAnalyzing}>
                                <AnalyzeIcon className="w-4 h-4 mr-2" />
                                Analyze Code
                            </Button>
                        </div>
                    </Card>

                    {/* Info Card */}
                    <Card className="border-sky-500/20 bg-sky-500/5 p-6" hover={false}>
                        <div className="flex items-start space-x-4">
                            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                                <SparklesIcon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-slate-200">How analysis works</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    We extract static code metrics (LOC, Halstead, Cyclomatic Complexity) and feed them into our ensemble of 4 ML models trained on 10,000+ open-source components from the PROMISE research dataset.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Results Panel */}
                <div className="lg:sticky lg:top-24">
                    <ResultsPanel result={result} isAnalyzing={isAnalyzing} />
                </div>
            </div>

            {result && <AnalysisBarChart data={result.models} />}
        </div>
    );
};
