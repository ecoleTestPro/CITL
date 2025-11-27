import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
    text: string;
}

interface AdBanner {
    imageSrc: string;
    imageAlt: string;
    href?: string;
    title?: string;
}

interface BenefitsSidebarProps {
    title: string;
    benefits: Benefit[];
    adBanner?: AdBanner;
    className?: string;
    stickyTop?: string;
}

export function BenefitsSidebar({ title, benefits, adBanner, className, stickyTop = 'top-24' }: BenefitsSidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const benefitsRef = useRef<(HTMLLIElement | null)[]>([]);
    const adBannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sidebarRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du titre
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { opacity: 0, x: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sidebarRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // Animation des avantages avec stagger
            const validBenefits = benefitsRef.current.filter(Boolean);
            if (validBenefits.length > 0) {
                gsap.fromTo(
                    validBenefits,
                    { opacity: 0, x: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        delay: 0.2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sidebarRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // Animation de la bannière publicitaire
            if (adBannerRef.current) {
                gsap.fromTo(
                    adBannerRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: 0.4,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sidebarRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }
        }, sidebarRef);

        return () => ctx.revert();
    }, [benefits]);

    const AdBannerContent = () => (
        <div ref={adBannerRef} className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <img
                src={adBanner?.imageSrc}
                alt={adBanner?.imageAlt || 'Bannière publicitaire'}
                className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
            />
        </div>
    );

    return (
        <>
            <div className={cn('hidden w-full lg:block lg:w-1/4', className)}>
                <div
                    ref={sidebarRef}
                    className={cn(
                        'sticky rounded-lg border border-gray-200 bg-gradient-to-br from-secondary/10 to-accent/10 p-6 shadow-lg dark:border-gray-700',
                        stickyTop,
                    )}
                >
                    <div className="space-y-6">
                        <div>
                            <h3 ref={titleRef} className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {title}
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                {benefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        ref={(el) => {
                                            benefitsRef.current[index] = el;
                                        }}
                                        className="flex items-start gap-2"
                                    >
                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary dark:text-accent" />
                                        <span>{benefit.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {adBanner && (
                    <>
                        <AdBannerContent />
                    </>
                )}
            </div>
        </>
    );
}
