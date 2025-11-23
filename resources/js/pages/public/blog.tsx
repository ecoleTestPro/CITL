import { BlogArticleCard, BlogSidebar, Pagination } from '@/components/blog';
import type { Archive, BlogArticle, Category, RecentArticle, Tag } from '@/components/blog';
import PublicLayout from '@/layouts/public/public-layout';

// Données statiques pour la démo
const MOCK_ARTICLES: BlogArticle[] = [
    {
        id: 1,
        title: 'Product-led growth vs sales-led growth which one wins',
        slug: 'product-led-growth-vs-sales-led-growth',
        image: 'images/ns-img-453.png',
        categories: ['Design', 'Research'],
        publishedDate: '14.04.2020',
        readTime: 4,
        url: '/blog/product-led-growth-vs-sales-led-growth',
    },
    {
        id: 2,
        title: 'Our saas seo strategy 6 months, 300% organic traffic growth',
        slug: 'our-saas-seo-strategy',
        image: 'images/ns-img-454.png',
        categories: ['Design', 'Research'],
        publishedDate: '01.04.2020',
        readTime: 4,
        url: '/blog/our-saas-seo-strategy',
    },
    {
        id: 3,
        title: 'Decoding saas consolidation what it means for founders',
        slug: 'decoding-saas-consolidation',
        image: 'images/ns-img-455.png',
        categories: ['Design', 'Research'],
        publishedDate: '14.04.2020',
        readTime: 4,
        url: '/blog/decoding-saas-consolidation',
    },
    {
        id: 4,
        title: 'Digital is making place in funds back-office',
        slug: 'digital-is-making-place',
        image: 'images/ns-img-456.png',
        categories: ['Marketing', 'Strategy'],
        publishedDate: '14.04.2020',
        readTime: 4,
        url: '/blog/digital-is-making-place',
    },
];

const MOCK_CATEGORIES: Category[] = [
    { name: 'Day Trading', slug: 'day-trading', count: 9, url: '/blog/category/day-trading' },
    { name: 'Finance', slug: 'finance', count: 20, url: '/blog/category/finance' },
    { name: 'Virtual Hiring', slug: 'virtual-hiring', count: 25, url: '/blog/category/virtual-hiring' },
    { name: 'Headhunting', slug: 'headhunting', count: 6, url: '/blog/category/headhunting' },
    { name: 'Promotions', slug: 'promotions', count: 18, url: '/blog/category/promotions' },
    { name: 'Recruitment Agencies', slug: 'recruitment-agencies', count: 11, url: '/blog/category/recruitment-agencies' },
];

const MOCK_RECENT_ARTICLES: RecentArticle[] = [
    {
        id: 5,
        title: "We've mastered saas pricing models",
        image: 'images/ns-img-454.png',
        publishedDate: '1 May 2024',
        url: '/blog/saas-pricing-models',
    },
    {
        id: 6,
        title: 'Decoding saas consolidation what it means for founders',
        image: 'images/ns-img-455.png',
        publishedDate: '1 May 2024',
        url: '/blog/decoding-saas-consolidation',
    },
    {
        id: 7,
        title: 'Digital is making place in funds back-office',
        image: 'images/ns-img-456.png',
        publishedDate: '1 May 2024',
        url: '/blog/digital-is-making-place',
    },
];

const MOCK_TAGS: Tag[] = [
    { name: 'Business', slug: 'business', url: '/blog/tag/business' },
    { name: 'Technology', slug: 'technology', url: '/blog/tag/technology' },
    { name: 'Design', slug: 'design', url: '/blog/tag/design' },
    { name: 'Marketing', slug: 'marketing', url: '/blog/tag/marketing' },
    { name: 'Development', slug: 'development', url: '/blog/tag/development' },
];

const MOCK_ARCHIVES: Archive[] = [
    { month: 'January', year: 2024, count: 9, url: '/blog/archive/2024/01' },
    { month: 'February', year: 2024, count: 20, url: '/blog/archive/2024/02' },
    { month: 'March', year: 2024, count: 25, url: '/blog/archive/2024/03' },
    { month: 'April', year: 2024, count: 6, url: '/blog/archive/2024/04' },
];

function Blog() {
    const handleSearch = (query: string) => {
        console.log('Search query:', query);
        // TODO: Implémenter la recherche
    };

    const handlePageChange = (page: number) => {
        console.log('Page changed to:', page);
        // TODO: Implémenter le changement de page
    };

    return (
        <PublicLayout>
            <section className="container mx-auto pt-[120px] pb-14 md:pt-[160px] md:pb-16 lg:pb-[88px] xl:pb-[100px]">
                <div className="grid grid-cols-12 max-md:gap-y-20 md:gap-5 lg:gap-16">
                    {/* Liste des articles */}
                    <div className="max-w-[793px] space-y-14 max-lg:col-span-7 max-md:order-2 max-md:col-span-full md:space-y-[70px] lg:col-span-8">
                        {MOCK_ARTICLES.map((article, index) => (
                            <BlogArticleCard key={article.id} article={article} delay={index === 0 ? '0.3' : '0.1'} />
                        ))}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar
                        categories={MOCK_CATEGORIES}
                        recentArticles={MOCK_RECENT_ARTICLES}
                        tags={MOCK_TAGS}
                        archives={MOCK_ARCHIVES}
                        onSearch={handleSearch}
                    />
                </div>

                {/* Pagination */}
                <Pagination currentPage={1} totalPages={5} baseUrl="/blog" onPageChange={handlePageChange} />
            </section>
        </PublicLayout>
    );
}

export default Blog;
