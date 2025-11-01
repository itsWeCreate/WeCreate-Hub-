import React, { useState } from 'react';

interface PasswordPageProps {
    onLogin: () => void;
}

const PasswordPage: React.FC<PasswordPageProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // The password to access the admin page.
    const CORRECT_PASSWORD = 'wecreateadmin';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            onLogin();
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    return (
        <div className="bg-background-light min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md mx-auto p-4">
                <div className="bg-card-bg-light p-8 rounded-xl shadow-soft border border-border-light">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-5xl text-primary">lock</span>
                        <h1 className="text-3xl font-heading font-semibold text-text-heading-light mt-4">
                            Admin Access
                        </h1>
                        <p className="mt-2 text-text-body-light">
                            Please enter the password to view inquiries.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="password-input" className="sr-only">Password</label>
                            <input
                                id="password-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-border-light rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-body-light"
                                required
                                aria-describedby="password-error"
                            />
                        </div>

                        {error && (
                            <p id="password-error" className="text-red-600 text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-mild"
                        >
                            Unlock
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordPage;
