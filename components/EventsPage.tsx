import React from 'react';
import { Page, NavigateFunction } from '../App';

const events = [
    {
        month: 'SEP',
        day: '05',
        type: 'COMMUNITY',
        title: 'AI Office Hours',
        time: '7:00 PM - 9:00 PM EST',
        location: 'Virtual (via AI Foundry Skool)',
        description: 'Come with your questions and connect with fellow builders, mentors, and partners from the AI tech scene. Share what you\'re working on, get feedback, and get your questions answered.',
        buttonText: 'RSVP Today',
        typeColor: 'text-[#0bceff]',
    },
    {
        month: 'NOV',
        day: '4',
        type: 'WORKSHOP',
        title: 'AI Exploration Labs',
        time: '5:00 PM - 6:00 PM EST',
        location: 'Virtual',
        description: 'Explore, build, and collaborate with us as we embark on another adventure at AI Exploration Labs.',
        buttonText: 'Register Now',
        typeColor: 'text-blue-600',
    },
    {
        month: 'NOV',
        day: '10',
        type: 'COMMUNITY',
        title: 'AI Office Hours',
        time: '7:00 PM - 9:00 PM EST',
        location: 'Virtual (via AI Foundry Skool)',
        description: 'Come with your questions and connect with fellow builders, mentors, and partners from the AI tech scene. Share what you\'re working on, get feedback, and get your questions answered.',
        buttonText: 'RSVP Today',
        typeColor: 'text-[#0bceff]',
    },
];

interface EventCardProps {
    event: typeof events[0];
    onRegister: (title: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
    return (
        <div className="bg-card-bg-light p-6 sm:p-8 rounded-xl shadow-soft border border-border-light flex flex-col sm:flex-row items-start gap-6 sm:gap-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex-shrink-0 text-center">
                <div className="bg-primary-light text-primary rounded-lg p-3 w-20 h-20 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-xl font-heading font-semibold">{event.month}</p>
                    <p className="text-4xl font-heading font-semibold leading-none">{event.day}</p>
                </div>
            </div>
            <div className="flex-grow">
                <p className={`text-sm font-semibold tracking-wider uppercase ${event.typeColor}`}>{event.type}</p>
                <h3 className="text-2xl font-heading font-semibold text-text-heading-light mt-1 mb-3">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-text-body-light mb-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                        <span>{event.location}</span>
                    </div>
                </div>
                <p className="text-text-body-light font-body mb-6">{event.description}</p>
                <a href="#" onClick={(e) => { e.preventDefault(); onRegister(event.title); }} className="bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary/30 text-white font-heading font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-mild inline-flex items-center gap-2">
                    {event.buttonText}
                    <span className="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>
        </div>
    );
};

interface EventsPageProps {
    onNavigate: NavigateFunction;
}

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {

    const handleRegister = (title: string) => {
        alert(`Thank you for your interest in "${title}"! A confirmation has been sent to your email.`);
    };

    return (
        <div className="bg-background-light">
            <section className="relative hero-gradient text-text-heading-light pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop')" }}></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-1">
                    <h1 className="text-5xl md:text-6xl font-heading font-semibold leading-tight drop-shadow-sm text-white">
                        Learn, Build, and Connect
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-body">
                        Join our community of builders and innovators at our upcoming events. From hands-on workshops to inspiring talks, there's always something happening at WeCreate.
                    </p>
                </div>
            </section>

            <div className="relative z-1 -mt-12">
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-12 text-text-heading-light">
                                Upcoming <span className="text-[#0bceff]">Events</span>
                            </h2>
                            <div className="space-y-8">
                                {events.map((event, index) => (
                                    <EventCard key={index} event={event} onRegister={handleRegister} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="gradient-bg-section text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-semibold drop-shadow-sm">Have an idea for an event?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 font-body">
                            We're always looking for community partners to host workshops and events. If you're an expert in your field and passionate about sharing your knowledge, we'd love to hear from you.
                        </p>
                        <div className="mt-8">
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Partnership', '#contact-form'); }} className="bg-white text-primary hover:bg-gray-100 font-heading font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-soft">
                                Partner With Us
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EventsPage;
