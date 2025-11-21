import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface CommonTextBlockImage {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
}

interface CommonTextBlockProps {
    image?: CommonTextBlockImage;
    title?: string;
    description?: string;
}

export default function CommonTextBlock({ image, title, description }: CommonTextBlockProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Image animation
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 80%',
                    },
                });
            }

            // Content animation
            if (contentRef.current) {
                gsap.from(contentRef.current, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 80%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="pt-12 pb-16">
            <div className="container mx-auto">
                <div className={image ? 'grid gap-12 lg:grid-cols-2 lg:gap-16' : ''}>
                    <div>
                        {title && (
                            <div ref={titleRef} className="mb-[70px] space-y-3 text-left">
                                <h2 className="bold">{title}</h2>
                            </div>
                        )}

                        {description && (
                            <div
                                ref={contentRef}
                                className={`prose prose-lg max-w-none ${image ? '' : 'mx-auto max-w-[840px]'}`}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </div>

                    {image && (
                        <figure ref={imageRef} className="flex h-full items-center justify-center">
                            <img src={image?.src || '/assets/images/bg/ns-img-26.jpg'} alt={image?.alt || 'banner-image'} className="rounded-2xl" />
                        </figure>
                    )}
                </div>
            </div>
        </section>
    );
}
