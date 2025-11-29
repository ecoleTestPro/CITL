import { RichText } from '@/lib/text-parser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Member {
    name: string;
    role: string;
    description: string;
    image: string;
}

interface TeamMembersProps {
    title: string;
    members: Member[];
}

export default function TeamMembers({ title, members }: TeamMembersProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du titre
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    y: 50,
                    opacity: 0,
                    filter: 'blur(12px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation des cartes avec stagger
            const validCards = cardsRef.current.filter(Boolean);
            if (validCards.length > 0) {
                gsap.from(validCards, {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    filter: 'blur(8px)',
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                });

                // Hover animations pour chaque carte
                validCards.forEach((card) => {
                    if (!card) return;

                    const image = card.querySelector('img');
                    const info = card.querySelector('.member-info');

                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -8,
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                        if (image) {
                            gsap.to(image, {
                                scale: 1.05,
                                duration: 0.4,
                                ease: 'power2.out',
                            });
                        }
                        if (info) {
                            gsap.to(info, {
                                y: -4,
                                duration: 0.3,
                                ease: 'power2.out',
                            });
                        }
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            y: 0,
                            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                        if (image) {
                            gsap.to(image, {
                                scale: 1,
                                duration: 0.4,
                                ease: 'power2.out',
                            });
                        }
                        if (info) {
                            gsap.to(info, {
                                y: 0,
                                duration: 0.3,
                                ease: 'power2.out',
                            });
                        }
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [members]);

    return (
        <section ref={sectionRef} className="bg-white/15 py-10 sm:py-14 md:py-16 lg:py-[88px] xl:py-[100px] dark:bg-gray-900/15">
            <div className="container mx-auto px-4">
                <h2 ref={titleRef} className="mb-8 text-center text-2xl font-normal text-gray-900 sm:mb-10 sm:text-3xl md:mb-16 md:text-4xl dark:text-gray-100">
                    <RichText text={title} />
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                    {members.map((member, index) => (
                        <article
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className="group space-y-4 rounded-2xl bg-gray-50 p-4 sm:space-y-5 sm:rounded-[20px] sm:p-6 dark:bg-gray-800"
                        >
                            {/* Photo du membre - aspect ratio portrait pour voir le visage entier */}
                            <div className="relative overflow-hidden rounded-xl sm:rounded-[16px]">
                                <div className="aspect-[3/4] w-full">
                                    <img src={member.image} alt={member.name} className="h-full w-auto object-cover object-top" loading="lazy" />
                                </div>
                                {/* Overlay gradient au hover */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>

                            {/* Informations du membre */}
                            <div className="member-info space-y-2 sm:space-y-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-100">{member.name}</h3>
                                    <p className="text-xs font-medium text-citl-orange sm:text-sm">{member.role}</p>
                                </div>
                                <p className="line-clamp-3 text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-400">
                                    <RichText text={member.description} />
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
