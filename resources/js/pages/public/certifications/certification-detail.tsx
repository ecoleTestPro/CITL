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
import { Certification, SupportedLanguage } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    slug: string;
}

function CertificationDetail({ slug }: Props) {
    const { i18n } = useTranslation();
    const [certification, setCertification] = useState<Certification | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Détermine la langue courante à partir de i18n
    const currentLanguage: SupportedLanguage = (i18n.language?.startsWith('en') ? 'en' : 'fr') as SupportedLanguage;

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/certifications/${slug}`);
                setCertification(response.data.data);
                setError(null);
            } catch (err) {
                setError(currentLanguage === 'fr' ? 'Impossible de charger les détails de la certification' : 'Unable to load certification details');
                console.error('Error fetching certification:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCertification();
    }, [slug, currentLanguage]);

    if (loading) {
        return <CertificationLoading />;
    }

    if (error || !certification) {
        return <CertificationError error={error} />;
    }

    // Helper pour vérifier si une valeur a du contenu réel (pas null, undefined, ou chaîne vide/HTML vide)
    const hasRealContent = (value: string | null | undefined): boolean => {
        if (!value) return false;
        // Pour le contenu HTML, on retire les balises et on vérifie s'il reste du texte
        const strippedContent = value.replace(/<[^>]*>/g, '').trim();
        return strippedContent.length > 0;
    };

    // Helper pour obtenir le contenu dans la langue courante avec fallback intelligent
    const getLocalizedContent = (field: string): string | null => {
        const localizedKey = `${field}_${currentLanguage}` as keyof Certification;
        const fallbackKey = `${field}_fr` as keyof Certification;

        const localizedValue = certification[localizedKey] as string | null;
        const fallbackValue = certification[fallbackKey] as string | null;

        // Si le contenu localisé existe et a du contenu réel, l'utiliser
        if (hasRealContent(localizedValue)) {
            return localizedValue;
        }
        // Sinon, utiliser le fallback français
        return hasRealContent(fallbackValue) ? fallbackValue : null;
    };

    // Titres et labels localisés
    const labels = {
        overview: currentLanguage === 'fr' ? "Vue d'ensemble" : 'Overview',
        audience: currentLanguage === 'fr' ? 'Public cible' : 'Target Audience',
        trainingContent: currentLanguage === 'fr' ? 'Contenu de la formation' : 'Training Content',
        examStructure: currentLanguage === 'fr' ? "Structure de l'examen" : 'Exam Structure',
        businessOutcomes: currentLanguage === 'fr' ? 'Bénéfices professionnels' : 'Business Outcomes',
        additionalInfo: currentLanguage === 'fr' ? 'Informations complémentaires' : 'Additional Information',
        home: currentLanguage === 'fr' ? 'Accueil' : 'Home',
        certifications: 'Certifications',
    };

    const title = getLocalizedContent('title') || certification.title_fr;
    const subtitle = getLocalizedContent('subtitle');
    const description = getLocalizedContent('description') || certification.description_fr;

    // Helper pour obtenir le nom de catégorie localisé
    const getCategoryName = (): string => {
        const category = certification.category;
        if (currentLanguage === 'en' && category.name_en) {
            return category.name_en;
        }
        return category.name_fr || category.name;
    };

    const categoryName = getCategoryName();

    const breadcrumbs = [
        { title: labels.home, href: '/' },
        { title: labels.certifications, href: '/why-certification' },
        { title: categoryName, href: `/${certification.category.slug}` },
        { title: title, href: '' },
    ];


    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{`${title} - CITL`}</title>
                <meta name="description" content={description || `Certification ${title} disponible en Côte d'Ivoire avec le CITL.`} />
                <meta name="keywords" content={`${title}, ISTQB, certification, CITL, test logiciel`} />
                <meta property="og:title" content={`${title} - CITL`} />
                <meta property="og:description" content={description || `Certification ${title} disponible en Côte d'Ivoire avec le CITL.`} />
                <meta property="og:type" content="website" />
            </Head>

            {/* Hero Section */}
            <HeroCommon
                badge={categoryName}
                title={title}
                description={subtitle || description}
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
                                    title={labels.overview}
                                    delay={0.3}
                                    richContent={getLocalizedContent('overview')}
                                    fallbackContent={<p className="text-gray-700 dark:text-gray-300">{description}</p>}
                                />

                                {/* Audience Section */}
                                <CertificationContentSection
                                    id="audience"
                                    title={labels.audience}
                                    delay={0.4}
                                    richContent={getLocalizedContent('target_audience')}
                                    fallbackContent={<AudienceFallback />}
                                />

                                {/* Training Content Section */}
                                <CertificationContentSection
                                    id="content"
                                    title={labels.trainingContent}
                                    delay={0.5}
                                    richContent={getLocalizedContent('training_content')}
                                    fallbackContent={<TrainingContentFallback />}
                                />

                                {/* Exam Structure Section */}
                                {false && certification && (
                                    <CertificationContentSection
                                        id="exam-structure"
                                        title={labels.examStructure}
                                        delay={0.6}
                                        richContent={getLocalizedContent('exam_structure_details')}
                                        fallbackContent={
                                            <ExamStructureFallback
                                                examQuestions={certification?.exam_questions ?? 0}
                                                examDuration={certification?.exam_duration ?? ''}
                                                examPassingScore={certification?.exam_passing_score ?? 0}
                                                examTotalPoints={certification?.exam_total_points ?? 0}
                                            />
                                        }
                                    />
                                )}

                                {/* Business Outcomes Section */}
                                <CertificationContentSection
                                    id="business-outcomes"
                                    title={labels.businessOutcomes}
                                    delay={0.7}
                                    richContent={getLocalizedContent('business_outcomes')}
                                    fallbackContent={<BusinessOutcomesFallback />}
                                />

                                {/* Additional Information Section */}
                                <CertificationContentSection
                                    id="more-information"
                                    title={labels.additionalInfo}
                                    delay={0.8}
                                    richContent={getLocalizedContent('additional_information')}
                                    fallbackContent={<AdditionalInformationFallback />}
                                />
                            </div>
                        </div>

                        {/* Right Column - Sticky Sidebar */}
                        <CertificationSidebar certification={certification} currentLanguage={currentLanguage} />
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default CertificationDetail;
