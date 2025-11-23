import { Link } from '@inertiajs/react';
import { Calendar, Clock } from 'lucide-react';
import { BlogArticle } from './types';

interface BlogArticleCardProps {
    article: BlogArticle;
    delay?: string;
}

export const BlogArticleCard = ({ article, delay = '0.1' }: BlogArticleCardProps) => {
    return (
        <article data-ns-animate data-delay={delay} className="group">
            <div className="bg-background-2 dark:bg-background-6 relative scale-100 overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[102%] hover:transition-transform hover:duration-500">
                <div className="grid grid-cols-2 items-center gap-[26px] max-lg:grid-cols-1">
                    {/* Image */}
                    <figure className="lg:max-h-[370px] lg:max-w-[380px]">
                        <img src={article.image} alt={article.title} className="w-full rounded-[20px] object-cover" />
                    </figure>

                    {/* Contenu */}
                    <div className="py-5 pr-8 max-lg:pl-4 sm:py-8">
                        {/* Badges catégories */}
                        <div className="mb-8 flex items-center gap-2">
                            {article.categories.map((category, index) => (
                                <span
                                    key={index}
                                    className="badge badge-white font-medium dark:!bg-accent/10 dark:!text-accent/60 dark:backdrop-blur-[17px]"
                                    aria-label="Article category"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>

                        {/* Métadonnées */}
                        <div className="mb-3 flex items-center gap-4">
                            <time className="text-tagline-2 flex items-center gap-2 font-medium text-secondary/60 dark:text-accent/60">
                                <Calendar className="h-5 w-5" />
                                {article.publishedDate}
                            </time>

                            <div aria-hidden="true" className="bg-stroke-2 dark:bg-stroke-6 inline-block h-5 w-px"></div>

                            <time className="text-tagline-2 flex items-center gap-2 font-medium text-secondary/60 dark:text-accent/60">
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
                                <Link
                                    href={article.url}
                                    className="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2 mx-auto inline-flex h-12 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full text-center font-medium text-nowrap lowercase transition-all duration-500 ease-in-out md:mx-0 md:h-auto md:w-auto"
                                >
                                    <span className="inline-block transition-transform duration-300 ease-in-out first-letter:uppercase">
                                        Read more
                                    </span>

                                    <div className="relative size-6 overflow-hidden">
                                        <span className="btn-v2-icon absolute inset-0 size-6 -translate-x-6 transition-all duration-300 ease-in-out group-hover/btn-v2:translate-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M11 5H13V7H11V5Z" />
                                                <path d="M5 5H7V7H5V5Z" />
                                                <path d="M14 8H16V10H14V8Z" />
                                                <path d="M8 8H10V10H8V8Z" />
                                                <path d="M17 11H19V13H17V11Z" />
                                                <path d="M11 11H13V13H11V11Z" />
                                                <path d="M14 14H16V16H14V14Z" />
                                                <path d="M8 14H10V16H8V14Z" />
                                                <path d="M11 17H13V19H11V17Z" />
                                                <path d="M5 17H7V19H5V17Z" />
                                            </svg>
                                        </span>

                                        <span className="btn-v2-icon absolute size-6 -translate-x-2 transition-all duration-300 ease-in-out group-hover/btn-v2:translate-x-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M11 5H13V7H11V5Z" />
                                                <path d="M5 5H7V7H5V5Z" />
                                                <path d="M14 8H16V10H14V8Z" />
                                                <path d="M8 8H10V10H8V8Z" />
                                                <path d="M17 11H19V13H17V11Z" />
                                                <path d="M11 11H13V13H11V11Z" />
                                                <path d="M14 14H16V16H14V14Z" />
                                                <path d="M8 14H10V16H8V14Z" />
                                                <path d="M11 17H13V19H11V17Z" />
                                                <path d="M5 17H7V19H5V17Z" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
