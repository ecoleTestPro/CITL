import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function AntiPiracy() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.anti_piracy'), href: '/anti-piracy' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <HeroCommon
                badge="Protection ISTQB®"
                title="Avertissement contre la contrefaçon"
                description="Le CITL et l'ISTQB® luttent activement contre la contrefaçon des certifications. Découvrez pourquoi l'authenticité de votre certification est cruciale pour votre carrière professionnelle."
            />

            <CommonTextBlock
                image={{ src: '/assets/images/pages/certification/shield.png', alt: 'Protection Shield', width: 300 }}
                title="La valeur de l'authenticité"
                description="Une certification ISTQB® authentique représente des mois d'étude intensive, de formation professionnelle et de validation d'expertise. La contrefaçon porte atteinte non seulement à la valeur de votre investissement personnel, mais aussi à l'intégrité de toute la communauté du testing logiciel."
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

            <div className="bg-white dark:bg-gray-500/20">
                <AboutBlockOne
                    title="Comment vérifier l'authenticité"
                    description="Le CITL met à votre disposition plusieurs moyens de vérifier l'authenticité des certifications ISTQB® et de signaler les cas de contrefaçon."
                    subtitle="Vérification en ligne"
                    subtitleContent="Utilisez notre outil de vérification en ligne pour confirmer l'authenticité d'une certification en entrant le numéro de certificat et les informations du titulaire."
                    items={[
                        { text: 'Accès gratuit au vérificateur ISTQB® officiel' },
                        { text: 'Vérification instantanée des certificats' },
                        { text: 'Base de données mondiale des certifications valides' },
                        { text: 'Protection contre la falsification numérique' },
                    ]}
                    imageSrc="/assets/images/pages/certification/verification-tool.png"
                    imageAlt="Online Verification Tool"
                />
            </div>
        </PublicLayout>
    );
}

export default AntiPiracy;
