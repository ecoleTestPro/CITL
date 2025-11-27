import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ListItem {
    text: string;
}

interface AboutBlockOneProps {
    title: string;
    description: string;
    subtitle?: string;
    subtitleContent?: string;
    items: ListItem[];
    imageSrc?: string;
    imageAlt?: string;
    imageSrcDark?: string;
    imagePosition?: 'left' | 'right';
    videoSrc?: string;
    videoPoster?: string;
}

function AboutBlockOne({
    title,
    description,
    subtitle,
    subtitleContent,
    items,
    imageSrc,
    imageAlt,
    imageSrcDark,
    imagePosition = 'right',
    videoSrc,
    videoPoster,
}: AboutBlockOneProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const subtitleContentRef = useRef<HTMLParagraphElement>(null);
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

            // Subtitle animation
            if (subtitleRef.current) {
                gsap.from(subtitleRef.current, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    delay: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: subtitleRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Subtitle content animation
            if (subtitleContentRef.current) {
                gsap.from(subtitleContentRef.current, {
                    y: 30,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: subtitleContentRef.current,
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

    const contentSection = (
        <div className="col-span-12 lg:col-span-6">
            <div className="mx-auto max-w-[500px] space-y-5 sm:space-y-8 lg:mx-0 lg:max-w-full">
                <div className="space-y-3">
                    <h2 ref={titleRef} className="text-3xl font-semibold text-gray-900 md:text-4xl lg:text-5xl dark:text-gray-100">
                        {title}
                    </h2>
                    <p ref={descriptionRef} className="text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                </div>
                {subtitle && (
                    <div className="space-y-3">
                        <h3 ref={subtitleRef} className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            {subtitle}
                        </h3>
                        {subtitleContent && (
                            <p ref={subtitleContentRef} className="text-gray-600 dark:text-gray-400">
                                {subtitleContent}
                            </p>
                        )}
                    </div>
                )}
                {items.length > 0 && (
                    <div>
                        <ul ref={itemsRef} className={`space-y-1 sm:space-y-2 ${items.length > 5 ? 'grid grid-cols-1 gap-x-6 md:grid-cols-2' : ''}`}>
                            {items.map((item, index) => (
                                <li key={index} className="flex items-center gap-4 p-2">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-citl-orange">
                                        <Check className="h-4 w-4 text-white dark:text-gray-900" strokeWidth={3} />
                                    </span>
                                    <span className="text-tagline-1 font-medium text-secondary dark:text-white">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    const imageSection = (
        <div className="col-span-12 lg:col-span-6">
            <figure ref={imageRef} className="mx-auto w-full max-w-[500px] lg:mx-0 lg:max-w-[669px]">
                {videoSrc ? (
                    <video
                        src={videoSrc}
                        poster={videoPoster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="size-full rounded-2xl object-cover"
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <>
                        <img src={imageSrc} alt={imageAlt} className="size-full dark:hidden" />
                        {imageSrcDark && <img src={imageSrcDark} alt={imageAlt} className="hidden size-full dark:block" />}
                    </>
                )}
            </figure>
        </div>
    );

    return (
        <section ref={sectionRef} className="pt-6 pb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 items-center gap-y-16 lg:gap-20 xl:gap-[100px]">
                    {imagePosition === 'left' ? (
                        <>
                            {imageSection}
                            {contentSection}
                        </>
                    ) : (
                        <>
                            {contentSection}
                            {imageSection}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AboutBlockOne;
