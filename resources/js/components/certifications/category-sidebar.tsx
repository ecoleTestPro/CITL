import { Edit, Plus, Trash2 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    order: number;
    is_active: boolean;
}

interface CategorySidebarProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (slug: string) => void;
    onAddCategory: () => void;
    onEditCategory: (category: Category) => void;
    onDeleteCategory: (category: Category) => void;
    certificationCounts: Record<string, number>;
    totalCount: number;
}

export function CategorySidebar({
    categories,
    selectedCategory,
    onSelectCategory,
    onAddCategory,
    onEditCategory,
    onDeleteCategory,
    certificationCounts,
    totalCount,
}: CategorySidebarProps) {
    return (
        <div className="w-64 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Catégories</h2>
                        <button
                            onClick={onAddCategory}
                            className="rounded-lg bg-secondary p-2 text-white transition-colors hover:bg-secondary/90"
                            title="Ajouter une catégorie"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <nav className="space-y-1">
                        <button
                            onClick={() => onSelectCategory('all')}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                                selectedCategory === 'all'
                                    ? 'bg-secondary text-white'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                        >
                            <span>Toutes les certifications</span>
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                    selectedCategory === 'all' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                {totalCount}
                            </span>
                        </button>
                        {categories.map((category) => {
                            const count = certificationCounts[category.slug] || 0;
                            return (
                                <div key={category.id} className="group relative">
                                    <button
                                        onClick={() => onSelectCategory(category.slug)}
                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                                            selectedCategory === category.slug
                                                ? 'bg-secondary text-white'
                                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <span className="truncate">{category.name}</span>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs ${
                                                selectedCategory === category.slug ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                    <div className="absolute top-2 right-2 hidden gap-1 group-hover:flex">
                                        <button
                                            onClick={() => onEditCategory(category)}
                                            className="rounded bg-white p-1 text-secondary shadow-sm hover:bg-gray-50 dark:bg-gray-700"
                                            title="Modifier"
                                        >
                                            <Edit className="h-3 w-3" />
                                        </button>
                                        <button
                                            onClick={() => onDeleteCategory(category)}
                                            className="rounded bg-white p-1 text-red-600 shadow-sm hover:bg-gray-50 dark:bg-gray-700"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}
