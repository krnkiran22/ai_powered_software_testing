"use client";

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    language: string;
}

export const CodeEditor = ({ value, onChange, language }: CodeEditorProps) => {
    return (
        <div className="h-[400px] w-full border border-slate-800 rounded-lg overflow-hidden bg-[#1e1e1e]">
            <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                theme="vs-dark"
                value={value}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 }
                }}
            />
        </div>
    );
};
