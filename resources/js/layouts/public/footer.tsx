import CtaTwo from '@/components/blocks/cta/cta-two';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Link } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import { type ComponentType, type SVGProps } from 'react';
import Logo from './logo';

// Types
interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

interface SocialLink {
    name: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    ariaLabel: string;
}

interface CompanyInfo {
    description: string;
    location: string;
    copyrightText: string;
}

// Custom Social Icons (SVG Components)
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
    </svg>
);

const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

// Configuration du Footer
const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: 'À propos',
        links: [
            { label: "À propos de l'ISTQB", href: '/about-istqb' },
            { label: 'À propos du CITL', href: '/about-citl' },
            { label: 'Notre vision', href: '/vision' },
            { label: 'Nos missions', href: '/missions' },
            { label: 'Le bureau exécutif', href: '/executive-board' },
            { label: 'Membres du CITL', href: '/members' },
        ],
    },
    {
        title: 'Formation & Examens',
        links: [
            {
                label: 'Trouver un organisme de formation',
                href: '/accredited-organizations',
            },
            { label: "S'inscrire à un examen", href: '/exam-registration' },
            {
                label: 'Devenir organisme de formation',
                href: '/accreditation-request',
            },
        ],
    },
    {
        title: 'Informations',
        links: [
            { label: 'Certifications', href: '/why-certification' },
            { label: 'Actualités', href: '/blog' },
            { label: 'Événements', href: '/events' },
            { label: 'Glossaire', href: '/glossary' },
            { label: 'Aide', href: '/contact' },
        ],
    },
];

const SOCIAL_LINKS: SocialLink[] = [
    {
        name: 'Facebook',
        href: '#',
        icon: FacebookIcon,
        ariaLabel: 'Facebook',
    },
    {
        name: 'TikTok',
        href: '#',
        icon: TikTokIcon,
        ariaLabel: 'TikTok',
    },
    {
        name: 'Twitter',
        href: '#',
        icon: TwitterIcon,
        ariaLabel: 'Twitter',
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: LinkedinIcon,
        ariaLabel: 'LinkedIn',
    },
    {
        name: 'YouTube',
        href: '#',
        icon: YoutubeIcon,
        ariaLabel: 'YouTube',
    },
];

const COMPANY_INFO: CompanyInfo = {
    description: 'CITL association à but non lucratif',
    location: "Abidjan, Côte d'Ivoire",
    copyrightText: 'CITL - Comité Ivoirien pour les Tests Logiciels. Tous droits réservés.',
};

const LEGAL_LINKS: FooterLink[] = [
    {
        label: "Politique de confidentialité & Conditions d'utilisation",
        href: '/contact',
    },
    { label: 'Aide', href: '/contact' },
];

const Footer = () => {
    const { appearance, updateAppearance } = useAppearance();

    const currentYear = new Date().getFullYear();

    const toggleTheme = () => {
        const newTheme = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(newTheme);
    };

    return (
        <>
            <CtaTwo />
            <footer className="border-t bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Logo et informations */}
                        <div>
                            <div className="mb-4">
                                <Logo />
                            </div>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {currentYear} {COMPANY_INFO.description}
                            </p>
                            <p className="mb-4 text-sm text-muted-foreground">{COMPANY_INFO.location}</p>
                            <div className="mb-4">
                                {LEGAL_LINKS.map((link, index) => (
                                    <span key={link.href}>
                                        {index > 0 && ' | '}
                                        <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                            {link.label}
                                        </Link>
                                    </span>
                                ))}
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium text-foreground">Suivez-nous</p>
                                <div className="flex gap-3">
                                    {SOCIAL_LINKS.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.href}
                                                className="text-muted-foreground transition-colors hover:text-foreground"
                                                aria-label={social.ariaLabel}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Sections dynamiques */}
                        {FOOTER_SECTIONS.map((section) => (
                            <div key={section.title}>
                                <h3 className="mb-4 text-lg font-semibold text-foreground">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Language Switcher */}
                <div className="">
                    <div className="item-center container mx-auto flex justify-between gap-x-2 px-4 py-4">
                        <LanguageSwitcher />
                        <Button
                            size="icon"
                            onClick={toggleTheme}
                            className="h-12 w-12 rounded-full border border-border bg-background shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Toggle theme"
                        >
                            {appearance === 'dark' ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
                        </Button>
                    </div>
                </div>

                {/* Copyright bar */}
                <div className="border-t">
                    <div className="container mx-auto px-4 py-4">
                        <p className="text-center text-sm text-muted-foreground">
                            © {currentYear} {COMPANY_INFO.copyrightText}
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
