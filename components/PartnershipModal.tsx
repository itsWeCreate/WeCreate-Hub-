import React, { useState, useEffect } from 'react';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

interface PartnershipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (message: string) => void;
}

const PartnershipModal: React.FC<PartnershipModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        partnershipType: 'Corporate Partnership',
        budget: '',
        message: ''
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const saveToLocalStorage = (data: any) => {
        try {
            let existingInquiries: any[] = [];
            const storedInquiries = localStorage.getItem('partnershipInquiries');
            if (storedInquiries) {
                const parsed = JSON.parse(storedInquiries);
                if (Array.isArray(parsed)) {
                    existingInquiries = parsed;
                }
            }
            const newInquiry = { ...data, id: Date.now(), submittedAt: new Date().toISOString() };
            existingInquiries.push(newInquiry);
            localStorage.setItem('partnershipInquiries', JSON.stringify(existingInquiries));
        } catch (error) {
            console.error("Failed to save inquiry to localStorage:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const submissionData = { ...formData, formType: 'partnershipInquiry' };

        try {
            if (!GOOGLE_SHEET_WEB_APP_URL) {
                 saveToLocalStorage(submissionData);
                 onSuccess('Inquiry saved locally. Please configure Google Sheets to enable full functionality.');
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
                onSuccess('Thank you! Your inquiry has been submitted successfully.');
            }
            
            saveToLocalStorage(submissionData);
            setFormData({
                fullName: '', organization: '', email: '', phone: '',
                partnershipType: 'Corporate Partnership', budget: '', message: ''
            });
            onClose();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
            saveToLocalStorage(submissionData);
            onSuccess("Your inquiry was saved, but we couldn't send it to our team. Please contact us directly.");
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110] flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300" 
            aria-modal="true" 
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl max-w-2xl w-full relative transform transition-all duration-300 scale-100 flex flex-col max-h-[95vh] sm:max-h-[calc(100vh-2rem)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 sm:top-8 sm:right-8 text-neutral-400 hover:text-neutral-900 transition-colors z-10 p-2" 
                    aria-label="Close modal" 
                    disabled={isSubmitting}
                >
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">close</span>
                </button>
                
                <div className="text-center px-6 sm:px-10 pt-10 sm:pt-12 pb-4 sm:pb-6 flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary-light text-primary mb-4 sm:mb-6 shadow-sm">
                        <span className="material-symbols-outlined text-3xl sm:text-4xl">handshake</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-heading font-bold text-neutral-900 tracking-tight leading-tight px-4 sm:px-0">Let's Build Together</h2>
                    <p className="mt-2 sm:mt-3 text-neutral-500 font-body font-light text-base sm:text-lg">
                        Fill out the form below to start our collaboration roadmap.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col space-y-5 sm:space-y-6 overflow-y-auto px-6 sm:px-10 pb-10 sm:pb-12 pt-2">
                    <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                        <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} required disabled={isSubmitting} icon="person" />
                        <InputField label="Organization" name="organization" value={formData.organization} onChange={handleInputChange} disabled={isSubmitting} icon="business" />
                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required disabled={isSubmitting} icon="mail" />
                        <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} icon="phone" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                            <label htmlFor="partnershipType" className="block text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Partnership Type</label>
                            <div className="relative">
                                <select
                                    id="partnershipType"
                                    name="partnershipType"
                                    value={formData.partnershipType}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50 border-none rounded-xl sm:rounded-2xl shadow-sm focus:ring-2 focus:ring-primary text-neutral-900 text-sm sm:text-base transition disabled:bg-slate-100 outline-none appearance-none"
                                >
                                    <option>Corporate Partnership</option>
                                    <option>Educational Partnership</option>
                                    <option>Community Partnership</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="budget" className="block text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Estimated Budget</label>
                            <div className="relative">
                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50 border-none rounded-xl sm:rounded-2xl shadow-sm focus:ring-2 focus:ring-primary text-neutral-900 text-sm sm:text-base transition disabled:bg-slate-100 outline-none appearance-none"
                                >
                                    <option value="">Select a range</option>
                                    <option value="< $5,000">&lt; $5,000</option>
                                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                                    <option value="$25,000+">$25,000+</option>
                                    <option value="Not Sure / Other">Not Sure / Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50 border-none rounded-xl sm:rounded-2xl shadow-sm focus:ring-2 focus:ring-primary text-neutral-900 text-sm sm:text-base transition disabled:bg-slate-100 outline-none resize-none"
                            placeholder="Tell us how you'd like to collaborate..."
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="bg-primary hover:bg-primary-hover w-full text-white font-heading font-bold py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-xl shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg sm:text-xl"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : 'Submit Inquiry'}
                    </button>
                </form>
            </div>
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
    disabled?: boolean;
    icon?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, required = false, disabled = false, icon }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <span className="material-symbols-outlined text-xl">{icon}</span>
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`w-full ${icon ? 'pl-11 sm:pl-12' : 'px-4 sm:px-5'} py-3.5 sm:py-4 bg-slate-50 border-none rounded-xl sm:rounded-2xl shadow-sm focus:ring-2 focus:ring-primary text-neutral-900 text-sm sm:text-base transition disabled:bg-slate-100 outline-none`}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            </div>
        </div>
    );
};

export default PartnershipModal;