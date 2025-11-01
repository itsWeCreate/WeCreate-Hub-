import React, { useState } from 'react';
import { Page, NavigateFunction, OpenModalFunction } from '../App';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

interface ProgramsPageProps {
    onNavigate: NavigateFunction;
    onOpenPartnershipModal: OpenModalFunction;
    onSuccess: (message: string) => void;
}

const ProgramCardLarge: React.FC<{
    icon: string;
    gradient: string;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    onEnroll: (title: string) => void;
    reverse?: boolean;
    tooltipOnHover?: boolean;
}> = ({ icon, gradient, title, description, buttonText, buttonColor, onEnroll, reverse = false, tooltipOnHover = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className={`md:col-span-2 bg-card-bg-light p-8 md:p-10 rounded-xl shadow-soft border border-border-light transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col lg:items-center gap-8 lg:gap-12 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <div className="flex-shrink-0">
                <div className={`w-24 h-24 mx-auto lg:mx-0 rounded-full ${gradient} flex items-center justify-center shadow-md`}>
                    <span className="material-symbols-outlined text-5xl text-white">{icon}</span>
                </div>
            </div>
            <div className={`flex-grow text-center ${reverse ? 'lg:text-right' : 'lg:text-left'}`}>
                <h3 className="text-3xl font-heading font-semibold text-text-heading-light mb-3">{title}</h3>
                <p className="text-text-body-light font-body mb-6 text-lg">{description}</p>
                <div 
                    className="relative inline-block"
                    onMouseEnter={() => tooltipOnHover && setIsHovered(true)}
                    onMouseLeave={() => tooltipOnHover && setIsHovered(false)}
                >
                    <a href="#" onClick={(e) => { e.preventDefault(); onEnroll(title); }} className={`inline-block ${buttonColor} text-white font-heading font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-mild text-lg`}>
                        {buttonText}
                    </a>
                    {tooltipOnHover && isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm whitespace-nowrap z-10 opacity-100 transition-opacity duration-300">
                            Coming Soon
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProgramCardSmall: React.FC<{
    icon: string;
    gradient: string;
    title: string;
    description: string;
    buttonText: string;
    onEnroll: (title: string) => void;
}> = ({ icon, gradient, title, description, buttonText, onEnroll }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onEnroll(title);
    };

    return (
        <div className="bg-card-bg-light p-8 rounded-xl shadow-soft border border-border-light transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
            <div className="flex-grow">
                <div className={`w-16 h-16 mb-6 rounded-full ${gradient} flex items-center justify-center shadow-md`}>
                    <span className="material-symbols-outlined text-3xl text-white">{icon}</span>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-text-heading-light mb-3">{title}</h3>
                <p className="text-text-body-light font-body">{description}</p>
            </div>
            <div className="mt-8">
                <a
                    href="#"
                    onClick={handleClick}
                    className="inline-block text-white font-heading font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-mild w-full text-center bg-primary hover:bg-primary-hover"
                >
                    {buttonText}
                </a>
            </div>
        </div>
    );
};


const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate, onOpenPartnershipModal, onSuccess }) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [notificationFormData, setNotificationFormData] = useState({ name: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);


    const openNotificationModal = (programName: string) => {
        setSelectedProgram(programName);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setNotificationFormData({ name: '', email: '' });
    };

    const handleEnroll = (programName: string) => {
        if (programName === 'AI Exploration Labs') {
            window.open('https://luma.com/calendar/cal-ZJoLn2kvSHHzV7u', '_blank');
        } else {
            openNotificationModal(programName);
        }
    };

    const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNotificationFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const saveNotificationToLocalStorage = (data: typeof notificationFormData, program: string) => {
        try {
            const stored = localStorage.getItem('programNotifications');
            const existing = stored ? JSON.parse(stored) : [];
            const newEntry = {
                id: Date.now(),
                submittedAt: new Date().toISOString(),
                fullName: data.name,
                email: data.email,
                programInterested: program
            };
            existing.push(newEntry);
            localStorage.setItem('programNotifications', JSON.stringify(existing));
        } catch (error) {
            console.error("Failed to save notification to localStorage:", error);
        }
    };

    const handleNotificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const submissionData = {
            fullName: notificationFormData.name,
            email: notificationFormData.email,
            programInterested: selectedProgram,
            formType: 'programNotification'
        };
    
        try {
            if (!GOOGLE_SHEET_WEB_APP_URL) {
                console.warn('Google Sheets URL is not configured. Saving to localStorage only.');
                saveNotificationToLocalStorage(notificationFormData, selectedProgram);
                onSuccess('Your interest has been saved. Please configure Google Sheets to enable full functionality.');
            } else {
                const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submissionData),
                });
                const result = await response.json();
                if (result.result !== 'success') {
                    throw new Error(result.error || 'The API returned an unknown error.');
                }
                onSuccess(`Thank you! We'll notify you about the "${selectedProgram}" program.`);
            }
            
            saveNotificationToLocalStorage(notificationFormData, selectedProgram);
            closeModal();
    
        } catch (error) {
            console.error("An error occurred during form submission:", error);
            saveNotificationToLocalStorage(notificationFormData, selectedProgram);
            onSuccess("Your interest was saved, but we couldn't send it. Please contact us directly.");
            closeModal();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background-light">
            <section className="relative hero-gradient text-text-heading-light min-h-[50vh] flex items-center justify-center pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop')" }}></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-heading font-semibold leading-tight drop-shadow-sm text-white">
                        Our Programs
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-body">
                        Explore our current offerings designed to launch your career in AI, and get a sneak peek at the specialized workshops we're building to help you grow.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-light to-transparent"></div>
            </section>

            <section className="py-16 sm:py-24 bg-background-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <ProgramCardLarge
                            icon="model_training"
                            gradient="bg-gradient-to-br from-purple-400 to-purple-600"
                            title="AI Career Intensive"
                            description="Our flagship program. An immersive experience designed to take you from enthusiast to AI-proficient professional, ready for the tech workforce."
                            buttonText="Notify Me"
                            buttonColor="bg-primary hover:bg-primary-hover"
                            onEnroll={handleEnroll}
                            tooltipOnHover={true}
                        />

                        <ProgramCardLarge
                            icon="science"
                            gradient="bg-gradient-to-br from-blue-400 to-blue-600"
                            title="AI Exploration Labs"
                            description="Hands-on workshops for curious minds. Experiment with cutting-edge AI tools and techniques in a supportive, project-based environment."
                            buttonText="Join a Lab"
                            buttonColor="bg-secondary hover:bg-blue-500"
                            onEnroll={handleEnroll}
                            reverse={true}
                        />

                        <div className="md:col-span-2 text-center pt-16 pb-8">
                            <h2 className="text-4xl font-heading font-semibold text-text-heading-light">Coming Soon: Specialized Workshops</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-text-body-light">
                                We're developing new programs to help you build your brand, accelerate your career, and launch your next big idea. Sign up below to be the first to know when they launch.
                            </p>
                        </div>
                        
                        <ProgramCardSmall
                            icon="record_voice_over"
                            gradient="bg-gradient-to-br from-indigo-400 to-indigo-600"
                            title="Brand YOU"
                            description="Develop your personal brand and storytelling skills. Learn to articulate your value and stand out in a competitive job market."
                            buttonText="Notify Me"
                            onEnroll={handleEnroll}
                        />
                        <ProgramCardSmall
                            icon="trending_up"
                            gradient="bg-gradient-to-br from-purple-400 to-purple-600"
                            title="Accelerate YOU"
                            description="For emerging builders ready to level up. Dive deep into advanced AI applications and project management to fast-track your career."
                            buttonText="Notify Me"
                            onEnroll={handleEnroll}
                        />
                        <ProgramCardSmall
                            icon="architecture"
                            gradient="bg-gradient-to-br from-indigo-400 to-indigo-600"
                            title="Build YOU"
                            description="A project-based sprint where you'll collaborate in a team to build and launch a real-world AI-powered application from scratch."
                            buttonText="Notify Me"
                            onEnroll={handleEnroll}
                        />
                        <ProgramCardSmall
                            icon="local_fire_department"
                            gradient="bg-gradient-to-br from-purple-400 to-purple-600"
                            title="Refire YOU"
                            description="Designed for career transitioners. Reignite your professional journey with foundational digital and AI skills for the modern workplace."
                            buttonText="Notify Me"
                            onEnroll={handleEnroll}
                        />
                    </div>
                </div>
            </section>
            
            <section className="gradient-bg-section text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold drop-shadow-sm">Not Sure Where to Start?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 font-body">
                        Let us help you find the perfect program for your goals. Get in touch with our team for a personalized consultation.
                    </p>
                    <div className="mt-8">
                        <a href="#" onClick={(e) => { e.preventDefault(); onOpenPartnershipModal(); }} className="bg-white text-primary hover:bg-gray-100 font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" aria-modal="true" role="dialog">
                    <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal" disabled={isSubmitting}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <h2 className="text-2xl font-heading font-semibold text-text-heading-light">Get Notified!</h2>
                        <p className="mt-2 text-text-body-light">
                            Sign up to be the first to know when enrollment for <strong>"{selectedProgram}"</strong> opens.
                        </p>
                        <form onSubmit={handleNotificationSubmit} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-heading-light mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    value={notificationFormData.name}
                                    onChange={handleNotificationChange}
                                    required 
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-2 border border-border-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition disabled:bg-slate-100" 
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-heading-light mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    name="email"
                                    value={notificationFormData.email}
                                    onChange={handleNotificationChange} 
                                    required 
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-2 border border-border-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition disabled:bg-slate-100" 
                                    placeholder="jane.doe@example.com"
                                />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-mild disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : 'Notify Me'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgramsPage;