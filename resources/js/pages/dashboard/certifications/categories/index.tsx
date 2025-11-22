import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    order: number;
    is_active: boolean;
    can_delete: boolean;
}

interface Props {
    categories: Category[];
}

export default function CategoriesIndex({ categories }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AppLayout title="Gestion des Catégories de Certifications">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Catégories de Certifications</h1>
                    <Link
                        href="/dashboard/certification-categories/create"
                        className="rounded-lg bg-secondary px-4 py-2 text-white transition-colors hover:bg-secondary/90"
                    >
                        Ajouter une catégorie
                    </Link>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Rechercher une catégorie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Nom</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Slug</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Ordre</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Statut</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            Aucune catégorie trouvée
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCategories.map((category) => (
                                        <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{category.name}</p>
                                                    {category.description && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">{category.slug}</td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">{category.order}</td>
                                            <td className="px-4 py-4">
                                                {category.is_active ? (
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/certification-categories/${category.id}/edit`}
                                                        className="text-sm text-secondary hover:text-secondary/80"
                                                    >
                                                        Modifier
                                                    </Link>
                                                    {category.can_delete ? (
                                                        <Link
                                                            href={`/dashboard/certification-categories/${category.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="text-sm text-red-600 hover:text-red-800"
                                                            onClick={(e) => {
                                                                if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            Supprimer
                                                        </Link>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 cursor-not-allowed" title="Cette catégorie par défaut ne peut pas être supprimée">
                                                            Supprimer
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
