import { useImage } from '@/hooks/use-image';
import { CertificationCategory } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface CertificationListGroupedProps {
    categories: CertificationCategory[];
}

function CertificationListGrouped({ categories }: CertificationListGroupedProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgSharp3 = useImage('global', 'bg_sharp_3', '/assets/images/bg/sharp-3.png');

    useEffect(() => {
        if (!sectionRef.current || categories.length === 0) return;

        const ctx = gsap.context(() => {
            const categoryGroups = sectionRef.current?.querySelectorAll('.category-group') ?? [];
            gsap.from(categoryGroups, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [categories]);

    if (categories.length === 0) {
        return (
            <section className="relative overflow-hidden py-12">
                <div className="container mx-auto">
                    <div className="rounded-lg bg-gray-50 p-12 text-center dark:bg-gray-800">
                        <p className="text-gray-600 dark:text-gray-400">Aucune certification disponible pour le moment.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div ref={sectionRef} className="relative overflow-hidden py-12">
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute -top-20 -right-20 opacity-5 dark:opacity-[0.02]">
                    <img src={bgSharp3} alt="Background shape" className="h-auto w-auto max-w-none" />
                </div>
            </div>

            <div className="relative z-10 container mx-auto space-y-16">
                {categories.map((category) => {
                    const certifications = category.active_certifications || category.activeCertifications || [];

                    if (certifications.length === 0) return null;

                    return (
                        <section key={category.id} className="category-group">
                            {/* Category Header */}
                            <div className="mb-8">
                                <h2 className="text-heading-3 mb-3 text-gray-900 dark:text-gray-100">{category.name}</h2>
                                {category.description && (
                                    <p className="text-lg text-gray-600 dark:text-gray-400">{category.description}</p>
                                )}
                                <div className="mt-4 h-1 w-20 bg-gradient-to-r from-secondary to-primary"></div>
                            </div>

                            {/* Certifications Grid */}
                            <div className="grid grid-cols-12 gap-8">
                                {certifications.map((cert) => (
                                    <article
                                        key={cert.id}
                                        className="group col-span-12 space-y-3.5 rounded-[20px] bg-white p-8 transition-all duration-300 hover:shadow-xl dark:bg-gray-800 md:col-span-6 lg:col-span-4"
                                    >
                                        <div className="space-y-11">
                                            <div>
                                                <span
                                                    className={`${cert.icon} text-[52px] text-secondary transition-transform duration-300 group-hover:scale-110 dark:text-accent`}
                                                ></span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-heading-6 transition-colors duration-300 group-hover:text-secondary dark:group-hover:text-accent md:text-heading-5">
                                                {cert.title_fr}
                                            </h3>
                                            {cert.subtitle_fr && (
                                                <p className="text-sm font-medium text-secondary dark:text-accent">{cert.subtitle_fr}</p>
                                            )}
                                            <p className="max-w-[345px] text-gray-700 dark:text-gray-300">{cert.description_fr}</p>
                                            <div className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                                                <p>
                                                    <strong>Questions:</strong> {cert.exam_questions}
                                                </p>
                                                <p>
                                                    <strong>Score requis:</strong> {cert.exam_passing_score}%
                                                </p>
                                                <p>
                                                    <strong>Durée:</strong> {cert.exam_duration}
                                                </p>
                                                <p>
                                                    <strong>Points totaux:</strong> {cert.exam_total_points}
                                                </p>
                                            </div>
                                            <div className="pt-4">
                                                <a
                                                    href={`/certifications/${cert.slug}`}
                                                    className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-secondary/90 hover:shadow-md dark:bg-accent dark:hover:bg-accent/90"
                                                >
                                                    Voir les détails
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

export default CertificationListGrouped;
