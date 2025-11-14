import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { CraftRenderer } from '@/components/cms/CraftRenderer';

interface CmsPage {
    id: number;
    title: string;
    slug: string;
    content: Record<string, any> | null;
    seo_title: string | null;
    seo_description: string | null;
    page_type: string;
}

interface PageViewProps {
    page: CmsPage;
}

/**
 * Public page view component for displaying CMS pages
 * Accessed via /p/{slug} routes (e.g., /p/about-us, /p/contact)
 */
export default function PageView({ page }: PageViewProps) {
    const seoTitle = page.seo_title || page.title;
    const seoDescription = page.seo_description || '';

    return (
        <PublicLayout>
            <Head title={seoTitle}>
                {seoDescription && (
                    <meta name="description" content={seoDescription} />
                )}
            </Head>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {page.content ? (
                    <CraftRenderer content={page.content} />
                ) : (
                    <article className="prose prose-lg mx-auto max-w-none">
                        <h1 className="mb-8 text-4xl font-bold text-gray-900">
                            {page.title}
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
