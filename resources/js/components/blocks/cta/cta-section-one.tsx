import { FadeIn, SlideIn } from '@/components/animations';
import { AnimatedButton } from '@/components/ui/animated-button';
import { useImage } from '@/hooks/use-image';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function CtaSectionOne() {
    const { t } = useTranslation();
    const ctaBackground = useImage('home', 'cta_background', '/assets/images/cta/cta-bg-pattern.png');
    const ctaImage = useImage('home', 'cta_image', '/assets/images/cta/cta-savings-growth.png');

    return (
        <section className="overflow-hidden pt-[50px] pb-16 md:pt-[100px] md:pb-20 lg:pt-[150px] lg:pb-[90px] xl:pt-[200px] xl:pb-[100px]">
            <div className="container mx-auto px-4">
                <div
                    className="rounded-[20px] bg-white md:bg-cover md:bg-top md:bg-no-repeat dark:bg-gray-900"
                    style={{ backgroundImage: `url('${ctaBackground}')` }}
                >
                    <div className="relative pr-3.5 pl-7 max-lg:space-y-10 max-md:pt-10 md:py-10 lg:py-16 lg:pr-[42px] lg:pl-14">
                        {/* Image à gauche - Version desktop */}
                        <SlideIn
                            direction="right"
                            duration={1}
                            delay={0.3}
                            // Disable scroll trigger so the image isn't hidden by GSAP until user scrolls
                            triggerOnScroll={false}
                            className="mx-auto w-[340px] overflow-hidden min-[925px]:top-[-85px] sm:w-[450px] md:absolute md:top-[-10px] md:-left-6 md:mx-0 md:w-[450px] lg:top-[-90px] lg:w-[540px] xl:top-[-204px] xl:w-[670px]"
                        >
                            <img
                                src={ctaImage}
                                alt="Visualisation de la croissance des certifications ISTQB"
                                className="size-full object-cover"
                                // Force eager loading so the image is requested even if GSAP initially hides it
                                loading="eager"
                            />
                        </SlideIn>

                        {/* Contenu texte à droite */}
                        <div className="mt-3 max-md:text-center md:ml-[390px] lg:ml-[490px] lg:max-w-[587px] xl:ml-[590px]">
                            <div className="space-y-8 md:space-y-14">
                                {/* Titre et description */}
                                <FadeIn delay={0.1} className="space-y-3">
                                    <h2 className="font-manrope text-4xl leading-normal font-bold text-gray-900 dark:text-gray-100">
                                        {t('cta.savings_title_part1')}
                                        <span className="text-citl-orange"> {t('cta.savings_title_part2')} </span>
                                    </h2>
                                    <p className="text-base leading-relaxed font-normal text-gray-500 lg:max-w-[518px] dark:text-gray-400">
                                        {t('cta.savings_description')}
                                    </p>
                                </FadeIn>

                                {/* Bouton CTA */}
                                <FadeIn delay={0.3}>
                                    <Link href="/why-certification" className="mx-auto w-[85%] md:mx-0 md:w-auto">
                                        <AnimatedButton className="w-full rounded-full bg-citl-orange px-6 py-3 text-white shadow-sm transition-all duration-300 hover:bg-citl-orange/90 md:w-auto">
                                            {t('cta.learn_more')}
                                        </AnimatedButton>
                                    </Link>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
