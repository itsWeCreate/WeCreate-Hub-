
import React, { useState, useEffect } from 'react';
import InfoPageEditor from './InfoPageEditor';
import EventsEditor from './EventsEditor';

interface Inquiry {
    id: number;
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    partnershipType: string;
    budget: string;
    message: string;
    submittedAt: string;
}

interface AdminPageProps {
    onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'inquiries' | 'info-editor' | 'events-editor'>('inquiries');
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);

    useEffect(() => {
        const storedInquiries = JSON.parse(localStorage.getItem('partnershipInquiries') || '[]');
        storedInquiries.sort((a: Inquiry, b: Inquiry) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        setInquiries(storedInquiries);
    }, []);

    const handleClearInquiries = () => {
        if (window.confirm('Are you sur you want to delete all inquiries? This action cannot be undone.')) {
            localStorage.removeItem('partnershipInquiries');
            setInquiries([]);
        }
    };

    return (
        <div className="bg-background-light min-h-screen">
            <div className="pt-32 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header with Navigation */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-200 pb-4">
                        <h1 className="text-3xl font-heading font-semibold text-text-heading-light">
                            Admin Dashboard
                        </h1>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={onLogout}
                                className="bg-slate-600 hover:bg-slate-700 text-white font-heading font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">logout</span>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
                        <button 
                            onClick={() => setActiveTab('inquiries')}
                            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'inquiries' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Inquiries
                        </button>
                        <button 
                            onClick={() => setActiveTab('info-editor')}
                            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'info-editor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Info Page Editor
                        </button>
                         <button 
                            onClick={() => setActiveTab('events-editor')}
                            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'events-editor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Events Editor
                        </button>
                    </div>

                    {/* Content */}
                    {activeTab === 'info-editor' ? (
                        <InfoPageEditor />
                    ) : activeTab === 'events-editor' ? (
                        <EventsEditor />
                    ) : (
                        <div>
                            <div className="flex justify-end mb-4">
                                {inquiries.length > 0 && (
                                    <button 
                                        onClick={handleClearInquiries}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        Clear All Inquiries
                                    </button>
                                )}
                            </div>

                            {inquiries.length === 0 ? (
                                <div className="text-center py-20 bg-card-bg-light rounded-xl border border-border-light">
                                    <span className="material-symbols-outlined text-6xl text-gray-400">inbox</span>
                                    <h2 className="mt-4 text-2xl font-semibold text-text-heading-light">No inquiries yet</h2>
                                    <p className="mt-2 text-text-body-light">When a new partnership inquiry is submitted, it will appear here.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {inquiries.map(inquiry => (
                                        <div key={inquiry.id} className="bg-card-bg-light p-6 rounded-xl shadow-soft border border-border-light">
                                            <div className="flex justify-between items-start flex-wrap gap-4">
                                                <div>
                                                    <h2 className="text-2xl font-heading font-semibold text-primary">{inquiry.fullName}</h2>
                                                    {inquiry.organization && <p className="text-md text-text-body-light">{inquiry.organization}</p>}
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Submitted: {new Date(inquiry.submittedAt).toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="text-left sm:text-right flex-shrink-0 ml-auto">
                                                    <p className="font-semibold text-text-heading-light">{inquiry.partnershipType}</p>
                                                    {inquiry.budget && <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md inline-block mt-1">Budget: {inquiry.budget}</p>}
                                                    <div className='mt-1'>
                                                        <a href={`mailto:${inquiry.email}`} className="text-secondary hover:underline">{inquiry.email}</a>
                                                        {inquiry.phone && <p className="text-text-body-light">{inquiry.phone}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            {inquiry.message && (
                                                <div className="mt-4 pt-4 border-t border-border-light">
                                                    <p className="text-text-body-light whitespace-pre-wrap">{inquiry.message}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
