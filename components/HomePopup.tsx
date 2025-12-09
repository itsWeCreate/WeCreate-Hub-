
import React, { useState, useEffect } from 'react';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

const HomePopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        // Check if user has already seen or interacted with this popup
        const hasSeenPopup = localStorage.getItem('hasSeenHomePopup');
        const hasConverted = localStorage.getItem('programNotifications') || localStorage.getItem('partnershipInquiries'); // Don't show if they are already a lead

        if (!hasSeenPopup && !hasConverted) {
            // Trigger popup after 8 seconds of engagement
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            // Mark as seen so it doesn't show again
            localStorage.setItem('hasSeenHomePopup', 'true');
        }, 300); // Match animation duration
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const submissionData = {
            fullName: formData.name,
            email: formData.email,
            programInterested: 'General Newsletter / Community',
            formType: 'programNotification' // Reusing this type to put them in the "Notifications" sheet
        };

        try {
            if (GOOGLE_SHEET_WEB_APP_URL) {
                await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submissionData),
                });
            }
            
            // Save locally as well
            const stored = localStorage.getItem('programNotifications');
            const existing = stored ? JSON.parse(stored) : [];
            existing.push({ ...submissionData, submittedAt: new Date().toISOString() });
            localStorage.setItem('programNotifications', JSON.stringify(existing));

            setStatus('success');
            
            // Close after showing success message briefly
            setTimeout(() => {
                handleClose();
            }, 2000);

        } catch (error) {
            console.error("Popup submission error", error);
            // Still close on error to not block user
            handleClose();
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isClosing ? 'scale-95 translate-y-4' : 'scale-100 translate-y-0'}`}>
                
                {/* Decorative Header Background */}
                <div className="h-32 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1.5 transition-colors z-10"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="px-8 pb-8 pt-0 relative">
                    {/* Icon Badge */}
                    <div className="-mt-10 mb-4 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg text-primary border-4 border-white">
                        <span className="material-symbols-outlined text-4xl">mark_email_unread</span>
                    </div>

                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                            <h3 className="text-2xl font-heading font-bold text-gray-800">You're in!</h3>
                            <p className="text-gray-500 mt-2">Welcome to the community.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-heading font-bold text-gray-900 leading-tight">
                                    Build the Future, <br/>Don't Just Watch It.
                                </h2>
                                <p className="text-gray-500 mt-3 text-base leading-relaxed">
                                    Join South Florida's premier community of innovators. Get exclusive access to high-impact workshops, tactical AI insights, and the network you need to thrive in the new economy.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input 
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        placeholder="Your First Name"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        placeholder="Your Email Address"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'submitting' ? 'Joining...' : 'Join the Community'}
                                </button>
                            </form>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                No spam, ever. Unsubscribe anytime.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePopup;
