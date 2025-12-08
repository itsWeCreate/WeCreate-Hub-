import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkedInIcon, InstagramIcon } from './icons';

// Reusable Link Card Component
const LinkCard = ({ icon, title, onClick, subtext }: { icon: string, title: string, onClick: () => void, subtext?: string }) => (
    <button
        onClick={onClick}
        className="w-full bg-white p-4 rounded-xl shadow-soft border border-border-light flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group text-left"
    >
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div className="ml-4 flex-grow">
            <h3 className="font-heading font-semibold text-text-heading-light text-lg">{title}</h3>
            {subtext && <p className="text-sm text-text-body-light">{subtext}</p>}
        </div>
        <div className="text-gray-300 group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
        </div>
    </button>
);

// Expandable Content Card for policies/requirements
const InfoCard = ({ icon, title, children }: { icon: string, title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full bg-white rounded-xl shadow-soft border border-border-light overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex items-center text-left hover:bg-gray-50 transition-colors"
            >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <h3 className="ml-4 font-heading font-semibold text-text-heading-light text-lg flex-grow">{title}</h3>
                <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 text-text-body-light text-sm border-t border-gray-100 mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

const InfoPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light min-h-screen pt-32 pb-24">
            <div className="max-w-md mx-auto px-4 sm:px-6">

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-light to-secondary-light p-1 shadow-soft mb-4">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                             {/* Logo Representation */}
                            <span className="font-logo font-bold text-3xl text-primary">We</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-text-heading-light flex items-center gap-2">
                        WeCreate <span className="text-[#0bceff] material-symbols-outlined text-2xl" title="Verified Account">verified</span>
                    </h1>
                    <p className="mt-2 text-text-body-light font-body">
                        Building the future of work. <br/> AI Training & Community in South Florida.
                    </p>
                    
                    {/* Social Icons Mini Row */}
                    <div className="flex gap-4 mt-6">
                        <a href="https://www.instagram.com/hello_wecreate/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors p-2 hover:bg-pink-50 rounded-full"><InstagramIcon className="w-6 h-6"/></a>
                        <a href="https://www.linkedin.com/company/wecreate-enterprises" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors p-2 hover:bg-blue-50 rounded-full"><LinkedInIcon className="w-6 h-6"/></a>
                        <a href="mailto:info@wecreatehub.com" className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-purple-50 rounded-full"><span className="material-symbols-outlined text-2xl">mail</span></a>
                    </div>
                </div>

                {/* Main Links Stack */}
                <div className="space-y-4">
                    <LinkCard
                        icon="rocket_launch"
                        title="Explore Our Programs"
                        subtext="Launch your AI career today"
                        onClick={() => navigate('/programs')}
                    />
                    <LinkCard
                        icon="calendar_month"
                        title="Upcoming Events"
                        subtext="Workshops, meetups & more"
                        onClick={() => navigate('/events')}
                    />
                     <LinkCard
                        icon="handshake"
                        title="Partner With Us"
                        subtext="For corporations & educators"
                        onClick={() => navigate('/partnership')}
                    />
                     <LinkCard
                        icon="groups"
                        title="Join the Community"
                        subtext="Connect on Skool"
                        onClick={() => window.open('https://www.skool.com/builder-hub-by-wecreate-7670', '_blank')}
                    />
                </div>

                {/* Divider */}
                <div className="my-10 flex items-center gap-4 opacity-60">
                     <div className="h-px bg-border-light flex-grow"></div>
                     <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resources</span>
                     <div className="h-px bg-border-light flex-grow"></div>
                </div>

                {/* Expandable Info Sections */}
                <div className="space-y-4">
                    <InfoCard icon="policy" title="Admissions Policy">
                        <p className="leading-relaxed">
                            WeCreate is committed to an inclusive admissions process. We do not require a background in computer science. 
                            Our selection is based on motivation, curiosity, and a willingness to learn. 
                            Applicants must be at least 18 years of age.
                        </p>
                    </InfoCard>

                    <InfoCard icon="laptop_mac" title="Technical Requirements">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Reliable laptop (Mac, Windows, or Linux) with 8GB+ RAM.</li>
                            <li>Stable internet connection.</li>
                            <li>Google account.</li>
                            <li>Visual Studio Code installed.</li>
                        </ul>
                    </InfoCard>

                    <InfoCard icon="contact_support" title="Contact Support">
                        <p className="mb-2">Need specific help? Reach out directly.</p>
                        <p className="font-semibold text-primary">info@wecreatehub.com</p>
                        <p className="font-semibold text-primary">(315) 570-9317</p>
                    </InfoCard>
                </div>
                
                <div className="mt-16 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} WeCreate</p>
                </div>

            </div>
        </div>
    );
};

export default InfoPage;