import PublicLayout from '@/layouts/public/public-layout';

function AboutCitl() {
    const breadcrumbs = [
        { title: 'Accueil', href: '/' },
        { title: 'CITL', href: '#' },
        { title: 'À propos du CITL', href: '/about-citl' },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <div className="container mx-auto px-4 py-16">
                <h1 className="mb-6 text-4xl font-bold">À propos du CITL</h1>
                <p className="text-muted-foreground">Contenu de la page À propos du CITL - À développer prochainement.</p>
            </div>
        </PublicLayout>
    );
}

export default AboutCitl;
