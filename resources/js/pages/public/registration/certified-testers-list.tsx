import { BenefitsSidebar } from '@/components/common/benefits-sidebar';
import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import { useImage } from '@/hooks/use-image';
import { AccreditedOrganizationSearchForm } from '@/components/registration/accredited-organization-search-form';
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
        { title: t('nav.accredited_organizations'), href: '/certified-testers-list' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('accredited_organizations_search.page_title')} | CITL`} />

            <HeroCommon
                badge={t('accredited_organizations_search.hero_badge')}
                title={t('accredited_organizations_search.hero_title')}
                description={t('accredited_organizations_search.hero_description')}
                backgroundImage={bgSharp2}
            />

            {/* Introduction Section */}
            <CommonTextBlock description={`<p>${t('accredited_organizations_search.intro_paragraph_1')}</p>`} />

            {/* Search Section with Sidebar */}
            <section className="bg-white py-16 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Main Content - 3/4 width */}
                        <div className="w-full lg:w-3/4">
                            <AccreditedOrganizationSearchForm />
                        </div>

                        {/* Sidebar - 1/4 width */}
                        <BenefitsSidebar
                            title={t('accredited_organizations_search.sidebar_title')}
                            benefits={[
                                { text: t('accredited_organizations_search.benefit_1') },
                                { text: t('accredited_organizations_search.benefit_2') },
                                { text: t('accredited_organizations_search.benefit_3') },
                                { text: t('accredited_organizations_search.benefit_4') },
                            ]}
                            adBanner={{
                                imageSrc: adsBanner,
                                imageAlt: 'Certification ISTQB',
                                title: t('accredited_organizations_search.sidebar_title'),
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
