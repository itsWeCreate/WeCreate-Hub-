import React from 'react';
import { Page, NavigateFunction } from '../App';
import { LinkedInIcon, InstagramIcon } from './icons';

interface FooterProps {
    onNavigate: NavigateFunction;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
       <footer className="bg-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Home'); }} className="text-3xl font-logo font-semibold text-text-heading-light">
                           We<span className="text-[#0bceff]">Create</span>
                        </a>
                        <p className="mt-4 text-text-body-light font-body">
                            Building the future of work, together. Transform your career with South Florida's premier AI training community.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold text-text-heading-light">Quick Links</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Home'); }} className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Home</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('About'); }} className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">About Us</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Programs'); }} className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Programs</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Events'); }} className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Events</a></li>
                             <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Admin'); }} className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Admin</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold text-text-heading-light">Contact</h3>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-[#0bceff] mt-1">location_on</span>
                                <span className="ml-2 text-text-body-light font-body">South Florida</span>
                            </li>
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-[#0bceff] mt-1">mail</span>
                                <span className="ml-2 text-text-body-light font-body">info@wecreatehub.com</span>
                            </li>
                             <li className="flex items-start">
                                <span className="material-symbols-outlined text-[#0bceff] mt-1">call</span>
                                <span className="ml-2 text-text-body-light font-body">(315) 570-9317</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold text-text-heading-light">Follow Us</h3>
                        <div className="flex mt-4 space-x-4">
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-200 text-text-body-light rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <LinkedInIcon />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-200 text-text-body-light rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <InstagramIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border-light text-center text-text-body-light">
                    <p>&copy; {new Date().getFullYear()} WeCreate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
