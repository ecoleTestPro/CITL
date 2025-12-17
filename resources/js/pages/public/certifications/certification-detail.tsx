import { CertificationContentSection } from '@/components/certifications/certification-content-section';
import { CertificationError } from '@/components/certifications/certification-error';
import {
    AdditionalInformationFallback,
    AudienceFallback,
    BusinessOutcomesFallback,
    ExamStructureFallback,
    TrainingContentFallback,
} from '@/components/certifications/certification-fallback-content';
import { CertificationLoading } from '@/components/certifications/certification-loading';
import { CertificationSidebar } from '@/components/certifications/certification-sidebar';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { Certification } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
    slug: string;
}

function CertificationDetail({ slug }: Props) {
    const [certification, setCertification] = useState<Certification | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/certifications/${slug}`);
                setCertification(response.data.data);
                setError(null);
            } catch (err) {
                setError('Impossible de charger les détails de la certification');
                console.error('Error fetching certification:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCertification();
    }, [slug]);

    if (loading) {
        return <CertificationLoading />;
    }

    if (error || !certification) {
        return <CertificationError error={error} />;
    }

    const breadcrumbs = [
        { title: 'Accueil', href: '/' },
        { title: 'Certifications', href: '/why-certification' },
        { title: certification.category.name, href: `/${certification.category.slug}` },
        { title: certification.title_fr, href: '' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{`${certification.title_fr} - CITL`}</title>
                <meta
                    name="description"
                    content={certification.description_fr || `Certification ${certification.title_fr} disponible en Côte d'Ivoire avec le CITL.`}
                />
                <meta name="keywords" content={`${certification.title_fr}, ISTQB, certification, CITL, test logiciel`} />
                <meta property="og:title" content={`${certification.title_fr} - CITL`} />
                <meta
                    property="og:description"
                    content={certification.description_fr || `Certification ${certification.title_fr} disponible en Côte d'Ivoire avec le CITL.`}
                />
                <meta property="og:type" content="website" />
            </Head>

            {/* Hero Section */}
            <HeroCommon
                badge={certification.category.name}
                title={certification.title_fr}
                description={certification.subtitle_fr || certification.description_fr}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            {/* Main Content Section */}
            <section className="pt-12 pb-24 sm:pt-16 md:pt-20 md:pb-36 lg:pb-44">
                <div className="container mx-auto">
                    <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-[72px]">
                        {/* Left Column - Main Content */}
                        <div className="w-full max-w-full lg:max-w-[767px]">
                            <div className="services-details-content mb-[72px] space-y-12">
                                {/* Overview Section */}
                                <CertificationContentSection
                                    id="overview"
                                    title="Vue d'ensemble"
                                    delay={0.3}
                                    richContent={certification.overview_fr}
                                    fallbackContent={<p className="text-gray-700 dark:text-gray-300">{certification.description_fr}</p>}
                                />

                                {/* Audience Section */}
                                <CertificationContentSection
                                    id="audience"
                                    title="Public cible"
                                    delay={0.4}
                                    richContent={certification.target_audience_fr}
                                    fallbackContent={<AudienceFallback />}
                                />

                                {/* Training Content Section */}
                                <CertificationContentSection
                                    id="content"
                                    title="Contenu de la formation"
                                    delay={0.5}
                                    richContent={certification.training_content_fr}
                                    fallbackContent={<TrainingContentFallback />}
                                />

                                {/* Exam Structure Section */}
                                {false && certification && (
                                    <CertificationContentSection
                                        id="exam-structure"
                                        title="Structure de l'examen"
                                        delay={0.6}
                                        richContent={certification.exam_structure_details_fr}
                                        fallbackContent={
                                            <ExamStructureFallback
                                                examQuestions={certification.exam_questions}
                                                examDuration={certification.exam_duration}
                                                examPassingScore={certification.exam_passing_score}
                                                examTotalPoints={certification.exam_total_points}
                                            />
                                        }
                                    />
                                )}

                                {/* Business Outcomes Section */}
                                <CertificationContentSection
                                    id="business-outcomes"
                                    title="Bénéfices professionnels"
                                    delay={0.7}
                                    richContent={certification.business_outcomes_fr}
                                    fallbackContent={<BusinessOutcomesFallback />}
                                />

                                {/* Additional Information Section */}
                                <CertificationContentSection
                                    id="more-information"
                                    title="Informations complémentaires"
                                    delay={0.8}
                                    richContent={certification.additional_information_fr}
                                    fallbackContent={<AdditionalInformationFallback />}
                                />
                            </div>
                        </div>

                        {/* Right Column - Sticky Sidebar */}
                        <CertificationSidebar certification={certification} />
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default CertificationDetail;
