'use client';

import { ExamRegistrationModal } from '@/components/exams/exam-registration-modal';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

function CtaTwo() {
    const { t } = useTranslation();
    const [showExamModal, setShowExamModal] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du badge
            if (badgeRef.current) {
                gsap.from(badgeRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation du titre
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(12px)',
                    duration: 1,
                    delay: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation de la description
            if (descriptionRef.current) {
                gsap.from(descriptionRef.current, {
                    y: 30,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation des boutons (cibler les div.group qui contiennent les boutons)
            if (buttonsRef.current) {
                const buttonWrappers = buttonsRef.current.querySelectorAll(':scope > a, :scope > div');
                gsap.from(buttonWrappers, {
                    x: 50,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 0.7,
                    stagger: 0.15,
                    delay: 0.4,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation des items de la liste
            if (listRef.current) {
                const items = listRef.current.querySelectorAll('li');
                gsap.from(items, {
                    y: 20,
                    opacity: 0,
                    filter: 'blur(5px)',
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-white/50 bg-cover bg-center bg-no-repeat py-[50px] md:py-20 lg:py-28 dark:bg-gray-900"
            style={{ backgroundImage: "url('/assets/images/bg/image_2025-10-21_060850034-removebg-preview.png')", backgroundPositionY: 'left', backgroundRepeat: 'no-repeat' }}
            aria-label="Call to Action"
        >
            <div className="relative z-10 container mx-auto">
                <div className="flex flex-col items-center justify-between lg:flex-row">
                    <div className="w-full space-y-5 text-center max-[400px]:max-w-[300px] lg:max-w-[476px] lg:text-left xl:max-w-[650px]">
                        <span
                            ref={badgeRef}
                            className="inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        >
                            {t('cta.cta_two.badge')}
                        </span>
                        <div className="space-y-3">
                            <h2 ref={titleRef} className="text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl dark:text-white">
                                {t('cta.cta_two.title')}
                            </h2>
                            <p ref={descriptionRef} className="text-base text-gray-600 md:text-lg dark:text-gray-300">
                                {t('cta.cta_two.description')}
                            </p>
                        </div>
                    </div>

                    <div className="w-full space-y-6 pt-[40px] sm:w-[80%] md:ml-0 md:w-[60%] lg:basis-[486px] lg:pt-[67px] xl:ml-[80px]">
                        <div ref={buttonsRef} className="flex flex-col items-center justify-start gap-5 sm:flex-row lg:gap-3">
                            <Link href="/contact" className="w-full md:w-auto">
                                <AnimatedButton variant="primary" fullWidth>
                                    {t('cta.cta_two.contact_button')}
                                </AnimatedButton>
                            </Link>

                            <AnimatedButton variant="primaryOutlined" fullWidth onClick={() => setShowExamModal(true)}>
                                {t('cta.cta_two.exam_button')}
                            </AnimatedButton>
                        </div>

                        <ul ref={listRef} className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 lg:justify-start">
                            <li className="flex items-center justify-center gap-2">
                                <span className="flex size-[18px] items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="7"
                                        viewBox="0 0 10 7"
                                        fill="none"
                                        aria-hidden="true"
                                        className="fill-white dark:fill-gray-900"
                                    >
                                        <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z" />
                                    </svg>
                                </span>
                                <p className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{t('cta.cta_two.feature_international')}</p>
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span className="flex size-[18px] items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="7"
                                        viewBox="0 0 10 7"
                                        fill="none"
                                        aria-hidden="true"
                                        className="fill-white dark:fill-gray-900"
                                    >
                                        <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z" />
                                    </svg>
                                </span>
                                <p className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{t('cta.cta_two.feature_online')}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <ExamRegistrationModal open={showExamModal} onOpenChange={setShowExamModal} />
        </section>
    );
}

export default CtaTwo;
