import { Link } from '@inertiajs/react';
import { Calendar, Clock, Image } from 'lucide-react';
import { useState } from 'react';
import { AnimatedButton } from '../ui/animated-button';
import { BlogArticle } from './types';

interface BlogArticleCardProps {
    article: BlogArticle;
    delay?: string;
}

export const BlogArticleCard = ({ article, delay = '0.1' }: BlogArticleCardProps) => {
    const [imageError, setImageError] = useState(false);
    const hasImage = article.image && !imageError;

    return (
        <article data-ns-animate data-delay={delay} className="group">
            <div className="relative scale-100 overflow-hidden rounded-[20px] bg-white/60 transition-transform duration-500 hover:scale-[102%] hover:transition-transform hover:duration-500 dark:bg-gray-900/60">
                <div className="grid grid-cols-2 items-center gap-[26px] max-lg:grid-cols-1">
                    {/* Image */}
                    <figure className="lg:max-h-[370px] lg:max-w-[380px]">
                        {hasImage ? (
                            <img src={article.image} alt={article.title} className="w-full rounded-[20px] object-cover" onError={() => setImageError(true)} />
                        ) : (
                            <div className="flex h-[370px] w-full items-center justify-center rounded-[20px] bg-gray-200 dark:bg-gray-700">
                                <Image className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                            </div>
                        )}
                    </figure>

                    {/* Contenu */}
                    <div className="py-5 pr-8 max-lg:pl-4 sm:py-8">
                        {/* Badges catégories */}
                        <div className="mb-8 flex items-center gap-2">
                            {article.categories.map((category, index) => (
                                <span
                                    key={index}
                                    className="badge badge-white font-medium dark:!bg-gray-800 dark:!text-foreground/60 dark:backdrop-blur-[17px]"
                                    aria-label="Article category"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>

                        {/* Métadonnées */}
                        <div className="mb-3 flex items-center gap-4">
                            <time className="text-tagline-2 flex items-center gap-2 font-medium text-secondary/60 dark:text-foreground/60">
                                <Calendar className="h-5 w-5" />
                                {article.publishedDate}
                            </time>

                            <div aria-hidden="true" className="bg-stroke-2 dark:bg-stroke-6 inline-block h-5 w-px"></div>

                            <time className="text-tagline-2 flex items-center gap-2 font-medium text-secondary/60 dark:text-foreground/60">
                                <Clock className="h-5 w-5" />
                                {article.readTime} min
                            </time>
                        </div>

                        {/* Titre */}
                        <h3 className="sm:text-heading-5 text-tagline-1 mb-4 line-clamp-2 font-normal">
                            <Link href={article.url} aria-label={`Read full article: ${article.title}`}>
                                {article.title}
                            </Link>
                        </h3>

                        {/* Bouton Read more */}
                        <div className="text-center md:text-left">
                            <div className="group/btn-v2 mx-auto inline-block w-[85%] rounded-full transition-transform duration-500 ease-in-out md:mx-0 md:w-auto">
                                <AnimatedButton href={article.url} className="bg-citl-orange px-8 py-6 text-base font-semibold hover:bg-citl-orange/90">Voir</AnimatedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
