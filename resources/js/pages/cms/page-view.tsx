import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

interface Block {
    type: string;
    data: any;
}

interface Page {
    id: number;
    title: string;
    slug: string;
    content: {
        blocks: Block[];
    };
    seo_title: string | null;
    seo_description: string | null;
}

interface Props {
    page: Page;
}

function renderBlock(block: Block, index: number) {
    switch (block.type) {
        case 'header':
            const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
            const headerClasses = {
                1: 'text-4xl font-bold mb-4',
                2: 'text-3xl font-bold mb-3',
                3: 'text-2xl font-semibold mb-2',
                4: 'text-xl font-semibold mb-2',
            };
            return (
                <HeaderTag
                    key={index}
                    className={
                        headerClasses[block.data.level as keyof typeof headerClasses] ||
                        'text-xl font-semibold mb-2'
                    }
                >
                    {block.data.text}
                </HeaderTag>
            );

        case 'paragraph':
            return (
                <p key={index} className="mb-4 leading-relaxed">
                    {block.data.text}
                </p>
            );

        case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
                <ListTag
                    key={index}
                    className={`mb-4 ${
                        block.data.style === 'ordered'
                            ? 'list-decimal'
                            : 'list-disc'
                    } pl-6`}
                >
                    {block.data.items.map((item: string, i: number) => (
                        <li key={i} className="mb-1">
                            {item}
                        </li>
                    ))}
                </ListTag>
            );

        default:
            return null;
    }
}

export default function PageView({ page }: Props) {
    const seoTitle = page.seo_title || page.title;
    const seoDescription = page.seo_description || '';

    return (
        <PublicLayout>
            <Head title={seoTitle}>
                {seoDescription && (
                    <meta name="description" content={seoDescription} />
                )}
            </Head>

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose prose-lg max-w-none">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">
                        {page.title}
                    </h1>

                    <div className="space-y-4 text-gray-700">
                        {page.content?.blocks?.map((block, index) =>
                            renderBlock(block, index),
                        )}
                    </div>

                    {(!page.content?.blocks ||
                        page.content.blocks.length === 0) && (
                        <p className="text-gray-500">
                            Cette page n'a pas encore de contenu.
                        </p>
                    )}
                </article>
            </div>
        </PublicLayout>
    );
}
