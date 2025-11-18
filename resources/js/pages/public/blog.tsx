import PublicLayout from '@/layouts/public/public-layout';

function Blog() {
    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">Blog</h1>
                <p className="text-muted-foreground">
                    Contenu de la page Blog - À développer prochainement.
                </p>
            </div>
        </PublicLayout>
    );
}

export default Blog;
