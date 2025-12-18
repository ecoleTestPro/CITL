import { OrganizationsListSection } from '@/components/accredited-organizations/organizations-list-section';
import AboutOverview from '@/components/blocks/about/about-overview';
import HeroCommon from '@/components/common/common-hero';
import { useImage } from '@/hooks/use-image';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function AccreditedOrganizations() {
    const { t, ready } = useTranslation();
    const adsBanner2 = useImage('global', 'ads_2', '/assets/images/ads/ads-2.jpg');

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.training'), href: '#' },
        { title: t('nav.accredited_organizations'), href: '/accredited-organizations' },
    ];

    // Fallback values for translations
    const pageTitle = ready ? t('nav.accredited_organizations') : 'Accredited Organizations';
    const metaDescription = ready ? t('training.accredited_organizations_description') : '';

    // Overview items
    const overviewItems = [{ text: t('training.overview_item_1') }, { text: t('training.overview_item_2') }, { text: t('training.overview_item_3') }];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={`${pageTitle} | CITL`}>{metaDescription && <meta name="description" content={metaDescription} />}</Head>

            {/* Hero Section */}
            <HeroCommon
                badge={t('training.training_providers')}
                title={t('training.accredited_organizations_title')}
                description={t('training.accredited_organizations_subtitle')}
            />
            
            {/* Organizations List Section */}
            <OrganizationsListSection />

            {/* About Overview Section */}
            <AboutOverview
                title={t('training.accreditation_overview_title')}
                description={t('training.accreditation_overview_description')}
                learnTitle={t('training.accreditation_learn_title')}
                items={overviewItems}
                imageSrc={adsBanner2}
                imageAlt={t('training.accredited_organizations_title')}
            />
        </PublicLayout>
    );
}

export default AccreditedOrganizations;
