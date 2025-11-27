import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function A4qPracticalTester() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Head>
                <title>{t('nav.a4q_practical_tester')} | CITL</title>
                <meta name="description" content="Certification A4Q Testeur Pratique disponible en Côte d'Ivoire avec le CITL." />
                <meta name="keywords" content="A4Q, testeur pratique, certification, CITL" />
                <meta property="og:title" content={`${t('nav.a4q_practical_tester')} | CITL`} />
                <meta property="og:description" content="Certification A4Q Testeur Pratique disponible en Côte d'Ivoire avec le CITL." />
                <meta property="og:type" content="website" />
            </Head>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">A4Q - Testeur Pratique</h1>
                <p className="text-muted-foreground">
                    Contenu de la page A4Q - Testeur Pratique - À développer prochainement.
                </p>
            </div>
        </PublicLayout>
    );
}

export default A4qPracticalTester;
