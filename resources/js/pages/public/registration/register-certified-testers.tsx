import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function RegisterCertifiedTesters() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            {/* <Head>
                <title>{t('nav.register_certified_testers')} | CITL</title>
                <meta name="description" content="Inscrivez-vous sur la liste officielle des testeurs certifiés ISTQB en Côte d'Ivoire." />
                <meta name="keywords" content="inscription, testeurs certifiés, liste officielle, ISTQB, CITL" />
                <meta property="og:title" content={`${t('nav.register_certified_testers')} | CITL`} />
                <meta property="og:description" content="Inscrivez-vous sur la liste officielle des testeurs certifiés ISTQB en Côte d'Ivoire." />
                <meta property="og:type" content="website" />
            </Head> */}
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">S'inscrire sur la liste officielle</h1>
                <p className="text-muted-foreground">
                    Contenu de la page S'inscrire sur la liste officielle - À développer prochainement.
                </p>
            </div>
        </PublicLayout>
    );
}

export default RegisterCertifiedTesters;
