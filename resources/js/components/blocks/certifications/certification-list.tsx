import { Certification } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, CheckCircle, Clock, Target } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface CertificationListProps {
    certifications: Certification[];
    categorySlug?: string;
}

function CertificationList({ certifications }: CertificationListProps) {
    const { t, i18n } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const isEnglish = i18n.language === 'en';

    const getLocalizedField = <T extends keyof Certification>(
        cert: Certification,
        fieldBase: string,
    ): string => {
        const fieldKey = `${fieldBase}_${isEnglish ? 'en' : 'fr'}` as T;
        const fallbackKey = `${fieldBase}_fr` as T;
        return (cert[fieldKey] as string) || (cert[fallbackKey] as string) || '';
    };

    useEffect(() => {
        if (!sectionRef.current || certifications.length === 0) return;

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
    }, [certifications]);

    if (certifications.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-16 dark:border-gray-700 dark:bg-gray-800/50">
                        <BookOpen className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            {t('certifications.no_certifications_available')}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((cert) => {
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
                                        <h3 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                                            {title}
                                        </h3>
                                        {subtitle && (
                                            <p className="mt-1 text-sm leading-snug text-secondary dark:text-primary">
                                                {subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6">
                                    {description && (
                                        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                            {description}
                                        </p>
                                    )}

                                    {/* Exam Details Grid */}
                                    <div className="mt-auto grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                            <BookOpen className="h-4 w-4 text-gray-400" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    {t('certifications.exam_questions')}
                                                </p>
                                                <p className="truncate font-medium text-gray-900 dark:text-white">
                                                    {cert.exam_questions}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                            <Target className="h-4 w-4 text-gray-400" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    {t('certifications.exam_passing_score')}
                                                </p>
                                                <p className="truncate font-medium text-gray-900 dark:text-white">
                                                    {cert.exam_passing_score}%
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    {t('certifications.exam_duration')}
                                                </p>
                                                <p className="truncate font-medium text-gray-900 dark:text-white">
                                                    {cert.exam_duration}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                                            <CheckCircle className="h-4 w-4 text-gray-400" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    {t('certifications.exam_total_points')}
                                                </p>
                                                <p className="truncate font-medium text-gray-900 dark:text-white">
                                                    {cert.exam_total_points}
                                                </p>
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
            </div>
        </section>
    );
}

export default CertificationList;
