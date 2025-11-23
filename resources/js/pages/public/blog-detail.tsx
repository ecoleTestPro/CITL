import { BlogSidebar } from '@/components/blog';
import type { Category, RecentArticle, Tag } from '@/components/blog';
import PublicLayout from '@/layouts/public/public-layout';
import { Clock, Eye, Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

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

    return (
        <PublicLayout>
            <article className="container mx-auto pt-[120px] pb-14 md:pt-[160px] md:pb-16 lg:pb-[88px] xl:pb-[100px]">
                <div className="grid grid-cols-12 max-md:gap-y-20 md:gap-5 lg:gap-16">
                    {/* Main Content */}
                    <div className="max-w-[793px] max-lg:col-span-7 max-md:order-2 max-md:col-span-full lg:col-span-8">
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux articles
                        </Link>

                        {/* Featured Image */}
                        {blog.featured_image && (
                            <div className="mb-8 overflow-hidden rounded-lg">
                                <img src={`/storage/${blog.featured_image}`} alt={blog.title} className="w-full h-auto object-cover" />
                            </div>
                        )}

                        {/* Category Badge */}
                        {blog.category && (
                            <Link
                                href={`/blog/category/${blog.category.slug}`}
                                className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 transition-colors"
                            >
                                {blog.category.name}
                            </Link>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-secondary dark:text-accent">{blog.title}</h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-stroke-3 dark:border-stroke-7">
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
                                <span>{blog.read_time} min de lecture</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Eye className="h-4 w-4" />
                                <span>{blog.views} vues</span>
                            </div>
                        </div>

                        {/* Excerpt */}
                        {blog.excerpt && <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 italic border-l-4 border-primary-500 pl-4">{blog.excerpt}</p>}

                        {/* Content */}
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-bold prose-headings:text-secondary dark:prose-headings:text-accent
                                prose-p:text-secondary/80 dark:prose-p:text-accent/80
                                prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-secondary dark:prose-strong:text-accent
                                prose-img:rounded-lg prose-img:shadow-lg
                                prose-code:text-primary-500 prose-code:bg-primary-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
                                prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-500/5 prose-blockquote:py-1"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-stroke-3 dark:border-stroke-7">
                                <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-accent">Tags:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <Link
                                            key={index}
                                            href={`/blog/tag/${tag}`}
                                            className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Articles */}
                        {relatedBlogs.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-stroke-3 dark:border-stroke-7">
                                <h2 className="text-2xl font-bold mb-8 text-secondary dark:text-accent">Articles similaires</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedBlogs.map((related) => (
                                        <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                                            <div className="overflow-hidden rounded-lg mb-3">
                                                <img
                                                    src={related.featured_image ? `/storage/${related.featured_image}` : '/images/default-blog.png'}
                                                    alt={related.title}
                                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            {related.category && (
                                                <span className="inline-block mb-2 text-xs font-medium text-primary-500">{related.category.name}</span>
                                            )}
                                            <h3 className="font-semibold text-secondary dark:text-accent group-hover:text-primary-500 transition-colors line-clamp-2 mb-2">
                                                {related.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                                                <span>{related.formatted_published_date}</span>
                                                <span>{related.read_time} min</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar categories={sidebarCategories} recentArticles={sidebarRecent} tags={sidebarTags} archives={[]} onSearch={(query) => console.log(query)} />
                </div>
            </article>
        </PublicLayout>
    );
}
