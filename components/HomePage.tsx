
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomePopup from './HomePopup';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <HomePopup />
            {/* Hero Section */}
            <section className="relative hero-gradient text-white min-h-[60vh] md:min-h-[70vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop')"}}></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-[2.85rem] md:text-7xl font-heading font-semibold leading-tight drop-shadow-sm text-white">
                        Building the Future of Work, <br className="hidden md:block"/> Together
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-body">
                        Transform your career with South Florida's premier AI-powered training program. Learn cutting-edge skills, build real projects, and launch into the tech economy.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => navigate('/programs')} className="bg-white text-primary hover:bg-gray-100 font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft w-full sm:w-auto relative z-20">
                            Start Your Journey
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light to-transparent pointer-events-none"></div>
            </section>

            {/* Career Transformation Section */}
            <section className="py-16 sm:py-24 bg-background-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">
                        Your Transformation <span className="text-[#0bceff]">Starts Here</span>
                    </h2>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-text-body-light font-body">
                        WeCreate is reimagining workforce development for the AI era. We're not just teaching tools—we're building a community of innovators, creators, and leaders who are ready to shape the future of work in South Florida and beyond.
                    </p>
                </div>
            </section>
            
            {/* Learn-Build-Launch Model Section */}
            <section className="pb-16 sm:pb-24 relative bg-background-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">
                            The <span className="text-[#C084FC]">Learn</span> • <span className="text-[#60A5FA]">Build</span> • <span className="text-[#9333EA]">Launch</span> Model
                        </h2>
                        <p className="mt-4 text-lg text-text-body-light font-body">Our proven three-phase approach takes you from curious beginner to confident professional.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ModelCard icon="menu_book" title="Learn" description="Master AI-powered tools and modern tech skills through hands-on workshops led by industry experts in our South Florida community." />
                        <ModelCard icon="architecture" title="Build" description="Apply your knowledge to real-world projects. Create a portfolio that showcases your skills and attracts employers." />
                        <ModelCard icon="rocket_launch" title="Launch" description="Enter the job market with confidence. We connect you with local employers and provide ongoing career support." />
                    </div>
                </div>
            </section>
            
            {/* Why WeCreate is Different Section */}
            <section className="py-16 sm:py-24 bg-background-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">
                                Why <span className="text-[#0bceff]">WeCreate</span> is Different
                            </h2>
                            <div className="mt-8 space-y-8">
                                <DifferentiatorItem icon="psychology" title="AI-First Curriculum" description="Stay ahead of the curve with training focused on the tools and technologies shaping tomorrow's workforce." />
                                <DifferentiatorItem icon="groups" title="Community-Powered" description="Join a vibrant network of learners, mentors, and employers right here in South Florida." />
                            </div>
                            <div className="mt-10">
                                <button onClick={() => navigate('/about')} className="bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary/30 text-white font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft">
                                    Discover All Five Differentiators
                                </button>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-0 relative">
                            <img alt="Diverse group of young professionals collaborating in a bright, modern workshop" className="rounded-xl shadow-soft w-full h-full object-cover" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="gradient-bg-section text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold drop-shadow-sm">Ready to Become Future-Proof?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 font-body">
                        Join the next cohort of South Florida's future tech leaders. Applications are now open for our AI Career Intensive.
                    </p>
                    <div className="mt-8">
                        <button onClick={() => navigate('/programs')} className="bg-white text-primary hover:bg-gray-100 font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft">
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

const ModelCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="relative bg-card-bg-light p-8 rounded-xl shadow-soft border border-border-light transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group z-10">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-light to-secondary-light rounded-full mb-6 shadow-md">
            <span className="material-symbols-outlined text-3xl text-[#0bceff]">{icon}</span>
        </div>
        <h3 className="text-2xl font-heading font-semibold text-text-heading-light mb-3">{title}</h3>
        <p className="text-text-body-light font-body">{description}</p>
    </div>
);

const DifferentiatorItem: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-primary-light rounded-full shadow-sm">
            <span className="material-symbols-outlined text-2xl text-[#0bceff]">{icon}</span>
        </div>
        <div className="ml-4">
            <h3 className="text-xl font-heading font-semibold text-text-heading-light">{title}</h3>
            <p className="mt-1 text-text-body-light font-body">{description}</p>
        </div>
    </div>
);


export default HomePage;
