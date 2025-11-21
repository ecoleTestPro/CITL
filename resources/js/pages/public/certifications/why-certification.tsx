import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import BenefitsOfCertifications from '@/components/blocks/certifications/benefits-of-certifications';
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
                backgroundColor="#f8fafc"
                backgroundShapes={[
                    {
                        src: '/assets/images/bg/sharp-1.png',
                        position: 'top-right',
                        opacity: 0.05,
                    },
                    {
                        src: '/assets/images/bg/sharp-2.png',
                        position: 'bottom-left',
                        opacity: 0.03,
                    },
                ]}
            />

            <BenefitsOfCertifications
                badge={t('certifications.why_certification.benefits_badge')}
                title={t('certifications.why_certification.benefits_title')}
                subtitle={t('certifications.why_certification.benefits_subtitle')}
                benefits={[
                    {
                        type: 'large',
                        title: t('certifications.why_certification.benefit_1_title'),
                        description: t('certifications.why_certification.benefit_1_description'),
                        image: '/assets/images/pages/certification/benefit-1.jpg',
                        imageAlt: 'Career Advancement',
                        link: '/certifications',
                    },
                    {
                        type: 'medium',
                        title: t('certifications.why_certification.benefit_2_title'),
                        description: t('certifications.why_certification.benefit_2_description'),
                        image: '/assets/images/pages/certification/benefit-2.jpg',
                        imageAlt: 'Industry Recognition',
                    },
                    {
                        type: 'medium',
                        title: t('certifications.why_certification.benefit_3_title'),
                        description: t('certifications.why_certification.benefit_3_description'),
                        image: '/assets/images/pages/certification/benefit-3.jpg',
                        imageAlt: 'Professional Network',
                    },
                ]}
            />

            <div className="bg-white dark:bg-gray-500/20">
                <AboutBlockOne
                    title={t('certifications.why_certification.certification_scheme_title')}
                    description={t('certifications.why_certification.certification_scheme_description')}
                    subtitle={t('certifications.why_certification.certification_scheme_subtitle')}
                    subtitleContent={t('certifications.why_certification.certification_scheme_content')}
                    items={[
                        { text: t('certifications.why_certification.certification_scheme_level_1') },
                        { text: t('certifications.why_certification.certification_scheme_level_2') },
                        { text: t('certifications.why_certification.certification_scheme_level_3') },
                        { text: t('certifications.why_certification.certification_scheme_level_4') },
                    ]}
                    imageSrc="/assets/images/pages/certification/certification-wheel.png"
                    imageAlt="ISTQB Certification Scheme"
                />

                <AboutBlockOne
                    title={t('certifications.why_certification.exam_organization_title')}
                    description={t('certifications.why_certification.exam_organization_description')}
                    subtitle={t('certifications.why_certification.global_success_title')}
                    subtitleContent={t('certifications.why_certification.global_success_description')}
                    items={[]}
                    imageSrc="/assets/images/pages/certification/exam-success.png"
                    imageAlt="Global Success"
                    imagePosition="left"
                />

                <AboutBlockOne
                    title={t('certifications.why_certification.candidate_sectors_title')}
                    description={t('certifications.why_certification.candidate_sectors_description')}
                    items={[
                        { text: t('certifications.why_certification.sector_1') },
                        { text: t('certifications.why_certification.sector_2') },
                        { text: t('certifications.why_certification.sector_3') },
                        { text: t('certifications.why_certification.sector_4') },
                        { text: t('certifications.why_certification.sector_5') },
                        { text: t('certifications.why_certification.sector_6') },
                        { text: t('certifications.why_certification.sector_7') },
                        { text: t('certifications.why_certification.sector_8') },
                        { text: t('certifications.why_certification.sector_9') },
                        { text: t('certifications.why_certification.sector_10') },
                    ]}
                    videoSrc="/assets/images/pages/certification/industry-sectors.mp4"
                    videoPoster="/assets/images/pages/certification/sectors-poster.jpg"
                />
            </div>
        </PublicLayout>
    );
}

export default WhyCertification;
