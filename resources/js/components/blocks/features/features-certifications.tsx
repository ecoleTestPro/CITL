import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookCheck, ClipboardCheck } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const FeaturesCertifications = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const certificationSteps = [
        {
            icon: BookCheck,
            title: t('home.how_to_certify'),
            description: t('home.how_to_certify_desc'),
            link: '/why-certification',
        },
        {
            icon: ClipboardCheck,
            title: t('home.find_training'),
            description: t('home.find_training_desc'),
            link: '/contact',
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { opacity: 0, y: 50, filter: 'blur(12px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // Description animation
            if (descriptionRef.current) {
                gsap.fromTo(
                    descriptionRef.current,
                    { opacity: 0, y: 30, filter: 'blur(8px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
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
                    { opacity: 0, y: 60, scale: 0.9, filter: 'blur(10px)' },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                            toggleActions: 'play none none none',
                        },
                    },
                );

                // Hover animations for cards
                validCards.forEach((card) => {
                    if (!card) return;

                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -8,
                            scale: 1.02,
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            y: 0,
                            scale: 1,
                            boxShadow: 'none',
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="bg-background py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <div className="mb-12 text-left">
                            <h2
                                ref={titleRef}
                                className="text-4xl font-semibold tracking-tight text-foreground md:text-[2.5rem] md:leading-[1.2]"
                            >
                                {t('home.develop_skills_title')}
                            </h2>
                            <p ref={descriptionRef} className="mt-4 text-lg text-muted-foreground sm:text-xl">
                                <strong>{t('home.istqb_intro')}</strong>, {t('home.istqb_description')}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex h-full items-center">
                            <div className="mx-auto grid w-full gap-6 md:grid-cols-2">
                                {certificationSteps.map((step, index) => (
                                    <div
                                        key={step.title}
                                        ref={(el) => {
                                            cardsRef.current[index] = el;
                                        }}
                                    >
                                        <Card className="flex h-full flex-col overflow-hidden rounded-xl border shadow-none transition-colors">
                                            <CardHeader>
                                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <step.icon className="h-6 w-6" />
                                                </div>
                                                <h4 className="mt-3! text-xl font-semibold tracking-tight text-foreground">{step.title}</h4>
                                                <p className="mt-1 text-[17px] text-muted-foreground">{step.description}</p>
                                            </CardHeader>
                                            <CardContent className="mt-auto px-0 pb-0">
                                                <div className="px-4">
                                                    <Button variant={'secondary'} asChild>
                                                        <Link href={step.link}>{t('home.learn_more_btn')}</Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesCertifications;
