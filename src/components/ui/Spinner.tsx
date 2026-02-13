import React from 'react';
import { cn } from '@/lib/utils';

export const Spinner = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent text-sky-500",
                className
            )}
        />
    );
};
