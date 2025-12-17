import CertificationList from '@/components/blocks/certifications/certification-list';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { Certification, CertificationCategory } from '@/types';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface Props {
    category: CertificationCategory;
    certifications: Certification[];
    categories: CertificationCategory[];
}

function ExpertLevel({ category, certifications, categories }: Props) {
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    // Get localized category fields
    const categoryName = (isEnglish && category.name_en) || category.name_fr;
    const categoryDescription = (isEnglish && category.description_en) || category.description_fr;

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.expert_level'), href: '/expert-level' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.expert_level.title')}</title>
                <meta name="description" content={t('seo.expert_level.description')} />
                <meta name="keywords" content={t('seo.expert_level.keywords')} />
                <meta property="og:title" content={t('seo.expert_level.title')} />
                <meta property="og:description" content={t('seo.expert_level.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <HeroCommon
                badge={t('nav.certifications')}
                title={categoryName}
                description={categoryDescription || ''}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CertificationList certifications={certifications} categories={categories} categorySlug="expert-level" />
        </PublicLayout>
    );
}

export default ExpertLevel;
