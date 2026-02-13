import React from 'react';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import {
    NextJsIcon,
    ReactIcon,
    TypeScriptIcon,
    TailwindIcon,
    PythonIcon,
    TensorFlowIcon,
    DockerIcon,
    DatabaseIcon,
    ServerIcon,
    LightningIcon
} from '@/components/icons';

export const TechStackSection = () => {
    const categories = [
        {
            name: "Frontend",
            techs: [
                { name: "Next.js 14", icon: <NextJsIcon />, badge: "Framework" },
                { name: "React 18", icon: <ReactIcon />, badge: "Library" },
                { name: "TypeScript", icon: <TypeScriptIcon />, badge: "Language" },
                { name: "Tailwind CSS", icon: <TailwindIcon />, badge: "Styling" }
            ]
        },
        {
            name: "Backend & ML",
            techs: [
                { name: "Python 3.10", icon: <PythonIcon />, badge: "Language" },
                { name: "FastAPI", icon: <ServerIcon />, badge: "API" },
                { name: "TensorFlow", icon: <TensorFlowIcon />, badge: "Deep Learning" },
                { name: "Scikit-Learn", icon: <LightningIcon />, badge: "ML Library" }
            ]
        },
        {
            name: "Infrastructure",
            techs: [
                { name: "Docker", icon: <DockerIcon />, badge: "Container" },
                { name: "PostgreSQL", icon: <DatabaseIcon />, badge: "Database" },
                { name: "Redis", icon: <LightningIcon />, badge: "Caching" },
                { name: "Nginx", icon: <ServerIcon />, badge: "Web Server" }
            ]
        }
    ];

    return (
        <section className="py-24 bg-slate-950">
            <Container>
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-50 tracking-tight">
                        Built with Modern Tech Stack
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Leveraging industry-standard tools and frameworks to provide the best developer experience and performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {categories.map((cat) => (
                        <div key={cat.name} className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center">
                                <span className="w-8 h-px bg-slate-800 mr-4" />
                                {cat.name}
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {cat.techs.map((tech) => (
                                    <div key={tech.name} className="flex items-center p-4 rounded-xl bg-slate-900 border border-slate-800 group hover:border-slate-600 transition-colors">
                                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 mr-4 group-hover:scale-110 transition-transform">
                                            {React.cloneElement(tech.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                                        </div>
                                        <div>
                                            <h4 className="text-slate-200 font-semibold text-sm">{tech.name}</h4>
                                            <Badge variant="slate" className="mt-1 opacity-60 group-hover:opacity-100">{tech.badge}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
