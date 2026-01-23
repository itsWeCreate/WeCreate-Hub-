import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LEARNING_URL } from '../config';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Learn', path: LEARNING_URL, isExternal: true },
    { name: 'Partnership', path: '/partnership' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  // Pages with dark heroes that need white nav initially
  const darkHeroPages = ['/', '/services', '/events', '/programs'];
  const isDarkHeroPage = darkHeroPages.includes(location.pathname);
  
  // Dynamic color logic for visibility
  const isLightTextMode = isDarkHeroPage && !scrolled;
  
  const navTextColor = isLightTextMode ? 'text-white' : 'text-slate-700';
  const logoBaseColor = isLightTextMode ? 'text-white' : 'text-slate-900';
  const activePillBg = isLightTextMode ? 'bg-white/20' : 'bg-primary/10';
  const activeTextColor = isLightTextMode ? 'text-white' : 'text-primary';

  const mobileBtnBorder = scrolled 
    ? 'border-slate-200 text-slate-900' 
    : (isLightTextMode ? 'border-white/30 text-white' : 'border-slate-300 text-slate-900');

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      {/* Spread out to edges of the site */}
      <div className="max-w-full mx-auto px-8 lg:px-12 flex items-center justify-between">
        <Link to="/" className={`text-3xl font-logo font-semibold tracking-tight flex items-center transition-colors duration-300 ${logoBaseColor}`}>
          We<span className={isLightTextMode ? 'text-white' : 'text-gradient'}>Create</span>
        </Link>
        
        {/* Desktop Nav - Centered in the wide layout */}
        <nav className="hidden xl:flex items-center space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const linkClasses = `text-[13px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-300 hover:text-primary ${
              active 
                ? `${activePillBg} ${activeTextColor}` 
                : navTextColor
            }`;

            if (link.isExternal) {
              return (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  {link.name}
                </a>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className={linkClasses}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6">
          <Link 
            to="/contact" 
            className="hidden sm:inline-flex bg-navy text-white px-8 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-navy/10 hover:-translate-y-0.5 active:translate-y-0"
          >
            WORK WITH US
          </Link>
          <button 
            className={`xl:hidden flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 ${mobileBtnBorder}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`xl:hidden fixed inset-0 top-0 bg-white z-[90] transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="flex flex-col h-full p-8 pt-24">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const mobileLinkClasses = `text-4xl font-space font-bold border-b border-slate-50 pb-4 transition-colors ${
                active ? 'text-primary' : 'text-slate-900 hover:text-primary'
              }`;

              if (link.isExternal) {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mobileLinkClasses}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={mobileLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-12">
            <Link 
              to="/contact" 
              className="bg-primary block w-full text-center text-white py-6 rounded-[2rem] text-xl font-bold shadow-2xl shadow-primary/20"
              onClick={() => setIsOpen(false)}
            >
              WORK WITH US
            </Link>
          </div>

          <div className="mt-auto pb-8 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Strategic Studio & AI Hub</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;