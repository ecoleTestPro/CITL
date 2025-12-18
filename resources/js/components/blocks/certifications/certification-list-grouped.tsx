import { useImage } from '@/hooks/use-image';
import { CertificationCategory } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import CertificationCard from './certification-card';

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
                                <h2 className="text-heading-3 mb-3 text-gray-900 dark:text-gray-100">
                                    {category.name_fr || category.name}
                                </h2>
                                {(category.description_fr || category.description) && (
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {category.description_fr || category.description}
                                    </p>
                                )}
                                <div className="mt-4 h-1 w-20 bg-gradient-to-r from-secondary to-primary"></div>
                            </div>

                            {/* Certifications Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {certifications.map((cert) => (
                                    <CertificationCard key={cert.id} certification={cert} />
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
