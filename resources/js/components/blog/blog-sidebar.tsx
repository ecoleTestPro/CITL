import { ArchiveList } from './sidebar/archive-list';
import { CategoryList } from './sidebar/category-list';
import { RecentArticles } from './sidebar/recent-articles';
import { SearchForm } from './sidebar/search-form';
import { TagCloud } from './sidebar/tag-cloud';
import { Archive, Category, RecentArticle, Tag } from './types';

interface BlogSidebarProps {
    categories: Category[];
    recentArticles: RecentArticle[];
    tags: Tag[];
    archives: Archive[];
    activeCategory?: string;
    onSearch?: (query: string) => void;
}

export const BlogSidebar = ({ categories, recentArticles, tags, archives, activeCategory, onSearch }: BlogSidebarProps) => {
    return (
        <div
            data-ns-animate
            data-delay="0.3"
            className="blog-item bg-background-2 dark:bg-background-6 shadow-1 max-w-full space-y-[52px] self-start rounded-[20px] px-8 py-[44px] max-lg:col-span-5 max-md:order-1 max-md:col-span-full md:max-w-[410px] lg:col-span-4"
        >
            {/* Formulaire de recherche */}
            <SearchForm onSearch={onSearch} />

            {/* Liste des catégories */}
            <CategoryList categories={categories} activeCategory={activeCategory} />

            {/* Articles récents */}
            <RecentArticles articles={recentArticles} />

            {/* Nuage de tags */}
            <TagCloud tags={tags} />

            {/* Archives */}
            <ArchiveList archives={archives} />
        </div>
    );
};
