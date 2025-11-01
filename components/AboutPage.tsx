
import React from 'react';
import { Page, NavigateFunction } from '../App';

const ValueCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-card-bg-light p-6 rounded-xl border border-border-light text-center h-full shadow-soft transition hover:-translate-y-1">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-light to-secondary-light rounded-full mb-6 shadow-md">
            <span className="material-symbols-outlined text-3xl text-[#0bceff]">{icon}</span>
        </div>
        <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
        <p className="text-text-body-light leading-relaxed">{description}</p>
    </div>
);

const TeamMember: React.FC<{ imgSrc: string; name: string; title: string; }> = ({ imgSrc, name, title }) => (
    <div>
        <img src={imgSrc} alt={`Portrait of ${name}`} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-mild bg-slate-200" />
        <h3 className="text-xl font-heading font-semibold text-text-heading-light">{name}</h3>
        <p className="text-[#0bceff]">{title}</p>
    </div>
);

const Differentiator: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-primary-light rounded-2xl shadow-sm">
            <span className="material-symbols-outlined text-3xl text-[#0bceff]">{icon}</span>
        </div>
        <div className="ml-5">
            <h3 className="text-xl font-heading font-semibold text-text-heading-light">{title}</h3>
            <p className="mt-1 text-text-body-light font-body leading-relaxed">{description}</p>
        </div>
    </div>
);

// FIX: Define AboutPageProps interface for component props
interface AboutPageProps {
    onNavigate: NavigateFunction;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    return (
        <div className="relative overflow-hidden bg-background-light">
            {/* Decorative Blobs */}
            <div className="absolute top-0 -left-64 w-[40rem] h-[40rem] bg-primary-light rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
            <div className="absolute -bottom-64 -right-64 w-[40rem] h-[40rem] bg-secondary-light rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-heading font-semibold leading-snug text-text-heading-light">
                                Empowering Builders for the <br className="hidden md:block" />
                                <span className="inline-block bg-[#A855F7] text-white font-bold [text-shadow:-2px_0_#00d9ff,2px_0_#ff00c1,0_0_5px_#fff,0_0_20px_#ff00c1] px-9 py-5 mx-2 my-4 rounded-lg tracking-wider">AI Shift</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg text-text-body-light">
                                WeCreate is an AI education and consulting studio on a mission to empower Gen Z and emerging builders to learn, build, and launch with clarity, community, and AI-powered tools.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-card-bg-light p-6 rounded-xl shadow-soft border border-border-light">
                                <h3 className="text-2xl font-heading text-secondary mb-2">Our Mission</h3>
                                <p className="text-text-body-light">To democratize AI literacy and provide the next generation of innovators with the skills and support to build the future.</p>
                            </div>
                            <div className="bg-card-bg-light p-6 rounded-xl shadow-soft border border-border-light">
                                 <h3 className="text-2xl font-heading text-secondary mb-2">Our Vision</h3>
                                <p className="text-text-body-light">A world where anyone with an idea can leverage AI to create meaningful impact, regardless of their background.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* The WeCreate Story Section */}
            <section className="py-24 bg-slate-100/70">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">The <span className="text-[#0bceff]">WeCreate</span> Story</h2>
                            <div className="mt-6 text-text-body-light leading-relaxed space-y-4">
                                <p>It started with a simple observation: while AI was changing the world, access to quality, human-centered AI education was lagging. The gap between ambition and ability was widening for young, aspiring builders.</p>
                                <p>Founded in the heart of South Florida's emerging tech scene, WeCreate was born from a desire to bridge that gap. We're a team of educators, technologists, and community builders who believe that the power of AI should be in the hands of the many, not the few. We're building more than a curriculum; we're cultivating a movement.</p>
                            </div>
                        </div>
                         <div className="mt-10 lg:mt-0">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" alt="The WeCreate team collaborating" className="rounded-xl shadow-soft w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* The WeCreate Difference Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">
                            The <span className="text-[#0bceff]">WeCreate</span> Difference
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-text-body-light">
                            We're not just another bootcamp. We're a career launchpad built for the AI era. Here's what sets us apart.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mt-16 max-w-6xl mx-auto">
                        <Differentiator 
                            icon="auto_awesome"
                            title="AI-First Curriculum"
                            description="While others are still catching up, we've built our entire program around AI tools and workflows. You'll learn to work alongside AI, not compete with it."
                        />
                        <Differentiator 
                            icon="groups"
                            title="Community-Powered"
                            description="You're not just joining a program—you're joining a movement. Our alumni network, local employer partnerships, and peer learning create exponential opportunities."
                        />
                        <Differentiator 
                            icon="all_inclusive"
                            title="No Prerequisites"
                            description="No CS degree? No problem. We've trained teachers, retail managers, and artists. If you're curious, motivated, and ready to learn, you're qualified."
                        />
                        <Differentiator 
                            icon="location_city"
                            title="South Florida Focus"
                            description="We're building tech talent right here in Miami, Fort Lauderdale, and beyond. Our employer network is local, our success stories are your neighbors."
                        />
                        <div className="md:col-span-2 flex justify-center pt-6">
                           <div className="max-w-xl w-full">
                                <Differentiator 
                                    icon="rocket_launch"
                                    title="Outcomes-Driven"
                                    description="We only win when you win. That's why we measure success by job placements, salary increases, and long-term career satisfaction—not just completion rates."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Core Values Section */}
            <section className="py-24 bg-slate-100/70">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">Our Core Values</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-body-light">The principles that guide everything we do, from our curriculum to our community.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto">
                        <ValueCard icon="groups" title="Community First" description="We learn, build, and grow together. Collaboration over competition." />
                        <ValueCard icon="tips_and_updates" title="Curiosity & Creation" description="Embrace experimentation. We believe in learning by doing and building." />
                        <ValueCard icon="verified" title="Authentic Impact" description="Focus on creating real-world solutions and genuine career pathways." />
                        <ValueCard icon="sentiment_satisfied" title="Human-Centered AI" description="We prioritize people, ethics, and inclusivity in all technology we teach." />
                    </div>
                </div>
            </section>


            {/* Join Our Community CTA */}
            <section className="gradient-bg-section text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold drop-shadow-sm">Join Our Community</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-white/90 font-body">
                        Ready to start your journey into the world of AI? Connect with fellow builders, attend our events, and become part of South Florida's future tech leadership.
                    </p>
                    <div className="mt-8">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Programs'); }} className="bg-white text-primary hover:bg-gray-100 font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft">
                            Explore Our Programs
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;