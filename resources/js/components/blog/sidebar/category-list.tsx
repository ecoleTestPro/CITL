import { Link } from '@inertiajs/react';
import { Category } from '../types';

interface CategoryListProps {
    categories: Category[];
    activeCategory?: string;
}

export const CategoryList = ({ categories, activeCategory }: CategoryListProps) => {
    return (
        <div>
            <h3 className="text-heading-5">Categories</h3>
            <div className="mt-2.5 space-y-2">
                {categories.map((category) => {
                    const isActive = activeCategory === category.slug;
                    return (
                        <Link
                            key={category.slug}
                            href={category.url}
                            className={`text-tagline-1 flex items-center justify-between py-1.5 transition-colors duration-300 ${
                                isActive ? 'text-primary-500' : 'hover:text-primary-500 dark:text-accent'
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
