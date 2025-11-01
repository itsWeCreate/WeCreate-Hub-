import React from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const icon = type === 'success' ? 'check_circle' : 'error';
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div 
            className="fixed bottom-5 right-5 z-50 flex items-center p-4 w-full max-w-sm text-white bg-slate-800 rounded-xl shadow-lg animate-fade-in-up border border-slate-700"
            role="alert"
        >
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${bgColor} rounded-lg`}>
                <span className="material-symbols-outlined text-white">{icon}</span>
                <span className="sr-only">{type} icon</span>
            </div>
            <div className="ml-3 text-sm font-medium">{message}</div>
            <button 
                type="button" 
                className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg focus:ring-2 focus:ring-slate-600" 
                onClick={onClose} 
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
    );
};

export default Toast;
