import { FadeIn, SlideIn } from '@/components/animations';
import { AnimatedButton } from '@/components/ui/animated-button';
import { useImage } from '@/hooks/use-image';
import { Link } from '@inertiajs/react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const CertificationWheelTwo = () => {
    const { t } = useTranslation();
    const bgSharp2 = useImage('global', 'bg_sharp_2', '/assets/images/bg/sharp-2.png');
    const certificationWheel = useImage('home', 'certification_wheel', '/assets/images/pages/certification/certification-wheel.png');
    const containerRef = useRef<HTMLDivElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    // Détecte si la roue est visible dans le viewport
    const isInView = useInView(wheelRef, {
        amount: 0.5, // 50% de l'élément doit être visible
        once: false,
    });

    // Scroll progress pour l'animation de rotation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Rotation basée sur le scroll (0 à 180 degrés - plus lent et fluide)
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-gray-50 py-16 md:py-24 dark:bg-gray-800">
            {/* Background shapes */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-1/3 opacity-5 dark:opacity-[0.02]">
                <img src={bgSharp2} alt="" className="h-full w-full object-cover object-right" />
            </div>

            <div className="relative container mx-auto px-4 md:px-5 lg:px-5">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-8">
                    {/* Section gauche - Texte */}
                    <div className="flex flex-col gap-6">
                        <SlideIn direction="left" duration={0.8} delay={0}>
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                                {t('nav.certifications')}
                            </span>
                        </SlideIn>

                        <FadeIn duration={1} delay={0.1}>
                            <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                                {t('home.certification_wheel_title')}
                            </h2>
                        </FadeIn>

                        <FadeIn duration={1} delay={0.2}>
                            <p className="text-lg leading-relaxed text-muted-foreground">{t('home.certification_wheel_description')}</p>
                        </FadeIn>

                        <FadeIn duration={1} delay={0.3}>
                            <div className="mt-4">
                                <Link href="/why-certification">
                                    <AnimatedButton>{t('home.explore_certifications')}</AnimatedButton>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Section droite - Roue des certifications (image) - 2/3 de la largeur */}
                    <div ref={wheelRef} className="flex items-center justify-center lg:col-span-2">
                        <motion.div
                            className="relative aspect-square w-full max-w-[650px]"
                            style={{
                                rotate: isInView ? 0 : rotate,
                            }}
                            animate={{
                                rotate: isInView ? 0 : undefined,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 50,
                                damping: 30,
                                mass: 1.5,
                            }}
                        >
                            {/* Glow effect derrière la roue */}
                            <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl" />

                            {/* Image de la roue */}
                            <motion.img
                                src={certificationWheel}
                                alt="ISTQB Certification Wheel"
                                className="relative h-full w-full object-contain drop-shadow-2xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationWheelTwo;
