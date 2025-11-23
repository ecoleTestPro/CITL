import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Category } from '../types';

interface CategoryListProps {
    categories: Category[];
    activeCategory?: string;
}

export const CategoryList = ({ categories, activeCategory }: CategoryListProps) => {
    const { t } = useTranslation();

    return (
        <div>
            <h3 className="text-heading-5 text-secondary dark:text-foreground">{t('blog.sidebar.categories', 'Categories')}</h3>
            <div className="mt-2.5 space-y-2">
                {categories.map((category) => {
                    const isActive = activeCategory === category.slug;
                    return (
                        <Link
                            key={category.slug}
                            href={category.url}
                            className={`text-tagline-1 flex items-center justify-between py-1.5 transition-colors duration-300 ${
                                isActive ? 'text-primary dark:text-primary' : 'text-secondary hover:text-primary dark:text-foreground dark:hover:text-primary'
                            }`}
                        >
                            <span>{category.name}</span>
                            <span>({String(category.count).padStart(2, '0')})</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
