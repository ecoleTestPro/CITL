import { Certification, CertificationCategory } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, BookOpen, CheckCircle, ChevronDown, ChevronRight, Clock, ExternalLink, GraduationCap, Search, Target } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(() => {
        // Expand current category by default
        const currentCat = categories.find((c) => c.slug === categorySlug);
        return currentCat ? new Set([currentCat.id]) : new Set();
    });

    // Helper to get localized field for certifications
    const getLocalizedField = <T extends keyof Certification>(cert: Certification, fieldBase: string): string => {
        const fieldKey = `${fieldBase}_${isEnglish ? 'en' : 'fr'}` as T;
        const fallbackKey = `${fieldBase}_fr` as T;
        return (cert[fieldKey] as string) || (cert[fallbackKey] as string) || '';
    };

    // Helper to get localized field for categories
    const getCategoryLocalizedField = (cat: CertificationCategory, fieldBase: string): string => {
        const fieldKey = `${fieldBase}_${isEnglish ? 'en' : 'fr'}` as keyof CertificationCategory;
        const fallbackKey = `${fieldBase}_fr` as keyof CertificationCategory;
        return (cat[fieldKey] as string) || (cat[fallbackKey] as string) || '';
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

    // Toggle category expansion
    const toggleCategory = (categoryId: number) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    // Category slug to route mapping
    const getCategoryRoute = (slug: string): string => {
        const routeMap: Record<string, string> = {
            'core-foundation': '/core-foundation',
            'core-advanced': '/core-advanced',
            specialist: '/specialist',
            'expert-level': '/expert-level',
            'requirements-engineering': '/requirements-engineering',
            a4q: '/a4q-practical-tester',
        };
        return routeMap[slug] || `/certifications/${slug}`;
    };

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

    // Sidebar component
    const Sidebar = () => (
        <aside className="space-y-6">
            {/* Search */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <Search className="h-4 w-4" />
                    {t('certifications.sidebar.search')}
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('certifications.sidebar.search_placeholder')}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm transition-colors placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary dark:focus:bg-gray-900"
                    />
                    <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Certifications Tree View */}
            {categories.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                        <Award className="h-4 w-4" />
                        {t('nav.certifications')}
                    </h3>
                    <ul className="space-y-1">
                        {categories.map((cat) => {
                            const isExpanded = expandedCategories.has(cat.id);
                            const catCertifications = cat.certifications || [];
                            const isCurrentCategory = cat.slug === categorySlug;

                            return (
                                <li key={cat.id}>
                                    {/* Category Header */}
                                    <div
                                        className={`group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                            isCurrentCategory
                                                ? 'bg-primary/5 font-medium text-primary dark:bg-primary/10'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                        onClick={() => toggleCategory(cat.id)}
                                    >
                                        {catCertifications.length > 0 ? (
                                            isExpanded ? (
                                                <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                                            )
                                        ) : (
                                            <span className="w-4" />
                                        )}
                                        <a
                                            href={getCategoryRoute(cat.slug)}
                                            className="flex-1 hover:text-primary"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {getCategoryLocalizedField(cat, 'name')}
                                        </a>
                                        {catCertifications.length > 0 && (
                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                                {catCertifications.length}
                                            </span>
                                        )}
                                    </div>

                                    {/* Certifications List (Expandable) */}
                                    {isExpanded && catCertifications.length > 0 && (
                                        <ul className="ml-6 mt-1 space-y-0.5 border-l border-gray-200 pl-3 dark:border-gray-700">
                                            {catCertifications.map((cert: Certification) => (
                                                <li key={cert.id}>
                                                    <a
                                                        href={`/certifications/${cert.slug}`}
                                                        className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                                    >
                                                        <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                                                        <span className="line-clamp-1">
                                                            {(isEnglish && cert.title_en) || cert.title_fr}
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {/* Quick Links */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <GraduationCap className="h-4 w-4" />
                    {t('certifications.sidebar.quick_links')}
                </h3>
                <ul className="space-y-2">
                    <li>
                        <a
                            href="/accredited-organizations"
                            className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t('certifications.sidebar.find_training')}
                        </a>
                    </li>
                    <li>
                        <a
                            href="/exam-registration"
                            className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t('certifications.sidebar.register_exam')}
                        </a>
                    </li>
                    <li>
                        <a
                            href="/why-certification"
                            className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t('certifications.sidebar.why_certify')}
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );

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
                            <Sidebar />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Search */}
                        <div className="mb-6 lg:hidden">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('certifications.sidebar.search_placeholder')}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary"
                                />
                                <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
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
                                {filteredCertifications.map((cert) => {
                                    const title = getLocalizedField(cert, 'title');
                                    const subtitle = getLocalizedField(cert, 'subtitle');
                                    const description = getLocalizedField(cert, 'description');

                                    return (
                                        <article
                                            key={cert.id}
                                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                                        >
                                            {/* Icon Header */}
                                            <div className="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-800">
                                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-primary/20 dark:to-primary/10">
                                                    <span className={`${cert.icon} text-4xl text-secondary dark:text-primary`}></span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-lg leading-tight font-semibold text-gray-900 dark:text-white">{title}</h3>
                                                    {subtitle && <p className="mt-1 text-sm leading-snug text-secondary dark:text-primary">{subtitle}</p>}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-1 flex-col p-6">
                                                {description && (
                                                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                                                )}

                                                {/* Exam Details Grid */}
                                                <div className="mt-auto grid grid-cols-2 gap-3">
                                                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                                        <BookOpen className="h-4 w-4 text-gray-400" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-500 dark:text-gray-500">{t('certifications.exam_questions')}</p>
                                                            <p className="truncate font-medium text-gray-900 dark:text-white">{cert.exam_questions}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                                        <Target className="h-4 w-4 text-gray-400" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-500 dark:text-gray-500">{t('certifications.exam_passing_score')}</p>
                                                            <p className="truncate font-medium text-gray-900 dark:text-white">{cert.exam_passing_score}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-500 dark:text-gray-500">{t('certifications.exam_duration')}</p>
                                                            <p className="truncate font-medium text-gray-900 dark:text-white">{cert.exam_duration}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                                        <CheckCircle className="h-4 w-4 text-gray-400" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-500 dark:text-gray-500">{t('certifications.exam_total_points')}</p>
                                                            <p className="truncate font-medium text-gray-900 dark:text-white">{cert.exam_total_points}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer CTA */}
                                            <div className="border-t border-gray-100 p-4 dark:border-gray-800">
                                                <a
                                                    href={`/certifications/${cert.slug}`}
                                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 dark:bg-primary dark:hover:bg-primary/90"
                                                >
                                                    {t('certifications.view_details')}
                                                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                                </a>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CertificationList;
