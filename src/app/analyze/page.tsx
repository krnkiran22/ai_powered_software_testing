import { AnalyzeContainer } from '@/components/analyze/AnalyzeContainer';
import { Container } from '@/components/layout/Container';
import { AnalyzeIcon } from '@/components/icons';

export default function AnalyzePage() {
    return (
        <div className="py-12 bg-slate-950 min-h-screen">
            <Container>
                <div className="space-y-2 mb-10">
                    <div className="flex items-center space-x-3 text-sky-400">
                        <AnalyzeIcon className="w-8 h-8" />
                        <h1 className="text-3xl font-bold text-slate-50 tracking-tight">Code Analysis & Defect Prediction</h1>
                    </div>
                    <p className="text-slate-400 max-w-2xl">
                        Upload your source files or paste code snippets to identify potential bugs, security risks, and logic defects using advanced AI models.
                    </p>
                </div>

                <AnalyzeContainer />
            </Container>
        </div>
    );
}
