import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { CraftRenderer } from '@/components/cms/CraftRenderer';

interface CmsHomepage {
    id: number;
    title: string;
    slug: string;
    content: Record<string, any> | null;
    seo_title: string | null;
    seo_description: string | null;
}

interface HomeProps {
    cmsHomepage: CmsHomepage | null;
}

export default function Home({ cmsHomepage }: HomeProps) {
    // If CMS homepage is set, render it
    if (cmsHomepage) {
        const seoTitle = cmsHomepage.seo_title || cmsHomepage.title;
        const seoDescription = cmsHomepage.seo_description || '';

        return (
            <PublicLayout>
                <Head title={seoTitle}>
                    {seoDescription && (
                        <meta name="description" content={seoDescription} />
                    )}
                </Head>

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {cmsHomepage.content ? (
                        <CraftRenderer content={cmsHomepage.content} />
                    ) : (
                        <article className="prose prose-lg mx-auto max-w-none">
                            <h1 className="mb-8 text-4xl font-bold text-gray-900">
                                {cmsHomepage.title}
                            </h1>
                            <p className="text-gray-500">
                                Cette page n'a pas encore de contenu.
                            </p>
                        </article>
                    )}
                </div>
            </PublicLayout>
        );
    }

    // Otherwise, render the default static homepage
    return (
        <PublicLayout>
            <Head title="Accueil - CITL" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-4xl font-bold text-gray-900">
                    Bienvenue sur CITL
                </h1>
                <p className="text-lg text-gray-600">
                    Plateforme de formation et de certification
                </p>
            </div>
        </PublicLayout>
    );
}
