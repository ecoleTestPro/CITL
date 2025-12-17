import { Certification } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface CertificationListProps {
    certifications: Certification[];
    categorySlug?: string;
}

function CertificationList({ certifications }: CertificationListProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current || certifications.length === 0) return;

        const ctx = gsap.context(() => {
            const bgShape = sectionRef.current?.querySelector('.bg-shape-animate');
            if (bgShape) {
                gsap.to(bgShape, {
                    y: '+=30',
                    x: '+=20',
                    rotation: '+=5',
                    duration: 8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }

            const cards = sectionRef.current?.querySelectorAll('article') ?? [];
            gsap.from(cards, {
                y: 60,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [certifications]);

    if (certifications.length === 0) {
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
        <section ref={sectionRef} className="relative overflow-hidden py-12 dark:bg-gray-800">
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="bg-shape-animate absolute -top-20 -right-20 opacity-5 dark:opacity-[0.02]">
                    <img src="/assets/images/bg/sharp-3.png" alt="Background shape" className="h-auto w-auto max-w-none dark:opacity-30 dark:invert" />
                </div>
            </div>

            <div className="relative z-10 container mx-auto">
                <div className="grid grid-cols-12 gap-8">
                    {certifications.map((cert) => (
                        <article
                            key={cert.id}
                            className="col-span-12 space-y-3.5 rounded-[20px] border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md md:col-span-6 lg:col-span-4 dark:border-gray-800 dark:bg-gray-900"
                        >
                            <div className="space-y-11">
                                <div>
                                    <span className={`${cert.icon} text-[52px] text-secondary dark:text-primary`}></span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-heading-6 md:text-heading-5 text-gray-900 dark:text-white">{cert.title_fr}</h3>
                                {cert.subtitle_fr && <p className="text-sm font-medium text-secondary dark:text-primary">{cert.subtitle_fr}</p>}
                                <p className="max-w-[345px] text-gray-600 dark:text-gray-400">{cert.description_fr}</p>
                                <div className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">Questions:</strong> {cert.exam_questions}
                                    </p>
                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">Score requis:</strong> {cert.exam_passing_score}%
                                    </p>
                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">Durée:</strong> {cert.exam_duration}
                                    </p>
                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">Points totaux:</strong> {cert.exam_total_points}
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <a
                                        href={`/certifications/${cert.slug}`}
                                        className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary/90 hover:shadow-md dark:bg-primary dark:hover:bg-primary/90"
                                    >
                                        Voir les détails
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CertificationList;
