import { ChatWindow } from '@/components/chat/ChatWindow';
import { Container } from '@/components/layout/Container';

export default function ChatPage() {
    return (
        <div className="py-8 bg-slate-950 min-h-screen">
            <Container>
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold text-slate-50 tracking-tight">AI Testing Assistant</h1>
                    <p className="text-slate-400 text-sm">Ask questions, debug code, or generate test cases with AI.</p>
                </div>
                <ChatWindow />
            </Container>
        </div>
    );
}
