
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkedInIcon, InstagramIcon } from './icons';
import { InfoPageConfig, DEFAULT_INFO_CONFIG } from '../src/types';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

// Reusable Link Card Component
const LinkCard = ({ icon, title, onClick, subtext, image }: { icon: string, title: string, onClick: () => void, subtext?: string, image?: string }) => (
    <button
        onClick={onClick}
        className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-soft border border-border-light flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group text-left relative overflow-hidden"
    >
        {image ? (
            <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100 mr-4">
                <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
        ) : (
            <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0 mr-4">
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
        )}
        
        <div className="flex-grow z-10">
            <h3 className="font-heading font-semibold text-text-heading-light text-lg leading-tight">{title}</h3>
            {subtext && <p className="text-sm text-text-body-light mt-1">{subtext}</p>}
        </div>
        <div className="text-gray-300 group-hover:text-primary transition-colors ml-2">
            <span className="material-symbols-outlined">chevron_right</span>
        </div>
    </button>
);

// Expandable Content Card for policies/requirements
const InfoCard = ({ icon, title, content }: { icon: string, title: string, content: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Convert newlines to breaks
    const formattedContent = content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {line}
            <br />
        </React.Fragment>
    ));

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
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 text-text-body-light text-sm border-t border-gray-100 mt-2 leading-relaxed">
                    {formattedContent}
                </div>
            </div>
        </div>
    );
}

const InfoPage: React.FC = () => {
    const navigate = useNavigate();
    const [config, setConfig] = useState<InfoPageConfig>(DEFAULT_INFO_CONFIG);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            if (!GOOGLE_SHEET_WEB_APP_URL) {
                setLoading(false);
                return;
            }

            try {
                // Fetch config from Google Sheets via the Web App URL with action=getConfig
                const response = await fetch(`${GOOGLE_SHEET_WEB_APP_URL}?action=getConfig`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const text = await response.text();
                // Safe JSON parsing
                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.warn("Received non-JSON response from config endpoint, falling back to default.");
                    setLoading(false);
                    return;
                }
                
                if (data && data.profile) {
                    // Merge with default to ensure structure exists if partial data returned
                    setConfig(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.warn("Could not load dynamic info page config (using default):", error);
                // Fallback to default is already handled by initial state
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const handleLinkClick = (url: string, isExternal: boolean) => {
        if (isExternal || url.startsWith('http')) {
            window.open(url, '_blank');
        } else {
            navigate(url);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light pt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const { profile, buttons, sections, socialLinks } = config;

    return (
        <div className="bg-background-light min-h-screen pt-32 pb-24">
            <div className="max-w-md mx-auto px-4 sm:px-6">

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-light to-secondary-light p-1 shadow-soft mb-4">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                            ) : (
                                /* Default Logo Representation */
                                <span className="font-logo font-bold text-3xl text-primary">WC</span>
                            )}
                        </div>
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-text-heading-light flex items-center gap-2">
                        {profile.name} 
                        {profile.verified && <span className="text-[#0bceff] material-symbols-outlined text-2xl" title="Verified Account">verified</span>}
                    </h1>
                    <p className="mt-2 text-text-body-light font-body whitespace-pre-line">
                        {profile.bio}
                    </p>
                    
                    {/* Social Icons Mini Row */}
                    <div className="flex gap-4 mt-6">
                        {socialLinks.map(link => {
                            if (!link.url) return null;
                            
                            let Icon = null;
                            let colorClass = "hover:text-primary hover:bg-purple-50";

                            switch(link.platform) {
                                case 'instagram': 
                                    Icon = <InstagramIcon className="w-6 h-6"/>; 
                                    colorClass = "hover:text-[#E1306C] hover:bg-pink-50";
                                    break;
                                case 'linkedin': 
                                    Icon = <LinkedInIcon className="w-6 h-6"/>; 
                                    colorClass = "hover:text-[#0077b5] hover:bg-blue-50";
                                    break;
                                case 'email':
                                    Icon = <span className="material-symbols-outlined text-2xl">mail</span>;
                                    break;
                                case 'website':
                                    Icon = <span className="material-symbols-outlined text-2xl">language</span>;
                                    break;
                                default:
                                    Icon = <span className="material-symbols-outlined text-2xl">link</span>;
                            }

                            return (
                                <a 
                                    key={link.id}
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={`text-gray-400 transition-colors p-2 rounded-full ${colorClass}`}
                                >
                                    {Icon}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Main Links Stack */}
                <div className="space-y-4">
                    {buttons.filter(b => b.isActive).map(btn => (
                        <LinkCard
                            key={btn.id}
                            icon={btn.icon}
                            title={btn.title}
                            subtext={btn.subtitle}
                            image={btn.image}
                            onClick={() => handleLinkClick(btn.url, btn.isExternal)}
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="my-10 flex items-center gap-4 opacity-60">
                     <div className="h-px bg-border-light flex-grow"></div>
                     <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resources</span>
                     <div className="h-px bg-border-light flex-grow"></div>
                </div>

                {/* Expandable Info Sections */}
                <div className="space-y-4">
                    {sections.map(section => (
                        <InfoCard 
                            key={section.id}
                            icon={section.icon}
                            title={section.title}
                            content={section.content}
                        />
                    ))}
                </div>
                
                <div className="mt-16 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} WeCreate</p>
                </div>

            </div>
        </div>
    );
};

export default InfoPage;
