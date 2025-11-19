import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function AboutUsOne() {
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
                                    L'unique structure officielle ISTQB en Côte
                                    d'Ivoire
                                </h2>
                                <p className="text-center text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400 lg:text-start">
                                    Le Comité Ivoirien des Tests Logiciels (CITL)
                                    a été fondé le 24 octobre 2025 lors de
                                    l'assemblée générale de l'ISTQB à Copenhague.
                                    Organisation à but non lucratif, nous sommes
                                    chargés de délivrer les certifications ISTQB,
                                    d'accréditer les formateurs et organismes de
                                    formation, et de promouvoir l'excellence du
                                    testing logiciel en Côte d'Ivoire.
                                </p>
                            </div>
                            <div className="inline-flex w-full items-center justify-center gap-5 sm:gap-10 lg:justify-start">
                                <div className="inline-flex flex-col items-start justify-start">
                                    <h3 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">
                                        6
                                    </h3>
                                    <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                        Certifications
                                    </h6>
                                </div>
                                <div className="inline-flex flex-col items-start justify-start">
                                    <h4 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">
                                        3
                                    </h4>
                                    <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                        Niveaux de formation
                                    </h6>
                                </div>
                                <div className="inline-flex flex-col items-start justify-start">
                                    <h4 className="font-manrope text-4xl leading-normal font-bold text-citl-orange">
                                        0
                                    </h4>
                                    <h6 className="text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                                        Testeurs certifiés
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <Link href="/about-citl">
                            <Button className="flex w-full items-center justify-center rounded-lg bg-citl-orange px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all duration-700 ease-in-out hover:bg-citl-orange/90 sm:w-fit">
                                En savoir plus sur le CITL
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
