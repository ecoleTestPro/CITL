import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface BenefitCard {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    link?: string;
    type: 'large' | 'medium' | 'slider';
    beforeImage?: string;
    afterImage?: string;
}

interface BenefitsOfCertificationsProps {
    badge?: string;
    title?: string;
    subtitle?: string;
    benefits: BenefitCard[];
}

function BenefitsOfCertifications({ badge, title, subtitle, benefits }: BenefitsOfCertificationsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header animations
            if (headerRef.current) {
                const badge = headerRef.current.querySelector('.benefit-badge');
                const title = headerRef.current.querySelector('.benefit-title');
                const subtitle = headerRef.current.querySelector('.benefit-subtitle');

                if (badge) {
                    gsap.from(badge, {
                        y: 30,
                        opacity: 0,
                        filter: 'blur(10px)',
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 80%',
                        },
                    });
                }

                if (title) {
                    gsap.from(title, {
                        y: 40,
                        opacity: 0,
                        filter: 'blur(12px)',
                        duration: 1,
                        delay: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 80%',
                        },
                    });
                }

                if (subtitle) {
                    gsap.from(subtitle, {
                        y: 30,
                        opacity: 0,
                        filter: 'blur(10px)',
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 80%',
                        },
                    });
                }
            }

            // Cards animations
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('.benefit-card');
                cards.forEach((card, index) => {
                    gsap.from(card, {
                        y: 60,
                        opacity: 0,
                        filter: 'blur(16px)',
                        duration: 1,
                        delay: index * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                    });

                    // Image hover animation
                    const img = card.querySelector('img');
                    if (img) {
                        card.addEventListener('mouseenter', () => {
                            gsap.to(img, {
                                scale: 1.05,
                                duration: 0.4,
                                ease: 'power2.out',
                            });
                        });

                        card.addEventListener('mouseleave', () => {
                            gsap.to(img, {
                                scale: 1,
                                duration: 0.4,
                                ease: 'power2.out',
                            });
                        });
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [benefits]);
    const renderCard = (benefit: BenefitCard, index: number) => {
        const baseCardClasses = 'bg-white border-background-12 grid h-full grid-cols-12 rounded-3xl border p-5 md:gap-6 md:p-8';
        const largeCardClasses = 'gap-y-6 rounded-4xl px-5 pt-8 md:px-8';

        return (
            <div key={index} className={`benefit-card group/card-img ${benefit.type === 'large' ? 'col-span-12' : 'col-span-12 lg:col-span-6'}`}>
                <div className={`${baseCardClasses} ${benefit.type === 'large' ? largeCardClasses : 'gap-y-16'}`}>
                    <aside
                        className={`col-span-12 flex flex-col justify-between space-y-5 ${benefit.type === 'large' ? 'pt-14 pb-9 md:col-span-5 lg:col-span-5' : 'pt-14 md:col-span-6'}`}
                    >
                        <blockquote className="space-y-2">
                            <h3 className="text-xl font-semibold text-secondary">{benefit.title}</h3>
                            <div className="prose prose-sm text-tagline-1 max-w-none" dangerouslySetInnerHTML={{ __html: benefit.description }} />
                        </blockquote>

                        {benefit.link && (
                            <Link
                                href={benefit.link}
                                className="hover:bg-primary-500 group relative flex h-10 w-18 items-center justify-center space-y-5 overflow-hidden rounded-[40px] bg-secondary p-4 ring-8 ring-white transition-all duration-500 ease-in-out md:h-13 md:w-22 md:p-5"
                            >
                                <figure className="relative size-6 items-center justify-center overflow-hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="absolute inset-0 size-full -translate-x-6 text-white transition-transform duration-400 ease-in-out group-hover:translate-x-1"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="size-full text-white transition-transform duration-400 ease-in-out group-hover:translate-x-6"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </figure>
                            </Link>
                        )}
                    </aside>

                    {benefit.type === 'slider' ? (
                        <figure className="col-span-12 mx-auto w-full overflow-hidden rounded-lg transition-transform duration-500 ease-in-out group-hover/card-img:scale-105 md:col-span-6 md:rounded-[20px]">
                            <div className="relative mx-auto h-full w-full max-w-full overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] select-none md:max-w-[312px]">
                                <div className="slider relative h-full w-full cursor-ew-resize max-lg:h-100">
                                    <img
                                        src={benefit.beforeImage || ''}
                                        alt="Before"
                                        className="before pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
                                    />
                                    <img
                                        src={benefit.afterImage || ''}
                                        alt="After"
                                        className="after pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
                                    />
                                    <div className="slider-handle absolute top-0 left-1/2 z-30 h-full w-1 -translate-x-1/2 transition-all duration-200 ease-in-out">
                                        <div className="handle-line bg-stroke-1 absolute top-0 left-1/2 h-full w-px -translate-x-1/2"></div>
                                        <div
                                            className="absolute top-1/2 left-1/2 h-[267px] w-20 -translate-x-1/2 -translate-y-1/2 blur-[30px]"
                                            style={{ background: 'var(--color-gradient-12)' }}
                                        ></div>
                                        <div className="handle-circle ring-background-9/50 absolute top-1/2 left-1/2 flex h-[30px] w-[17px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[10px] rounded-[40px] bg-white px-[1px] py-[7px] ring-2 backdrop-blur-[17px] transition-all duration-200 ease-in-out hover:scale-105 hover:bg-white/90 active:scale-110 md:h-[28px] md:w-[15px] md:py-[6px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M8.625 2.6668C8.625 3.32954 8.12132 3.8668 7.5 3.8668C6.87868 3.8668 6.375 3.32954 6.375 2.6668C6.375 2.00406 6.87868 1.4668 7.5 1.4668C8.12132 1.4668 8.625 2.00406 8.625 2.6668ZM8.625 8.00013C8.625 8.66287 8.12132 9.20013 7.5 9.20013C6.87868 9.20013 6.375 8.66287 6.375 8.00013C6.375 7.33739 6.87868 6.80013 7.5 6.80013C8.12132 6.80013 8.625 7.33739 8.625 8.00013ZM7.5 14.5335C8.12132 14.5335 8.625 13.9962 8.625 13.3335C8.625 12.6707 8.12132 12.1335 7.5 12.1335C6.87868 12.1335 6.375 12.6707 6.375 13.3335C6.375 13.9962 6.87868 14.5335 7.5 14.5335Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </figure>
                    ) : (
                        <figure
                            className={`col-span-12 mx-auto w-full max-w-[905px] overflow-hidden ${benefit.type === 'large' ? 'rounded-t-lg md:col-span-6 md:rounded-t-[20px] lg:col-span-7' : 'h-[360px] rounded-lg md:col-span-6 md:h-full md:rounded-[20px]'} transition-transform duration-500 ease-in-out group-hover/card-img:scale-105`}
                        >
                            <img src={benefit.image || ''} alt={benefit.imageAlt || benefit.title} className="h-full w-full object-cover" />
                        </figure>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section ref={sectionRef} className="mt-10 overflow-hidden py-6">
            <div className="container mx-auto">
                {(badge || title || subtitle) && (
                    <div ref={headerRef} className="mb-11 text-center lg:mx-auto lg:mb-9 lg:max-w-[730px]">
                        {badge && (
                            <span className="benefit-badge bg-primary-400/50 text-primary-400 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring inset-ring-gray-400/20">
                                {badge}
                            </span>
                        )}
                        {title && <h2 className="benefit-title mb-1 text-3xl font-semibold md:mb-3 md:text-4xl lg:text-5xl">{title}</h2>}
                        {subtitle && <p className="benefit-subtitle text-black/40 lg:mx-auto lg:max-w-[530px]">{subtitle}</p>}
                    </div>
                )}

                <div ref={cardsRef} className="grid grid-cols-12 gap-y-6 md:gap-6">
                    {benefits.map((benefit, index) => renderCard(benefit, index))}
                </div>
            </div>
        </section>
    );
}

export default BenefitsOfCertifications;
