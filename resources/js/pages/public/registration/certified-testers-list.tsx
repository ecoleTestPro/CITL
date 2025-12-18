import { BenefitsSidebar } from '@/components/common/benefits-sidebar';
import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import { useImage } from '@/hooks/use-image';
import { CertifiedTesterSearchForm } from '@/components/registration/certified-tester-search-form';
import PublicLayout from '@/layouts/public/public-layout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function CertifiedTestersList() {
    const { t } = useTranslation();
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
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
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('certified_testers_list.page_title')} | CITL`} />

            <HeroCommon
                badge={t('certified_testers_list.hero_badge')}
                title={t('certified_testers_list.hero_title')}
                description={t('certified_testers_list.hero_description')}
                backgroundImage={bgSharp2}
            />

            {/* Introduction Section */}
            <CommonTextBlock description={`<p>${t('certified_testers_list.intro_paragraph_1')}</p>`} />

            {/* Search Section with Sidebar */}
            <section className="bg-white py-16 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Main Content - 3/4 width */}
                        <div className="w-full lg:w-3/4">
                            <CertifiedTesterSearchForm />
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

export default CertifiedTestersList;
