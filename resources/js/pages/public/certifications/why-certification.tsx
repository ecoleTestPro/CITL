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

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <HeroCommon
                badge={t('certifications.why_certification.badge')}
                title={t('certifications.why_certification.hero_title')}
                description={t('certifications.why_certification.hero_description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CommonTextBlock
                image={{ src: '/assets/images/pages/certification/istqb.png', alt: 'ISTQB Logo', width: 300 }}
                title={t('certifications.why_certification.content_title')}
                description={t('certifications.why_certification.content_description')}
            />
        </PublicLayout>
    );
}

export default WhyCertification;
