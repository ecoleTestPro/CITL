import PublicLayout from '@/layouts/public/public-layout';

function AboutIstqb() {
    const breadcrumbs = [
        { title: 'Accueil', href: '/' },
        { title: 'CITL', href: '#' },
        { title: "À propos de l'ISTQB", href: '/about-istqb' },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">À propos de l'ISTQB</h1>
                <p className="text-muted-foreground">
                    Contenu de la page À propos de l'ISTQB - À développer prochainement.
                </p>
            </div>
        </PublicLayout>
    );
}

export default AboutIstqb;
