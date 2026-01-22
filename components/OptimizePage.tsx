import React, { useState, useEffect } from 'react';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

const OptimizePage: React.FC = () => {
    const BOOK_CHECKUP_URL = "https://book.stripe.com/eVqbJ031G0aofEPbyxd7q01";
    const BOOK_ANALYSIS_URL = "https://book.stripe.com/eVq8wOgSw7CQ3W7byxd7q02";

    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [quizStep, setQuizStep] = useState(0); // 0=Intro, 1-5=Q, 6=Lead, 7=Results
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

    // Logic to provide a personalized diagnosis based on Question 1 (Bottleneck)
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
        
        // Create a personalized email draft for the Google Sheet
        const emailDraft = `Hi ${userData.name},\n\nGreat connecting! Based on your AI Snapshot results, your primary hurdle is ${diagnosis.title} (${diagnosis.category}).\n\n${diagnosis.description}\n\nOur next move is an AI Checkup ($300) to build the logical architecture required to fix this specific bottleneck. You can book that session here: ${BOOK_CHECKUP_URL}\n\nLooking forward to it!\n\n--- FOR YOUR REFERENCE (QUIZ DATA) ---\n${quizSummary}`;

        const submissionData = {
            fullName: userData.name,
            email: userData.email,
            message: `DIAGNOSIS: ${diagnosis.title} (${diagnosis.category})\n\n--- PROPOSED EMAIL FOLLOW-UP ---\n${emailDraft}\n\n--- FULL TRANSCRIPT ---\n${quizSummary}`,
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
            const existing = JSON.parse(localStorage.getItem('quizLeads') || '[]');
            existing.push({ ...submissionData, submittedAt: new Date().toISOString() });
            localStorage.setItem('quizLeads', JSON.stringify(existing));
            setQuizStep(7); 
        } catch (error) {
            console.error("Submission failed", error);
            setQuizStep(7); 
        } finally {
            setIsSubmitting(false);
        }
    };

    const quizQuestions = [
        {
            q: "Where does work slow down most?",
            sub: "(Pick the one that hurts the most)",
            options: [
                "Leads or DMs don’t get answered fast enough",
                "Customers ask the same questions repeatedly",
                "My team depends on me for answers",
                "Handoffs between steps feel messy"
            ]
        },
        {
            q: "What happens when that slowdown occurs?",
            sub: "(Most accurate answer)",
            options: [
                "We lose leads or opportunities",
                "I jump in personally to fix it",
                "It creates stress or rework later",
                "It delays decisions or delivery"
            ]
        },
        {
            q: "Have you tried tools or systems to fix this?",
            sub: "(Be honest — everyone struggles here)",
            options: [
                "Yes, but nothing really stuck",
                "Yes, but it added complexity",
                "Not yet — not sure what to try",
                "No — we’re still mostly manual"
            ]
        },
        {
            q: "Which statement feels most true right now?",
            sub: "(This is the emotional qualifier)",
            options: [
                "“Everything still comes through me”",
                "“We’re busy, but not efficient”",
                "“I know we could be moving faster”",
                "“I don’t want to waste money guessing”"
            ]
        },
        {
            q: "If this ONE issue were fixed, what would change most?",
            sub: "(Future-state question)",
            options: [
                "I’d get more time back",
                "We’d convert more leads",
                "My team would be more independent",
                "Things would feel calmer and clearer"
            ]
        }
    ];

    const diagnosis = getDiagnosis();

    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-48 pb-32 font-body text-slate-700 overflow-x-hidden">
            {/* 1. Hero Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-36 animate-fade-in-up">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight mb-10">
                        Get clarity first. <br/>
                        <span className="text-primary">Tools come second.</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-16">
                        Most businesses don't have an AI problem. They have a workflow problem. We help you find exactly where you're stuck before you spend a dollar on tools.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <button 
                            onClick={() => handleBooking(BOOK_CHECKUP_URL)}
                            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white text-xl font-heading font-bold py-7 px-14 rounded-[2rem] shadow-[0_20px_50px_rgba(147,51,234,0.3)] transition-all transform hover:scale-[1.03] active:scale-95"
                        >
                            Book the AI Checkup ($300)
                        </button>
                        <button 
                            onClick={() => setIsQuizOpen(true)}
                            className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-primary hover:text-primary text-slate-600 text-xl font-heading font-bold py-7 px-14 rounded-[2rem] shadow-sm transition-all flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined font-bold">psychology</span>
                            Take the AI Snapshot
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Problem Section */}
            <section className="bg-white py-40 border-y border-slate-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8">The Founder's Friction</h2>
                            <p className="text-xl md:text-2xl mb-12 text-slate-500 leading-relaxed">
                                You know your business could be faster, but the path isn't clear. Usually, this looks like:
                            </p>
                            <ul className="space-y-8">
                                <ProblemBullet text="Operations feel heavy, manual, and repetitive" />
                                <ProblemBullet text="Important tasks depend entirely on you to move" />
                                <ProblemBullet text="Messages or leads are slipping through the cracks" />
                                <ProblemBullet text="You're overwhelmed by 'AI' hype and new tools" />
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-16 rounded-[4rem] border border-slate-100 flex flex-col items-center text-center shadow-soft">
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-mild mb-8">
                                <span className="text-primary material-symbols-outlined text-6xl">analytics</span>
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">The Honest Truth</h3>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Adding AI to a broken process just makes a broken process happen faster. We fix the process first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. How We Work */}
            <section className="py-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">How We Work</h2>
                    <p className="text-xl md:text-2xl text-slate-500 mb-20 max-w-2xl mx-auto">A simple two-step framework for clarity before any action.</p>
                    
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-12">
                        <div className="flex-1 bg-white p-14 rounded-[3.5rem] border border-slate-100 shadow-xl relative transform hover:-translate-y-2 transition-transform">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-primary text-white text-sm font-bold rounded-full uppercase tracking-[0.2em]">Step 01</div>
                            <h3 className="text-3xl font-heading font-bold mb-6 mt-4">Diagnose</h3>
                            <p className="text-lg text-slate-500 leading-relaxed">A deep-dive conversation to find the single biggest bottleneck slowing you down today.</p>
                        </div>

                        <div className="hidden md:flex items-center text-slate-200">
                            <span className="material-symbols-outlined text-6xl">trending_flat</span>
                        </div>

                        <div className="flex-1 bg-white p-14 rounded-[3.5rem] border border-slate-100 shadow-xl relative transform hover:-translate-y-2 transition-transform">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-secondary text-white text-sm font-bold rounded-full uppercase tracking-[0.2em]">Step 02</div>
                            <h3 className="text-3xl font-heading font-bold mb-6 mt-4">Analyze</h3>
                            <p className="text-lg text-slate-500 leading-relaxed">A complete review of your actual steps and a roadmap for exactly how to fix them.</p>
                        </div>
                    </div>
                    
                    <p className="mt-24 text-slate-400 text-base font-medium uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                        <span className="material-symbols-outlined text-xl">verified</span>
                        Implementation only comes later, if it's actually needed.
                    </p>
                </div>
            </section>

            {/* 4. Offer #1 - AI Checkup */}
            <section id="ai-checkup" className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                        <div className="p-12 md:p-20">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900">Offer 01: AI Checkup</h2>
                                    <p className="text-xl text-slate-500 mt-2">A focused 45-minute diagnostic session.</p>
                                </div>
                                <div className="text-5xl font-heading font-bold text-primary">$300</div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-16 mb-16">
                                <div>
                                    <h4 className="font-heading font-bold text-slate-900 mb-6 text-2xl flex items-center gap-3">
                                        <span className="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
                                        What it is
                                    </h4>
                                    <ul className="space-y-6 text-xl text-slate-500">
                                        <li className="flex gap-3"><span>•</span> Focused 1-on-1 talk</li>
                                        <li className="flex gap-3"><span>•</span> Finding your #1 friction point</li>
                                        <li className="flex gap-3"><span>•</span> High-level tool suggestions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-slate-900 mb-6 text-2xl flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-300 text-3xl">cancel</span>
                                        What it is not
                                    </h4>
                                    <ul className="space-y-6 text-xl text-slate-400 italic">
                                        <li className="flex gap-3"><span>•</span> No deep process audit</li>
                                        <li className="flex gap-3"><span>•</span> No automation building</li>
                                        <li className="flex gap-3"><span>•</span> No technical setup</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-10 rounded-3xl mb-12 border border-slate-100">
                                <h4 className="font-heading font-bold text-slate-900 mb-3 text-xl uppercase tracking-widest">The Result</h4>
                                <p className="text-xl text-slate-600 leading-relaxed">
                                    You leave with absolute clarity on where your business is slowing down and a professional recommendation for your next best move.
                                </p>
                            </div>

                            <button 
                                onClick={() => handleBooking(BOOK_CHECKUP_URL)}
                                className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold py-7 rounded-[2rem] text-2xl shadow-xl transition-all transform hover:scale-[1.01]"
                            >
                                Book the AI Checkup
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Offer #2 - Process Analysis */}
            <section id="process-analysis" className="py-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                        <div className="bg-slate-900 p-16 text-white text-center">
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-2">Offer 02: Process Analysis</h2>
                            <p className="text-xl text-white/60">A deep audit of your business workflows.</p>
                            <div className="mt-6 text-5xl font-heading font-bold">$1000</div>
                        </div>
                        <div className="p-12 md:p-20">
                            <p className="text-2xl text-slate-600 mb-14 text-center leading-relaxed">
                                We go "under the hood." You show us exactly how you work, and we find the hours you're losing every week.
                            </p>
                            <ul className="space-y-10 mb-16 max-w-xl mx-auto">
                                <li className="flex items-start gap-6">
                                    <span className="material-symbols-outlined text-secondary bg-secondary-light p-3 rounded-2xl text-3xl">troubleshoot</span>
                                    <div>
                                        <p className="font-bold text-slate-900 text-2xl mb-1">Workflow Review</p>
                                        <p className="text-slate-500 text-lg">Detailed walkthrough of your current daily tasks.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-6">
                                    <span className="material-symbols-outlined text-secondary bg-secondary-light p-3 rounded-2xl text-3xl">route</span>
                                    <div>
                                        <p className="font-bold text-slate-900 text-2xl mb-1">Fix Roadmap</p>
                                        <p className="text-slate-500 text-lg">A step-by-step guide for what to optimize first.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-6">
                                    <span className="material-symbols-outlined text-secondary bg-secondary-light p-3 rounded-2xl text-3xl">article</span>
                                    <div>
                                        <p className="font-bold text-slate-900 text-2xl mb-1">Optimization Guide</p>
                                        <p className="text-slate-500 text-lg">A written document your team can use to implement changes.</p>
                                    </div>
                                </li>
                            </ul>
                            
                            <p className="text-center text-lg text-slate-400 italic mb-14 underline decoration-slate-100 underline-offset-8">
                                Still no implementation — just the map to get there.
                            </p>

                            <button 
                                onClick={() => handleBooking(BOOK_ANALYSIS_URL)}
                                className="w-full bg-secondary hover:bg-blue-600 text-white font-heading font-bold py-7 rounded-[2rem] text-2xl shadow-xl transition-all transform hover:scale-[1.01]"
                            >
                                Book a Process Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. How to Choose */}
            <section className="py-40 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-20 text-slate-900">Which one is for you?</h2>
                    <div className="grid md:grid-cols-2 gap-12 text-left">
                        <div className="bg-white p-14 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                            <h3 className="text-3xl font-heading font-bold mb-6 text-primary">The AI Checkup</h3>
                            <p className="text-xl text-slate-500 leading-relaxed">Choose this if you feel "stuck" but aren't exactly sure where the problem is. This is the lowest-risk way to get expert diagnostic clarity.</p>
                        </div>
                        <div className="bg-white p-14 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                            <h3 className="text-3xl font-heading font-bold mb-6 text-secondary">Process Analysis</h3>
                            <p className="text-xl text-slate-500 leading-relaxed">Choose this if you already know which workflow is broken and you want a complete, ready-to-build optimization roadmap.</p>
                        </div>
                    </div>
                    <div className="mt-20">
                        <button onClick={() => setIsQuizOpen(true)} className="text-primary font-heading font-bold text-xl underline underline-offset-8 hover:text-primary-hover">
                            Not sure? Take the 30-Second AI Audit Snapshot
                        </button>
                    </div>
                </div>
            </section>

            {/* 7. Trust & Boundaries */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                    <h2 className="text-4xl font-heading font-bold text-slate-900 mb-8">Our Boundaries</h2>
                    <p className="text-xl text-slate-500 mb-20">We aren't a typical marketing agency. We prioritize clarity over complexity.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <BoundaryItem 
                            title="No Tool Pushing" 
                            text="We don't take kickbacks from software companies. We only recommend what works for your specific case." 
                        />
                        <BoundaryItem 
                            title="No Forced AI" 
                            text="If a simple spreadsheet or process change is better than AI, we'll tell you that straight up." 
                        />
                        <BoundaryItem 
                            title="No Lock-in" 
                            text="Everything is pay-as-you-go. No long-term contracts or hidden retainers. Professional help when you need it." 
                        />
                    </div>
                    
                    <div className="mt-24 inline-block px-12 py-6 bg-primary-light text-primary rounded-[2rem] font-heading font-bold text-2xl">
                        Clarity before action. Always.
                    </div>
                </div>
            </section>

            {/* 8. Final CTA Section */}
            <section className="py-40 border-t border-slate-100 bg-[#FAFAFA]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-8">Start small.</h2>
                    <p className="text-2xl text-slate-500 mb-16 leading-relaxed">
                        Most people start with the AI Checkup. It’s the easiest way to find your next move without overcomplicating things.
                    </p>
                    <button 
                        onClick={() => handleBooking(BOOK_CHECKUP_URL)}
                        className="w-full bg-primary hover:bg-primary-hover text-white text-2xl font-heading font-bold py-8 px-16 rounded-[2.5rem] shadow-[0_30px_70px_rgba(147,51,234,0.3)] transition-all transform hover:translate-y-[-6px]"
                    >
                        Book the AI Checkup ($300)
                    </button>
                    <div className="mt-12 flex items-center justify-center gap-10 text-slate-400 text-lg font-medium">
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-2xl">videocam</span> Zoom Session</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-2xl">fiber_manual_record</span> Recorded</span>
                    </div>
                </div>
            </section>

            {/* --- QUIZ MODAL --- */}
            {isQuizOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fade-in print:hidden">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col h-[90vh] max-h-[850px]">
                        {quizStep > 0 && quizStep <= 5 && (
                            <div className="h-2 bg-slate-100 w-full relative">
                                <div 
                                    className="h-full bg-primary transition-all duration-500 ease-out" 
                                    style={{ width: `${(quizStep / 5) * 100}%` }}
                                ></div>
                            </div>
                        )}
                        <button onClick={resetQuiz} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors z-[70]">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                        {quizStep > 0 && quizStep <= 6 && (
                            <button onClick={prevStep} className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors z-[70]">
                                <span className="material-symbols-outlined text-3xl">arrow_back</span>
                            </button>
                        )}
                        <div className="flex-1 overflow-y-auto px-8 sm:px-12 py-16 flex flex-col items-center justify-center text-center">
                            {quizStep === 0 && (
                                <div className="animate-fade-in-up">
                                    <div className="w-24 h-24 bg-primary-light rounded-3xl flex items-center justify-center text-primary mb-8 mx-auto shadow-sm">
                                        <span className="material-symbols-outlined text-5xl">psychology</span>
                                    </div>
                                    <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">AI Readiness Snapshot</h2>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-10">2 Minutes • No tech knowledge needed</p>
                                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-left mb-12 italic text-lg text-slate-600">
                                        "This isn’t a test. No right or wrong answers. Just a quick snapshot to see where your business is losing time or money — and whether AI could help."
                                    </div>
                                    <button onClick={() => setQuizStep(1)} className="w-full bg-primary hover:bg-primary-hover text-white text-xl font-heading font-bold py-6 px-12 rounded-[2rem] transition-all transform hover:scale-[1.02]">
                                        Start the Snapshot
                                    </button>
                                </div>
                            )}
                            {quizStep > 0 && quizStep <= 5 && (
                                <div className="w-full animate-fade-in-up">
                                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-2">{quizQuestions[quizStep-1].q}</h2>
                                    <p className="text-slate-500 mb-12 italic text-lg">{quizQuestions[quizStep-1].sub}</p>
                                    <div className="grid gap-4 w-full">
                                        {quizQuestions[quizStep-1].options.map((opt, i) => (
                                            <button key={i} onClick={() => nextStep(i)} className="w-full p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-primary hover:bg-purple-50 group transition-all flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full border-2 border-slate-200 group-hover:border-primary flex items-center justify-center text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">{String.fromCharCode(65 + i)}</div>
                                                <span className="text-lg font-medium text-slate-700 group-hover:text-slate-900">{opt}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {quizStep === 6 && (
                                <div className="w-full animate-fade-in-up max-w-md">
                                    <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center text-primary mb-6 mx-auto">
                                        <span className="material-symbols-outlined text-4xl">lock_open</span>
                                    </div>
                                    <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Unlock Your Diagnosis</h2>
                                    <p className="text-slate-500 mb-10 text-lg">Enter your details to see your personalized AI Strategy analysis.</p>
                                    <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                            <input type="text" required value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Your Name" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                            <input type="email" required value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="you@example.com" />
                                        </div>
                                        <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-hover text-white text-xl font-heading font-bold py-6 px-12 rounded-[2rem] transition-all transform hover:scale-[1.02] active:scale-95 mt-6 disabled:opacity-50 shadow-lg shadow-purple-500/20">
                                            {isSubmitting ? 'Analyzing Results...' : 'See My Results'}
                                        </button>
                                    </form>
                                </div>
                            )}
                            {quizStep === 7 && (
                                <div className="animate-fade-in-up w-full text-center">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 mx-auto shadow-sm">
                                        <span className="material-symbols-outlined text-5xl">verified_user</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">Diagnosis: {diagnosis.category}</h2>
                                    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 text-left mb-12 relative overflow-hidden group text-pretty">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><span className="material-symbols-outlined text-8xl text-primary">analytics</span></div>
                                        <div className="relative z-10 space-y-4">
                                            <p className="text-xl text-slate-600 leading-relaxed">Hi <span className="font-bold text-primary">{userData.name}</span>, your results identify your primary scaling hurdle as <span className="font-bold text-slate-900">{diagnosis.title}</span>.</p>
                                            <p className="text-lg text-slate-500 leading-relaxed font-medium">{diagnosis.description}</p>
                                        </div>
                                    </div>

                                    <div className="p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] mb-8 bg-white shadow-soft">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-primary rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
                                            Prescribed Next Step
                                        </div>
                                        <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">AI Checkup — $300</h3>
                                        <p className="text-slate-500 mb-10 leading-relaxed max-w-md mx-auto text-lg">A professional 1-on-1 session to isolate the specific workflow logic required to fix your {diagnosis.title.toLowerCase()}.</p>
                                        <button 
                                            onClick={() => handleBooking(BOOK_CHECKUP_URL)} 
                                            className="w-full bg-primary hover:bg-primary-hover text-white text-xl font-heading font-bold py-6 px-12 rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20"
                                        >
                                            Book Diagnostic Session
                                        </button>
                                    </div>
                                    
                                    <button onClick={resetQuiz} className="text-slate-400 hover:text-primary font-bold transition-colors">
                                        Start Over
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProblemBullet: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-center gap-6">
        <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></span>
        <span className="text-xl md:text-2xl text-slate-600 leading-tight font-medium">{text}</span>
    </li>
);

const BoundaryItem: React.FC<{ title: string; text: string }> = ({ title, text }) => (
    <div className="text-center group">
        <h4 className="font-heading font-bold text-slate-900 mb-4 text-2xl group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-slate-500 text-lg leading-relaxed">{text}</p>
    </div>
);

export default OptimizePage;
