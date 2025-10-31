import React, { useState } from 'react';
import { Page, NavigateFunction } from '../App';
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
    onNavigate: NavigateFunction;
}

const PartnershipPage: React.FC<PartnershipPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        partnershipType: 'Corporate Partnership',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your inquiry! We will get back to you soon.');
        setFormData({
            fullName: '',
            organization: '',
            email: '',
            phone: '',
            partnershipType: 'Corporate Partnership',
            message: ''
        });
    };

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
                         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Partnership', '#contact-form'); }} className="bg-white text-primary hover:bg-gray-100 font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft">
                            Become a Partner
                        </a>
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

            {/* Let's Build Together Form Section */}
            <section id="contact-form" className="gradient-bg-section text-white py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-semibold drop-shadow-sm">Let's Build Together</h2>
                        <p className="mt-4 text-lg text-white/90 font-body">
                            Interested in partnering with WeCreate? Fill out the form below, and our partnership team will get in touch with you shortly.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto mt-12">
                        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-10 rounded-xl shadow-soft">
                             <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                                <InputField label="Organization" name="organization" value={formData.organization} onChange={handleInputChange} />
                                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="partnershipType" className="block text-sm font-medium text-white mb-2">Partnership Type</label>
                                <select
                                    id="partnershipType"
                                    name="partnershipType"
                                    value={formData.partnershipType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white appearance-none bg-no-repeat bg-right-4"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 1rem center',
                                        backgroundSize: '1.25em'
                                    }}
                                >
                                    <option className="text-black">Corporate Partnership</option>
                                    <option className="text-black">Educational Partnership</option>
                                    <option className="text-black">Community Partnership</option>
                                </select>
                            </div>
                            <div className="mb-8">
                                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                                    placeholder="Tell us how you'd like to collaborate..."
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-white text-primary hover:bg-gray-200 font-heading font-bold py-4 px-4 rounded-lg transition-all duration-300 shadow-mild">
                                Submit Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, required = false }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-white mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
            />
        </div>
    );
};

export default PartnershipPage;