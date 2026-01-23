import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesPage: React.FC = () => {
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for fixed header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative font-body antialiased bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="Modern tech workspace" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3J2xH3EZWNu6J2v1gmBql59RcfPr8Q99IhNIpCJ3tc8vXSA5XKyOa8crKXrg5TJUnrENEx1y7l2NWfApgbalxzIwQzEcGWSxSzuRWrX9B21mgypP9J7IcF41KEp5YIIYH6yARTvlrKHT2yDQLdNQjLG3OUPvGEtPQz8ev7P1t0pXoe9kCR8-oU5xjUmbmiD_ymmLLPcLtJRv_xLx7vSHodgx6VD8AKuJbNtBVlnlWNxihoys8wT7d6XXcEh2svn0DYiNVcjjzk19_" />
                    <div className="absolute inset-0 hero-overlay-gradient opacity-90"></div>
                </div>
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 mb-6 font-heading">Our Expertise</span>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[1] sm:leading-[0.95] mb-8 tracking-tight sm:tracking-tighter text-white font-heading font-bold drop-shadow-sm">
                            AI Consulting & <br className="hidden sm:block" />
                            Implementation
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-2xl text-white/95 max-w-2xl font-body font-light leading-relaxed mb-10">
                            We don't just advise; we build. From custom internal tools to AI-powered marketing stacks, we deploy the solutions that move the needle.
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                            <button 
                                onClick={() => navigate('/contact')}
                                className="bg-white text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-heading font-bold text-lg shadow-xl shadow-black/10 hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300"
                            >
                                Start a Project
                            </button>
                            <button 
                                onClick={() => scrollToSection('checkup')}
                                className="border-2 border-white/40 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-heading font-semibold text-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
                            >
                                View Services
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <main>
                {/* Section 1: AI Checkups & Process Analysis */}
                <section id="checkup" className="py-24 sm:py-32 bg-white scroll-mt-32">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
                            <div className="relative">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <img alt="Team collaborating on AI strategy" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMBuiBuH2z5jsP2txkQWhTU3iniR78utSOLpK2npyjgyR31yi9jBKolndobgz7_h1H8OIFe-hCxprngBB1wug6wkKoIM3XIgwboZHsrSnJI21Jes79sWJLqaoL0DlUeje8uF1NkKPrx7-C8LfJA1ADeF9Od8VFma8bAhC7QmY5uVOH5oh_P4glAnDqP5yDQIDkSIrIA8ktaEQS2nqhgxjQkAHJmXg-x6ohdvnNz064HBqRHVBfYDohl5V9AnoEJ4TwSsXSquHRzATx" />
                                </div>
                                <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-primary p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white max-w-[180px] sm:max-w-[240px]">
                                    <p className="text-3xl sm:text-4xl font-heading font-bold mb-1">$300</p>
                                    <p className="text-[10px] sm:text-sm font-medium opacity-90 uppercase tracking-widest leading-tight">Diagnostic Session</p>
                                </div>
                            </div>
                            <div className="lg:ml-auto max-w-2xl mt-12 lg:mt-0">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-heading-light mb-6 sm:mb-8 leading-tight">AI Checkups & <br/>Process Analysis.</h2>
                                <div className="space-y-6 text-xl sm:text-2xl font-body font-light leading-relaxed text-text-body-light">
                                    <p>Before you build, you need clarity. We dive deep into your existing workflows to identify where AI can have the highest impact. Our checkup delivers a clear roadmap for transformation.</p>
                                    <ul className="space-y-4 pt-4">
                                        <li className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-primary text-2xl font-bold mt-0.5">check_circle</span>
                                            <span className="text-text-heading-light font-medium text-lg sm:text-xl">Workflow bottleneck identification</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-primary text-2xl font-bold mt-0.5">check_circle</span>
                                            <span className="text-text-heading-light font-medium text-lg sm:text-xl">Data readiness assessment</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-primary text-2xl font-bold mt-0.5">check_circle</span>
                                            <span className="text-text-heading-light font-medium text-lg sm:text-xl">Custom implementation roadmap</span>
                                        </li>
                                    </ul>
                                    <div className="pt-8 sm:pt-10">
                                        <button 
                                            onClick={() => navigate('/optimize')}
                                            className="w-full sm:w-auto inline-block bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-heading font-bold text-lg sm:text-xl shadow-2xl shadow-purple-500/30 hover:scale-[1.02] transition-all"
                                        >
                                            Schedule Your Checkup ($300)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Custom Consulting */}
                <section className="py-20 sm:py-32 bg-slate-50 border-y border-slate-100">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="order-2 lg:order-1">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-heading-light mb-6 sm:mb-8 leading-tight">AI Consulting & <br/>Implementation.</h2>
                                <div className="space-y-6 sm:space-y-8 text-xl sm:text-2xl font-body font-light leading-relaxed text-text-body-light">
                                    <p>
                                        We don't just advise; we build. From custom internal tools to AI-powered marketing stacks, we deploy the solutions that move the needle.
                                    </p>
                                    <p>
                                        Our approach ensures that every integration is seamless, security-focused, and designed for longevity in an ever-evolving technological landscape.
                                    </p>
                                    <div className="pt-4 flex gap-5 sm:gap-6 items-center">
                                        <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl shadow-soft flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl sm:text-3xl text-secondary">rocket_launch</span>
                                        </div>
                                        <p className="text-base sm:text-lg text-text-body-light italic font-medium">
                                            Designed for organizations ready to scale through intelligent technology.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white bg-white">
                                    <img alt="Developer implementing AI solutions" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Execution Excellence */}
                <section className="py-20 sm:py-32 bg-white">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                            <div className="lg:col-span-7">
                                <div className="mb-12 sm:mb-16">
                                    <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4 font-heading">Core Services</span>
                                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-heading-light leading-[1.1] sm:leading-[0.9] tracking-tight">Execution<br/>Excellence</h2>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    <ServiceCard 
                                        icon="campaign" 
                                        title="Smart Ads" 
                                        desc="AI-driven creative and targeting optimization for better ROI." 
                                    />
                                    <ServiceCard 
                                        icon="auto_mode" 
                                        title="Automations" 
                                        desc="LLM-powered tool connectivity and workflow sync." 
                                        iconColor="text-secondary"
                                        iconBg="bg-secondary-light"
                                    />
                                    <ServiceCard 
                                        icon="apps" 
                                        title="Custom Apps" 
                                        desc="Bespoke AI-native dashboards for operational control." 
                                    />
                                    <ServiceCard 
                                        icon="chat_bubble" 
                                        title="AI Chat" 
                                        desc="Internal knowledge base agents for your team." 
                                        iconColor="text-secondary"
                                        iconBg="bg-secondary-light"
                                    />
                                </div>
                                <div className="mt-10 sm:mt-12">
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="w-full sm:w-auto inline-block bg-primary text-white px-10 sm:px-12 py-4 sm:py-5 rounded-2xl font-heading font-bold text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all text-center"
                                    >
                                        Start a Project
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-span-5 relative hidden sm:block">
                                <div className="aspect-[3/4] lg:aspect-[3/4.2] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-[8px] sm:border-[12px] border-slate-50 shadow-2xl">
                                    <img alt="Execution Excellence Team" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" />
                                </div>
                                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-4 shadow-2xl flex items-center justify-center text-center">
                                    <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Builder <br/> Ecosystem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 sm:py-32 bg-slate-50 border-t border-slate-100">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="max-w-4xl mx-auto bg-white rounded-3xl sm:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
                            <div className="grid md:grid-cols-5 items-center">
                                <div className="md:col-span-3 p-8 sm:p-12 lg:p-16">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-heading-light mb-6 leading-tight">
                                        Ready to build your <br className="hidden sm:block" />
                                        <span className="text-primary">AI future?</span>
                                    </h2>
                                    <p className="text-xl sm:text-2xl text-text-body-light font-light leading-relaxed mb-8 sm:mb-10">
                                        Let's discuss how we can streamline your operations and unlock new creative potential through tailored AI implementation.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                                        <button 
                                            onClick={() => navigate('/contact')}
                                            className="w-full sm:w-auto bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-heading font-bold text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all text-center"
                                        >
                                            Start a Project
                                        </button>
                                        <button 
                                            onClick={() => navigate('/contact')}
                                            className="group flex items-center gap-2 text-text-heading-light font-heading font-bold text-lg hover:text-primary transition-colors text-left"
                                        >
                                            Learn our process
                                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="md:col-span-2 h-full min-h-[300px] sm:min-h-[400px] relative hidden md:block">
                                    <img alt="Builder collaborating" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMBuiBuH2z5jsP2txkQWhTU3iniR78utSOLpK2npyjgyR31yi9jBKolndobgz7_h1H8OIFe-hCxprngBB1wug6wkKoIM3XIgwboZHsrSnJI21Jes79sWJLqaoL0DlUeje8uF1NkKPrx7-C8LfJA1ADeF9Od8VFma8bAhC7QmY5uVOH5oh_P4glAnDqP5yDQIDkSIrIA8ktaEQS2nqhgxjQkAHJmXg-x6ohdvnNz064HBqRHVBfYDohl5V9AnoEJ4TwSsXSquHRzATx" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

const ServiceCard: React.FC<{ 
    icon: string; 
    title: string; 
    desc: string; 
    iconColor?: string; 
    iconBg?: string;
}> = ({ icon, title, desc, iconColor = "text-primary", iconBg = "bg-primary-light" }) => (
    <div className="bg-slate-50/50 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-soft transition-all hover:shadow-hover hover:-translate-y-1 group">
        <div className={`mb-6 sm:mb-8 flex`}>
            <span className={`material-symbols-outlined text-2xl sm:text-3xl ${iconColor} ${iconBg} p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform`}>
                {icon}
            </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4 text-text-heading-light group-hover:text-primary transition-colors">{title}</h3>
        <p className="font-body font-light text-text-body-light leading-relaxed text-lg sm:text-xl">
            {desc}
        </p>
    </div>
);

export default ServicesPage;