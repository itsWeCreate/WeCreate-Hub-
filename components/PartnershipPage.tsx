import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpenModalFunction } from '../App';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

interface PartnershipPageProps {
    onOpenPartnershipModal: OpenModalFunction;
}

const PartnershipPage: React.FC<PartnershipPageProps> = ({ onOpenPartnershipModal }) => {
    const navigate = useNavigate();
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const submissionData = { ...formData, formType: 'partnershipInquiry' };

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
                alert('Thank you! Your inquiry has been submitted successfully.');
            } else {
                alert('Inquiry saved locally. (Backend not configured)');
            }
            
            // Backup locally
            const existing = JSON.parse(localStorage.getItem('partnershipInquiries') || '[]');
            existing.push({ ...submissionData, id: Date.now(), submittedAt: new Date().toISOString() });
            localStorage.setItem('partnershipInquiries', JSON.stringify(existing));
            
            setFormData({
                fullName: '', organization: '', email: '', phone: '',
                partnershipType: 'Corporate Partnership', budget: '', message: ''
            });
        } catch (error) {
            console.error("Submission error", error);
            alert("Your inquiry was saved, but we couldn't send it to our team. Please contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-body antialiased bg-white overflow-x-hidden">
            <main>
                {/* Hero Section - Services Matched */}
                <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-32 bg-white">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 animate-fade-in-up">
                                <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6 font-heading">Ecosystem Growth</span>
                                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[1] sm:leading-[0.95] mb-8 tracking-tight sm:tracking-tighter text-text-heading-light font-heading font-bold">
                                    Partner With Us, <br className="sm:hidden" />
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Shape the Future</span>
                                </h1>
                                <p className="text-xl sm:text-2xl text-text-body-light leading-relaxed mb-10 max-w-2xl font-body font-light">
                                    Building a high-trust ecosystem to empower the next generation. Join us in creating institutional-grade opportunities and driving talent in the AI era.
                                </p>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
                                    <button 
                                        className="bg-primary text-white font-heading font-bold py-5 px-10 rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all" 
                                        onClick={onOpenPartnershipModal}
                                    >
                                        Become a Partner
                                    </button>
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="border-2 border-slate-200 text-text-heading-light px-10 py-5 rounded-2xl font-heading font-semibold text-lg hover:bg-slate-50 transition-all"
                                    >
                                        Get in Touch
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-span-5 relative hidden lg:block">
                                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl">
                                    <img alt="Diverse collaboration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/rd-d/ALs6j_EJ7wRnEYnnLpoUANhiPomhRE5qdn2APODlFkWo3DViCuPChW1hjVOLwoRHBBh0QNxy8C4wCN5cisEObwPB38IFA-xbHaZQgjWMIqDjFWVhwwFzanY7csE5-XnXoX8TpY1ZfVHjE1Nc_jhjRAbuC_ekRq3wNha4KtAsNNp9d1QMLKqVW5f3abEYoadxsiavy8thawe7t1W1CplMeAh5cbIcH3njSkhefe7w0c2cMUv1-7QXoOvvQFFlE3UvnRTmra8YTL8RA6IBborQC4iwq6KO0nMy0pShDfXYACletk9kLI1TNQA311dMqps9d-KsVoPXzOXuwXR3rv8ko-q46le1z8AmMdpfmzYXO-mfgriEjKlr9UisM3SYvpF_Eyhl8RpwhegbPHLQqCosFRO7O3Gwh0m4wzFxIYzv2oaMkIJLwU4jsix2tBYo7GvnwzgD5dYXEZD548GT7fFX3TGlvzQ-7hDwfNV89Kqby5zVZHVZo2zlpTkkCsNKKgLRIuRrwpxz9ge4sxK8L8FJwLo_C9mPyWz_dDlw7We4KdG9gzGVttCBzwuAlQVsF50Du5uuQi8QgLWpKrVO1atyE8vD-zL6U4zAf64dBtUPp_OgvvOrF5hphFEi0mq0J3Bn1FyB2vB0ROwayE4xQo8t2lA3Xl4PaiNrS2_NHXqZmhkWu_CvKeHPax7f_OIH4H6_NQ2aiQr4maoaGboMrQYck9DTQSyTHzqtjBtPktN2VF6NWfXyJQo8LrXrDN_rCOTi79ugsHV5RjT2XVpce9LdoIy8nS16wZEDdIOf3JTo7zW4y3VyIqdqtQnO2qhMEgYjAn85faEUIBcHE4-qWj4AqYs1nuIkoMUwgiHKXU9LwFDv9AWybY9VC24Vq0Pz7XQriz7r3utKD1ub8dMZGnTePiQMJPIniCzoVC4KnpupPSqWyIYpeohPoMsdD_fErkT-aoV1UyhRMuAVo3zO-Nurk2OaQCm7y_sJ_wCwzJQQo0w_X5QBn2K3ZKNujd5DxHL19IXWgPkdNGAFOyGT2O0QtJcZSsjN9NdL-387kgiJ0NqJoXpZwsW-fGDJFDqiSaH8pw=w3072-h1850?auditContext=forDisplay"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ways to Collaborate - Refined Cards */}
                <section className="py-20 sm:py-32 bg-slate-50 border-y border-slate-100">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-16 sm:mb-24">
                            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4 font-heading">Collaboration Models</span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-text-heading-light leading-tight tracking-tight">How We Partner</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                            <PartnerModelCard 
                                icon="business" 
                                title="Corporate" 
                                desc="Invest in institutional tech pipelines. Sponsor high-impact programs or host mentorship for our community."
                                items={["Exclusive talent access", "Brand visibility initiatives", "Curriculum advisement"]}
                            />
                            <PartnerModelCard 
                                icon="school" 
                                title="Educational" 
                                desc="Integrate cutting-edge AI education and provide students with vetted real-world pathways."
                                items={["Co-developed workshops", "Internship credit programs", "Expert guest lectures"]}
                                iconColor="text-secondary"
                                iconBg="bg-secondary-light"
                            />
                            <PartnerModelCard 
                                icon="groups" 
                                title="Community" 
                                desc="Amplify impact through joint programming to foster a more inclusive and tech-forward ecosystem."
                                items={["Joint community events", "Shared resource networks", "Cross-promotion support"]}
                            />
                        </div>
                    </div>
                </section>

                {/* Benefits Section - Services Refined Styling */}
                <section className="py-20 sm:py-32 bg-white">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <div className="order-2 lg:order-1 relative">
                                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 bg-slate-50">
                                    <img alt="Partnership success" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1556761175-5973eb0732da?q=80&w=2664&auto=format&fit=crop"/>
                                </div>
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full p-4 shadow-2xl hidden xl:flex items-center justify-center text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Trust <br/> Network</p>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-heading-light mb-12 sm:mb-16 leading-tight">Why Partner With Us?</h2>
                                <div className="space-y-12">
                                    <BenefitItem icon="hub" title="Connect with Top Talent" text="Gain direct access to our pool of motivated builders trained in the latest AI technologies and workflow methods." />
                                    <BenefitItem icon="rocket_launch" title="Increase Brand Reach" text="Showcase your commitment to innovation to our wide, highly engaged audience of emerging leaders." />
                                    <BenefitItem icon="verified" title="Drive Real Impact" text="Contribute to building a future-ready workforce and fostering regional innovation and economic growth." />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Inquiry Form Section */}
                <section className="py-20 sm:py-32 bg-slate-50 border-t border-slate-100" id="inquiry">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-5 gap-16 lg:gap-20 items-start">
                                <div className="lg:col-span-2">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-heading-light mb-8 leading-tight">Let's Build Together</h2>
                                    <p className="text-xl sm:text-2xl text-text-body-light leading-relaxed mb-10 font-body font-light">
                                        Ready to make a difference? Fill out the inquiry form and our partnership team will reach out to discuss our collaboration roadmap.
                                    </p>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 text-text-body-light">
                                            <span className="material-symbols-outlined text-primary text-2xl font-bold">mail</span>
                                            <span className="text-xl font-medium">partners@wecreatehub.com</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-text-body-light">
                                            <span className="material-symbols-outlined text-primary text-2xl font-bold">schedule</span>
                                            <span className="text-xl font-medium">Response within 24-48 hours</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-3">
                                    <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100">
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                            <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" required />
                                            <FormInput label="Organization" name="organization" value={formData.organization} onChange={handleInputChange} placeholder="Company Name" required />
                                            <FormInput label="Email Address" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required type="email" />
                                            <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(305) 555-0123" type="tel" />
                                            
                                            <div className="sm:col-span-1">
                                                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3" htmlFor="partnershipType">Partnership Type</label>
                                                <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-text-heading-light text-base focus:ring-2 focus:ring-primary transition outline-none appearance-none" id="partnershipType" name="partnershipType" value={formData.partnershipType} onChange={handleInputChange}>
                                                    <option>Corporate Partnership</option>
                                                    <option>Educational Partnership</option>
                                                    <option>Community Partnership</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            
                                            <div className="sm:col-span-1">
                                                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3" htmlFor="budget">Estimated Budget</label>
                                                <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-text-heading-light text-base focus:ring-2 focus:ring-primary transition outline-none appearance-none" id="budget" name="budget" value={formData.budget} onChange={handleInputChange}>
                                                    <option value="">Select a range</option>
                                                    <option value="< $5,000">&lt; $5,000</option>
                                                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                                                    <option value="$25,000+">$25,000+</option>
                                                    <option value="Not Sure / Other">Not Sure / Other</option>
                                                </select>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3" htmlFor="message">Message</label>
                                                <textarea className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-text-heading-light text-base focus:ring-2 focus:ring-primary transition outline-none" id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your goals..." rows={4}></textarea>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <button className="bg-primary hover:bg-primary-hover w-full text-white font-heading font-bold py-5 rounded-2xl shadow-xl shadow-purple-500/20 transition-all disabled:opacity-50 text-xl" type="submit" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

// Internal Helper Components
const PartnerModelCard: React.FC<{ icon: string; title: string; desc: string; items: string[]; iconColor?: string; iconBg?: string; }> = ({ icon, title, desc, items, iconColor = "text-primary", iconBg = "bg-primary-light" }) => (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-soft transition-all hover:shadow-hover hover:-translate-y-1 group">
        <div className="mb-8 flex">
            <span className={`material-symbols-outlined text-3xl ${iconColor} ${iconBg} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                {icon}
            </span>
        </div>
        <h3 className="text-2xl font-heading font-bold mb-4 text-text-heading-light group-hover:text-primary transition-colors">{title}</h3>
        <p className="font-body font-light text-text-body-light leading-relaxed text-lg mb-8">
            {desc}
        </p>
        <ul className="space-y-4">
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-base font-medium text-text-heading-light">
                    <span className="material-symbols-outlined text-primary font-bold text-xl">check_circle</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const BenefitItem: React.FC<{ icon: string; title: string; text: string; }> = ({ icon, title, text }) => (
    <div className="flex gap-6 sm:gap-8">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
            <span className="material-symbols-outlined text-2xl text-primary font-bold">{icon}</span>
        </div>
        <div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 text-text-heading-light">{title}</h3>
            <p className="text-text-body-light font-body font-light text-lg sm:text-xl leading-relaxed">{text}</p>
        </div>
    </div>
);

const FormInput: React.FC<{ label: string; name: string; value: string; onChange: (e: any) => void; placeholder: string; required?: boolean; type?: string; }> = ({ label, name, value, onChange, placeholder, required = false, type = "text" }) => (
    <div className="sm:col-span-1">
        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3" htmlFor={name}>{label}</label>
        <input className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-text-heading-light text-base focus:ring-2 focus:ring-primary transition outline-none" id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} type={type}/>
    </div>
);

export default PartnershipPage;
