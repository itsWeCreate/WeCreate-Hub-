import React from 'react';
import { OpenModalFunction } from '../App';
import { CheckIcon } from './icons';

const CollaborationCard: React.FC<{
    icon: string;
    gradient: string;
    title: string;
    description: string;
    benefits: string[];
}> = ({ icon, gradient, title, description, benefits }) => {
    return (
        <div className="bg-card-bg-light p-8 rounded-xl shadow-soft border border-border-light h-full flex flex-col">
            <div className={`flex-shrink-0 flex items-center justify-center w-16 h-16 ${gradient} rounded-2xl mb-6 shadow-md text-white`}>
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-heading font-semibold text-text-heading-light mb-3">{title}</h3>
            <p className="text-text-body-light font-body mb-4 flex-grow">{description}</p>
            <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className="w-6 h-6 text-[#0bceff] flex-shrink-0 mr-2 mt-0.5" />
                        <span className="text-text-body-light">{benefit}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const BenefitItem: React.FC<{
    icon: string;
    title: string;
    description: string;
}> = ({ icon, title, description }) => {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-primary-light rounded-2xl shadow-sm text-[#0bceff]">
                 <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <div className="ml-5">
                <h3 className="text-xl font-heading font-semibold text-text-heading-light">{title}</h3>
                <p className="mt-1 text-text-body-light font-body">{description}</p>
            </div>
        </div>
    );
}

interface PartnershipPageProps {
    onOpenPartnershipModal: OpenModalFunction;
}

const PartnershipPage: React.FC<PartnershipPageProps> = ({ onOpenPartnershipModal }) => {
    return (
        <div className="bg-background-light">
            {/* Hero Section */}
            <section className="relative hero-gradient text-text-heading-light pt-40 pb-24 text-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{backgroundImage: "url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2670&auto=format&fit=crop')"}}></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-heading font-semibold leading-tight drop-shadow-sm text-white">
                        Partner With Us, <br className="hidden md:block" />
                        Shape the Future
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/90 font-body">
                        We're building a vibrant ecosystem to empower the next generation of builders and innovators. Join us in creating opportunities and driving talent development in the AI era.
                    </p>
                    <div className="mt-10">
                         <button onClick={onOpenPartnershipModal} className="bg-white text-primary hover:bg-gray-100 font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft">
                            Become a Partner
                        </button>
                    </div>
                </div>
            </section>

            {/* Ways to Collaborate Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">
                            Ways to <span className="text-[#0bceff]">Collaborate</span> with WeCreate
                        </h2>
                        <p className="mt-4 text-lg max-w-2xl mx-auto text-text-body-light font-body">We offer diverse partnership opportunities to align with your organization's goals.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <CollaborationCard 
                            icon="corporate_fare" 
                            gradient="bg-gradient-to-br from-blue-400 to-blue-600"
                            title="Corporate Partners" 
                            description="Invest in the future of tech talent. Sponsor our programs, host events, or provide mentorship to our community of emerging builders."
                            benefits={["Access a diverse talent pipeline", "Enhance your brand visibility", "Shape our curriculum"]}
                        />
                        <CollaborationCard 
                            icon="school" 
                            gradient="bg-gradient-to-br from-purple-400 to-purple-600"
                            title="Educational Partners" 
                            description="Collaborate with us to integrate cutting-edge AI education into your curriculum and provide your students with pathways to tech careers."
                            benefits={["Co-develop workshops & courses", "Create internship programs", "Guest lectures from our experts"]}
                        />
                        <CollaborationCard 
                            icon="groups" 
                            gradient="bg-gradient-to-br from-indigo-400 to-indigo-600"
                            title="Community Partners" 
                            description="Amplify your impact. Partner with us on community events, outreach initiatives, and joint programming to foster a more inclusive tech ecosystem."
                            benefits={["Host joint community events", "Cross-promote initiatives", "Share resources and networks"]}
                        />
                    </div>
                </div>
            </section>
            
            {/* Benefits of Partnering Section */}
            <section className="py-16 sm:py-24 bg-slate-100/70">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                             <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light">
                                Benefits of <span className="text-[#0bceff]">Partnering</span> With Us
                            </h2>
                            <div className="mt-8 space-y-10">
                                <BenefitItem 
                                    icon="hub" 
                                    title="Connect with Top Talent"
                                    description="Get exclusive access to our pool of skilled, motivated, and job-ready Gen Z builders trained in the latest AI technologies."
                                />
                                <BenefitItem 
                                    icon="campaign" 
                                    title="Increase Your Brand's Reach"
                                    description="Showcase your commitment to innovation and community development to a wide audience of students, professionals, and tech enthusiasts."
                                />
                                <BenefitItem 
                                    icon="lightbulb" 
                                    title="Drive Real Impact"
                                    description="Directly contribute to building a skilled workforce, fostering local innovation, and creating economic opportunity in South Florida."
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 mt-10 lg:mt-0">
                            <img alt="Diverse group of young professionals collaborating in a bright, modern office" className="rounded-xl shadow-soft w-full h-full object-cover" src="https://images.unsplash.com/photo-1556761175-b413da4b2489?q=80&w=2832&auto=format&fit=crop" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Let's Build Together CTA Section */}
            <section id="contact-cta" className="gradient-bg-section text-white py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-semibold drop-shadow-sm">Let's Build Together</h2>
                        <p className="mt-4 text-lg text-white/90 font-body">
                            Interested in partnering with WeCreate? Get in touch with our partnership team and let's discuss how we can collaborate.
                        </p>
                        <div className="mt-8">
                            <button onClick={onOpenPartnershipModal} className="w-auto bg-white text-primary hover:bg-gray-200 font-heading font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-mild">
                                Start the Conversation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnershipPage;