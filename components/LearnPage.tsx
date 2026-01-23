import React from 'react';
import { LEARNING_URL } from '../config';

const LearnPage: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            <section className="relative pt-48 pb-32 overflow-hidden bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-text-heading-light mb-10 tracking-tight">
                        Learn AI with <span className="text-primary">WeCreate</span>
                    </h1>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <p className="text-xl md:text-2xl text-text-body-light font-body font-light leading-relaxed">
                            We offer AI education through workshops, courses, and training programs designed to be practical, accessible, and aligned with the future of work.
                        </p>
                        
                        <div className="bg-slate-50 p-10 rounded-xl border border-border-light text-left shadow-soft">
                            <h3 className="text-sm font-heading font-bold text-primary tracking-widest uppercase mb-6">Our learning experiences are delivered through:</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3 text-lg font-body font-medium text-text-heading-light">
                                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                    community organizations
                                </div>
                                <div className="flex items-center gap-3 text-lg font-body font-medium text-text-heading-light">
                                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                    institutions
                                </div>
                                <div className="flex items-center gap-3 text-lg font-body font-medium text-text-heading-light">
                                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                    workforce programs
                                </div>
                                <div className="flex items-center gap-3 text-lg font-body font-medium text-text-heading-light">
                                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                    partner initiatives
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button 
                                onClick={() => window.open(LEARNING_URL, '_blank')}
                                className="bg-primary hover:bg-primary-hover text-white font-heading font-bold py-6 px-12 rounded-xl shadow-xl transition-all transform hover:scale-105 inline-flex items-center gap-3"
                            >
                                Explore Learning Opportunities
                                <span className="material-symbols-outlined">open_in_new</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LearnPage;