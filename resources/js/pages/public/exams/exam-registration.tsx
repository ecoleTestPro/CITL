import HeroCommon from '@/components/common/common-hero';
import { ExamRegistrationForm } from '@/components/exams/exam-registration-form';
import PublicLayout from '@/layouts/public/public-layout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function ExamRegistration() {
    const { t } = useTranslation();
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.exams'), href: '#' },
        { title: t('nav.exam_registration'), href: '/exam-registration' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={t('exam.page_title')} />

            <HeroCommon title={t('exam.hero_title')} description={t('exam.hero_description')} backgroundImage="/assets/images/bg/sharp-2.png" />

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Formulaire - 3/4 de largeur */}
                    <div className="w-full lg:w-3/4">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('exam.form_title')}</h2>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('exam.form_description')}</p>
                            </div>

                            <ExamRegistrationForm />
                        </div>
                    </div>

                    {/* Image animée - 1/4 de largeur */}
                    <div className="hidden w-full lg:block lg:w-1/4">
                        <div className="sticky top-24 rounded-lg border border-gray-200 bg-gradient-to-br from-secondary/10 to-accent/10 p-6 shadow-lg dark:border-gray-700">
                            <div className="space-y-6">
                                {/* Animation pulse */}
                                <div className="animate-pulse space-y-4">
                                    <div className="flex items-center justify-center">
                                        <div className="h-24 w-24 rounded-full bg-secondary/20 dark:bg-accent/20"></div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="h-4 rounded bg-secondary/20 dark:bg-accent/20"></div>
                                        <div className="h-4 w-5/6 rounded bg-secondary/20 dark:bg-accent/20"></div>
                                        <div className="h-4 w-4/6 rounded bg-secondary/20 dark:bg-accent/20"></div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('exam.benefits_title')}</h3>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-start gap-2">
                                            <svg className="mt-1 h-4 w-4 flex-shrink-0 text-secondary dark:text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{t('exam.benefit_online')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="mt-1 h-4 w-4 flex-shrink-0 text-secondary dark:text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{t('exam.benefit_international')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="mt-1 h-4 w-4 flex-shrink-0 text-secondary dark:text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{t('exam.benefit_registry')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="mt-1 h-4 w-4 flex-shrink-0 text-secondary dark:text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{t('exam.benefit_support')}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

export default ExamRegistration;
