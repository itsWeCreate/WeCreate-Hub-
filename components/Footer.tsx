import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedInIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
    return (
       <footer className="bg-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link to="/" className="text-3xl font-logo font-semibold text-text-heading-light">
                           We<span className="text-[#0bceff]">Create</span>
                        </Link>
                        <p className="mt-4 text-text-body-light font-body">
                            Building the future of work, together. Transform your career with South Florida's premier AI training community.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold text-text-heading-light">Quick Links</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/" className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Home</Link></li>
                            <li><Link to="/about" className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">About Us</Link></li>
                            <li><Link to="/programs" className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Programs</Link></li>
                            <li><Link to="/events" className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Events</Link></li>
                            <li><Link to="/info" className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Info</Link></li>
                             <li><Link to="/admin" className="text-text-body-light hover:text-[#0bceff] transition-colors font-body">Admin</Link></li>
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
                            <a href="https://www.linkedin.com/company/wecreate-enterprises" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center bg-slate-200 text-text-body-light rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <LinkedInIcon />
                            </a>
                            <a href="https://www.instagram.com/hello_wecreate/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center bg-slate-200 text-text-body-light rounded-full hover:bg-primary hover:text-white transition-all duration-300">
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