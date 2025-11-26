import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function AccreditedOrganizations() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Head>
                <title>{t('nav.accredited_organizations')} | CITL</title>
                <meta name="description" content="Liste des organismes de formation accrédités par le CITL pour les certifications ISTQB en Côte d'Ivoire." />
                <meta name="keywords" content="organismes accrédités, formation ISTQB, CITL, certification" />
                <meta property="og:title" content={`${t('nav.accredited_organizations')} | CITL`} />
                <meta
                    property="og:description"
                    content="Liste des organismes de formation accrédités par le CITL pour les certifications ISTQB en Côte d'Ivoire."
                />
                <meta property="og:type" content="website" />
            </Head>
            <div className="container mx-auto px-4 py-16">
                <h1 className="mb-6 text-4xl font-bold">Organismes accrédités par le CITL</h1>
                <p className="text-muted-foreground">Contenu de la page Organismes accrédités par le CITL - À développer prochainement.</p>
            </div>
        </PublicLayout>
    );
}

export default AccreditedOrganizations;
