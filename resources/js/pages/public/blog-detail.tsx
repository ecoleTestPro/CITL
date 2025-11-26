import type { BlogArticle, Category, RecentArticle, Tag } from '@/components/blog';
import { BlogArticleCard, BlogSidebar } from '@/components/blog';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Eye, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    author: {
        id: number;
        name: string;
    };
    tags: string[] | null;
    views: number;
    read_time: number;
    formatted_published_date: string;
    published_at: string;
}

interface RelatedBlog {
    id: number;
    title: string;
    slug: string;
    featured_image: string | null;
    formatted_published_date: string;
    read_time: number;
    category: {
        name: string;
    } | null;
}

interface BlogDetailProps {
    blog: Blog;
    relatedBlogs: RelatedBlog[];
    categories: any[];
    recentArticles: any[];
    tags: string[];
}

export default function BlogDetail({ blog, relatedBlogs, categories, recentArticles, tags }: BlogDetailProps) {
    const { t } = useTranslation();

    const sidebarCategories: Category[] = categories.map((cat) => ({
        name: cat.name,
        slug: cat.slug,
        count: cat.blogs_count || 0,
        url: `/blog/category/${cat.slug}`,
    }));

    const sidebarRecent: RecentArticle[] = recentArticles.map((article) => ({
        id: article.id,
        title: article.title,
        image: article.featured_image || 'images/default-blog.png',
        publishedDate: article.formatted_published_date,
        url: `/blog/${article.slug}`,
    }));

    const sidebarTags: Tag[] = tags.map((tag) => ({
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
        url: `/blog/tag/${tag}`,
    }));

    // Transform related blogs to BlogArticle format
    const relatedArticles: BlogArticle[] = relatedBlogs.map((related) => ({
        id: related.id,
        title: related.title,
        slug: related.slug,
        excerpt: '',
        image: related.featured_image || 'images/default-blog.png',
        categories: related.category ? [related.category.name] : [],
        publishedDate: related.formatted_published_date,
        readTime: related.read_time,
        url: `/blog/${related.slug}`,
    }));

    return (
        <PublicLayout>
            <Head>
                <title>{`${blog.title} | CITL Blog`}</title>
                <meta name="description" content={blog.excerpt || blog.title} />
                <meta name="keywords" content={blog.tags?.join(', ') || 'blog, ISTQB, test logiciel, CITL'} />
                <meta property="og:title" content={`${blog.title} | CITL Blog`} />
                <meta property="og:description" content={blog.excerpt || blog.title} />
                <meta property="og:type" content="article" />
            </Head>
            {/* Hero Section */}
            <HeroCommon
                badge={blog.category?.name || t('blog.badge', 'Blog')}
                title={blog.title}
                description={blog.excerpt || t('blog.article_description', 'Découvrez cet article')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <article className="container mx-auto pt-12 pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
                <div className="grid grid-cols-12 max-md:gap-y-20 md:gap-5 lg:gap-16">
                    {/* Main Content */}
                    <div className="max-w-[793px] max-lg:col-span-7 max-md:order-2 max-md:col-span-full lg:col-span-8">
                        {/* Back Button */}
                        <a
                            href="/blog"
                            className="hover:text-primary-500 dark:hover:text-primary-400 mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors dark:text-gray-400"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {t('blog.back_to_articles', 'Retour aux articles')}
                        </a>
                        <br />
                        {/* Featured Image */}
                        {blog.featured_image && (
                            <div className="mb-8 overflow-hidden rounded-lg">
                                <img src={`/storage/${blog.featured_image}`} alt={blog.title} className="h-auto w-full object-cover" />
                            </div>
                        )}

                        {/* Category Badge */}
                        {blog.category && (
                            <Link
                                href={`/blog/category/${blog.category.slug}`}
                                className="bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium transition-colors"
                            >
                                {blog.category.name}
                            </Link>
                        )}

                        {/* Title */}
                        <h1 className="mb-6 text-3xl font-bold text-secondary md:text-4xl lg:text-5xl dark:text-foreground">{blog.title}</h1>

                        {/* Meta Information */}
                        <div className="border-stroke-3 dark:border-stroke-7 mb-8 flex flex-wrap items-center gap-4 border-b pb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <User className="h-4 w-4" />
                                <span>{blog.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="h-4 w-4" />
                                <span>{blog.formatted_published_date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="h-4 w-4" />
                                <span>
                                    {blog.read_time} {t('blog.min_read', 'min de lecture')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Eye className="h-4 w-4" />
                                <span>
                                    {blog.views} {t('blog.views_count', 'vues')}
                                </span>
                            </div>
                        </div>

                        {/* Excerpt */}
                        {false && blog.excerpt && (
                            <p className="border-primary-500 mb-8 border-l-4 pl-4 text-lg text-gray-600 italic dark:text-gray-400">{blog.excerpt}</p>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-secondary dark:prose-headings:text-foreground prose-p:text-secondary/80 dark:prose-p:text-foreground/80 prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary dark:prose-strong:text-foreground prose-img:rounded-lg prose-img:shadow-lg prose-code:text-primary-500 prose-code:bg-primary-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-500/5 prose-blockquote:py-1 max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="border-stroke-3 dark:border-stroke-7 mt-12 border-t pt-8">
                                <h3 className="mb-4 text-lg font-semibold text-secondary dark:text-foreground">{t('blog.tags_label', 'Tags:')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <Link
                                            key={index}
                                            href={`/blog/tag/${tag}`}
                                            className="hover:bg-primary-500/10 hover:text-primary-500 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Articles */}
                        {relatedArticles.length > 0 && (
                            <div className="border-stroke-3 dark:border-stroke-7 mt-16 border-t pt-8">
                                <h2 className="mb-8 text-2xl font-bold text-secondary dark:text-foreground">
                                    {t('blog.related_articles', 'Articles similaires')}
                                </h2>
                                <div className="space-y-8">
                                    {relatedArticles.map((article) => (
                                        <BlogArticleCard key={article.id} article={article} delay="0.1" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar
                        categories={sidebarCategories}
                        recentArticles={sidebarRecent}
                        tags={sidebarTags}
                        archives={[]}
                        onSearch={(query) => console.log(query)}
                    />
                </div>
            </article>
        </PublicLayout>
    );
}
