import { CategoryFormData } from '@/types';
import { UseFormReturn } from '@inertiajs/react';

interface CategoryModalProps {
    isOpen: boolean;
    isEditing: boolean;
    form: UseFormReturn<CategoryFormData>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function CategoryModal({ isOpen, isEditing, form, onClose, onSubmit }: CategoryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {isEditing ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                        <input
                            type="text"
                            value={form.data.slug}
                            onChange={(e) => form.setData('slug', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Ordre</label>
                        <input
                            type="number"
                            value={form.data.order}
                            onChange={(e) => form.setData('order', parseInt(e.target.value))}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.data.is_active}
                            onChange={(e) => form.setData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                        />
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="flex-1 rounded-lg bg-secondary px-4 py-2 text-white transition-colors hover:bg-secondary/90 disabled:opacity-50"
                        >
                            {form.processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
