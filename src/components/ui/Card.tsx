import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    glow?: boolean;
}

export const Card = ({ className, hover = true, glow = false, children, ...props }: CardProps) => {
    return (
        <div
            className={cn(
                'bg-slate-800 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300',
                hover && 'hover:border-slate-600 hover:shadow-lg',
                glow && 'shadow-glow',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 border-b border-slate-700', className)} {...props}>
        {children}
    </div>
);

export const CardBody = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6', className)} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 border-t border-slate-700 bg-slate-900/50', className)} {...props}>
        {children}
    </div>
);
