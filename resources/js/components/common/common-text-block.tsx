import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CommonTextBlockImage {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
}
interface CommonTextBlockDescription {
    titlre: string;
    text: string;
}

interface CommonTextBlockProps {
    image?: CommonTextBlockImage;
    title?: string;
    description?: CommonTextBlockDescription[];
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

            // Content animation with stagger
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.content-item');
                gsap.from(items, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.15,
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
        <section ref={sectionRef} className="pb-[100px] pt-32 sm:pt-36 md:pt-42 xl:pb-[100px] xl:pt-[180px]">
            <div className="main-container">
                <div ref={titleRef} className="mb-[70px] space-y-3 text-center">
                    <h2>{title}</h2>
                </div>

                {image && (
                    <figure ref={imageRef} className="mb-18">
                        <img src={image?.src || '/assets/images/bg/ns-img-26.jpg'} alt={image?.alt || 'banner-image'} className="rounded-2xl" />
                    </figure>
                )}

                {description && description.length > 0 && (
                    <div ref={contentRef} className="mx-auto max-w-[840px] space-y-8">
                        {description?.map((desc, index) => (
                            <div key={index} className="content-item space-y-4">
                                <h4>{desc.titlre}</h4>
                                <p>{desc.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
