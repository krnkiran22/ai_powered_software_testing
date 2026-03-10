"use client";

import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    CheckIcon,
    WarningIcon,
    ErrorIcon,
    DownloadIcon,
    CodeIcon,
    AnalyzeIcon,
    ChartIcon,
    SparklesIcon,
    BugIcon,
    InfoIcon,
    LightningIcon
} from '@/components/icons';
import { AnalysisResult } from '@/hooks/useAnalysis';
import { RiskGauge } from './RiskGauge';
import { ModelComparison } from './ModelComparison';
import { MetricsCard } from './MetricsCard';
import { IssuesList } from './IssuesList';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';

interface ResultsPanelProps {
    result: AnalysisResult | null;
    isAnalyzing: boolean;
    projectName: string;
}

const exportToPDF = (result: AnalysisResult, projectName: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;
    const margin = 20;
    const lineHeight = 6;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 25) {
            doc.addPage();
            yPosition = 20;
            addPageFooter();
            return true;
        }
        return false;
    };

    // Helper function to add page footer
    const addPageFooter = () => {
        const footerY = pageHeight - 15;
        doc.setDrawColor(220, 220, 220);
        doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120, 120, 120);
        doc.text('AI-Powered Software Testing Platform', margin, footerY);
        doc.text(`Page ${doc.getCurrentPageInfo().pageNumber}`, pageWidth - margin, footerY, { align: 'right' });
    };

    // Helper function to add text with word wrap
    const addWrappedText = (text: string, x: number, maxWidth: number, fontSize: number = 10, align: 'left' | 'justify' = 'left') => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string, index: number) => {
            doc.text(line, x, yPosition);
            yPosition += lineHeight;
        });
    };

    // Helper to add a section header
    const addSectionHeader = (title: string, addSpace: boolean = true) => {
        if (addSpace) {
            yPosition += 8;
        }
        checkPageBreak(15);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138);
        doc.text(title, margin, yPosition);
        yPosition += 3;
        doc.setDrawColor(30, 58, 138);
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, margin + 60, yPosition);
        yPosition += 8;
    };

    // Helper to add a subsection
    const addSubSection = (title: string) => {
        checkPageBreak(12);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(title, margin, yPosition);
        yPosition += 7;
    };

    // Helper to add body text
    const addBodyText = (text: string) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        addWrappedText(text, margin, contentWidth);
        yPosition += 2;
    };

    // Helper to add bullet point
    const addBulletPoint = (text: string) => {
        checkPageBreak(15);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text('•', margin + 2, yPosition);
        addWrappedText(text, margin + 8, contentWidth - 8);
    };

    // ========== TITLE PAGE ==========
    // Logo/Header Area
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('CODE ANALYSIS REPORT', pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Security Assessment', pageWidth / 2, 38, { align: 'center' });

    yPosition = 70;

    // Report Information Box
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(margin, yPosition, contentWidth, 55, 3, 3, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 70, 70);
    doc.text('Project Name:', margin + 10, yPosition + 12);
    doc.text('Report Generated:', margin + 10, yPosition + 22);
    doc.text('Analysis Engine:', margin + 10, yPosition + 32);
    doc.text('Report Status:', margin + 10, yPosition + 42);
    doc.text('Analysis Date:', margin + 10, yPosition + 52);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(10);
    const projectNameText = doc.splitTextToSize(projectName, contentWidth - 85);
    doc.text(projectNameText[0], margin + 65, yPosition + 12);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    const now = new Date();
    doc.text(now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }), margin + 65, yPosition + 22);
    doc.text('Groq LLM v2.4 (llama-3.3-70b)', margin + 65, yPosition + 32);
    doc.text('Completed Successfully', margin + 65, yPosition + 42);
    doc.text(now.toLocaleDateString('en-US', { dateStyle: 'medium' }), margin + 65, yPosition + 52);

    yPosition += 70;

    // Risk Assessment Overview Box
    const riskColor = result.riskLevel === 'LOW' ? [16, 185, 129] : 
                      result.riskLevel === 'MEDIUM' ? [245, 158, 11] : [239, 68, 68];
    
    doc.setFillColor(riskColor[0], riskColor[1], riskColor[2], 0.1);
    doc.setDrawColor(riskColor[0], riskColor[1], riskColor[2]);
    doc.setLineWidth(1);
    doc.roundedRect(margin, yPosition, contentWidth, 40, 3, 3, 'FD');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 70, 70);
    doc.text('OVERALL RISK ASSESSMENT', margin + 10, yPosition + 12);
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
    doc.text(result.riskLevel, margin + 10, yPosition + 28);
    
    doc.setFontSize(16);
    doc.text(`${result.probability}%`, pageWidth - margin - 35, yPosition + 28, { align: 'right' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Defect Probability', pageWidth - margin - 35, yPosition + 35, { align: 'right' });

    yPosition += 50;

    // ========== EXECUTIVE SUMMARY ==========
    addSectionHeader('Executive Summary');
    
    const riskDescription = result.riskLevel === 'LOW' 
        ? 'The analyzed codebase demonstrates good coding practices with minimal security concerns. The identified issues are minor and do not pose significant risks to the application\'s security or functionality.'
        : result.riskLevel === 'MEDIUM'
        ? 'The codebase exhibits several areas of concern that require attention. While not critical, these issues could potentially lead to security vulnerabilities or maintainability problems if left unaddressed.'
        : 'The code analysis has identified critical issues that require immediate attention. These vulnerabilities pose significant security risks and could compromise the integrity and functionality of the application.';
    
    addBodyText(
        `This comprehensive code analysis report provides an in-depth assessment of the submitted source code using advanced AI-powered static analysis techniques. ${riskDescription}`
    );
    yPosition += 3;
    
    addBodyText(
        `Our analysis leveraged multiple machine learning models including Deep Learning, Random Forest, Support Vector Machine (SVM), and Bayesian Network classifiers to provide a robust, multi-faceted evaluation. The defect probability score of ${result.probability}% indicates ${result.probability < 30 ? 'low' : result.probability < 70 ? 'moderate' : 'high'} likelihood of potential defects or vulnerabilities.`
    );
    yPosition += 3;

    const issueCount = result.issues.length;
    addBodyText(
        `The automated scan identified ${issueCount} potential ${issueCount === 1 ? 'issue' : 'issues'} across the codebase. ${issueCount === 0 ? 'This is an excellent result, indicating well-structured and secure code.' : issueCount < 5 ? 'These issues should be reviewed and addressed to maintain code quality.' : 'A detailed remediation plan is recommended to address these concerns systematically.'}`
    );

    // ========== CODE METRICS ANALYSIS ==========
    doc.addPage();
    yPosition = 20;
    addPageFooter();
    
    addSectionHeader('Code Metrics Analysis', false);
    
    addBodyText(
        'The following metrics provide quantitative measures of code complexity, maintainability, and potential defect density. These measurements are essential for understanding the overall health of the codebase and identifying areas that may require refactoring or additional testing.'
    );
    yPosition += 5;

    // Metrics Grid
    const metricsData = [
        { 
            label: 'Lines of Code (LOC)', 
            value: result.metrics.loc,
            description: 'Total number of code lines analyzed'
        },
        { 
            label: 'Cyclomatic Complexity', 
            value: result.metrics.complexity,
            description: 'Measure of code path complexity'
        },
        { 
            label: 'Halstead Volume', 
            value: result.metrics.halsteadVolume.toFixed(2),
            description: 'Program vocabulary and length metric'
        },
        { 
            label: 'Halstead Difficulty', 
            value: result.metrics.halsteadDifficulty.toFixed(2),
            description: 'Difficulty level to understand code'
        },
        { 
            label: 'Unique Operators', 
            value: result.metrics.operators,
            description: 'Distinct operators used in code'
        },
        { 
            label: 'Unique Operands', 
            value: result.metrics.operands,
            description: 'Distinct operands used in code'
        }
    ];

    metricsData.forEach((metric, index) => {
        if (index % 2 === 0 && index > 0) {
            yPosition += 8;
        }
        checkPageBreak(28);
        
        const col = index % 2;
        const xPos = margin + (col * (contentWidth / 2 + 5));
        const boxWidth = (contentWidth / 2) - 5;
        
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(xPos, yPosition, boxWidth, 25, 2, 2, 'F');
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(metric.label, xPos + 5, yPosition + 7);
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138);
        doc.text(String(metric.value), xPos + 5, yPosition + 16);
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120, 120, 120);
        const descLines = doc.splitTextToSize(metric.description, boxWidth - 10);
        doc.text(descLines, xPos + 5, yPosition + 21);
        
        if (index % 2 === 1 || index === metricsData.length - 1) {
            if (index < metricsData.length - 1) {
                yPosition += 28;
            } else {
                yPosition += 30;
            }
        }
    });

    // Interpretation
    yPosition += 5;
    checkPageBreak(25);
    addSubSection('Interpretation:');
    
    const complexityLevel = result.metrics.complexity < 10 ? 'low' : result.metrics.complexity < 20 ? 'moderate' : 'high';
    addBodyText(
        `The cyclomatic complexity of ${result.metrics.complexity} indicates a ${complexityLevel} level of code complexity. ${complexityLevel === 'low' ? 'This suggests the code is relatively straightforward and easy to test.' : complexityLevel === 'moderate' ? 'The code has moderate complexity and may benefit from modularization.' : 'High complexity may indicate the need for refactoring to improve maintainability.'}`
    );

    // ========== ML MODEL PREDICTIONS ==========
    checkPageBreak(60);
    addSectionHeader('Machine Learning Model Predictions');
    
    addBodyText(
        'Our analysis employed an ensemble of four distinct machine learning models, each trained on extensive datasets of code vulnerabilities. This multi-model approach ensures robust predictions by leveraging different algorithmic strengths:'
    );
    yPosition += 5;

    result.models.forEach((model) => {
        checkPageBreak(20);
        
        doc.setFillColor(250, 250, 250);
        doc.roundedRect(margin, yPosition, contentWidth, 16, 2, 2, 'F');
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(model.name, margin + 5, yPosition + 7);
        
        // Status badge
        const statusColor = model.status === 'safe' ? [16, 185, 129] : 
                           model.status === 'warning' ? [245, 158, 11] : [239, 68, 68];
        doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
        doc.roundedRect(pageWidth - margin - 45, yPosition + 2, 40, 8, 2, 2, 'F');
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(model.status.toUpperCase(), pageWidth - margin - 25, yPosition + 7, { align: 'center' });
        
        // Prediction score
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
        doc.text(`${model.prediction}%`, margin + 5, yPosition + 14);
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120, 120, 120);
        doc.text('Confidence Score', margin + 30, yPosition + 14);
        
        yPosition += 20;
    });

    yPosition += 3;
    addBodyText(
        'The ensemble prediction methodology provides higher accuracy than single-model approaches by combining multiple perspectives on code quality and security.'
    );

    // ========== IDENTIFIED ISSUES ==========
    doc.addPage();
    yPosition = 20;
    addPageFooter();
    
    addSectionHeader('Identified Issues & Vulnerabilities', false);
    
    if (result.issues.length === 0) {
        addBodyText(
            'Excellent news! Our comprehensive analysis did not identify any critical security vulnerabilities or code quality issues. This indicates that the codebase follows best practices and maintains high standards for security and maintainability.'
        );
        yPosition += 3;
        addBodyText(
            'However, regular code reviews and continuous monitoring are still recommended as part of a robust software development lifecycle.'
        );
    } else {
        addBodyText(
            `Our analysis has identified ${result.issues.length} potential ${result.issues.length === 1 ? 'issue' : 'issues'} that ${result.issues.length === 1 ? 'requires' : 'require'} attention. Each issue has been classified by severity level and includes specific recommendations for remediation.`
        );
        yPosition += 8;

        result.issues.forEach((issue, index) => {
            checkPageBreak(35);
            
            // Issue header box
            const severityColor = issue.severity === 'HIGH' ? [239, 68, 68] : 
                                 issue.severity === 'MEDIUM' ? [245, 158, 11] : [234, 179, 8];
            
            doc.setFillColor(severityColor[0], severityColor[1], severityColor[2], 0.1);
            doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
            doc.setLineWidth(0.5);
            doc.roundedRect(margin, yPosition, contentWidth, 10, 2, 2, 'FD');
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(50, 50, 50);
            doc.text(`Issue #${index + 1}`, margin + 5, yPosition + 7);
            
            // Severity badge
            doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
            doc.roundedRect(margin + 30, yPosition + 2, 25, 6, 2, 2, 'F');
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text(issue.severity, margin + 42.5, yPosition + 6.5, { align: 'center' });
            
            // Line number
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(`Line ${issue.line}`, margin + 62, yPosition + 7);
            
            yPosition += 14;
            
            // Issue description
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            addWrappedText(issue.description, margin + 5, contentWidth - 10);
            yPosition += 6;
        });
    }

    // ========== RECOMMENDATIONS ==========
    checkPageBreak(50);
    addSectionHeader('Recommendations & Action Items');
    
    addBodyText(
        'Based on our comprehensive analysis, we recommend the following actions to improve code quality, security, and maintainability. These recommendations are prioritized based on their potential impact on the overall system integrity.'
    );
    yPosition += 8;

    result.recommendations.forEach((recommendation, index) => {
        checkPageBreak(20);
        
        // Recommendation number circle
        doc.setFillColor(30, 58, 138);
        doc.circle(margin + 3, yPosition - 2, 3, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(String(index + 1), margin + 3, yPosition, { align: 'center' });
        
        // Recommendation text
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        const recLines = doc.splitTextToSize(recommendation, contentWidth - 12);
        doc.text(recLines, margin + 10, yPosition);
        yPosition += recLines.length * lineHeight + 5;
    });

    // ========== CONCLUSION ==========
    checkPageBreak(40);
    addSectionHeader('Conclusion');
    
    const conclusionText = result.riskLevel === 'LOW'
        ? 'The analyzed codebase demonstrates strong adherence to security best practices and coding standards. Continue maintaining these high standards through regular code reviews, automated testing, and staying updated with the latest security practices.'
        : result.riskLevel === 'MEDIUM'
        ? 'The codebase shows promise but requires attention to the identified issues. Implementing the recommended actions will significantly improve the security posture and maintainability of the application. We recommend prioritizing medium and high severity issues first.'
        : 'Immediate action is required to address the critical issues identified in this analysis. We strongly recommend conducting a comprehensive security audit and implementing the recommended remediation strategies as soon as possible to protect the application and its users.';
    
    addBodyText(conclusionText);
    yPosition += 5;
    
    addBodyText(
        'This report should be reviewed by the development team, security personnel, and relevant stakeholders. Regular code analysis should be integrated into your development workflow to maintain code quality and security standards.'
    );

    // ========== FOOTER & METADATA ==========
    yPosition = pageHeight - 40;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('About This Report', margin, yPosition);
    yPosition += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    const footerText = 'This report was generated by the AI-Powered Software Testing Platform using Groq\'s LLM Engine v2.4. The analysis combines multiple machine learning models and static code analysis techniques to provide comprehensive security and quality assessments.';
    const footerLines = doc.splitTextToSize(footerText, contentWidth);
    doc.text(footerLines, margin, yPosition);

    // Final page footer
    addPageFooter();

    // Save PDF
    const sanitizedProjectName = projectName.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
    const fileName = `${sanitizedProjectName}_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};

export const ResultsPanel = ({ result, isAnalyzing, projectName }: ResultsPanelProps) => {
    if (isAnalyzing) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8 bg-slate-900 border-slate-800" hover={false}>
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-[6px] border-slate-800 border-t-sky-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnalyzeIcon className="w-10 h-10 text-sky-400" />
                    </div>
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-100">Analyzing Codebase</h3>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                        Scanning for vulnerabilities and architectural defects...
                    </p>
                </div>
            </Card>
        );
    }

    if (!result) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8 bg-slate-900 border-slate-800" hover={false}>
                <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 text-slate-500">
                    <ChartIcon className="w-16 h-16" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-300">Analysis Engine Ready</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Input your code on the left to generate a professional assessment report.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-900 border-slate-800 p-4" hover={false}>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-sky-400 border border-slate-700">
                            <ShieldIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Level</p>
                            <p className={cn(
                                "text-lg font-bold",
                                result.riskLevel === 'LOW' ? "text-emerald-400" :
                                    result.riskLevel === 'MEDIUM' ? "text-amber-400" : "text-red-400"
                            )}>{result.riskLevel}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-slate-900 border-slate-800 p-4" hover={false}>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-amber-500 border border-slate-700">
                            <WarningIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Issues Found</p>
                            <p className="text-lg font-bold text-slate-100">{result.issues.length} Potential</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-slate-900 border-slate-800 p-4" hover={false}>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-purple-400 border border-slate-700">
                            <SparklesIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Metric Analysis</p>
                            <p className="text-lg font-bold text-slate-100">AI Verified</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Insights Card */}
            <Card hover={false} className="border-slate-800 overflow-hidden bg-slate-900">
                <div className="grid grid-cols-1 xl:grid-cols-2">
                    <div className="p-10 flex flex-col items-center justify-center border-b xl:border-b-0 xl:border-r border-slate-800">
                        <RiskGauge level={result.riskLevel} probability={result.probability} />
                        <div className="mt-8 text-center space-y-1">
                            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-sm">Defect Distribution</h4>
                            <p className="text-[10px] text-slate-500">Cross-verified repository metrics</p>
                        </div>
                    </div>
                    <div className="p-10 space-y-8 bg-slate-950/20">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Ensemble Logic Results</h3>
                            <Badge variant="slate" className="text-[9px]">ENGINE V2</Badge>
                        </div>
                        <ModelComparison models={result.models} />
                    </div>
                </div>
            </Card>

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <div className="flex items-center space-x-2 px-2">
                        <CodeIcon className="w-3.5 h-3.5 text-sky-400" />
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Static Analytics</h3>
                    </div>
                    <Card hover={false} className="bg-slate-900 border-slate-800 min-h-[464px]">
                        <CardBody className="p-6">
                            <MetricsCard metrics={result.metrics} />

                            <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                                    <InfoIcon className="w-3 h-3 mr-2" />
                                    Security Context
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    Metrics processed via Groq LLM to identify high-risk patterns in structural complexity.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center space-x-2 px-2">
                        <BugIcon className="w-3.5 h-3.5 text-red-500" />
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Validated Defects</h3>
                    </div>
                    <Card hover={false} className="bg-slate-900 border-slate-800 min-h-[464px]">
                        <CardBody className="p-6">
                            <IssuesList issues={result.issues} />
                        </CardBody>
                    </Card>
                </section>
            </div>

            {/* Recommendations Section */}
            <section className="space-y-4 pb-8">
                <div className="flex items-center space-x-2 px-2">
                    <LightningIcon className="w-3.5 h-3.5 text-amber-500" />
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Mitigation Roadmap</h3>
                </div>
                <Card hover={false} className="bg-slate-900 border-slate-800">
                    <CardBody className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.recommendations.map((rec, i) => (
                                <div key={i} className="flex items-start p-5 rounded-xl bg-slate-800/30 border border-slate-700 hover:border-slate-600 transition-colors">
                                    <div className="mr-4 mt-0.5 p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
                                        <CheckIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-sm text-slate-300 font-medium leading-relaxed">{rec}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center">
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Groq Engine v2.4 Certified</p>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-100"
                                onClick={() => exportToPDF(result, projectName)}
                            >
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                <span>Export Assessment</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
};

// Internal icons helper
const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
