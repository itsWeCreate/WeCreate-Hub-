import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkedInIcon, InstagramIcon } from './icons';
import { AppConfig, DEFAULT_APP_CONFIG } from '../types';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

// Reusable Link Card Component
interface LinkCardProps {
    icon: string;
    title: string;
    onClick: () => void;
    subtext?: string;
    image?: string;
    fullWidth?: boolean;
    price?: string;
    ctaText?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ 
    icon, 
    title, 
    onClick, 
    subtext, 
    image, 
    fullWidth,
    price,
    ctaText
}) => {
    const isRichCard = Boolean(ctaText || price || image);

    if (isRichCard) {
        return (
            <button
                onClick={onClick}
                className={`
                    relative bg-white rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] border border-gray-100 
                    transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 group 
                    text-left overflow-hidden flex flex-col h-full
                    ${fullWidth ? 'sm:col-span-2' : 'col-span-1'}
                `}
            >
                <div className="p-6 flex flex-col h-full w-full">
                    <div className="flex items-start gap-5 w-full">
                        <div className="flex-shrink-0">
                            {image ? (
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-50 overflow-hidden shadow-inner border border-gray-100">
                                    <img src={image} alt="" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />
                                </div>
                            ) : (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gray-50 rounded-2xl text-primary flex-shrink-0 shadow-sm border border-gray-100">
                                    <span className="material-symbols-outlined text-4xl">{icon}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-grow min-w-0 flex flex-col justify-center py-1">
                            <h3 className="font-heading font-bold text-gray-900 text-lg sm:text-xl leading-tight break-words mb-1">
                                {title}
                            </h3>
                            {price && (
                                <div className="font-heading font-bold text-primary text-lg mb-1.5">
                                    {price}
                                </div>
                            )}
                            {subtext && (
                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed break-words line-clamp-3">
                                    {subtext}
                                </p>
                            )}
                        </div>
                    </div>
                    {ctaText && (
                        <div className="mt-6 pt-2 w-full">
                            <div className="w-full bg-secondary hover:bg-blue-600 text-white font-heading font-bold py-3.5 px-6 rounded-xl text-center transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group-hover:bg-blue-600">
                                {ctaText}
                                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                            </div>
                        </div>
                    )}
                </div>
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`
                relative bg-white rounded-2xl shadow-sm border border-gray-100 
                transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 group 
                text-left overflow-hidden flex items-center p-4 min-h-[5rem]
                ${fullWidth ? 'sm:col-span-2' : 'col-span-1'}
            `}
        >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0 mr-4 shadow-sm">
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            
            <div className="flex-grow z-10 min-w-0 flex flex-col justify-center">
                <h3 className="font-heading font-semibold text-gray-900 text-lg leading-snug break-words pr-2 group-hover:text-primary transition-colors">{title}</h3>
                {subtext && <p className="text-sm text-gray-500 mt-0.5 leading-snug break-words opacity-90 pr-2">{subtext}</p>}
            </div>
            <div className="text-gray-300 group-hover:text-primary transition-colors ml-2 flex-shrink-0">
                <span className="material-symbols-outlined">chevron_right</span>
            </div>
        </button>
    );
};

interface InfoCardProps {
    icon: string;
    title: string;
    content: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const formattedContent = content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 flex items-center text-left hover:bg-gray-50/80 transition-colors"
            >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <h3 className="ml-4 font-heading font-semibold text-gray-800 text-lg flex-grow">{title}</h3>
                <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-5 pt-0 pl-[4.5rem] text-gray-600 text-base leading-relaxed">
                    {formattedContent}
                </div>
            </div>
        </div>
    );
}

const InfoGate = ({ onUnlock }: { onUnlock: () => void }) => {
    const [formData, setFormData] = useState({ name: '', email: '', whereWeMet: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const submissionData = {
            fullName: formData.name,
            email: formData.email,
            message: `Where we met: ${formData.whereWeMet || 'Not specified'}`,
            partnershipType: 'Lead Capture',
            formType: 'leadCapture'
        };

        try {
            localStorage.setItem('infoPageGatePassed', 'true');
            localStorage.setItem('userInfo', JSON.stringify(submissionData));
            sessionStorage.setItem('infoPageGatePassed', 'true');

            if (GOOGLE_SHEET_WEB_APP_URL) {
                await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submissionData),
                });
            }
        } catch (error) {
            console.error("Submission error", error);
        } finally {
            setIsSubmitting(false);
            onUnlock();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-md transition-all duration-500 animate-fade-in">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 ring-1 ring-black/5 transform transition-all scale-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-light to-secondary-light text-primary mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-3xl">handshake</span>
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Welcome to the Ecosystem</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        We are building the future of work together. Connect with us to access our curated resources and stay in the loop.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50/50 focus:bg-white text-gray-800 placeholder-gray-400" placeholder="Your Name" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                        <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50/50 focus:bg-white text-gray-800 placeholder-gray-400" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Where did we meet? <span className="font-normal text-gray-400 normal-case">(Optional)</span></label>
                        <input type="text" value={formData.whereWeMet} onChange={e => setFormData({...formData, whereWeMet: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50/50 focus:bg-white text-gray-800 placeholder-gray-400" placeholder="e.g., Event, LinkedIn..." />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2">
                        {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Get Access'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const ComingSoonModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in" onClick={onClose}>
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 text-center transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We're currently architecting this part of the ecosystem. Check back shortly or join the community to be notified first.
            </p>
            <button 
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-black text-white font-heading font-bold py-4 rounded-2xl transition-all shadow-xl shadow-black/10"
            >
                Got it
            </button>
        </div>
    </div>
);

const InfoPage: React.FC = () => {
    const navigate = useNavigate();
    const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
    const [loading, setLoading] = useState(true);
    const [showResources, setShowResources] = useState(false);
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);

    useEffect(() => {
        const gatePassedLocal = localStorage.getItem('infoPageGatePassed');
        const gatePassedSession = sessionStorage.getItem('infoPageGatePassed');
        const hasProgramInterest = localStorage.getItem('programNotifications');
        const hasPartnershipInquiry = localStorage.getItem('partnershipInquiries');
        let hasPriorEngagement = false;
        try {
            if (hasProgramInterest && JSON.parse(hasProgramInterest).length > 0) hasPriorEngagement = true;
            if (hasPartnershipInquiry && JSON.parse(hasPartnershipInquiry).length > 0) hasPriorEngagement = true;
        } catch (e) {}

        if (gatePassedLocal === 'true' || gatePassedSession === 'true' || hasPriorEngagement) {
            setIsGateOpen(true);
        }

        const fetchConfig = async () => {
            if (!GOOGLE_SHEET_WEB_APP_URL) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${GOOGLE_SHEET_WEB_APP_URL}?action=getConfig`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const text = await response.text();
                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.warn("Received non-JSON response from config endpoint, falling back to default.");
                    setLoading(false);
                    return;
                }
                if (data && data.profile) {
                    setConfig(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.warn("Could not load dynamic info page config (using default):", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleLinkClick = (url: string, isExternal: boolean) => {
        // Strict placeholder check
        const isPlaceholder = !url || url === '#' || url.trim() === '';
        
        if (isPlaceholder) {
            setShowComingSoon(true);
            return;
        }

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
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 relative">
            {!isGateOpen && <InfoGate onUnlock={() => setIsGateOpen(true)} />}
            {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
            
            <div className={`max-w-3xl mx-auto px-5 sm:px-8 transition-all duration-500 ${!isGateOpen ? 'blur-sm opacity-80 pointer-events-none' : ''}`}>
                <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
                    <div className="w-36 h-36 rounded-full bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] mb-6 transform hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="font-logo font-bold text-5xl text-primary">WC</span>
                            )}
                        </div>
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-gray-900 flex items-center justify-center gap-2 mb-3">
                        {profile.name} 
                        {profile.verified && <span className="text-[#0bceff] material-symbols-outlined text-3xl align-middle" title="Verified Account">verified</span>}
                    </h1>
                    <p className="text-lg text-gray-600 font-body whitespace-pre-line max-w-lg leading-relaxed">
                        {profile.bio}
                    </p>
                    <div className="flex gap-4 mt-8">
                        {socialLinks.map(link => {
                            if (!link.url) return null;
                            let Icon = null;
                            let hoverClass = "hover:text-primary hover:bg-purple-50";
                            switch(link.platform) {
                                case 'instagram': Icon = <InstagramIcon className="w-6 h-6"/>; hoverClass = "hover:text-[#E1306C] hover:bg-pink-50"; break;
                                case 'linkedin': Icon = <LinkedInIcon className="w-6 h-6"/>; hoverClass = "hover:text-[#0077b5] hover:bg-blue-50"; break;
                                case 'email': Icon = <span className="material-symbols-outlined text-2xl">mail</span>; break;
                                case 'website': Icon = <span className="material-symbols-outlined text-2xl">language</span>; break;
                                default: Icon = <span className="material-symbols-outlined text-2xl">link</span>;
                            }
                            return (
                                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className={`text-gray-400 transition-all p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:scale-110 ${hoverClass}`}>
                                    {Icon}
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {buttons.filter(b => b.isActive).map(btn => (
                        <LinkCard key={btn.id} icon={btn.icon} title={btn.title} subtext={btn.subtitle} image={btn.image} fullWidth={btn.fullWidth} price={btn.price} ctaText={btn.ctaText} onClick={() => handleLinkClick(btn.url, btn.isExternal)} />
                    ))}
                </div>
                {sections.length > 0 && (
                    <>
                        <div className="mt-16 mb-6 flex items-center justify-center">
                            <button onClick={() => setShowResources(!showResources)} className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all focus:outline-none">
                                <div className="text-xs font-bold text-gray-400 group-hover:text-primary uppercase tracking-[0.2em] transition-colors">More Resources</div>
                                <span className={`material-symbols-outlined text-gray-400 group-hover:text-primary transition-transform duration-300 ${showResources ? 'rotate-180' : 'animate-bounce'}`}>expand_more</span>
                            </button>
                        </div>
                        <div className={`space-y-4 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${showResources ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            {sections.map(section => (
                                <InfoCard key={section.id} icon={section.icon} title={section.title} content={section.content} />
                            ))}
                        </div>
                    </>
                )}
                <div className="mt-20 text-center">
                    <p className="text-sm font-medium text-gray-300">© {new Date().getFullYear()} WeCreate</p>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;