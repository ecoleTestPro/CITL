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
        <section ref={sectionRef} className="bg-white py-6 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse items-center justify-between gap-x-10 rounded-[32px] bg-gray-100 p-2 lg:flex-row xl:gap-x-14 dark:bg-gray-800">
                    <div className="p-6 w-1/2">
                        <div className="mb-8 space-y-5">
                            <h2 ref={titleRef} className="text-3xl font-normal text-gray-900 dark:text-gray-100">
                                <RichText text={title} />
                            </h2>
                            <p ref={descriptionRef} className="text-gray-600 dark:text-gray-400">
                                <RichText text={description} />
                            </p>
                        </div>
                        <div>
                            <h3 ref={learnTitleRef} className="text-2xl font-normal text-gray-900 dark:text-gray-100">
                                <RichText text={learnTitle} />
                            </h3>
                            <ul ref={itemsRef} className="mt-4 mb-10 space-y-3">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center gap-x-2">
                                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-citl-orange">
                                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                        </span>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <RichText text={item.text} />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <figure ref={imageRef} className="flex min-h-[300px] w-1/2 items-center overflow-hidden rounded-[20px] lg:min-h-[490px] lg:max-w-[613px]">
                        <img src={imageSrc} alt={imageAlt} className="h-auto w-full object-cover" loading="lazy" />
                    </figure>
                </div>
            </div>
        </section>
    );
}
