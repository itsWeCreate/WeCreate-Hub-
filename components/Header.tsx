import React from 'react';
import { Page, NavigateFunction } from '../App';

interface HeaderProps {
    currentPage: Page;
    onNavigate: NavigateFunction;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    const navLinks: { name: Page }[] = [
        { name: 'Home' },
        { name: 'About' },
        { name: 'Programs' },
        { name: 'Events' },
        { name: 'Partnership' },
    ];

    return (
        <header className="absolute top-0 left-0 right-0 z-20">
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
                        <button className="text-text-heading-light">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;