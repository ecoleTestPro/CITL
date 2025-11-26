import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function CertifiedTestersList() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Head>
                <title>{t('nav.certified_testers_list')} | CITL</title>
                <meta name="description" content="Consultez la liste officielle des testeurs logiciels certifiés ISTQB en Côte d'Ivoire." />
                <meta name="keywords" content="testeurs certifiés, liste officielle, ISTQB, Côte d'Ivoire, CITL" />
                <meta property="og:title" content={`${t('nav.certified_testers_list')} | CITL`} />
                <meta property="og:description" content="Consultez la liste officielle des testeurs logiciels certifiés ISTQB en Côte d'Ivoire." />
                <meta property="og:type" content="website" />
            </Head>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">Liste officielle ivoirienne des testeurs logiciels certifiés</h1>
                <p className="text-muted-foreground">
                    Contenu de la page Liste officielle ivoirienne des testeurs logiciels certifiés - À développer prochainement.
                </p>
            </div>
        </PublicLayout>
    );
}

export default CertifiedTestersList;
