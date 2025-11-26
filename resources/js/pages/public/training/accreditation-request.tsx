import { BenefitsSidebar } from '@/components/common/benefits-sidebar';
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
            <Head>
                <title>{t('seo.accreditation.title')}</title>
                <meta name="description" content={t('seo.accreditation.description')} />
                <meta name="keywords" content={t('seo.accreditation.keywords')} />
                <meta property="og:title" content={t('seo.accreditation.title')} />
                <meta property="og:description" content={t('seo.accreditation.description')} />
                <meta property="og:type" content="website" />
            </Head>

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
                        <BenefitsSidebar
                            title={t('training.process_title')}
                            benefits={[
                                { text: t('training.process_step_1') },
                                { text: t('training.process_step_2') },
                                { text: t('training.process_step_3') },
                                { text: t('training.process_step_4') },
                            ]}
                            adBanner={{
                                imageSrc: '/assets/images/ads/ads-2.jpg',
                                imageAlt: 'Accréditation CITL',
                                title: 'Devenez organisme accrédité',
                                href: '/accredited-organizations',
                            }}
                        />
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default AccreditationRequest;
