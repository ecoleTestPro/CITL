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

interface CommonTextBlockBackgroundShape {
    src: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    opacity?: number;
}

interface CommonTextBlockProps {
    image?: CommonTextBlockImage;
    title?: string;
    description?: string;
    backgroundColor?: string;
    backgroundShapes?: CommonTextBlockBackgroundShape[];
}

export default function CommonTextBlock({ image, title, description, backgroundColor, backgroundShapes }: CommonTextBlockProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Background shapes animation
            if (shapesRef.current) {
                const shapes = shapesRef.current.querySelectorAll('.bg-shape');
                shapes.forEach((shape, index) => {
                    gsap.from(shape, {
                        scale: 0,
                        rotation: -180,
                        opacity: 0,
                        duration: 1.5,
                        ease: 'elastic.out(1, 0.5)',
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                        },
                    });

                    // Floating animation
                    gsap.to(shape, {
                        y: '+=20',
                        rotation: '+=10',
                        duration: 3 + index,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                    });
                });
            }

            // Title animation with character split
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

            // Image animation with scale and rotation
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    scale: 0.8,
                    rotation: -5,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 80%',
                    },
                });

                // Hover effect
                const img = imageRef.current.querySelector('img');
                if (img) {
                    img.addEventListener('mouseenter', () => {
                        gsap.to(img, {
                            scale: 1.05,
                            rotation: 2,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });

                    img.addEventListener('mouseleave', () => {
                        gsap.to(img, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });
                }
            }

            // Content animation with stagger for child elements
            if (contentRef.current) {
                // Animate container
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

                // Animate individual text elements
                const textElements = contentRef.current.querySelectorAll('h4, p, li, blockquote');
                gsap.from(textElements, {
                    x: -30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 70%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const getShapePositionClasses = (position?: string) => {
        switch (position) {
            case 'top-left':
                return 'top-0 left-0';
            case 'top-right':
                return 'top-0 right-0';
            case 'bottom-left':
                return 'bottom-0 left-0';
            case 'bottom-right':
                return 'bottom-0 right-0';
            case 'center':
                return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
            default:
                return 'top-0 right-0';
        }
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-12 pb-16" style={{ backgroundColor: backgroundColor || 'transparent' }}>
            {/* Background Shapes */}
            {backgroundShapes && backgroundShapes.length > 0 && (
                <div ref={shapesRef} className="pointer-events-none absolute inset-0 z-0">
                    {backgroundShapes.map((shape, index) => (
                        <div
                            key={index}
                            className={`bg-shape absolute ${getShapePositionClasses(shape.position)}`}
                            style={{ opacity: shape.opacity || 0.1 }}
                        >
                            <img src={shape.src} alt={`Background shape ${index + 1}`} className="h-auto w-auto max-w-none" />
                        </div>
                    ))}
                </div>
            )}

            <div className="container relative z-10 mx-auto">
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
                            <img src={image?.src || '/assets/images/bg/ns-img-26.jpg'} alt={image?.alt || 'banner-image'} className="rounded-2xl transition-transform duration-300" />
                        </figure>
                    )}
                </div>
            </div>
        </section>
    );
}
