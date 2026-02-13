import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'emerald' | 'amber' | 'red' | 'sky' | 'violet' | 'slate';
    size?: 'sm' | 'md';
}

export const Badge = ({ className, variant = 'slate', size = 'sm', children, ...props }: BadgeProps) => {
    const variants = {
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        red: 'bg-red-500/10 text-red-400 border-red-500/20',
        sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
        slate: 'bg-slate-700/50 text-slate-400 border-slate-700',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider',
        md: 'px-2.5 py-0.5 text-xs font-medium',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border transition-colors',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
