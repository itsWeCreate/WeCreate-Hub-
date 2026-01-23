import React, { useState } from 'react';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

interface OptimizePageProps {
    onSuccess?: (message: string) => void;
}

const OptimizePage: React.FC<OptimizePageProps> = ({ onSuccess }) => {
    const BOOK_CHECKUP_URL = "https://book.stripe.com/eVqbJ031G0aofEPbyxd7q01";
    const BOOK_ANALYSIS_URL = "https://book.stripe.com/eVq8wOgSw7CQ3W7byxd7q02";

    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [quizStep, setQuizStep] = useState(0); 
    const [selections, setSelections] = useState<number[]>([]);
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBooking = (url: string) => {
        window.open(url, '_blank');
    };

    const resetQuiz = () => {
        setQuizStep(0);
        setSelections([]);
        setUserData({ name: '', email: '' });
        setIsQuizOpen(false);
    };

    const nextStep = (optionIndex?: number) => {
        if (optionIndex !== undefined) {
            setSelections([...selections, optionIndex]);
        }
        setQuizStep(quizStep + 1);
    };

    const prevStep = () => {
        if (quizStep > 0) {
            setQuizStep(quizStep - 1);
            if (quizStep <= 5 && selections.length > 0) {
                setSelections(selections.slice(0, -1));
            }
        }
    };

    const getDiagnosis = () => {
        if (selections.length < 1) return { category: "General", title: "Operational Drift", description: "Your workflows are functional but lack the structure needed for high-velocity scaling." };
        const bottleneck = selections[0];
        const mapping: Record<number, { category: string; title: string; description: string }> = {
            0: { category: "Revenue Leakage", title: "Lead Decay", description: "Your top-of-funnel is healthy, but manual response times are costing you conversions. Automated lead triage is your fastest ROI." },
            1: { category: "Support Friction", title: "Customer Response Bloat", description: "You're answering the same questions repeatedly. Your business needs a structured knowledge base or an AI support layer." },
            2: { category: "Scaling Cap", title: "Founder Dependency", description: "Everything still flows through you. Your business is limited by your personal bandwidth, not your market potential." },
            3: { category: "Process Fragmentation", title: "Operational Lag", description: "The gaps between steps are manual and messy. You're losing hours every week in the 'handoff' between tools." }
        };
        return mapping[bottleneck] || mapping[2];
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const diagnosis = getDiagnosis();
        const quizSummary = selections.map((s, i) => `Q${i+1}: ${quizQuestions[i].q}\nAnswer: ${quizQuestions[i].options[s]}`).join('\n\n');
        
        const submissionData = {
            fullName: userData.name,
            email: userData.email,
            message: `DIAGNOSIS: ${diagnosis.title} (${diagnosis.category})\n\n--- FULL TRANSCRIPT ---\n${quizSummary}`,
            partnershipType: 'Quiz Lead',
            formType: 'quizSubmission'
        };

        try {
            if (GOOGLE_SHEET_WEB_APP_URL) {
                await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submissionData),
                });
            }
            if (onSuccess) onSuccess("Your AI Snapshot has been submitted successfully!");
            setQuizStep(7); 
        } catch (error) {
            setQuizStep(7); 
        } finally {
            setIsSubmitting(false);
        }
    };

    const quizQuestions = [
        { q: "Where does work slow down most?", sub: "(Pick the one that hurts the most)", options: ["Leads or DMs don’t get answered fast enough", "Customers ask the same questions repeatedly", "My team depends on me for answers", "Handoffs between steps feel messy"] },
        { q: "What happens when that slowdown occurs?", sub: "(Most accurate answer)", options: ["We lose leads or opportunities", "I jump in personally to fix it", "It creates stress or rework later", "It delays decisions or delivery"] },
        { q: "Have you tried tools or systems to fix this?", sub: "(Be honest — everyone struggles here)", options: ["Yes, but nothing really stuck", "Yes, but it added complexity", "Not yet — not sure what to try", "No — we’re still mostly manual"] },
        { q: "Which statement feels most true right now?", sub: "(This is the emotional qualifier)", options: ["“Everything still comes through me”", "“We’re busy, but not efficient”", "“I know we could be moving faster”", "“I don’t want to waste money guessing”"] },
        { q: "If this ONE issue were fixed, what would change most?", sub: "(Future-state question)", options: ["I’d get more time back", "We’d convert more leads", "My team would be more independent", "Things would feel calmer and clearer"] }
    ];

    const faqs = [
        { q: "What exactly happens during a checkup?", a: "We spend 45 minutes mapping your current logic. We find where human data transfer is happening (copy/pasting, manual emailing) and isolate where a machine could do it better." },
        { q: "Do I need to be 'tech-savvy'?", a: "No. You just need to know your business. We handle the technical translation. We focus on the 'What' and the 'Why', then we figure out the 'How'." },
        { q: "What if I already have AI tools?", a: "Most companies do. Our goal is to ensure they are talking to each other and actually solving your specific bottlenecks, not just adding more tabs to your browser." },
        { q: "Can you build the automations for me?", a: "Yes, but we require a Process Analysis first. We won't build until the logic is 100% vetted. This prevents wasted spend on complex builds that don't scale." }
    ];

    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 sm:pt-48 pb-32 font-body text-slate-700 overflow-x-hidden">
            {/* Phase 1: Hero */}
            <section className="container mx-auto px-6 sm:px-8 text-center mb-24 sm:mb-32 animate-fade-in-up">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[120px] font-heading font-bold text-slate-950 leading-[0.9] tracking-tighter mb-4">
                        Get clarity first. <br/>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Tools come second.
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mt-10 mb-12 font-light">
                        Most businesses don't have an AI problem. They have a workflow problem. We help you find exactly where you're stuck before you spend a dollar on tools.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <button onClick={() => handleBooking(BOOK_CHECKUP_URL)} className="w-full sm:w-auto bg-gradient-to-r from-primary to-[#A855F7] hover:scale-[1.02] text-white text-base sm:text-lg font-heading font-bold py-5 px-10 rounded-full shadow-[0_15px_40px_rgba(147,51,234,0.35)] transition-all">
                            Book the AI Checkup ($300)
                        </button>
                        <button onClick={() => setIsQuizOpen(true)} className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-base sm:text-lg font-heading font-bold py-5 px-10 rounded-full shadow-sm transition-all flex items-center justify-center gap-3">
                            <span className="material-symbols-outlined text-lg sm:text-xl font-bold">explore</span>
                            Take the AI Snapshot
                        </button>
                    </div>
                </div>
            </section>

            {/* Phase 2: AI Checkup */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block font-heading">The Standard Diagnostic</span>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 tracking-tight leading-tight">AI Checkup.</h2>
                            <p className="text-xl text-slate-500 font-light mt-4 leading-relaxed">
                                A targeted 45-minute logic session to isolate your single biggest operational bottleneck and provide an immediate path to fix it.
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-heading font-bold text-slate-900">$300</p>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Per Session</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard icon="query_stats" title="Identify Inefficiencies" desc="We dig deep into your current processes to find manual bottlenecks that are draining your team's time." />
                        <FeatureCard icon="map" title="Custom Roadmap" desc="Receive a clear, phased plan for implementing AI tools that actually move the needle for your specific goals." />
                        <FeatureCard icon="auto_fix_high" title="Tool Recommendations" desc="Get a vetted tech stack of AI agents and software tailored to your industry and workflow." />
                    </div>
                </div>
            </section>

            {/* Phase 3: Process Analysis */}
            <section className="py-24 sm:py-32">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl text-left">
                            <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-3 block font-heading">Institutional Deep-Dive</span>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 tracking-tight leading-tight">Process Analysis.</h2>
                            <p className="text-xl text-slate-500 font-light mt-4 leading-relaxed">
                                For high-growth teams that need a 100% vetted operational blueprint. We map your entire business logic to ensure your capacity scales without breaking.
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-heading font-bold text-slate-900">$1,000</p>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Full Audit</p>
                        </div>
                    </div>
                    <div className="bg-navy rounded-[3.5rem] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                            <div className="space-y-12">
                                <div className="flex gap-6 items-start">
                                    <span className="material-symbols-outlined text-secondary text-4xl">account_tree</span>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Full Logic Architecture</h3>
                                        <p className="text-white/60 text-lg font-light leading-relaxed">We map every touchpoint, identifying exactly where humans are doing tasks a machine should handle.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="material-symbols-outlined text-secondary text-4xl">trending_up</span>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Capacity Scaling Audit</h3>
                                        <p className="text-white/60 text-lg font-light leading-relaxed">Isolate where your growth is capped and provide a technical roadmap for AI-driven capacity.</p>
                                    </div>
                                </div>
                                <button onClick={() => handleBooking(BOOK_ANALYSIS_URL)} className="bg-secondary hover:bg-blue-600 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all">Secure Full Analysis</button>
                            </div>
                            <div className="hidden lg:block">
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" className="rounded-3xl opacity-40 mix-blend-luminosity grayscale h-full w-full object-cover" alt="Data mapping" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phase 4: Which one is for you? */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 tracking-tight">Which one is for you?</h2>
                        <p className="text-xl text-slate-500 mt-4 font-light">Segment based on your current operational scale.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-3xl">person</span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-6">Solo Founders / Small Teams</h3>
                            <p className="text-lg text-slate-500 font-light mb-8">You need to reclaim your time and find quick wins. You're feeling overwhelmed by the "busy work" of running the business.</p>
                            <div className="mt-auto pt-4 text-primary font-bold">Recommended: AI Checkup ($300)</div>
                        </div>
                        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-3xl">corporate_fare</span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-6">Established Firms</h3>
                            <p className="text-lg text-slate-500 font-light mb-8">You have team handoffs, complex client flows, and high volume. You need a vetted architecture to scale without headcount.</p>
                            <div className="mt-auto pt-4 text-secondary font-bold">Recommended: Process Analysis ($1,000)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phase 5: How we work */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block font-heading">Our Methodology</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 tracking-tight">How we work.</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        <StepItem num="01" title="Unpack" desc="We map your current logic and identify manual 'human data' transfer points." />
                        <StepItem num="02" title="Isolate" desc="We pinpoint the exact machine-ready tasks where AI has the highest ROI." />
                        <StepItem num="03" title="Architect" desc="We design the blueprint for how tools should talk to each other." />
                        <StepItem num="04" title="Roadmap" desc="We provide the phased guide for deployment and long-term scaling." />
                    </div>
                </div>
            </section>

            {/* Phase 6: The Tool Trap */}
            <section className="py-32 bg-navy text-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-5xl md:text-8xl font-heading font-bold mb-10 tracking-tighter leading-[0.85]">The Tool Trap</h2>
                    <p className="text-2xl md:text-3xl font-light text-white/70 leading-relaxed italic">
                        "Most businesses are buying tools they don't need to solve problems they haven't identified. We stop the cycle of app-fatigue by building the strategy first."
                    </p>
                    <div className="mt-16 flex items-center justify-center gap-4 text-secondary font-bold uppercase tracking-[0.3em] text-sm">
                        <span className="w-12 h-[2px] bg-secondary"></span>
                        STRATEGY OVER SOFTWARE
                        <span className="w-12 h-[2px] bg-secondary"></span>
                    </div>
                </div>
            </section>

            {/* Phase 7: Interactive Snapshot */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100">
                        <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <span className="material-symbols-outlined text-5xl">psychology</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Not ready for a session?</h2>
                        <p className="text-xl text-slate-500 mb-12 font-light leading-relaxed">Take the AI Snapshot to see exactly where your business is losing time before we hop on a call.</p>
                        <button onClick={() => setIsQuizOpen(true)} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-6 px-12 rounded-[2rem] text-2xl shadow-xl shadow-purple-500/20 transition-all">Start the AI Snapshot</button>
                    </div>
                </div>
            </section>

            {/* Phase 8: FAQ */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight text-center mb-16">Common Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Sticky CTA */}
            <section className="py-32 bg-slate-50 text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-8 tracking-tighter">Your move.</h2>
                    <p className="text-xl text-slate-500 mb-12 italic">"The highest ROI 45 minutes you'll spend this month."</p>
                    <button onClick={() => handleBooking(BOOK_CHECKUP_URL)} className="bg-primary hover:bg-primary-hover text-white text-2xl font-bold py-6 px-16 rounded-full shadow-2xl shadow-purple-500/30 transition-all transform hover:-translate-y-1">Book the AI Checkup ($300)</button>
                </div>
            </section>

            {/* QUIZ MODAL */}
            {isQuizOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-xl animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col h-[90vh] max-h-[800px]">
                        {quizStep > 0 && quizStep <= 5 && (
                            <div className="h-1.5 bg-slate-100 w-full"><div className="h-full bg-primary transition-all duration-500" style={{ width: `${(quizStep / 5) * 100}%` }}></div></div>
                        )}
                        <button onClick={resetQuiz} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors z-[70]"><span className="material-symbols-outlined text-4xl">close</span></button>
                        <div className="flex-1 overflow-y-auto px-10 py-20 flex flex-col items-center justify-center">
                            {quizStep === 0 && (
                                <div className="text-center animate-fade-in-up">
                                    <h2 className="text-4xl font-heading font-bold mb-6">AI Snapshot</h2>
                                    <p className="text-slate-500 text-xl mb-12">Identify your biggest operational bottleneck in 120 seconds.</p>
                                    <button onClick={() => setQuizStep(1)} className="w-full bg-primary text-white font-bold py-5 px-10 rounded-2xl text-xl shadow-lg">Start Analysis</button>
                                </div>
                            )}
                            {quizStep > 0 && quizStep <= 5 && (
                                <div className="w-full animate-fade-in-up">
                                    <h2 className="text-3xl font-heading font-bold text-slate-900 mb-10 text-center">{quizQuestions[quizStep-1].q}</h2>
                                    <div className="space-y-4">
                                        {quizQuestions[quizStep-1].options.map((opt, i) => (
                                            <button key={i} onClick={() => nextStep(i)} className="w-full p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-primary hover:bg-purple-50 transition-all text-lg font-medium text-slate-700">{opt}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {quizStep === 6 && (
                                <div className="w-full max-w-md animate-fade-in-up text-center">
                                    <h2 className="text-3xl font-bold mb-6">Unlock Your Diagnosis</h2>
                                    <p className="text-slate-500 mb-10">Where should we send your results and custom diagnostic roadmap?</p>
                                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                                        <input type="text" required value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name" />
                                        <input type="email" required value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" placeholder="Your Email" />
                                        <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-bold py-5 rounded-xl text-xl mt-4 shadow-lg">{isSubmitting ? 'Analyzing...' : 'See My Results'}</button>
                                    </form>
                                </div>
                            )}
                            {quizStep === 7 && (
                                <div className="text-center animate-fade-in-up">
                                    <h2 className="text-5xl font-bold text-primary mb-8">{getDiagnosis().category}</h2>
                                    <div className="bg-slate-50 p-10 rounded-3xl text-left border border-slate-100 mb-12">
                                        <h4 className="text-2xl font-bold mb-4">{getDiagnosis().title}</h4>
                                        <p className="text-lg text-slate-600 leading-relaxed font-light">{getDiagnosis().description}</p>
                                    </div>
                                    <button onClick={() => handleBooking(BOOK_CHECKUP_URL)} className="w-full bg-primary text-white font-bold py-6 rounded-2xl text-2xl shadow-xl">Book Priority Session</button>
                                    <button onClick={resetQuiz} className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-sm hover:text-slate-600 transition-colors">Start Over</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Components
const FeatureCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-500 group">
        <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-3xl font-bold">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 font-light leading-relaxed">{desc}</p>
    </div>
);

const StepItem: React.FC<{ num: string; title: string; desc: string }> = ({ num, title, desc }) => (
    <div className="relative group">
        <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 group-hover:text-primary/10 transition-colors">{num}</div>
        <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-900 mb-4">{title}</h4>
            <p className="text-slate-500 font-light leading-relaxed">{desc}</p>
        </div>
    </div>
);

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 pb-6 group">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left group">
                <h3 className={`text-2xl font-bold transition-colors ${isOpen ? 'text-primary' : 'text-slate-900 group-hover:text-primary'}`}>{q}</h3>
                <span className={`material-symbols-outlined transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : 'text-slate-300'}`}>expand_more</span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-lg text-slate-500 font-light leading-relaxed pr-10">{a}</p>
            </div>
        </div>
    );
};

export default OptimizePage;