import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlossarySidebar } from './glossary-sidebar';

gsap.registerPlugin(ScrollTrigger);

interface GlossaryTerm {
    id: number;
    term_en: string;
    term_fr: string;
    definition_en: string;
    definition_fr: string;
    letter: string;
}

interface GroupedGlossary {
    [letter: string]: GlossaryTerm[];
}

function GlossaryBlock() {
    const { t, i18n } = useTranslation();
    const [glossary, setGlossary] = useState<GroupedGlossary>({});
    const [filteredGlossary, setFilteredGlossary] = useState<GroupedGlossary>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [initialAnimationDone, setInitialAnimationDone] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Helper functions to get term/definition based on current language
    const currentLocale = i18n.language === 'en' ? 'en' : 'fr';
    const getTerm = useCallback((term: GlossaryTerm) => (currentLocale === 'en' ? term.term_en : term.term_fr), [currentLocale]);
    const getDefinition = useCallback(
        (term: GlossaryTerm) => (currentLocale === 'en' ? term.definition_en : term.definition_fr),
        [currentLocale],
    );

    useEffect(() => {
        const fetchGlossary = async () => {
            try {
                const locale = i18n.language === 'en' ? 'en' : 'fr';
                const response = await axios.get(`/api/glossary/grouped?locale=${locale}`);
                setGlossary(response.data.data);
                setFilteredGlossary(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(t('exams.glossary.error_loading'));
                setLoading(false);
                console.error('Error fetching glossary:', err);
            }
        };

        fetchGlossary();
    }, [i18n.language, t]);

    // Animation GSAP - exécutée une seule fois au chargement initial
    useEffect(() => {
        if (loading || !sectionRef.current || initialAnimationDone) return;

        const ctx = gsap.context(() => {
            // Sidebar animation
            if (sidebarRef.current) {
                gsap.from(sidebarRef.current, {
                    x: -50,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sidebarRef.current,
                        start: 'top 85%',
                    },
                });
            }

            // Content letters animation
            if (contentRef.current) {
                const letterSections = contentRef.current.querySelectorAll('[data-letter-section]');
                letterSections.forEach((section, index) => {
                    gsap.from(section, {
                        y: 40,
                        opacity: 0,
                        filter: 'blur(8px)',
                        duration: 0.6,
                        delay: index * 0.05,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                        },
                    });

                    // Animate terms within each letter section
                    const terms = section.querySelectorAll('[data-term]');
                    gsap.from(terms, {
                        y: 20,
                        opacity: 0,
                        filter: 'blur(5px)',
                        duration: 0.4,
                        stagger: 0.05,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                        },
                    });
                });
            }
        }, sectionRef);

        setInitialAnimationDone(true);

        return () => ctx.revert();
    }, [loading, initialAnimationDone]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredGlossary(glossary);
            return;
        }

        const filtered: GroupedGlossary = {};
        Object.keys(glossary).forEach((letter) => {
            const matchingTerms = glossary[letter].filter(
                (term) =>
                    getTerm(term).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    getDefinition(term).toLowerCase().includes(searchTerm.toLowerCase()),
            );
            if (matchingTerms.length > 0) {
                filtered[letter] = matchingTerms;
            }
        });
        setFilteredGlossary(filtered);
    }, [searchTerm, glossary, getTerm, getDefinition]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleLetterClick = (letter: string) => {
        setActiveLetter(letter);
    };

    const handlePrint = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        // Get the current date for the print
        const currentDate = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // Generate the glossary content HTML
        const glossaryContent = Object.keys(filteredGlossary)
            .sort()
            .map(
                (letter) => `
                <div class="letter-section">
                    <h2 class="letter-heading">${letter}</h2>
                    ${filteredGlossary[letter]
                        .map(
                            (term) => `
                        <div class="term-item">
                            <h3 class="term-name">${getTerm(term)}</h3>
                            <p class="term-definition">${getDefinition(term)}</p>
                        </div>
                    `,
                        )
                        .join('')}
                </div>
            `,
            )
            .join('');

        // Write the print document
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${t('exams.glossary.print_title')}</title>
                <style>
                    @page {
                        margin: 2cm;
                        size: A4;
                    }
                    * {
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                    }
                    .print-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: 3px solid #f97316;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .logo-section {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    .logo-section img {
                        height: 60px;
                        width: auto;
                    }
                    .logo-text {
                        display: flex;
                        flex-direction: column;
                    }
                    .logo-title {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1a1a2e;
                        margin: 0;
                    }
                    .logo-subtitle {
                        font-size: 12px;
                        color: #666;
                        margin: 0;
                    }
                    .print-date {
                        font-size: 12px;
                        color: #666;
                        text-align: right;
                    }
                    .main-title {
                        text-align: center;
                        font-size: 28px;
                        color: #1a1a2e;
                        margin-bottom: 30px;
                        padding-bottom: 15px;
                        border-bottom: 1px solid #e5e5e5;
                    }
                    .letter-section {
                        margin-bottom: 25px;
                        page-break-inside: avoid;
                    }
                    .letter-heading {
                        font-size: 32px;
                        font-weight: bold;
                        color: #f97316;
                        border-bottom: 2px solid #f97316;
                        padding-bottom: 5px;
                        margin-bottom: 15px;
                    }
                    .term-item {
                        margin-bottom: 15px;
                        padding-left: 15px;
                        border-left: 3px solid #e5e5e5;
                    }
                    .term-name {
                        font-size: 16px;
                        font-weight: 600;
                        color: #1a1a2e;
                        margin: 0 0 5px 0;
                    }
                    .term-definition {
                        font-size: 14px;
                        color: #555;
                        margin: 0;
                    }
                    .print-footer {
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 1px solid #e5e5e5;
                        text-align: center;
                        font-size: 11px;
                        color: #888;
                    }
                    @media print {
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <div class="logo-section">
                        <img src="/images/logo.svg" alt="CITL Logo" onerror="this.style.display='none'" />
                        <div class="logo-text">
                            <p class="logo-title">CITL</p>
                            <p class="logo-subtitle">${t('exams.glossary.print_subtitle')}</p>
                        </div>
                    </div>
                    <div class="print-date">
                        ${currentDate}
                    </div>
                </div>

                <h1 class="main-title">${t('exams.glossary.print_title')}</h1>

                ${glossaryContent}

                <div class="print-footer">
                    <p>© ${new Date().getFullYear()} CITL - ${t('exams.glossary.print_subtitle')}</p>
                    <p>www.citl.ci</p>
                </div>
            </body>
            </html>
        `);

        printWindow.document.close();

        // Wait for content to load then print
        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
        };
    };

    if (loading) {
        return (
            <section className="bg-white/80 pt-12 pb-16 dark:bg-gray-800">
                <div className="container mx-auto py-16 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-400">{t('exams.glossary.loading')}</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-white/80 pt-12 pb-16 dark:bg-gray-800">
                <div className="container mx-auto py-16 text-center">
                    <p className="text-lg text-red-600">{error}</p>
                </div>
            </section>
        );
    }

    const availableLetters = Object.keys(glossary).sort();
    const filteredLetters = Object.keys(filteredGlossary).sort();

    return (
        <section ref={sectionRef} className="bg-white/80 pt-12 pb-16 dark:bg-gray-800">
            <section className="pb-16 xl:pb-28">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Sidebar */}
                        <div ref={sidebarRef} className="lg:col-span-3">
                            <GlossarySidebar
                                availableLetters={availableLetters}
                                filteredLetters={filteredLetters}
                                activeLetter={activeLetter}
                                onLetterClick={handleLetterClick}
                                onSearch={handleSearch}
                                onPrint={handlePrint}
                            />
                        </div>

                        {/* Main Content */}
                        <div ref={contentRef} className="lg:col-span-9">
                            {Object.keys(filteredGlossary).length === 0 ? (
                                <div className="py-16 text-center">
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {searchTerm ? t('exams.glossary.no_results') : t('exams.glossary.no_terms')}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {Object.keys(filteredGlossary)
                                        .sort()
                                        .map((letter) => (
                                            <div
                                                key={letter}
                                                data-letter-section
                                                className="border-b-stroke-1 dark:border-b-stroke-7 border-b pb-8"
                                                id={`letter-${letter}`}
                                            >
                                                <div className="flex items-start justify-start gap-x-6 md:gap-x-14">
                                                    <h2 className="sticky top-25 w-[50px] flex-shrink-0 text-2xl font-semibold">{letter}</h2>
                                                    <div className="flex-1">
                                                        {filteredGlossary[letter].map((term) => (
                                                            <div
                                                                key={term.id}
                                                                data-term
                                                                className="border-b-stroke-1 dark:border-b-stroke-7 w-full space-y-2 border-b px-3 py-4"
                                                            >
                                                                <h3 className="text-2xl font-normal text-secondary/80 dark:text-accent/80">{getTerm(term)}</h3>
                                                                <p className="font-normal">{getDefinition(term)}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default GlossaryBlock;
