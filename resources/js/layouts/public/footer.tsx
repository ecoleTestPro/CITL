import CtaTwo from '@/components/blocks/cta/cta-two';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppearance } from '@/hooks/use-appearance';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Moon, Phone, Sun } from 'lucide-react';
import { type ComponentType, type SVGProps, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from './logo';

gsap.registerPlugin(ScrollTrigger);

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

// Footer sections will be built dynamically with translations

const SOCIAL_LINKS: SocialLink[] = [
    // {
    //     name: 'Facebook',
    //     href: '#',
    //     icon: FacebookIcon,
    //     ariaLabel: 'Facebook',
    // },
    // {
    //     name: 'TikTok',
    //     href: '#',
    //     icon: TikTokIcon,
    //     ariaLabel: 'TikTok',
    // },
    // {
    //     name: 'Twitter',
    //     href: '#',
    //     icon: TwitterIcon,
    //     ariaLabel: 'Twitter',
    // },
    // {
    //     name: 'LinkedIn',
    //     href: '#',
    //     icon: LinkedinIcon,
    //     ariaLabel: 'LinkedIn',
    // },
    // {
    //     name: 'YouTube',
    //     href: '#',
    //     icon: YoutubeIcon,
    //     ariaLabel: 'YouTube',
    // },
];

const COMPANY_INFO = {
    location: "5ème étage de la Résidence Pacy, En face de l'immeuble CGK, Cocody Angré Djibi - 9ème tranche, Abidjan, Côte d'Ivoire",
    email: 'contact@citl.ci',
    phone: '+225 27 22 39 18 67',
};

const Footer = () => {
    const { t } = useTranslation();
    const { appearance, updateAppearance } = useAppearance();
    const footerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const currentYear = new Date().getFullYear();

    const toggleTheme = () => {
        const newTheme = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(newTheme);
    };

    // Build footer sections with translations
    const footerSections: FooterSection[] = [
        {
            title: t('footer.sections.about.title'),
            links: [
                { label: t('footer.sections.about.about_istqb'), href: '/about-istqb' },
                { label: t('footer.sections.about.about_citl'), href: '/about-citl' },
                { label: t('footer.sections.about.vision'), href: '/vision' },
                { label: t('footer.sections.about.missions'), href: '/missions' },
                { label: t('footer.sections.about.executive_board'), href: '/executive-board' },
                { label: t('footer.sections.about.members'), href: '/members' },
            ],
        },
        {
            title: t('footer.sections.training.title'),
            links: [
                { label: t('footer.sections.training.find_training'), href: '/accredited-organizations' },
                { label: t('footer.sections.training.register_exam'), href: '/exam-registration' },
                { label: t('footer.sections.training.become_training'), href: '/accreditation-request' },
            ],
        },
        {
            title: t('footer.sections.info.title'),
            links: [
                { label: t('footer.sections.info.certifications'), href: '/why-certification' },
                { label: t('footer.sections.info.news'), href: '/blog' },
                { label: t('footer.sections.info.events'), href: '/events' },
                { label: t('footer.sections.info.glossary'), href: '/glossary' },
                { label: t('footer.sections.info.help'), href: '/contact' },
            ],
        },
    ];

    // Legal links with translations
    const legalLinks: FooterLink[] = [
        { label: t('footer.legal.privacy_policy'), href: '/privacy-policy' },
        { label: t('footer.legal.terms'), href: '/terms' },
        { label: t('footer.legal.help'), href: '/contact' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Logo and company info animation
            if (logoRef.current) {
                gsap.fromTo(
                    logoRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: logoRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Footer sections staggered animation
            if (sectionsRef.current) {
                const sections = sectionsRef.current.querySelectorAll('.footer-section');
                gsap.fromTo(
                    sections,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Social links animation
            if (socialRef.current) {
                const socialIcons = socialRef.current.querySelectorAll('.social-icon');
                gsap.fromTo(
                    socialIcons,
                    { opacity: 0, scale: 0, rotation: -180 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: socialRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Bottom bar animation
            if (bottomRef.current) {
                gsap.fromTo(
                    bottomRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: bottomRef.current,
                            start: 'top 95%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    // Hover animation for social icons
    const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
        gsap.to(e.currentTarget, {
            scale: isEnter ? 1.2 : 1,
            y: isEnter ? -5 : 0,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    // Hover animation for links
    const handleLinkHover = (e: React.MouseEvent<HTMLElement>, isEnter: boolean) => {
        gsap.to(e.currentTarget, {
            x: isEnter ? 8 : 0,
            color: isEnter ? '#e36c19' : '',
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    return (
        <>
            <CtaTwo />
            <footer ref={footerRef} className="relative overflow-hidden border-t bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
                {/* Decorative background elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Logo and company info - 4 columns */}
                        <div ref={logoRef} className="lg:col-span-4">
                            <div className="mb-6">
                                <Logo />
                            </div>
                            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{t('footer.description')}</p>

                            {/* Contact info */}
                            <div className="mb-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                        <MapPin className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>{COMPANY_INFO.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                        <Mail className="h-4 w-4 text-primary" />
                                    </div>
                                    <a href={`mailto:${COMPANY_INFO.email}`} className="transition-colors hover:text-primary">
                                        {COMPANY_INFO.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                        <Phone className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>{COMPANY_INFO.phone}</span>
                                </div>
                            </div>

                            {/* Social links */}
                            <div ref={socialRef}>
                                {SOCIAL_LINKS.length > 0 && <p className="mb-3 text-sm font-semibold text-foreground">{t('footer.follow_us')}</p>}
                                <div className="flex gap-2">
                                    {SOCIAL_LINKS.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.href}
                                                className="social-icon flex h-10 w-10 items-center justify-center rounded-full bg-gray-200/80 text-muted-foreground transition-colors hover:bg-primary hover:text-white dark:bg-gray-800"
                                                aria-label={social.ariaLabel}
                                                onMouseEnter={(e) => handleSocialHover(e, true)}
                                                onMouseLeave={(e) => handleSocialHover(e, false)}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Navigation sections - 8 columns */}
                        <div ref={sectionsRef} className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
                            {footerSections.map((section) => (
                                <div key={section.title} className="footer-section">
                                    <h3 className="relative mb-6 text-lg font-bold text-foreground">
                                        {section.title}
                                        <span className="absolute -bottom-2 left-0 h-0.5 w-12 bg-primary" />
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
                                                    onMouseEnter={(e) => handleLinkHover(e, true)}
                                                    onMouseLeave={(e) => handleLinkHover(e, false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div ref={bottomRef} className="border-t bg-gray-100/50 dark:bg-gray-900/50">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            {/* Language Switcher */}
                            <div className="flex items-center gap-4">
                                <LanguageSwitcher />
                                <Separator orientation="vertical" className="hidden h-6 md:block" />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={toggleTheme}
                                    className="h-10 w-10 rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                                    aria-label="Toggle theme"
                                >
                                    {appearance === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            </div>

                            {/* Legal links */}
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                                {legalLinks.map((link, index) => (
                                    <span key={link.href} className="flex items-center">
                                        {index > 0 && <Separator orientation="vertical" className="mx-2 h-4" />}
                                        <Link href={link.href} className="text-xs text-muted-foreground transition-colors hover:text-primary">
                                            {link.label}
                                        </Link>
                                    </span>
                                ))}
                            </div>

                            {/* Copyright */}
                            <p className="text-center text-xs text-muted-foreground">
                                © {currentYear} {t('footer.copyright')}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
