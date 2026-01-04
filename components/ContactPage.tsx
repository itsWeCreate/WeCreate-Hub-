
import React, { useState } from 'react';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

interface ContactPageProps {
    onSuccess: (message: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submissionData = {
            ...formData,
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

            setFormData({ fullName: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            console.error("Submission error", error);
            onSuccess("Couldn't send message. Please email info@wecreatehub.com directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative hero-gradient text-white pt-40 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-heading font-semibold leading-tight drop-shadow-sm">
                        Get in Touch
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-body">
                        Have a question about our programs? Want to join the community? Or just want to say hi? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="py-16 sm:py-24 -mt-10 relative z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
                        
                        {/* Contact Info Column */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-soft border border-border-light">
                                <h3 className="text-2xl font-heading font-semibold text-text-heading-light mb-6">Contact Info</h3>
                                
                                <div className="space-y-6">
                                    <ContactDetail 
                                        icon="mail" 
                                        label="Email Us" 
                                        value="info@wecreatehub.com" 
                                        href="mailto:info@wecreatehub.com"
                                    />
                                    <ContactDetail 
                                        icon="call" 
                                        label="Call Us" 
                                        value="(315) 570-9317" 
                                        href="tel:3155709317"
                                    />
                                    <ContactDetail 
                                        icon="location_on" 
                                        label="Visit Us" 
                                        value="South Florida Hub" 
                                    />
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Office Hours</h4>
                                    <p className="text-text-body-light text-sm">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                                    <p className="text-text-body-light text-sm mt-1">Sat - Sun: Community Events only</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-soft border border-border-light h-full">
                                <h3 className="text-3xl font-heading font-semibold text-text-heading-light mb-2">Send us a Message</h3>
                                <p className="text-text-body-light mb-8">Reach out and let us know how we can help you build your future.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-text-heading-light mb-1.5">Full Name</label>
                                            <input 
                                                type="text" 
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all bg-gray-50/50"
                                                placeholder="Jane Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-heading-light mb-1.5">Email Address</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all bg-gray-50/50"
                                                placeholder="jane@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-heading-light mb-1.5">Subject</label>
                                        <select 
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all bg-gray-50/50"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Program Question</option>
                                            <option>Partnership Interest</option>
                                            <option>Technical Support</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-heading-light mb-1.5">Your Message</label>
                                        <textarea 
                                            name="message"
                                            required
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all bg-gray-50/50"
                                            placeholder="Tell us what's on your mind..."
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        {!isSubmitting && <span className="material-symbols-outlined text-xl">send</span>}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

const ContactDetail: React.FC<{ icon: string, label: string, value: string, href?: string }> = ({ icon, label, value, href }) => (
    <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
            {href ? (
                <a href={href} className="text-lg font-semibold text-text-heading-light hover:text-primary transition-colors">{value}</a>
            ) : (
                <p className="text-lg font-semibold text-text-heading-light">{value}</p>
            )}
        </div>
    </div>
);

export default ContactPage;
