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

function CoreFoundation({ category, certifications }: Props) {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.core_foundation'), href: '/core-foundation' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.core_foundation.title')}</title>
                <meta name="description" content={t('seo.core_foundation.description')} />
                <meta name="keywords" content={t('seo.core_foundation.keywords')} />
                <meta property="og:title" content={t('seo.core_foundation.title')} />
                <meta property="og:description" content={t('seo.core_foundation.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <HeroCommon
                badge={t('nav.certifications')}
                title={category.name}
                description={category.description || t('certifications.core_foundation.hero_description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CertificationList certifications={certifications} categorySlug="core-foundation" />
        </PublicLayout>
    );
}

export default CoreFoundation;
