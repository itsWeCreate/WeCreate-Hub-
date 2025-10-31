import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProgramsPage from './components/ProgramsPage';
import EventsPage from './components/EventsPage';
import PartnershipPage from './components/PartnershipPage';

export type Page = 'Home' | 'About' | 'Programs' | 'Events' | 'Partnership';
export type NavigateFunction = (page: Page, hash?: string) => void;

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Home');
    const [targetHash, setTargetHash] = useState<string | null>(null);

    const handleNavigate: NavigateFunction = (page, hash) => {
        // If already on the page and a hash is provided, just scroll.
        if (currentPage === page && hash) {
            const element = document.getElementById(hash.substring(1));
            element?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Otherwise, navigate to the new page.
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change.

        // If a hash is provided, set it to be handled by the effect.
        if (hash) {
            setTargetHash(hash);
        } else {
            setTargetHash(null); // Clear hash if not provided.
        }
    };

    // Effect to scroll to the target element after the page component has rendered.
    useEffect(() => {
        if (targetHash) {
            const timer = setTimeout(() => {
                const element = document.getElementById(targetHash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setTargetHash(null); // Reset hash after scrolling.
                }
            }, 100); // Small delay to ensure component is in the DOM.
            return () => clearTimeout(timer);
        }
    }, [currentPage, targetHash]);

    const renderPage = () => {
        switch (currentPage) {
            case 'Home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'About':
                return <AboutPage onNavigate={handleNavigate} />;
            case 'Programs':
                return <ProgramsPage onNavigate={handleNavigate} />;
            case 'Events':
                return <EventsPage onNavigate={handleNavigate} />;
            case 'Partnership':
                return <PartnershipPage onNavigate={handleNavigate} />;
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="relative overflow-hidden">
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
            <main className="relative z-1">
                {renderPage()}
            </main>
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;