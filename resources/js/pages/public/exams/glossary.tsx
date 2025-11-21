import GlossaryBlock from '@/components/blocks/glossary/glossary-block';
import PublicLayout from '@/layouts/public/public-layout';

function Glossary() {
    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-16">
                <h1 className="mb-6 text-4xl font-bold">Glossaire</h1>
                <p className="text-muted-foreground">Contenu de la page Glossaire - À développer prochainement.</p>
            </div>
            <GlossaryBlock />
        </PublicLayout>
    );
}

export default Glossary;
