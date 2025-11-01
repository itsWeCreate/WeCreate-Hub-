import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProgramsPage from './components/ProgramsPage';
import EventsPage from './components/EventsPage';
import PartnershipPage from './components/PartnershipPage';
import PartnershipModal from './components/PartnershipModal';
import AdminPage from './components/AdminPage';
import PasswordPage from './components/PasswordPage';
import Toast from './components/Toast';

export type Page = 'Home' | 'About' | 'Programs' | 'Events' | 'Partnership' | 'Admin';
export type NavigateFunction = (page: Page, hash?: string) => void;
export type OpenModalFunction = () => void;

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Home');
    const [targetHash, setTargetHash] = useState<string | null>(null);
    const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Check session storage on initial load to maintain login state
    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('isAdminAuthenticated');
        if (sessionAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Effect to auto-hide toast after a delay
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const showToast = (message: string) => {
        setToastMessage(message);
    };

    const openPartnershipModal = () => setIsPartnershipModalOpen(true);
    const closePartnershipModal = () => setIsPartnershipModalOpen(false);

    const handleLogin = () => {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        setIsAuthenticated(false);
        // Navigate to home after logout for a better user experience
        handleNavigate('Home');
    };

    const handleNavigate: NavigateFunction = (page, hash) => {
        if (currentPage === page && hash) {
            const element = document.getElementById(hash.substring(1));
            element?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        setCurrentPage(page);
        window.scrollTo(0, 0);

        if (hash) {
            setTargetHash(hash);
        } else {
            setTargetHash(null);
        }
    };

    useEffect(() => {
        if (targetHash) {
            const timer = setTimeout(() => {
                const element = document.getElementById(targetHash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setTargetHash(null);
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [currentPage, targetHash]);

    const renderPage = () => {
        const modalProps = { onOpenPartnershipModal: openPartnershipModal };
        switch (currentPage) {
            case 'Home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'About':
                return <AboutPage onNavigate={handleNavigate} />;
            case 'Programs':
                return <ProgramsPage onNavigate={handleNavigate} {...modalProps} />;
            case 'Events':
                return <EventsPage onNavigate={handleNavigate} {...modalProps} />;
            case 'Partnership':
                return <PartnershipPage onNavigate={handleNavigate} {...modalProps} />;
            case 'Admin':
                return isAuthenticated ? <AdminPage onLogout={handleLogout} /> : <PasswordPage onLogin={handleLogin} />;
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
            <PartnershipModal 
                isOpen={isPartnershipModalOpen} 
                onClose={closePartnershipModal}
                onSuccess={showToast}
            />
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type="success"
                    onClose={() => setToastMessage(null)}
                />
            )}
        </div>
    );
};

export default App;