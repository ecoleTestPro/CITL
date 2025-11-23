import { Link } from '@inertiajs/react';
import { Image } from 'lucide-react';
import { useState } from 'react';
import { RecentArticle } from '../types';

interface RecentArticlesProps {
    articles: RecentArticle[];
}

export const RecentArticles = ({ articles }: RecentArticlesProps) => {
    return (
        <div>
            <h3 className="text-heading-5 text-secondary dark:text-foreground">Recent articles</h3>
            <div className="mt-6 space-y-5">
                {articles.map((article) => (
                    <ArticleItem key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

const ArticleItem = ({ article }: { article: RecentArticle }) => {
    const [imageError, setImageError] = useState(false);
    const hasImage = article.image && !imageError;

    return (
        <div className="flex items-center gap-4">
            <figure className="max-h-[77px] w-full max-w-[102px] flex-shrink-0 overflow-hidden rounded-[5px]">
                {hasImage ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="h-[77px] w-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex h-[77px] w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <Image className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                )}
            </figure>
            <div className="flex-1 space-y-1">
                <h4 className="text-tagline-1 text-secondary hover:text-primary dark:text-foreground dark:hover:text-primary">
                    <Link href={article.url}>{article.title}</Link>
                </h4>
                <p className="text-tagline-3 text-secondary/60 dark:text-foreground/60">{article.publishedDate}</p>
            </div>
        </div>
    );
};
