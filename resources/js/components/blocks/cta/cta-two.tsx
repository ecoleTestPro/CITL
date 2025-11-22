'use client';

import { AnimatedButton } from '@/components/ui/animated-button';
import { ExamRegistrationModal } from '@/components/exams/exam-registration-modal';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function CtaTwo() {
    const { t } = useTranslation();
    const [showExamModal, setShowExamModal] = useState(false);

    return (
        <section className="bg-white py-[50px] dark:bg-gray-900 md:py-20 lg:py-28" aria-label="Call to Action">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-between lg:flex-row">
                    <div className="w-full space-y-5 text-center max-[400px]:max-w-[300px] lg:max-w-[476px] lg:text-left xl:max-w-[650px]">
                        <span data-ns-animate data-delay="0.3" className="inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                            {t('cta.cta_two.badge')}
                        </span>
                        <div className="space-y-3">
                            <h2 data-ns-animate data-delay="0.4" className="text-3xl font-bold text-secondary dark:text-accent sm:text-4xl lg:text-5xl">
                                {t('cta.cta_two.title')}
                            </h2>
                            <p data-ns-animate data-delay="0.5" className="text-base text-gray-600 dark:text-gray-300 md:text-lg">
                                {t('cta.cta_two.description')}
                            </p>
                        </div>
                    </div>

                    <div className="w-full space-y-6 pt-[40px] sm:w-[80%] md:ml-0 md:w-[60%] lg:basis-[486px] lg:pt-[67px] xl:ml-[80px]">
                        <div
                            data-ns-animate
                            data-delay="0.6"
                            className="flex flex-col items-center justify-start gap-5 sm:flex-row lg:gap-3"
                        >
                            <Link href="/contact" className="w-full md:w-auto">
                                <AnimatedButton variant="secondary" fullWidth>
                                    {t('cta.cta_two.contact_button')}
                                </AnimatedButton>
                            </Link>

                            <AnimatedButton
                                variant="primary"
                                fullWidth
                                onClick={() => setShowExamModal(true)}
                            >
                                {t('cta.cta_two.exam_button')}
                            </AnimatedButton>
                        </div>

                        <ul className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 lg:justify-start">
                            <li data-ns-animate data-delay="0.7" className="flex items-center justify-center gap-2">
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
                                <p className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">Certification reconnue internationalement</p>
                            </li>
                            <li data-ns-animate data-delay="0.8" className="flex items-center justify-center gap-2">
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
                                <p className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">Examen en ligne depuis votre domicile</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <ExamRegistrationModal
                open={showExamModal}
                onOpenChange={setShowExamModal}
            />
        </section>
    );
}

export default CtaTwo;
