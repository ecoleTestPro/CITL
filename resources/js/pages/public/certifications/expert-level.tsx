import CertificationList from '@/components/blocks/certifications/certification-list';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { Certification, CertificationCategory } from '@/types';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface Props {
    category: CertificationCategory;
    certifications: Certification[];
}

function ExpertLevel({ category, certifications }: Props) {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.expert_level'), href: '/expert-level' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.expert_level.title_fr')}</title>
                <meta name="description" content={t('seo.expert_level.description_fr')} />
                <meta name="keywords" content={t('seo.expert_level.keywords')} />
                <meta property="og:title" content={t('seo.expert_level.title_fr')} />
                <meta property="og:description" content={t('seo.expert_level.description_fr')} />
                <meta property="og:type" content="website" />
            </Head>
            <HeroCommon
                badge={t('nav.certifications')}
                title={category.name}
                description={category.description || t('certifications.expert_level.hero_description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CertificationList certifications={certifications} categorySlug="expert-level" />
        </PublicLayout>
    );
}

export default ExpertLevel;
