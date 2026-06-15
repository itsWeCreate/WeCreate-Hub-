
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePopup from './HomePopup';
import { LEARNING_URL, GOOGLE_SHEET_WEB_APP_URL } from '../config';
import { AppConfig, DEFAULT_APP_CONFIG, SocialPost } from '../types';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [socialFeed, setSocialFeed] = useState<SocialPost[]>(DEFAULT_APP_CONFIG.socialGallery);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            if (!GOOGLE_SHEET_WEB_APP_URL) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(`${GOOGLE_SHEET_WEB_APP_URL}?action=getConfig`);
                if (response.ok) {
                    const text = await response.text();
                    try {
                        const data = JSON.parse(text);
                        if (data && data.socialGallery) {
                            setSocialFeed(data.socialGallery);
                        }
                    } catch (e) {
                         console.warn("Received non-JSON response, using defaults.");
                    }
                }
            } catch (error) {
                console.warn("Failed to load dynamic social gallery, using default.", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const scrollToPath = () => {
        const element = document.getElementById('whats-your-path');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getDirectVideoLink = (url: string) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            const match = url.match(/\/d\/([^/]+)/);
            if (match && match[1]) {
                return `https://drive.google.com/uc?export=download&id=${match[1]}`;
            }
        }
        return url;
    };

    return (
        <div className="relative min-h-screen flex flex-col font-body antialiased bg-white overflow-x-hidden">
            <HomePopup />
            
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMBuiBuH2z5jsP2txkQWhTU3iniR78utSOLpK2npyjgyR31yi9jBKolndobgz7_h1H8OIFe-hCxprngBB1wug6wkKoIM3XIgwboZHsrSnJI21Jes79sWJLqaoL0DlUeje8uF1NkKPrx7-C8LfJA1ADeF9Od8VFma8bAhC7QmY5uVOH5oh_P4glAnDqP5yDQIDkSIrIA8ktaEQS2nqhgxjQkAHJmXg-x6ohdvnNz064HBqRHVBfYDohl5V9AnoEJ4TwSsXSquHRzATx')" }}></div>
                <div className="absolute inset-0 hero-overlay-gradient opacity-90"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-20">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[100px] font-heading font-bold text-white leading-[1.1] mb-8 tracking-tight max-w-none mx-auto drop-shadow-sm">
                        Building the Future <br className="hidden lg:block"/> of Work, Together
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-white font-body font-light leading-relaxed mb-12 drop-shadow-md opacity-95">
                        Whether you're looking to learn AI or implement it in your business, we're here to help you navigate the new tech economy with clarity and community.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <button 
                            onClick={scrollToPath}
                            className="w-full sm:w-auto bg-white text-primary hover:scale-105 transition-transform duration-300 font-heading font-bold py-5 px-10 rounded-2xl shadow-xl text-lg text-center"
                        >
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </section>

            <main className="relative">
                {/* Path Section */}
                <section id="whats-your-path" className="py-32 bg-white relative">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 tracking-tight leading-tight">What's Your Path?</h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto px-4">
                        <button onClick={() => window.open(LEARNING_URL, '_blank')} className="group relative block rounded-[2.5rem] overflow-hidden bg-primary shadow-soft hover:shadow-hover transition-all duration-500 h-[500px] text-left border-0">
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop" alt="" className="w-full h-full object-cover scale-110 opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70"></div>
                            </div>
                            <div className="h-full p-12 flex flex-col justify-between relative z-10">
                                <h3 className="text-4xl font-heading font-bold text-white">Learn AI</h3>
                                <p className="text-xl text-white font-medium">Master the tools and strategies to thrive in the age of intelligence.</p>
                                <span className="text-white font-bold flex items-center gap-2">Explore <span className="material-symbols-outlined">arrow_forward</span></span>
                            </div>
                        </button>
                        <button onClick={() => navigate('/services')} className="group relative block rounded-[2.5rem] overflow-hidden bg-secondary shadow-soft hover:shadow-hover transition-all duration-500 h-[500px] text-left border-0">
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" alt="" className="w-full h-full object-cover scale-110 opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/80 to-secondary/70"></div>
                            </div>
                            <div className="h-full p-12 flex flex-col justify-between relative z-10">
                                <h3 className="text-4xl font-heading font-bold text-white">Implement AI</h3>
                                <p className="text-xl text-white font-medium">Deploy custom AI solutions that optimize your operations.</p>
                                <span className="text-white font-bold flex items-center gap-2">See Solutions <span className="material-symbols-outlined">arrow_forward</span></span>
                            </div>
                        </button>
                    </div>
                </section>

                {/* Social Gallery Section */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                            <div>
                                <span className="text-primary font-bold uppercase tracking-widest text-[11px] mb-3 block font-heading">Follow our journey</span>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Built in <span className="text-gradient italic">Public.</span></h2>
                            </div>
                            <a href="https://www.instagram.com/hello_wecreate/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-400 font-heading font-bold hover:text-primary transition-colors group">
                                @hello_wecreate
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto pb-8 md:pb-0 px-4 sm:px-6 lg:px-8 no-scrollbar scroll-smooth snap-x">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex-shrink-0 w-[240px] md:w-full aspect-[9/16] rounded-[2rem] bg-gray-100 animate-pulse" />
                            ))
                        ) : (
                            socialFeed.map((post) => (
                                <SocialVideoCard key={post.id} post={post} convertLink={getDirectVideoLink} navigate={navigate} />
                            ))
                        )}
                    </div>
                </section>

                {/* Ready Section */}
                <section className="gradient-bg-section py-32 relative overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold mb-8 tracking-tighter text-white">Ready to Build the Future?</h2>
                        <button onClick={scrollToPath} className="inline-block bg-white text-primary hover:scale-105 hover:bg-slate-50 font-heading font-bold py-6 px-16 rounded-2xl transition-all duration-300 shadow-2xl text-xl text-center">
                            Start Today
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

const SocialVideoCard: React.FC<{ post: SocialPost; convertLink: (url: string) => string; navigate: (p: string) => void }> = ({ post, convertLink, navigate }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleClick = () => {
        if (!post.link || post.link === '#') return;
        if (post.link.startsWith('http')) {
            window.open(post.link, '_blank');
        } else {
            navigate(post.link);
        }
    };

    const directUrl = convertLink(post.videoUrl);

    return (
        <div 
            className="relative flex-shrink-0 w-[240px] md:w-full aspect-[9/16] rounded-[2rem] overflow-hidden group snap-center shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-950 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {post.videoUrl ? (
                <video 
                    ref={videoRef}
                    src={directUrl}
                    poster={post.thumbnail}
                    className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}`}
                    muted
                    loop
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                />
            ) : (
                <img src={post.thumbnail} className="w-full h-full object-cover opacity-60" alt="" />
            )}
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-8 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-40' : 'opacity-100'}`}>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest mb-1 font-heading opacity-80">{post.type}</span>
                <p className="text-white font-heading font-bold text-xl leading-tight">{post.title}</p>
            </div>

            {/* Center Play Icon (Hidden on Hover) */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                    <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                </div>
            </div>
            
            {/* Dynamic Progress Bar */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/10 overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(147,51,234,0.8)]" 
                    style={{ width: `${isHovered ? progress : 0}%` }}
                />
            </div>

            {/* Mobile Helper Text */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full md:hidden">
                <p className="text-white text-[9px] font-bold uppercase tracking-widest">Tap to View</p>
            </div>
        </div>
    );
};

export default HomePage;
