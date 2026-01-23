
export interface LinkButton {
    id: string;
    title: string;
    subtitle?: string;
    url: string;
    icon: string; // Material symbol name
    image?: string; // Optional thumbnail image URL
    isExternal: boolean;
    isActive: boolean;
    fullWidth?: boolean; 
    price?: string; 
    ctaText?: string; 
}

export interface InfoSection {
    id: string;
    title: string;
    content: string;
    icon: string;
}

export interface SocialLink {
    id: string;
    platform: 'instagram' | 'linkedin' | 'email' | 'website' | 'other';
    url: string;
}

export interface EventItem {
    id: string;
    month: string;
    day: string;
    type: string;
    title: string;
    time: string;
    location: string;
    description: string;
    buttonText: string;
    typeColor: string; 
    url: string;
}

export interface SocialPost {
    id: string;
    title: string;
    videoUrl: string; 
    link: string;
    type: string;
    thumbnail: string;
}

export interface AppConfig {
    profile: {
        name: string;
        bio: string;
        avatarUrl: string; 
        verified: boolean;
    };
    socialLinks: SocialLink[];
    buttons: LinkButton[];
    sections: InfoSection[];
    events: EventItem[];
    socialGallery: SocialPost[];
}

export const DEFAULT_APP_CONFIG: AppConfig = {
    profile: {
        name: "WeCreate",
        bio: "Building the future of work. \nAI Training & Community in South Florida.",
        avatarUrl: "", 
        verified: true
    },
    socialLinks: [
        { id: '1', platform: 'instagram', url: 'https://www.instagram.com/hello_wecreate/' },
        { id: '2', platform: 'linkedin', url: 'https://www.linkedin.com/company/wecreate-enterprises' },
        { id: '3', platform: 'email', url: 'mailto:info@wecreatehub.com' }
    ],
    buttons: [
        {
            id: 'btn1',
            title: 'AI Career Intensive',
            subtitle: 'Launch your AI career in 12 weeks. Application Open.',
            url: '/programs',
            icon: 'rocket_launch',
            isExternal: false,
            isActive: true,
            fullWidth: true,
            price: 'Applications Open',
            ctaText: 'Apply Now'
        },
        {
            id: 'btn2',
            title: 'Upcoming Events',
            subtitle: 'Workshops, meetups & community gatherings.',
            url: '/events',
            icon: 'calendar_month',
            isExternal: false,
            isActive: true,
            fullWidth: true,
            ctaText: 'View Calendar'
        },
        {
            id: 'btn3',
            title: 'Partner With Us',
            subtitle: 'For corporations & educators looking to innovate.',
            url: '/partnership',
            icon: 'handshake',
            isExternal: false,
            isActive: true,
            fullWidth: true,
            ctaText: 'Collaborate'
        },
        {
            id: 'btn4',
            title: 'Join the Community',
            subtitle: 'Connect with builders on Skool.',
            url: 'https://www.skool.com/builder-hub-by-wecreate-7670',
            icon: 'groups',
            isExternal: true,
            isActive: true,
            fullWidth: true,
            price: 'Free',
            ctaText: 'Join Now'
        }
    ],
    sections: [
        {
            id: 'sec1',
            title: 'Admissions Policy',
            content: 'WeCreate is committed to an inclusive admissions process. We do not require a background in computer science. Our selection is based on motivation, curiosity, and a willingness to learn. Applicants must be at least 18 years of age.',
            icon: 'policy'
        },
        {
            id: 'sec2',
            title: 'Technical Requirements',
            content: '• Reliable laptop (Mac, Windows, or Linux) with 8GB+ RAM.\n• Stable internet connection.\n• Google account.\n• Visual Studio Code installed.',
            icon: 'laptop_mac'
        },
        {
            id: 'sec3',
            title: 'Contact Support',
            content: 'Need specific help? Reach out directly.\n\ninfo@wecreatehub.com\n(315) 570-9317',
            icon: 'contact_support'
        }
    ],
    events: [
        {
            id: 'evt1',
            month: 'NOV',
            day: '3',
            type: 'COMMUNITY',
            title: 'AI Office Hours',
            time: '7:00 PM - 9:00 PM EST',
            location: 'Virtual (via AI Foundry Skool)',
            description: 'Come with your questions and connect with fellow builders, mentors, and partners from the AI tech scene. Share what you\'re working on, get feedback, and get your questions answered.',
            buttonText: 'RSVP Today',
            typeColor: 'text-[#0bceff]',
            url: 'https://www.skool.com/builder-hub-by-wecreate-7670',
        },
        {
            id: 'evt2',
            month: 'NOV',
            day: '4',
            type: 'WORKSHOP',
            title: 'AI Exploration Labs',
            time: '5:00 PM - 6:00 PM EST',
            location: 'Virtual',
            description: 'Explore, build, and collaborate with us as we embark on another adventure at AI Exploration Labs.',
            buttonText: 'Register Now',
            typeColor: 'text-blue-600',
            url: 'https://luma.com/calendar/cal-ZJoLn2kvSHHzV7u',
        },
        {
            id: 'evt3',
            month: 'NOV',
            day: '10',
            type: 'COMMUNITY',
            title: 'AI Office Hours',
            time: '7:00 PM - 9:00 PM EST',
            location: 'Virtual (via AI Foundry Skool)',
            description: 'Come with your questions and connect with fellow builders, mentors, and partners from the AI tech scene. Share what you\'re working on, get feedback, and get your questions answered.',
            buttonText: 'RSVP Today',
            typeColor: 'text-[#0bceff]',
            url: 'https://www.skool.com/builder-hub-by-wecreate-7670',
        }
    ],
    socialGallery: [
        { 
            id: 's1', 
            title: "Studio Flow", 
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-working-at-a-creative-office-9033-large.mp4", 
            link: "https://www.instagram.com/hello_wecreate/",
            thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
            type: "Studio Life"
        },
        { 
            id: 's2', 
            title: "AI Workshop", 
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-34440-large.mp4", 
            link: "https://ailaunch.netlify.app/",
            thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop",
            type: "Education"
        },
        { 
            id: 's3', 
            title: "Build Sprints", 
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-working-on-his-laptop-at-home-42472-large.mp4",
            link: "https://www.linkedin.com/company/wecreate-enterprises",
            thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
            type: "Community"
        },
        { 
            id: 's4', 
            title: "Future Labs", 
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-34442-large.mp4",
            link: "/services",
            thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop",
            type: "Innovation"
        }
    ]
};
