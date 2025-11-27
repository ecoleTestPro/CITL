import { BenefitsSidebar } from '@/components/common/benefits-sidebar';
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
            <Head>
                <title>{t('seo.exam_registration.title')}</title>
                <meta name="description" content={t('seo.exam_registration.description')} />
                <meta name="keywords" content={t('seo.exam_registration.keywords')} />
                <meta property="og:title" content={t('seo.exam_registration.title')} />
                <meta property="og:description" content={t('seo.exam_registration.description')} />
                <meta property="og:type" content="website" />
            </Head>

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

                    {/* Sidebar avec avantages et bannière */}
                    <BenefitsSidebar
                        title={t('exam.benefits_title')}
                        benefits={[
                            { text: t('exam.benefit_online') },
                            { text: t('exam.benefit_international') },
                            { text: t('exam.benefit_registry') },
                            { text: t('exam.benefit_support') },
                        ]}
                        adBanner={{
                            imageSrc: '/assets/images/ads/ads-1.jpg',
                            imageAlt: 'Certification ISTQB',
                            title: 'Devenez certifié ISTQB',
                            href: '/certifications',
                        }}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}

export default ExamRegistration;
