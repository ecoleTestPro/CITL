import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function IstqbRegistry() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Head>
                <title>{t('nav.istqb_registry')} | CITL</title>
                <meta name="description" content="Accédez au registre international des testeurs ISTQB certifiés via le CITL." />
                <meta name="keywords" content="registre ISTQB, testeurs certifiés, certification internationale, CITL" />
                <meta property="og:title" content={`${t('nav.istqb_registry')} | CITL`} />
                <meta property="og:description" content="Accédez au registre international des testeurs ISTQB certifiés via le CITL." />
                <meta property="og:type" content="website" />
            </Head>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">Registre des testeurs ISTQB certifiés</h1>
                <p className="text-muted-foreground">
                    Contenu de la page Registre des testeurs ISTQB certifiés - À développer prochainement.
                </p>
            </div>
        </PublicLayout>
    );
}

export default IstqbRegistry;
