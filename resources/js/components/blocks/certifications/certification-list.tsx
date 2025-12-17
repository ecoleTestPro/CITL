import { Certification, CertificationCategory } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CertificationCard from './certification-card';
import CertificationSearchInput from './certification-search-input';
import CertificationSidebar from './certification-sidebar';

gsap.registerPlugin(ScrollTrigger);

interface CertificationListProps {
    certifications: Certification[];
    categories?: CertificationCategory[];
    categorySlug?: string;
}

function CertificationList({ certifications, categories = [], categorySlug }: CertificationListProps) {
    const { t, i18n } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const isEnglish = i18n.language === 'en';
    const [searchQuery, setSearchQuery] = useState('');

    // Helper to get localized field for certifications
    const getLocalizedField = (cert: Certification, fieldBase: string): string => {
        const fieldKey = `${fieldBase}_${isEnglish ? 'en' : 'fr'}` as keyof Certification;
        const fallbackKey = `${fieldBase}_fr` as keyof Certification;
        return (cert[fieldKey] as string) || (cert[fallbackKey] as string) || '';
    };

    // Filter certifications based on search query
    const filteredCertifications = useMemo(() => {
        if (!searchQuery.trim()) return certifications;
        const query = searchQuery.toLowerCase();
        return certifications.filter((cert) => {
            const title = getLocalizedField(cert, 'title').toLowerCase();
            const subtitle = getLocalizedField(cert, 'subtitle').toLowerCase();
            const description = getLocalizedField(cert, 'description').toLowerCase();
            return title.includes(query) || subtitle.includes(query) || description.includes(query);
        });
    }, [certifications, searchQuery, isEnglish]);

    // GSAP animation
    useEffect(() => {
        if (!sectionRef.current || filteredCertifications.length === 0) return;

        const ctx = gsap.context(() => {
            const cards = sectionRef.current?.querySelectorAll('article') ?? [];
            gsap.from(cards, {
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [filteredCertifications]);

    // Empty state
    if (certifications.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-16 dark:border-gray-700 dark:bg-gray-800/50">
                        <BookOpen className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <p className="text-center text-gray-500 dark:text-gray-400">{t('certifications.no_certifications_available')}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar - Hidden on mobile, shown on lg+ */}
                    <div className="hidden w-72 shrink-0 lg:block">
                        <div className="sticky top-24">
                            <CertificationSidebar
                                categories={categories}
                                categorySlug={categorySlug}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Search */}
                        <div className="mb-6 lg:hidden">
                            <CertificationSearchInput value={searchQuery} onChange={setSearchQuery} />
                        </div>

                        {/* Results count */}
                        {searchQuery && (
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                {t('certifications.sidebar.results_count', { count: filteredCertifications.length })}
                            </p>
                        )}

                        {/* Certification Grid */}
                        {filteredCertifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-12 dark:border-gray-700 dark:bg-gray-800/50">
                                <Search className="mb-4 h-10 w-10 text-gray-300 dark:text-gray-600" />
                                <p className="text-center text-gray-500 dark:text-gray-400">{t('certifications.sidebar.no_results')}</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2">
                                {filteredCertifications.map((cert) => (
                                    <CertificationCard key={cert.id} certification={cert} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CertificationList;
