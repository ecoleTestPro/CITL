import { AnimatedButton } from '@/components/ui/animated-button';
import { Button } from '@/components/ui/button';
import { RichText } from '@/lib/text-parser';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Domain {
    text: string;
}

interface DomainsGridProps {
    title: string;
    domains: Domain[];
    conclusion?: string;
    ctaText?: string;
    ctaLink?: string;
    onCtaClick?: () => void;
    columns?: 2 | 3 | 4;
}

export default function DomainsGrid({ title, domains, conclusion, ctaText, ctaLink, onCtaClick, columns = 3 }: DomainsGridProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const conclusionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { y: 40, opacity: 0, filter: 'blur(10px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // Cards animation with stagger
            const validCards = cardsRef.current.filter(Boolean);
            if (validCards.length > 0) {
                gsap.fromTo(
                    validCards,
                    { y: 60, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.06,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // Conclusion animation
            if (conclusionRef.current) {
                gsap.fromTo(
                    conclusionRef.current,
                    { y: 30, opacity: 0, filter: 'blur(8px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: conclusionRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // CTA animation
            if (ctaRef.current) {
                gsap.fromTo(
                    ctaRef.current,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [domains]);

    const gridCols = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <section ref={sectionRef} className="bg-white py-12 sm:py-16 xl:py-20 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Title */}
                <h2 ref={titleRef} className="mb-10 text-center text-2xl font-semibold text-gray-900 sm:mb-12 sm:text-3xl dark:text-gray-100">
                    <RichText text={title} />
                </h2>

                {/* Domains Grid */}
                <div className={cn('mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:gap-5', gridCols[columns])}>
                    {domains.map((domain, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all duration-300 hover:border-gray-400 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
                        >
                            {/* Domain text */}
                            <p className="text-sm font-medium text-gray-800 sm:text-base dark:text-gray-200">
                                <RichText text={domain.text} />
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-900 transition-all duration-300 group-hover:w-full dark:bg-white" />
                        </div>
                    ))}
                </div>

                {/* Conclusion */}
                {conclusion && (
                    <p ref={conclusionRef} className="mx-auto mt-10 max-w-4xl text-center text-sm text-gray-600 sm:mt-12 sm:text-base dark:text-gray-400">
                        <RichText text={conclusion} />
                    </p>
                )}

                {/* CTA Button */}
                {ctaText && (
                    <div ref={ctaRef} className="mt-8 flex justify-center sm:mt-10">
                        {onCtaClick ? (
                            <Button
                                size="lg"
                                onClick={onCtaClick}
                                className="rounded-full bg-gray-900 px-8 py-5 text-base text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                            >
                                {ctaText}
                            </Button>
                        ) : (
                            <Link href={ctaLink || '#'}>
                                <AnimatedButton>{ctaText}</AnimatedButton>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
