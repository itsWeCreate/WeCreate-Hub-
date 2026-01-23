import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LearnPage from './components/LearnPage';
import ServicesPage from './components/ServicesPage';
import EventsPage from './components/EventsPage';
import PartnershipPage from './components/PartnershipPage';
import ProgramsPage from './components/ProgramsPage';
import ContactPage from './components/ContactPage';
import OptimizePage from './components/OptimizePage';
import PartnershipModal from './components/PartnershipModal';
import AdminPage from './components/AdminPage';
import PasswordPage from './components/PasswordPage';
import InfoPage from './components/InfoPage';
import Toast from './components/Toast';

export type OpenModalFunction = () => void;

const App: React.FC = () => {
    const location = useLocation();
    const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('isAdminAuthenticated');
        if (sessionAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

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
    };

    return (
        <div className="relative overflow-hidden">
            <Header />
            <main className="relative z-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/events" element={<EventsPage onOpenPartnershipModal={openPartnershipModal} />} />
                    <Route path="/partnership" element={<PartnershipPage onOpenPartnershipModal={openPartnershipModal} />} />
                    <Route path="/programs" element={<ProgramsPage onOpenPartnershipModal={openPartnershipModal} onSuccess={showToast} />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/optimize" element={<OptimizePage onSuccess={showToast} />} />
                    <Route path="/learn" element={<LearnPage />} />
                    <Route path="/contact" element={<ContactPage onSuccess={showToast} />} />
                    <Route path="/info" element={<InfoPage />} />
                    <Route 
                        path="/admin" 
                        element={isAuthenticated ? <AdminPage onLogout={handleLogout} /> : <PasswordPage onLogin={handleLogin} />} 
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
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