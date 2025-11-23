import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import HeroCommon from '@/components/common/common-hero';
import { AccreditationRequestForm } from '@/components/training/accreditation-request-form';
import PublicLayout from '@/layouts/public/public-layout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function AccreditationRequest() {
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
        { title: t('nav.training'), href: '#' },
        { title: t('nav.accreditation_request'), href: '/accreditation-request' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={t('training.page_title')} />

            <HeroCommon
                badge={t('training.hero_badge')}
                title={t('training.hero_title')}
                description={t('training.hero_description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            {/* Application Form Section */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Form - 3/4 width */}
                        <div className="w-full lg:w-3/4">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('training.form_title')}</h2>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('training.form_description')}</p>
                                </div>

                                <AccreditationRequestForm />
                            </div>
                        </div>

                        {/* Sidebar - 1/4 width */}
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
                                        <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('training.process_title')}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('training.process_description')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <div className="bg-white dark:bg-gray-500/20">
                <AboutBlockOne
                    title={t('training.process_title')}
                    description={t('training.process_description')}
                    items={[
                        { text: t('training.process_step_1') },
                        { text: t('training.process_step_2') },
                        { text: t('training.process_step_3') },
                        { text: t('training.process_step_4') },
                    ]}
                    imageSrc="/assets/images/pages/certification/accreditation-process.png"
                    imageAlt="Processus d'accréditation CITL"
                />
            </div>
        </PublicLayout>
    );
}

export default AccreditationRequest;
