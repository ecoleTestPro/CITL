import { BenefitsSidebar } from '@/components/common/benefits-sidebar';
import HeroCommon from '@/components/common/common-hero';
import { CertifiedTesterRegistrationForm } from '@/components/registration/certified-tester-registration-form';
import { useImage } from '@/hooks/use-image';
import PublicLayout from '@/layouts/public/public-layout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function RegisterCertifiedTesters() {
    const { t } = useTranslation();
    const { flash } = usePage().props as any;
    const bgSharp2 = useImage('global', 'bg_sharp_2', '/assets/images/bg/sharp-2.png');
    const adsBanner = useImage('global', 'ads_1', '/assets/images/ads/ads-1.jpg');

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
        { title: t('nav.registration'), href: '#' },
        { title: t('nav.certified_testers_list'), href: '/certified-testers-list' },
    ];

    return (
        <PublicLayout>
            {/* <Head>
                <title>{t('nav.register_certified_testers')} | CITL</title>
                <meta name="description" content="Inscrivez-vous sur la liste officielle des testeurs certifiés ISTQB en Côte d'Ivoire." />
                <meta name="keywords" content="inscription, testeurs certifiés, liste officielle, ISTQB, CITL" />
                <meta property="og:title" content={`${t('nav.register_certified_testers')} | CITL`} />
                <meta property="og:description" content="Inscrivez-vous sur la liste officielle des testeurs certifiés ISTQB en Côte d'Ivoire." />
                <meta property="og:type" content="website" />
            </Head> */}
            <HeroCommon
                badge={t('certified_tester_registration.hero_badge')}
                title={t('certified_tester_registration.hero_title')}
                description={t('certified_tester_registration.hero_description')}
                backgroundImage={bgSharp2}
            />

            {/* Form Section */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Form - 3/4 width */}
                        <div className="w-full lg:w-3/4">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('certified_tester_registration.form_title')}</h2>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('certified_tester_registration.form_description')}</p>
                                </div>

                                <CertifiedTesterRegistrationForm />
                            </div>
                        </div>

                        {/* Sidebar - 1/4 width */}
                        <BenefitsSidebar
                            title={t('certified_tester_registration.sidebar_title')}
                            benefits={[
                                { text: t('certified_tester_registration.benefit_1') },
                                { text: t('certified_tester_registration.benefit_2') },
                                { text: t('certified_tester_registration.benefit_3') },
                                { text: t('certified_tester_registration.benefit_4') },
                            ]}
                            adBanner={{
                                imageSrc: adsBanner,
                                imageAlt: 'Certification ISTQB',
                                title: 'Passez votre certification ISTQB',
                                href: '/exam-registration',
                            }}
                        />
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default RegisterCertifiedTesters;
