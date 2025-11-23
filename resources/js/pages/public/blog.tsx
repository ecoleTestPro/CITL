import type { Archive, BlogArticle, Category, RecentArticle, Tag } from '@/components/blog';
import { BlogArticleCard, BlogSidebar, Pagination } from '@/components/blog';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface BlogProps {
    blogs?: {
        data: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories?: any[];
    recentArticles?: any[];
    tags?: string[];
    archives?: any[];
    filters?: {
        category?: number;
        tag?: string;
        search?: string;
        month?: number;
        year?: number;
    };
    currentCategory?: any;
    currentTag?: string;
    currentArchive?: { year: number; month: number };
}

function Blog({ blogs, categories, recentArticles, tags, archives, filters, currentCategory, currentTag, currentArchive }: BlogProps) {
    const { t } = useTranslation();

    // Transform backend data to frontend format
    const articles: BlogArticle[] = (blogs?.data || []).map((blog) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        image: blog.featured_image || 'images/default-blog.png',
        categories: blog.category ? [blog.category.name] : [],
        publishedDate: blog.formatted_published_date,
        readTime: blog.read_time,
        url: `/blog/${blog.slug}`,
    }));

    const sidebarCategories: Category[] = (categories || []).map((cat) => ({
        name: cat.name,
        slug: cat.slug,
        count: cat.blogs_count || 0,
        url: `/blog/category/${cat.slug}`,
    }));

    const sidebarRecent: RecentArticle[] = (recentArticles || []).map((article) => ({
        id: article.id,
        title: article.title,
        image: article.featured_image || 'images/default-blog.png',
        publishedDate: article.formatted_published_date,
        url: `/blog/${article.slug}`,
    }));

    const sidebarTags = (): Tag[] => {
        console.log("tags", tags);
        
        if (!tags) return [];

        if (tags && tags.length === 0) return [];

        return tags
            .map((tag) => {
                if (!tag) throw new Error('Tag is null or undefined');

                const slug = tag.toLowerCase().replace(/\s+/g, '-');

                if (!slug) throw new Error('Slug is empty');

                return {
                    name: tag,
                    slug,
                    url: `/blog/tag/${slug}`,
                };
            })
            .filter(Boolean) as Tag[];
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const sidebarArchives: Archive[] = (archives || []).map((archive) => ({
        month: monthNames[archive.month - 1],
        year: archive.year,
        count: archive.count,
        url: `/blog/archive/${archive.year}/${archive.month}`,
    }));

    const handleSearch = (query: string) => {
        router.get('/blog', { ...(filters || {}), search: query }, { preserveState: true });
    };

    const handlePageChange = (page: number) => {
        router.get('/blog', { ...(filters || {}), page }, { preserveState: true });
    };

    // Déterminer le titre et la description en fonction des filtres
    const getPageTitle = () => {
        if (currentCategory) return currentCategory.name;
        if (currentTag) return `Tag: ${currentTag}`;
        if (currentArchive) return `Archive: ${currentArchive.month}/${currentArchive.year}`;
        return t('blog.page_title', 'Blog');
    };

    const getPageDescription = () => {
        if (currentCategory) return t('blog.category_description', { category: currentCategory.name });
        if (currentTag) return t('blog.tag_description', { tag: currentTag });
        if (currentArchive) return t('blog.archive_description', { month: currentArchive.month, year: currentArchive.year });
        return t('blog.page_description', 'Découvrez nos derniers articles sur les tests logiciels, les certifications ISTQB et les meilleures pratiques.');
    };

    return (
        <PublicLayout>
            {/* Hero Section */}
            <HeroCommon
                badge={t('blog.badge', 'Blog')}
                title={getPageTitle()}
                description={getPageDescription()}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <section className="container mx-auto pt-12 pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
                <div className="grid grid-cols-12 max-md:gap-y-20 md:gap-5 lg:gap-16">
                    {/* Liste des articles */}
                    <div className="max-w-[793px] space-y-14 max-lg:col-span-7 max-md:order-2 max-md:col-span-full md:space-y-[70px] lg:col-span-8">
                        {articles.length > 0 ? (
                            articles.map((article, index) => <BlogArticleCard key={article.id} article={article} delay={index === 0 ? '0.3' : '0.1'} />)
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-lg text-secondary dark:text-foreground">{t('blog.no_articles', 'Aucun article trouvé.')}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar
                        categories={sidebarCategories}
                        recentArticles={sidebarRecent}
                        tags={sidebarTags()}
                        archives={sidebarArchives}
                        onSearch={handleSearch}
                    />
                </div>

                {/* Pagination */}
                {blogs && blogs.last_page > 1 && (
                    <Pagination currentPage={blogs.current_page} totalPages={blogs.last_page} baseUrl="/blog" onPageChange={handlePageChange} />
                )}
            </section>
        </PublicLayout>
    );
}

export default Blog;
