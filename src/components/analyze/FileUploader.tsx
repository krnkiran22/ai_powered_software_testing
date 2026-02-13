"use client";

import React, { useState } from 'react';
import { UploadIcon, CloseIcon, CodeIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
    onFileSelect: (content: string, fileName: string) => void;
    selectedFileName: string | null;
    onRemove: () => void;
}

export const FileUploader = ({ onFileSelect, selectedFileName, onRemove }: FileUploaderProps) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleFiles = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            onFileSelect(content, file.name);
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-4">
            {!selectedFileName ? (
                <label
                    className={cn(
                        "flex flex-col items-center justify-center h-[400px] w-full rounded-xl border-2 border-dashed transition-all cursor-pointer bg-slate-900/50",
                        isDragging
                            ? "border-sky-500 bg-sky-500/5"
                            : "border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <div className="p-4 rounded-full bg-slate-800 text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                            <UploadIcon className="w-8 h-8" />
                        </div>
                        <p className="mb-2 text-sm text-slate-200">
                            <span className="font-bold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">
                            Python, JS, TS, Java, C++, C, Go, Ruby, PHP
                        </p>
                    </div>
                    <input type="file" className="hidden" onChange={handleChange} />
                </label>
            ) : (
                <div className="flex flex-col items-center justify-center h-[400px] w-full rounded-xl border border-slate-700 bg-slate-900 p-8 text-center space-y-6">
                    <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <CodeIcon className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-bold text-slate-100">{selectedFileName}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">File and content ready for analysis</p>
                    </div>
                    <button
                        onClick={onRemove}
                        className="flex items-center text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                        <CloseIcon className="w-4 h-4 mr-2" />
                        Remove File
                    </button>
                </div>
            )}
        </div>
    );
};
