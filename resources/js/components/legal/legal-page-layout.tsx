import { Separator } from '@/components/ui/separator';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export interface LegalSection {
    id: string;
    icon: React.ReactNode;
    title: string;
    content: string[];
}

interface LegalPageLayoutProps {
    seo: {
        title: string;
        description: string;
    };
    title: string;
    lastUpdated: string;
    tableOfContentsLabel: string;
    sectionLabel: string;
    sections: LegalSection[];
    footerNote: string;
}

export function LegalPageLayout({ seo, title, lastUpdated, tableOfContentsLabel, sectionLabel, sections, footerNote }: LegalPageLayoutProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tocRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Table of contents animation
            if (tocRef.current) {
                gsap.fromTo(
                    tocRef.current,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: tocRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Sections animation
            if (sectionsRef.current) {
                const articles = sectionsRef.current.querySelectorAll('.legal-section');
                gsap.fromTo(
                    articles,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
    };

    return (
        <PublicLayout>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:type" content="website" />
            </Head>

            {/* Minimal Header */}
            <header className="border-b border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-light tracking-tight text-gray-900 md:text-5xl dark:text-white">{title}</h1>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {lastUpdated}: <span className="font-medium text-gray-700 dark:text-gray-300">27 Novembre 2025</span>
                    </p>
                </div>
            </header>

            {/* Content */}
            <section ref={containerRef} className="bg-white py-12 md:py-16 dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-12 lg:flex-row">
                        {/* Table of Contents - Sidebar */}
                        <aside ref={tocRef} className="lg:w-64 lg:flex-shrink-0">
                            <div className="sticky top-24">
                                <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                    {tableOfContentsLabel}
                                </h2>
                                <nav className="space-y-1">
                                    {sections.map((section, index) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className="group flex w-full items-center gap-2 py-2 text-left text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            <span className="w-5 text-xs text-gray-400 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="line-clamp-1">{section.title}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div ref={sectionsRef} className="min-w-0 flex-1">
                            <div className="space-y-12">
                                {sections.map((section, index) => (
                                    <article key={section.id} id={section.id} className="legal-section">
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                                                {sectionLabel} {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <ChevronRight className="h-3 w-3 text-gray-300 dark:text-gray-600" />
                                        </div>
                                        <h2 className="mb-6 text-2xl font-medium text-gray-900 dark:text-white">{section.title}</h2>
                                        <div className="space-y-4">
                                            {section.content.map((paragraph, pIndex) => (
                                                <p key={pIndex} className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                        {index < sections.length - 1 && <Separator className="mt-12 bg-gray-100 dark:bg-gray-800" />}
                                    </article>
                                ))}
                            </div>

                            {/* Footer note */}
                            <div className="mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400">{footerNote}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
