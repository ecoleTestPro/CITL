import AboutOverview from '@/components/blocks/about/about-overview';
import DomainsGrid from '@/components/blocks/about/domains-grid';
import HeroCommon from '@/components/common/common-hero';
import { useImage } from '@/hooks/use-image';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function WorkingGroups() {
    const { t, ready } = useTranslation();
    const overviewImage = useImage('membership.working_groups', 'overview', '/assets/images/about/about-03.jpg');

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.membership'), href: '#' },
        { title: t('nav.working_groups'), href: '/working-groups' },
    ];

    // Fallback values for translations
    const pageTitle = ready ? t('nav.working_groups') : 'Working Groups';
    const metaDescription = ready ? t('working_groups.hero_description') : '';

    // Overview items
    const overviewItems = [
        { text: t('working_groups.overview_item_1') },
        { text: t('working_groups.overview_item_2') },
        { text: t('working_groups.overview_item_3') },
    ];

    // Domains (14 items)
    const domains = [
        { text: t('working_groups.domain_1') },
        { text: t('working_groups.domain_2') },
        { text: t('working_groups.domain_3') },
        { text: t('working_groups.domain_4') },
        { text: t('working_groups.domain_5') },
        { text: t('working_groups.domain_6') },
        { text: t('working_groups.domain_7') },
        { text: t('working_groups.domain_8') },
        { text: t('working_groups.domain_9') },
        { text: t('working_groups.domain_10') },
        { text: t('working_groups.domain_11') },
        { text: t('working_groups.domain_12') },
        { text: t('working_groups.domain_13') },
        { text: t('working_groups.domain_14') },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={`${pageTitle} | CITL`}>{metaDescription && <meta name="description" content={metaDescription} />}</Head>

            {/* Hero Section */}
            <HeroCommon badge={t('nav.membership')} title={t('working_groups.hero_title')} description={t('working_groups.hero_description')} />

            {/* About Overview Section */}
            <AboutOverview
                title={t('working_groups.overview_title')}
                description={t('working_groups.overview_description')}
                learnTitle={t('working_groups.learn_title')}
                items={overviewItems}
                imageSrc={overviewImage}
                imageAlt={t('working_groups.hero_title')}
            />

            {/* Domains Grid Section */}
            <DomainsGrid
                title={t('working_groups.domains_title')}
                domains={domains}
                conclusion={t('working_groups.conclusion')}
                ctaText={t('working_groups.cta_text')}
                ctaLink="/contact"
            />
        </PublicLayout>
    );
}

export default WorkingGroups;
