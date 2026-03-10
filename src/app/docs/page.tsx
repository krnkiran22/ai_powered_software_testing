import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { 
    SparklesIcon, 
    AnalyzeIcon, 
    ChatIcon, 
    UploadIcon,
    CodeIcon 
} from '@/components/icons';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6">
                        <SparklesIcon className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-slate-50 mb-4">
                        Documentation
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Learn how to use Software Defect AI to analyze code, detect vulnerabilities, and improve software quality.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="space-y-8 max-w-4xl mx-auto">
                    
                    {/* Getting Started */}
                    <Card className="border-slate-800">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-slate-50 flex items-center">
                                <SparklesIcon className="w-6 h-6 mr-3 text-sky-500" />
                                Getting Started
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <p className="text-slate-300 mb-4">
                                Software Defect AI is an AI-powered platform that helps developers identify bugs, security vulnerabilities, 
                                and code quality issues before they reach production.
                            </p>
                            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Key Features</h3>
                                <ul className="space-y-2 text-slate-300">
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>AI-powered code analysis using advanced language models</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>Multi-model predictions (Deep Learning, Random Forest, SVM, Bayesian)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>Static code metrics (LOC, Complexity, Halstead metrics)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>Interactive AI chat assistant for testing guidance</span>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Code Analysis */}
                    <Card className="border-slate-800">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-slate-50 flex items-center">
                                <AnalyzeIcon className="w-6 h-6 mr-3 text-sky-500" />
                                Code Analysis
                            </h2>
                        </CardHeader>
                        <CardBody className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-200 mb-3">How to Analyze Code</h3>
                                <ol className="space-y-3 text-slate-300">
                                    <li className="flex">
                                        <span className="shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mr-3">1</span>
                                        <div>
                                            <strong className="text-slate-100">Navigate to Analyze Page</strong>
                                            <p className="text-sm text-slate-400 mt-1">Click on "Analyze" in the navigation menu</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mr-3">2</span>
                                        <div>
                                            <strong className="text-slate-100">Upload or Paste Code</strong>
                                            <p className="text-sm text-slate-400 mt-1">Choose to upload a file, paste code directly, or load a sample</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mr-3">3</span>
                                        <div>
                                            <strong className="text-slate-100">Enter File Name</strong>
                                            <p className="text-sm text-slate-400 mt-1">Give your analysis a descriptive name for easy identification</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mr-3">4</span>
                                        <div>
                                            <strong className="text-slate-100">Click Analyze</strong>
                                            <p className="text-sm text-slate-400 mt-1">Our AI will analyze your code and provide detailed results</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mr-3">5</span>
                                        <div>
                                            <strong className="text-slate-100">Review Results</strong>
                                            <p className="text-sm text-slate-400 mt-1">View metrics, model predictions, issues, and recommendations</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mr-3">6</span>
                                        <div>
                                            <strong className="text-slate-100">Export Report</strong>
                                            <p className="text-sm text-slate-400 mt-1">Click "Export Assessment" to download a PDF report</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Supported Languages</h4>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'].map(lang => (
                                        <span key={lang} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-md text-sm font-medium border border-slate-700">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Understanding Results */}
                    <Card className="border-slate-800">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-slate-50">Understanding Results</h2>
                        </CardHeader>
                        <CardBody className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-200 mb-3">Risk Levels</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                                        <div className="flex items-center mb-2">
                                            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                            <span className="font-bold text-green-400">LOW</span>
                                        </div>
                                        <p className="text-sm text-slate-400">Minimal risk. Code is generally safe with few or no issues detected.</p>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                                        <div className="flex items-center mb-2">
                                            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                                            <span className="font-bold text-yellow-400">MEDIUM</span>
                                        </div>
                                        <p className="text-sm text-slate-400">Moderate risk. Some issues detected that should be reviewed.</p>
                                    </div>
                                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                                        <div className="flex items-center mb-2">
                                            <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                                            <span className="font-bold text-orange-400">HIGH</span>
                                        </div>
                                        <p className="text-sm text-slate-400">High risk. Significant issues that need immediate attention.</p>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                        <div className="flex items-center mb-2">
                                            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                                            <span className="font-bold text-red-400">CRITICAL</span>
                                        </div>
                                        <p className="text-sm text-slate-400">Critical risk. Severe vulnerabilities requiring urgent fixes.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-slate-200 mb-3">Code Metrics</h3>
                                <div className="space-y-3">
                                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                        <strong className="text-slate-100">Lines of Code (LOC)</strong>
                                        <p className="text-sm text-slate-400 mt-1">Total number of lines in your code including blank lines</p>
                                    </div>
                                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                        <strong className="text-slate-100">Cyclomatic Complexity</strong>
                                        <p className="text-sm text-slate-400 mt-1">Measures the number of independent paths through the code</p>
                                    </div>
                                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                        <strong className="text-slate-100">Halstead Metrics</strong>
                                        <p className="text-sm text-slate-400 mt-1">Volume and difficulty measures based on operators and operands</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* AI Chat Assistant */}
                    <Card className="border-slate-800">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-slate-50 flex items-center">
                                <ChatIcon className="w-6 h-6 mr-3 text-sky-500" />
                                AI Chat Assistant
                            </h2>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <p className="text-slate-300">
                                Our AI chat assistant is available 24/7 to help you with testing questions, code review, and best practices.
                            </p>
                            
                            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">What You Can Ask</h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>How to write unit tests for specific code</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>Testing framework recommendations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>Debugging strategies for errors</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>Code review and improvement suggestions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-sky-500 mr-2">•</span>
                                        <span>Best practices for test coverage</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
                                <p className="text-sm text-sky-300">
                                    <strong>Tip:</strong> You can paste code snippets directly in the chat for instant analysis and feedback!
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Tips & Best Practices */}
                    <Card className="border-slate-800">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-slate-50">Tips & Best Practices</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-sky-500 mt-2 mr-3"></span>
                                    <div>
                                        <strong className="text-slate-100">Keep code focused:</strong>
                                        <p className="text-sm text-slate-400 mt-1">Analyze individual functions or classes for more accurate results</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-sky-500 mt-2 mr-3"></span>
                                    <div>
                                        <strong className="text-slate-100">Review all severity levels:</strong>
                                        <p className="text-sm text-slate-400 mt-1">Don't ignore low severity issues - they can accumulate into larger problems</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-sky-500 mt-2 mr-3"></span>
                                    <div>
                                        <strong className="text-slate-100">Use descriptive file names:</strong>
                                        <p className="text-sm text-slate-400 mt-1">This helps when exporting multiple reports for different code sections</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-sky-500 mt-2 mr-3"></span>
                                    <div>
                                        <strong className="text-slate-100">Export reports:</strong>
                                        <p className="text-sm text-slate-400 mt-1">Save PDF reports for documentation and tracking improvements over time</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                </div>
            </Container>
        </div>
    );
}
