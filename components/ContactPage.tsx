import React, { useState } from 'react';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

interface ContactPageProps {
    onSuccess: (message: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const interestOptions = [
        "AI Consulting", 
        "AI Checkup", 
        "Websites", 
        "Digital Wearables", 
        "AI Education", 
        "Partnerships"
    ];

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev => 
            prev.includes(interest) 
                ? prev.filter(i => i !== interest) 
                : [...prev, interest]
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const interestsString = selectedInterests.length > 0 
            ? `INTERESTED IN: ${selectedInterests.join(', ')}\n\n` 
            : '';

        const submissionData = {
            fullName: formData.fullName,
            email: formData.email,
            message: `${interestsString}${formData.message}`,
            formType: 'generalInquiry',
            submittedAt: new Date().toISOString()
        };

        try {
            if (GOOGLE_SHEET_WEB_APP_URL) {
                const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submissionData),
                });
                const result = await response.json();
                if (result.result !== 'success') {
                    throw new Error(result.error || 'The API returned an unknown error.');
                }
                onSuccess('Message sent! Our team will get back to you shortly.');
            } else {
                // Local storage fallback
                const stored = localStorage.getItem('generalInquiries');
                const existing = stored ? JSON.parse(stored) : [];
                existing.push(submissionData);
                localStorage.setItem('generalInquiries', JSON.stringify(existing));
                onSuccess('Message saved locally. (Backend not configured)');
            }

            setFormData({ fullName: '', email: '', message: '' });
            setSelectedInterests([]);
        } catch (error) {
            console.error("Submission error", error);
            onSuccess("Couldn't send message. Please email hello@wecreate.studio directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen">
            <main className="pt-48 pb-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Content */}
                        <div className="max-w-xl animate-fade-in-up">
                            <span className="inline-block py-1 px-3 bg-primary-light/30 text-primary dark:bg-primary/20 dark:text-primary-light text-xs font-medium uppercase tracking-widest rounded mb-6">Connect With Us</span>
                            <h1 className="text-5xl md:text-7xl font-heading font-medium leading-[1.1] text-text-heading-light dark:text-text-heading-dark mb-8 tracking-tighter">
                                Let's Build What <br/><span className="text-primary italic">Works</span>.
                            </h1>
                            <p className="text-xl md:text-2xl text-text-body-light dark:text-text-body-dark font-light leading-relaxed mb-12">
                                Whether you're looking to integrate AI into your workflow or ready to launch a new venture, our studio is here to help you navigate the future with clarity.
                            </p>
                            
                            <div className="space-y-8">
                                <FeatureItem icon="verified" text="Expert AI Consulting" />
                                <FeatureItem icon="school" text="Custom Education Programs" />
                                <FeatureItem icon="rocket" text="Gen Z Focused Strategy" />
                            </div>
                        </div>

                        {/* Right Column: Form Card */}
                        <div className="contact-form-card p-1 rounded-3xl shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-white dark:bg-card-bg-dark rounded-[calc(1.5rem+4px)] p-8 md:p-12">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-heading font-medium text-text-heading-light dark:text-text-heading-dark mb-6">What are you interested in?</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {interestOptions.map((interest) => (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => toggleInterest(interest)}
                                                    className={`
                                                        px-5 py-2 rounded-full border text-sm font-normal transition-all duration-300
                                                        ${selectedInterests.includes(interest)
                                                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                                            : 'border-border-light dark:border-border-dark text-text-body-light dark:text-text-body-dark hover:bg-gray-50 dark:hover:bg-slate-800'
                                                        }
                                                    `}
                                                >
                                                    {interest}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-text-body-light/60 dark:text-text-body-dark/60 ml-1">Full Name</label>
                                            <input 
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary rounded-xl p-4 text-base font-light dark:text-white" 
                                                placeholder="Alex Chen" 
                                                type="text"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-text-body-light/60 dark:text-text-body-dark/60 ml-1">Email Address</label>
                                            <input 
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary rounded-xl p-4 text-base font-light dark:text-white" 
                                                placeholder="alex@company.com" 
                                                type="email"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-body-light/60 dark:text-text-body-dark/60 ml-1">How can we help?</label>
                                        <textarea 
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary rounded-xl p-4 text-base font-light dark:text-white" 
                                            placeholder="Tell us a bit about your project or goals..." 
                                            rows={4}
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold text-lg py-5 rounded-xl transition-all duration-300 shadow-xl shadow-primary/20 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Submit / Book a Call'}
                                    </button>
                                    
                                    <p className="text-center text-xs font-light text-text-body-light/60 dark:text-text-body-dark/60">
                                        We'll get back to you within 24 hours.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Internal Helper for Feature Items
const FeatureItem: React.FC<{ icon: string, text: string }> = ({ icon, text }) => (
    <div className="flex items-center space-x-5">
        <div className="w-12 h-12 rounded-full bg-white dark:bg-card-bg-dark shadow-soft flex items-center justify-center border border-border-light/30">
            <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
        </div>
        <span className="text-sm md:text-base font-medium text-text-heading-light dark:text-text-heading-dark uppercase tracking-[0.15em]">{text}</span>
    </div>
);

export default ContactPage;