import React from 'react';

export const TypingIndicator = () => {
    return (
        <div className="flex items-center space-x-2 p-4 bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none w-fit">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-2">AI is typing</div>
            <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce" />
            </div>
        </div>
    );
};
