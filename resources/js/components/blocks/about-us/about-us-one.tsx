import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function AboutUsOne() {
    const { t } = useTranslation();

    return (
        <section className="relative py-24 bg-white/80 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-5">
                <div className="grid w-full grid-cols-1 items-center justify-start gap-12 lg:grid-cols-2">
                    <div className="order-last grid w-full grid-cols-1 items-start justify-center gap-6 sm:grid-cols-2 lg:order-first">
                        <div className="flex items-start justify-start gap-2.5 pt-24 sm:justify-end lg:justify-center">
                            <img
                                className="rounded-xl object-cover"
                                src="/assets/images/about/citl-team-1.jpg"
                                alt="Équipe CITL - Testing Logiciel"
                            />
                        </div>
                        <img
                            className="ml-auto rounded-xl object-cover sm:ml-0"
                            src="/assets/images/about/citl-certification.jpg"
                            alt="Certification ISTQB en Côte d'Ivoire"
                        />
                    </div>
                    <div className="inline-flex w-full flex-col items-center justify-center gap-10 lg:items-start">
                        <div className="flex w-full flex-col items-start justify-center gap-8">
                            <div className="flex w-full flex-col items-center justify-start gap-3 lg:items-start">
                                <h2 className="font-manrope text-center text-4xl leading-normal font-bold text-gray-900 dark:text-gray-100 lg:text-start">
                                    {t('home.hero_title')}
                                </h2>
                                <p className="text-center text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400 lg:text-start">
                                    {t('home.hero_description')}
                                </p>
                            </div>
                            <div className="inline-flex w-full items-center justify-center gap-5 sm:gap-10 lg:justify-start">
                                <div className="inline-flex flex-col items-start justify-start">
                                    <h3 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">
                                        6
                                    </h3>
                                    <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                        {t('home.certifications_count')}
                                    </h6>
                                </div>
                                <div className="inline-flex flex-col items-start justify-start">
                                    <h4 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">
                                        3
                                    </h4>
                                    <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                        {t('home.training_levels')}
                                    </h6>
                                </div>
                                <div className="inline-flex flex-col items-start justify-start">
                                    <h4 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">
                                        0
                                    </h4>
                                    <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                        {t('home.certified_testers')}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <Link href="/about-citl">
                            <Button className="flex w-full items-center justify-center rounded-lg bg-citl-orange px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all duration-700 ease-in-out hover:bg-citl-orange/90 sm:w-fit">
                                {t('home.learn_more')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
