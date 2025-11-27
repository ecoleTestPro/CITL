import { RichText } from '@/lib/text-parser';
import { Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface OverviewItem {
    text: string;
}

interface AboutOverviewProps {
    title: string;
    description: string;
    learnTitle: string;
    items: OverviewItem[];
    imageSrc: string;
    imageAlt: string;
}

export default function AboutOverview({ title, description, learnTitle, items, imageSrc, imageAlt }: AboutOverviewProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const learnTitleRef = useRef<HTMLHeadingElement>(null);
    const itemsRef = useRef<HTMLUListElement>(null);
    const imageRef = useRef<HTMLElement>(null);

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

            // Description animation
            if (descriptionRef.current) {
                gsap.from(descriptionRef.current, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    delay: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Learn title animation
            if (learnTitleRef.current) {
                gsap.from(learnTitleRef.current, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: learnTitleRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Items animation (staggered)
            if (itemsRef.current) {
                const listItems = itemsRef.current.querySelectorAll('li');
                gsap.from(listItems, {
                    x: -30,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: itemsRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Image animation
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    scale: 0.9,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 1.2,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 80%',
                    },
                });

                // Hover effect
                const img = imageRef.current.querySelector('img');
                if (img) {
                    imageRef.current.addEventListener('mouseenter', () => {
                        gsap.to(img, {
                            scale: 1.05,
                            duration: 0.4,
                            ease: 'power2.out',
                        });
                    });

                    imageRef.current.addEventListener('mouseleave', () => {
                        gsap.to(img, {
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out',
                        });
                    });
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    return (
        <section ref={sectionRef} className="bg-white py-4 sm:py-6 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse items-center justify-between gap-6 rounded-2xl bg-gray-100 p-3 sm:gap-8 sm:rounded-[32px] sm:p-4 lg:flex-row lg:gap-x-10 xl:gap-x-14 dark:bg-gray-800">
                    <div className="w-full p-3 sm:p-6 lg:w-1/2">
                        <div className="mb-6 space-y-4 sm:mb-8 sm:space-y-5">
                            <h2 ref={titleRef} className="text-2xl font-normal text-gray-900 sm:text-3xl dark:text-gray-100">
                                <RichText text={title} />
                            </h2>
                            <p ref={descriptionRef} className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                                <RichText text={description} />
                            </p>
                        </div>
                        <div>
                            <h3 ref={learnTitleRef} className="text-xl font-normal text-gray-900 sm:text-2xl dark:text-gray-100">
                                <RichText text={learnTitle} />
                            </h3>
                            <ul ref={itemsRef} className="mt-3 mb-6 space-y-2 sm:mt-4 sm:mb-10 sm:space-y-3">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-x-2 sm:items-center">
                                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-citl-orange sm:mt-0">
                                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                        </span>
                                        <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                                            <RichText text={item.text} />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <figure ref={imageRef} className="flex min-h-[200px] w-full items-center overflow-hidden rounded-xl sm:min-h-[300px] sm:rounded-[20px] lg:min-h-[490px] lg:w-1/2 lg:max-w-[613px]">
                        <img src={imageSrc} alt={imageAlt} className="h-auto w-full object-cover" loading="lazy" />
                    </figure>
                </div>
            </div>
        </section>
    );
}
