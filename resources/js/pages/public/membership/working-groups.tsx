import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function WorkingGroups() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            {false && (
                <Head>
                    <title>{t('nav.working_groups')} | CITL</title>
                    <meta name="description" content="Découvrez les groupes de travail du CITL dédiés au développement du test logiciel en Côte d'Ivoire." />
                    <meta name="keywords" content="groupes de travail, CITL, test logiciel, ISTQB" />
                    <meta property="og:title" content={`${t('nav.working_groups')} | CITL`} />
                    <meta
                        property="og:description"
                        content="Découvrez les groupes de travail du CITL dédiés au développement du test logiciel en Côte d'Ivoire."
                    />
                    <meta property="og:type" content="website" />
                </Head>
            )}
            <div className="container mx-auto px-4 py-16">
                <h1 className="mb-6 text-4xl font-bold">Les groupes de travail</h1>
                <p className="text-muted-foreground">Contenu de la page Les groupes de travail - À développer prochainement.</p>
            </div>
        </PublicLayout>
    );
}

export default WorkingGroups;
