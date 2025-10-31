
import React, { useState, useEffect } from 'react';
import { Page, NavigateFunction } from '../App';

interface HeaderProps {
    currentPage: Page;
    onNavigate: NavigateFunction;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    const navLinks: { name: Page }[] = [
        { name: 'Homepage' },
        { name: 'About' },
        { name: 'Programs' },
        { name: 'Events' },
        { name: 'Partnership' },
    ];

    const handleMobileLinkClick = (page: Page) => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
    };

    const mobileMenuIconColor = currentPage === 'About' ? 'text-text-heading-light' : 'text-white';

    return (
        <>
            <header className="absolute top-0 left-0 right-0 z-30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between py-6">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Home'); }} className={`text-[2.3rem] font-logo font-semibold ${currentPage === 'About' ? 'text-[#00d9ff]' : 'text-white'}`}>
                            WeCreate
                        </a>
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate(link.name);
                                    }}
                                    className={`text-xl font-medium transition-all duration-300 ${
                                        currentPage === link.name
                                            ? 'text-[#00d9ff] font-bold'
                                            : currentPage === 'About'
                                                ? 'text-black hover:text-[#00d9ff] hover:font-bold'
                                                : 'text-white hover:text-[#00d9ff] hover:font-bold'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Programs'); }} className="hidden md:block bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary/30 text-white font-heading font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-mild">
                            Get Started
                        </a>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className={mobileMenuIconColor}
                                aria-label="Open menu"
                            >
                                <span className="material-symbols-outlined text-4xl">menu</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div 
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Mobile Menu Panel */}
            <aside 
                className={`fixed top-0 right-0 bottom-0 z-50 bg-background-light w-full max-w-sm transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-12">
                         <a id="mobile-menu-title" href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('Home'); }} className="text-[2.3rem] font-logo font-semibold text-text-heading-light">
                            We<span className="text-[#0bceff]">Create</span>
                        </a>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-text-heading-light" aria-label="Close menu">
                            <span className="material-symbols-outlined text-4xl">close</span>
                        </button>
                    </div>
                    <nav className="flex flex-col items-center justify-center flex-grow space-y-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleMobileLinkClick(link.name);
                                }}
                                className={`text-3xl font-heading font-medium transition-colors duration-300 ${
                                    currentPage === link.name ? 'text-primary' : 'text-text-heading-light hover:text-primary'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <div className="mt-8 text-center">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('Programs'); }} className="bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary/30 text-white font-heading font-medium py-4 px-10 rounded-lg transition-all duration-300 shadow-mild text-xl w-full inline-block">
                            Get Started
                        </a>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Header;
