import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlossarySidebar } from './glossary-sidebar';

gsap.registerPlugin(ScrollTrigger);

interface GlossaryTerm {
    id: number;
    term: string;
    definition: string;
    letter: string;
}

interface GroupedGlossary {
    [letter: string]: GlossaryTerm[];
}

function GlossaryBlock() {
    const { t } = useTranslation();
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

    useEffect(() => {
        const fetchGlossary = async () => {
            try {
                const response = await axios.get('/api/glossary/grouped');
                setGlossary(response.data.data);
                setFilteredGlossary(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement du glossaire');
                setLoading(false);
                console.error('Error fetching glossary:', err);
            }
        };

        fetchGlossary();
    }, []);

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
                (term) => term.term.toLowerCase().includes(searchTerm.toLowerCase()) || term.definition.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            if (matchingTerms.length > 0) {
                filtered[letter] = matchingTerms;
            }
        });
        setFilteredGlossary(filtered);
    }, [searchTerm, glossary]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleLetterClick = (letter: string) => {
        setActiveLetter(letter);
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
                                                                <h3 className="text-2xl font-normal text-secondary/80 dark:text-accent/80">{term.term}</h3>
                                                                <p className="font-normal">{term.definition}</p>
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
