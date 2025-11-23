import { Link } from '@inertiajs/react';
import { RecentArticle } from '../types';

interface RecentArticlesProps {
    articles: RecentArticle[];
}

export const RecentArticles = ({ articles }: RecentArticlesProps) => {
    return (
        <div>
            <h3 className="text-heading-5">Recent articles</h3>
            <div className="mt-6 space-y-5">
                {articles.map((article) => (
                    <div key={article.id} className="flex items-center gap-4">
                        <figure className="max-h-[77px] w-full max-w-[102px] flex-shrink-0 overflow-hidden rounded-[5px]">
                            <img src={article.image} alt={article.title} className="w-full object-cover" />
                        </figure>
                        <div className="flex-1 space-y-1">
                            <h4 className="text-tagline-1">
                                <Link href={article.url}>{article.title}</Link>
                            </h4>
                            <p className="text-tagline-3">{article.publishedDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
