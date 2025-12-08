import React from 'react';

const InfoPage: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-heading font-semibold text-text-heading-light mb-8 text-center md:text-left">
                    General <span className="text-[#0bceff]">Information</span>
                </h1>
                
                <div className="space-y-8 max-w-4xl mx-auto md:mx-0">
                    <section className="bg-card-bg-light p-8 rounded-xl shadow-soft border border-border-light">
                        <h2 className="text-2xl font-heading font-semibold text-secondary mb-4">Contact Details</h2>
                        <div className="space-y-4 text-text-body-light font-body">
                            <p className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#0bceff]">mail</span>
                                <a href="mailto:info@wecreatehub.com" className="hover:text-primary transition-colors">info@wecreatehub.com</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#0bceff]">call</span>
                                <span>(315) 570-9317</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#0bceff]">location_on</span>
                                <span>South Florida</span>
                            </p>
                        </div>
                    </section>

                    <section className="bg-card-bg-light p-8 rounded-xl shadow-soft border border-border-light">
                        <h2 className="text-2xl font-heading font-semibold text-secondary mb-4">Program Requirements</h2>
                        <p className="text-text-body-light font-body mb-4">
                            WeCreate programs are designed to be accessible to everyone. To participate effectively, we recommend having:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-text-body-light font-body ml-2">
                            <li>A reliable laptop (Windows or Mac)</li>
                            <li>A stable internet connection for virtual sessions</li>
                            <li>A willingness to learn, collaborate, and experiment</li>
                            <li>No prior coding experience is required for our introductory tracks</li>
                        </ul>
                    </section>

                     <section className="bg-card-bg-light p-8 rounded-xl shadow-soft border border-border-light">
                        <h2 className="text-2xl font-heading font-semibold text-secondary mb-4">Community Guidelines</h2>
                        <p className="text-text-body-light font-body leading-relaxed">
                            WeCreate is committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, ability, ethnicity, socioeconomic status, and religion (or lack thereof). We prioritize collaboration, respect, and inclusivity in all our interactions, both online and in-person.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;