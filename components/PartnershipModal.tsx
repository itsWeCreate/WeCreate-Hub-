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

    // Safely saves a backup of the inquiry to the browser's local storage.
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
            // FIX: Removed comparison with placeholder URL to resolve TypeScript error.
            // The `GOOGLE_SHEET_WEB_APP_URL` constant has a literal type that would never
            // match the placeholder string, causing a compilation error. A simple truthiness
            // check is sufficient to determine if the URL is configured.
            if (!GOOGLE_SHEET_WEB_APP_URL) {
                 console.warn('Google Sheets URL is not configured. Saving to localStorage only.');
                 saveToLocalStorage(submissionData);
                 onSuccess('Inquiry saved locally. Please configure Google Sheets to enable full functionality.');
            } else {
                // Send data to Google Apps Script
                const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                    method: 'POST',
                    // Use 'text/plain' to avoid CORS preflight issues with simple deployments
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submissionData),
                });
                
                const result = await response.json();
                if (result.result !== 'success') {
                    throw new Error(result.error || 'The API returned an unknown error.');
                }
                onSuccess('Thank you! Your inquiry has been submitted successfully.');
            }
            
            // Also save a local backup for the admin panel.
            saveToLocalStorage(submissionData);
            
            // Reset form and close modal
            setFormData({
                fullName: '', organization: '', email: '', phone: '',
                partnershipType: 'Corporate Partnership', budget: '', message: ''
            });
            onClose();

        } catch (error) {
            console.error("An error occurred during form submission:", error);
            // If network or script fails, still save locally and notify the user.
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
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" 
            aria-modal="true" 
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-background-light rounded-xl shadow-xl max-w-2xl w-full relative transform transition-all duration-300 scale-100 flex flex-col max-h-[calc(100vh-2rem)]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10" aria-label="Close modal" disabled={isSubmitting}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="text-center p-8 pb-6 flex-shrink-0">
                    <h2 className="text-3xl font-heading font-semibold text-text-heading-light">Let's Build Together</h2>
                    <p className="mt-2 text-text-body-light">
                        Interested in partnering with WeCreate? Fill out the form below.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto px-8 pb-8">
                     <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} required disabled={isSubmitting} />
                        <InputField label="Organization" name="organization" value={formData.organization} onChange={handleInputChange} disabled={isSubmitting} />
                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required disabled={isSubmitting} />
                        <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="partnershipType" className="block text-sm font-medium text-text-heading-light mb-1">Partnership Type</label>
                            <select
                                id="partnershipType"
                                name="partnershipType"
                                value={formData.partnershipType}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-body-light disabled:bg-slate-100"
                            >
                                <option>Corporate Partnership</option>
                                <option>Educational Partnership</option>
                                <option>Community Partnership</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-text-heading-light mb-1">Estimated Budget</label>
                            <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-body-light disabled:bg-slate-100"
                            >
                                <option value="">Select a budget range</option>
                                <option value="< $5,000">&lt; $5,000</option>
                                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                                <option value="$25,000+">$25,000+</option>
                                <option value="Not Sure / Other">Not Sure / Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-text-heading-light mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-white border border-border-light rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-body-light disabled:bg-slate-100"
                            placeholder="Tell us how you'd like to collaborate..."
                        ></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-mild disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, required = false, disabled = false }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-text-heading-light mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-body-light disabled:bg-slate-100"
            />
        </div>
    );
};

export default PartnershipModal;