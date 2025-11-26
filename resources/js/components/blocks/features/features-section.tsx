import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Données des certifications pour le carrousel
const certifications = [
    { id: 'ctfl', name: 'CTFL', logo: '/assets/images/certifications/logo-ctfl.png' },
    { id: 'ctal-ta', name: 'CTAL-TA', logo: '/assets/images/certifications/logo-ctal-ta.png' },
    { id: 'ctal-tm', name: 'CTAL-TM', logo: '/assets/images/certifications/logo-ctal-tm.png' },
    { id: 'ctal-tae', name: 'CTAL-TAE', logo: '/assets/images/certifications/logo-ctal-tae.png' },
    { id: 'agile', name: 'Agile Tester', logo: '/assets/images/certifications/logo-agile.png' },
    { id: 'expert', name: 'Expert Level', logo: '/assets/images/certifications/logo-expert.png' },
];

function FeaturesSection() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const leftCardRef = useRef<HTMLDivElement>(null);
    const rightTopRef = useRef<HTMLDivElement>(null);
    const rightBottomRef = useRef<HTMLDivElement>(null);
    const marqueeRef1 = useRef<HTMLDivElement>(null);
    const marqueeRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du header
            if (headerRef.current) {
                gsap.from(headerRef.current, {
                    y: 50,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation de la carte gauche
            if (leftCardRef.current) {
                gsap.from(leftCardRef.current, {
                    x: -100,
                    opacity: 0,
                    scale: 0.95,
                    filter: 'blur(8px)',
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: leftCardRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation de la carte droite supérieure
            if (rightTopRef.current) {
                gsap.from(rightTopRef.current, {
                    x: 100,
                    y: 30,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: rightTopRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation de la carte droite inférieure
            if (rightBottomRef.current) {
                gsap.from(rightBottomRef.current, {
                    x: 100,
                    y: 50,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: rightBottomRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Animation du marquee infini - ligne 1 (vers la gauche)
            if (marqueeRef1.current) {
                const marquee1 = marqueeRef1.current;
                const totalWidth = marquee1.scrollWidth / 2;

                gsap.to(marquee1, {
                    x: -totalWidth,
                    duration: 25,
                    ease: 'none',
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
                    },
                });
            }

            // Animation du marquee infini - ligne 2 (vers la droite)
            if (marqueeRef2.current) {
                const marquee2 = marqueeRef2.current;
                const totalWidth = marquee2.scrollWidth / 2;

                gsap.fromTo(
                    marquee2,
                    { x: -totalWidth },
                    {
                        x: 0,
                        duration: 30,
                        ease: 'none',
                        repeat: -1,
                    },
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Dupliquer les certifications pour le défilement infini
    const duplicatedCerts = [...certifications, ...certifications, ...certifications];

    return (
        <section ref={sectionRef} className="py-16 max-[1920px]:px-5">
            <div className="mx-auto max-w-[1880px] rounded-3xl bg-gray-100 py-20 lg:rounded-4xl lg:py-30 xl:py-39 dark:bg-gray-800">
                <div className="container mx-auto px-4 md:px-5 lg:px-5">
                    {/* Header */}
                    <div ref={headerRef} className="mb-10 space-y-4 text-center md:mb-14 lg:mx-auto lg:max-w-[740px]">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                            {t('features.badge')}
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{t('features.title')}</h2>
                        <p className="text-lg text-muted-foreground">{t('features.description')}</p>
                    </div>

                    <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
                        {/* Carte gauche - Grande image */}
                        <div ref={leftCardRef} className="col-span-12 md:col-span-6">
                            <div className="relative h-full min-h-[450px] max-w-full overflow-hidden rounded-[20px] bg-white sm:min-h-[780px] md:min-h-[720px] lg:p-10.5 dark:bg-gray-900">
                                {/* Gradient overlay */}
                                <div className="absolute bottom-0 left-0 z-10 h-[480px] w-full bg-linear-to-t from-white via-white/80 to-transparent md:bottom-20 lg:bottom-0 dark:from-gray-900 dark:via-gray-900/80"></div>

                                {/* Image principale */}
                                <figure className="absolute right-0 bottom-2 md:bottom-40 lg:bottom-20 xl:bottom-2">
                                    <img
                                        src="/assets/images/features/feature-certification-process.jpg"
                                        alt="Processus de certification ISTQB"
                                        className="h-full w-full object-cover"
                                    />
                                </figure>

                                {/* Texte */}
                                <div className="absolute right-10.5 bottom-10.5 left-6 z-20 space-y-2 sm:left-10.5 md:left-6 xl:left-10.5">
                                    <h3 className="text-xl font-bold text-foreground md:text-2xl">{t('features.card1_title')}</h3>
                                    <p className="max-w-[450px] text-muted-foreground">{t('features.card1_description')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Colonne droite */}
                        <div className="col-span-12 space-y-8 md:col-span-6">
                            {/* Carte avec carrousel de certifications */}
                            <div ref={rightTopRef} className="space-y-6 overflow-hidden rounded-[20px] bg-white p-5 sm:p-8 md:p-5 xl:p-8 dark:bg-gray-900">
                                <div className="space-y-5 overflow-hidden rounded-2xl bg-gray-100 pt-6 pb-6 dark:bg-gray-800">
                                    {/* Ligne 1 - Défilement vers la gauche */}
                                    <div className="overflow-hidden">
                                        <div ref={marqueeRef1} className="flex items-center gap-x-6">
                                            {duplicatedCerts.map((cert, index) => (
                                                <div
                                                    key={`row1-${cert.id}-${index}`}
                                                    className="inline-flex max-w-[180px] min-w-[180px] items-center gap-x-3 rounded-full bg-white p-2 shadow-sm dark:bg-gray-700"
                                                >
                                                    <figure className="size-12 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
                                                        <img src={cert.logo} alt={cert.name} className="size-full object-contain p-1" />
                                                    </figure>
                                                    <span className="text-sm font-medium text-foreground">{cert.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Ligne 2 - Défilement vers la droite */}
                                    <div className="overflow-hidden">
                                        <div ref={marqueeRef2} className="flex items-center gap-x-6">
                                            {duplicatedCerts.map((cert, index) => (
                                                <div
                                                    key={`row2-${cert.id}-${index}`}
                                                    className="inline-flex max-w-[180px] min-w-[180px] items-center gap-x-3 rounded-full bg-white p-2 shadow-sm dark:bg-gray-700"
                                                >
                                                    <figure className="size-12 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
                                                        <img src={cert.logo} alt={cert.name} className="size-full object-contain p-1" />
                                                    </figure>
                                                    <span className="text-sm font-medium text-foreground">{cert.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Texte */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground md:text-2xl">{t('features.card2_title')}</h3>
                                    <p className="max-w-[450px] text-muted-foreground">{t('features.card2_description')}</p>
                                </div>
                            </div>

                            {/* Carte avec les 3 images */}
                            <div ref={rightBottomRef} className="space-y-8 rounded-[20px] bg-white p-5 sm:p-8 md:p-5 xl:p-8 dark:bg-gray-900">
                                <div className="flex items-center justify-center -space-x-12">
                                    <figure className="w-full max-w-[214px] rotate-12 overflow-hidden rounded-b-[15px] shadow-xl transition-transform duration-500 hover:scale-105 hover:rotate-0">
                                        <img src="/assets/images/features/feature-exam-1.png" alt="Examen ISTQB" className="h-full w-full object-cover" />
                                    </figure>
                                    <figure className="relative z-10 w-full max-w-[214px] overflow-hidden rounded-b-[15px] shadow-2xl transition-transform duration-500 hover:scale-110">
                                        <img
                                            src="/assets/images/features/feature-exam-2.png"
                                            alt="Certification réussie"
                                            className="h-full w-full object-cover"
                                        />
                                    </figure>
                                    <figure className="relative z-10 w-full max-w-[214px] -rotate-12 overflow-hidden rounded-b-[15px] shadow-xl transition-transform duration-500 hover:scale-105 hover:rotate-0">
                                        <img src="/assets/images/features/feature-exam-3.png" alt="Certificat ISTQB" className="h-full w-full object-cover" />
                                    </figure>
                                </div>

                                {/* Texte */}
                                <div className="relative z-20 space-y-2">
                                    <h3 className="text-xl font-bold text-foreground md:text-2xl">{t('features.card3_title')}</h3>
                                    <p className="max-w-[450px] text-muted-foreground">{t('features.card3_description')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
