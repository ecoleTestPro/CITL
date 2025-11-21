import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function WhyCertification() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.why_certification'), href: '/why-certification' },
    ];

    const contentDescription = [
        {
            titlre: t('certifications.why_certification.program_quality_title'),
            text: t('certifications.why_certification.program_quality_text'),
        },
        {
            titlre: t('certifications.why_certification.worldwide_recognition_title'),
            text: t('certifications.why_certification.worldwide_recognition_text'),
        },
        {
            titlre: t('certifications.why_certification.common_language_title'),
            text: t('certifications.why_certification.common_language_text'),
        },
        {
            titlre: t('certifications.why_certification.public_access_title'),
            text: t('certifications.why_certification.public_access_text'),
        },
        {
            titlre: t('certifications.why_certification.continuous_improvement_title'),
            text: t('certifications.why_certification.continuous_improvement_text'),
        },
        {
            titlre: t('certifications.why_certification.professional_credibility_title'),
            text: t('certifications.why_certification.professional_credibility_text'),
        },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <HeroCommon
                badge={t('certifications.why_certification.badge')}
                title={t('certifications.why_certification.hero_title')}
                description={t('certifications.why_certification.hero_description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CommonTextBlock
                title={t('certifications.why_certification.content_title')}
                description={contentDescription}
            />
        </PublicLayout>
    );
}

export default WhyCertification;
