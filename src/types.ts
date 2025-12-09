
export interface LinkButton {
    id: string;
    title: string;
    subtitle?: string;
    url: string;
    icon: string; // Material symbol name
    image?: string; // Optional thumbnail image URL
    isExternal: boolean;
    isActive: boolean;
    fullWidth?: boolean; // New property for grid layout control
    price?: string; // New: Display price (e.g. "$197")
    ctaText?: string; // New: Button text (e.g. "Get Started")
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

export interface InfoPageConfig {
    profile: {
        name: string;
        bio: string;
        avatarUrl: string; // URL to image
        verified: boolean;
    };
    socialLinks: SocialLink[];
    buttons: LinkButton[];
    sections: InfoSection[];
}

export const DEFAULT_INFO_CONFIG: InfoPageConfig = {
    profile: {
        name: "WeCreate",
        bio: "Building the future of work. \nAI Training & Community in South Florida.",
        avatarUrl: "", // Empty string falls back to default logo in UI
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
    ]
};
