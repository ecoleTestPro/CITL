import { Button } from '@/components/ui/button';
import { RichText } from '@/lib/text-parser';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Takeaway {
    number: number;
    text: string;
}

interface AboutKeyTakeawaysProps {
    title: string;
    takeaways: Takeaway[];
    conclusion: string;
    ctaText: string;
    ctaLink?: string;
    onCtaClick?: () => void;
}

export default function AboutKeyTakeaways({ title, takeaways, conclusion, ctaText, ctaLink, onCtaClick }: AboutKeyTakeawaysProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const takeawaysRef = useRef<HTMLUListElement>(null);
    const conclusionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    y: 50,
                    opacity: 0,
                    filter: 'blur(12px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Takeaways animation (staggered)
            if (takeawaysRef.current) {
                const items = takeawaysRef.current.querySelectorAll('div');
                gsap.from(items, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: takeawaysRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Conclusion animation
            if (conclusionRef.current) {
                gsap.from(conclusionRef.current, {
                    y: 30,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: conclusionRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // CTA button animation
            if (ctaRef.current) {
                gsap.from(ctaRef.current, {
                    x: -50,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: 'top 90%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [takeaways]);

    return (
        <section ref={sectionRef} className="bg-white py-10 sm:py-16 xl:py-19 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 ref={titleRef} className="text-2xl font-normal text-gray-900 sm:text-3xl dark:text-gray-100">
                    <RichText text={title} />
                </h2>
                <ul ref={takeawaysRef} className="py-4 sm:py-6">
                    {takeaways.map((takeaway, index) => (
                        <div key={index}>
                            <li className="flex items-start gap-2 p-2 sm:items-center sm:gap-3 sm:p-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-200 p-1 sm:size-11 dark:bg-gray-800">
                                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-base font-medium text-gray-900 shadow-[0_1px_2px_0_rgba(0,0,0,0.15)] sm:size-9 sm:text-lg dark:bg-gray-700 dark:text-gray-100">
                                        {takeaway.number}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                                    <RichText text={takeaway.text} />
                                </p>
                            </li>
                            {index < takeaways.length - 1 && <li className="h-px w-full bg-gray-200 dark:bg-gray-800"></li>}
                        </div>
                    ))}
                </ul>
                <p ref={conclusionRef} className="w-full max-w-3xl text-sm text-gray-600 sm:text-base dark:text-gray-400">
                    <RichText text={conclusion} />
                </p>
                <div ref={ctaRef} className="mt-8 sm:mt-14">
                    {onCtaClick ? (
                        <Button
                            size="lg"
                            onClick={onCtaClick}
                            className="w-full rounded-full bg-citl-orange px-6 py-5 text-base text-white transition-all duration-300 hover:bg-citl-orange/90 sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
                        >
                            {ctaText}
                        </Button>
                    ) : (
                        <Link href={ctaLink || '#'} className="block sm:inline-block">
                            <Button
                                size="lg"
                                className="w-full rounded-full bg-citl-orange px-6 py-5 text-base text-white transition-all duration-300 hover:bg-citl-orange/90 sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
                            >
                                {ctaText}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
