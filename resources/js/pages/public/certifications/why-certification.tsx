import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import BenefitsOfCertifications from '@/components/blocks/certifications/benefits-of-certifications';
import CertificationListGrouped from '@/components/blocks/certifications/certification-list-grouped';
import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import PublicLayout from '@/layouts/public/public-layout';
import { CertificationCategory } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function WhyCertification() {
    const { t } = useTranslation();
    const [categories, setCategories] = useState<CertificationCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                setLoading(true);
                const response = await axios.get<{ success: boolean; data: CertificationCategory[] }>('/api/certifications');
                setCategories(response.data.data);
            } catch (err) {
                console.error('Error fetching certifications:', err);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.why_certification'), href: '/why-certification' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.why_certification.title')}</title>
                <meta name="description" content={t('seo.why_certification.description')} />
                <meta name="keywords" content={t('seo.why_certification.keywords')} />
                <meta property="og:title" content={t('seo.why_certification.title')} />
                <meta property="og:description" content={t('seo.why_certification.description')} />
                <meta property="og:type" content="website" />
            </Head>
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

            {loading ? (
                <section className="relative overflow-hidden py-12">
                    <div className="container mx-auto">
                        <div className="flex min-h-[200px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
                                <p className="animate-pulse text-gray-600 dark:text-gray-400">Chargement des certifications...</p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <CertificationListGrouped categories={categories} />
            )}
        </PublicLayout>
    );
}

export default WhyCertification;
