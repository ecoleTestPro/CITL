import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function AccreditedOrganizations() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            {/* <Head>
                <title>{t('nav.accredited_organizations')} | CITL</title>
            </Head> */}
            <div className="container mx-auto px-4 py-16">
                <h1 className="mb-6 text-4xl font-bold">Organismes accrédités par le CITL</h1>
                <p className="text-muted-foreground">Contenu de la page Organismes accrédités par le CITL - À développer prochainement.</p>
            </div>
        </PublicLayout>
    );
}

export default AccreditedOrganizations;
