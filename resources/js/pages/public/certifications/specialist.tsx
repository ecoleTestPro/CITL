import CertificationList from '@/components/blocks/certifications/certification-list';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { Certification, CertificationCategory } from '@/types';
import { useTranslation } from 'react-i18next';

interface Props {
    category: CertificationCategory;
    certifications: Certification[];
}

function Specialist({ category, certifications }: Props) {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.specialist'), href: '/specialist' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <HeroCommon
                badge={t('nav.certifications')}
                title={category.name}
                description={category.description || t('certifications.specialist.hero_description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CertificationList certifications={certifications} categorySlug="specialist" />
        </PublicLayout>
    );
}

export default Specialist;
