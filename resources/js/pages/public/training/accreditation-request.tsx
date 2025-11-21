import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function AccreditationRequest() {
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

            <AboutBlockOne
                title="Procédure d'accréditation d'une formation"
                description="La procédure d'accréditation d'une formation par le CITL est un processus rigoureux et structuré, impliquant plusieurs acteurs clés :"
                items={[
                    { text: "Notre partenaire GASQ : organisme certifieur reconnu par l'ISTQB®, responsable de la gestion des aspects contractuels." },
                    { text: "Le panel d'experts : chargé de valider le contenu pédagogique conformément aux recommandations de l'ISTQB®." },
                    { text: "Le bureau du CITL : qui supervise et coordonne l'ensemble du processus d'accréditation." },
                    { text: "L'organisme de formation" }
                ]}
                imageSrc="/assets/images/pages/certification/accreditation-process.png"
                imageAlt="Processus d'accréditation CITL"
            />
        </PublicLayout>
    );
}

export default AccreditationRequest;
