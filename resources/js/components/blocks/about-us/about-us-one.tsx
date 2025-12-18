import { FadeIn, ScaleIn, SlideIn } from '@/components/animations';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Button } from '@/components/ui/button';
import { useRichTranslation } from '@/hooks/use-rich-translation';
import { Link } from '@inertiajs/react';

export default function AboutUsOne() {
    const { t, tRich } = useRichTranslation();

    return (
        <section className="relative bg-white/80 pt-12 pb-6 sm:pt-24 dark:bg-gray-900">
            <div className="container mx-auto px-4 md:px-5 lg:px-5">
                <div className="grid w-full grid-cols-1 items-center justify-start gap-8 sm:gap-12 lg:grid-cols-2">
                    {/* Images avec animation SlideIn depuis la gauche avec stagger */}
                    <div className="order-last grid w-full grid-cols-1 items-start justify-center gap-4 sm:grid-cols-2 sm:gap-6 lg:order-first">
                        <SlideIn
                            direction="left"
                            duration={1.2}
                            delay={0}
                            className="flex items-start justify-center gap-2.5 pt-0 sm:justify-end sm:pt-24 lg:justify-center"
                        >
                            <img className="max-h-[250px] w-full rounded-xl object-cover sm:max-h-none sm:w-auto" src="/assets/images/about/about-02.jpg" alt="Équipe CITL - Testing Logiciel" />
                        </SlideIn>
                        <SlideIn direction="left" duration={1.2} delay={0.2}>
                            <img
                                className="mx-auto max-h-[250px] w-full rounded-xl object-cover sm:mx-0 sm:ml-0 sm:max-h-none sm:w-auto"
                                src="/assets/images/about/about-01.jpg"
                                alt="Certification ISTQB en Côte d'Ivoire"
                            />
                        </SlideIn>
                    </div>

                    {/* Contenu texte */}
                    <div className="relative inline-flex w-full flex-col items-center justify-center gap-10 overflow-hidden lg:items-start">
                        <div className="relative flex w-full flex-col items-start justify-center gap-8">
                            {/* Titre et description avec FadeIn */}
                            <FadeIn duration={1.2} delay={0.3} className="flex w-full flex-col items-center justify-start gap-3 lg:items-start">
                                <h2
                                    className="font-manrope text-center text-4xl leading-normal font-bold text-gray-900 lg:text-start dark:text-gray-100"
                                    dangerouslySetInnerHTML={{ __html: tRich('home.hero_title') }}
                                />
                                <p
                                    className="text-center text-[17px] leading-relaxed font-normal text-gray-500 text-muted-foreground lg:text-start dark:text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: tRich('home.hero_description') }}
                                />
                            </FadeIn>

                            {/* Statistiques avec ScaleIn et stagger */}
                            {false && (
                                <ScaleIn
                                    duration={0.8}
                                    delay={0.5}
                                    stagger={0.15}
                                    className="inline-flex w-full items-center justify-center gap-5 sm:gap-10 lg:justify-start"
                                >
                                    <div className="inline-flex flex-col items-start justify-start">
                                        <h3 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">6</h3>
                                        <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                            {t('home.certifications_count')}
                                        </h6>
                                    </div>
                                    <div className="inline-flex flex-col items-start justify-start">
                                        <h4 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">3</h4>
                                        <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">{t('home.training_levels')}</h6>
                                    </div>
                                    <div className="inline-flex flex-col items-start justify-start">
                                        <h4 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">0</h4>
                                        <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                            {t('home.certified_testers')}
                                        </h6>
                                    </div>
                                </ScaleIn>
                            )}
                        </div>

                        {/* Bouton avec FadeIn et délai */}
                        <FadeIn duration={0.8} delay={0.8}>
                            <Link href="/about-citl">
                                <AnimatedButton className="flex w-full items-center justify-center rounded-lg bg-citl-orange px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all duration-700 ease-in-out hover:bg-citl-orange/90 sm:w-fit">
                                    {t('home.learn_more')}
                                </AnimatedButton>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
