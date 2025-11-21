import { UseFormReturn } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface CertificationFormData {
    certification_category_id: number;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    icon: string;
    exam_questions: number;
    exam_passing_score: number;
    exam_total_points: number;
    exam_duration: string;
    syllabus_url: string;
    image: string;
    order: number;
    is_active: boolean;
}

interface CertificationModalProps {
    isOpen: boolean;
    isEditing: boolean;
    form: UseFormReturn<CertificationFormData>;
    categories: Category[];
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function CertificationModal({ isOpen, isEditing, form, categories, onClose, onSubmit }: CertificationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {isEditing ? 'Modifier la certification' : 'Ajouter une certification'}
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Catégorie
                            </label>
                            <select
                                value={form.data.certification_category_id}
                                onChange={(e) => form.setData('certification_category_id', parseInt(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Titre
                            </label>
                            <input
                                type="text"
                                value={form.data.title}
                                onChange={(e) => form.setData('title', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={form.data.slug}
                                onChange={(e) => form.setData('slug', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Sous-titre
                            </label>
                            <input
                                type="text"
                                value={form.data.subtitle}
                                onChange={(e) => form.setData('subtitle', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Questions
                            </label>
                            <input
                                type="number"
                                value={form.data.exam_questions}
                                onChange={(e) => form.setData('exam_questions', parseInt(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Score requis (%)
                            </label>
                            <input
                                type="number"
                                value={form.data.exam_passing_score}
                                onChange={(e) => form.setData('exam_passing_score', parseInt(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Points totaux
                            </label>
                            <input
                                type="number"
                                value={form.data.exam_total_points}
                                onChange={(e) => form.setData('exam_total_points', parseInt(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Durée
                            </label>
                            <input
                                type="text"
                                value={form.data.exam_duration}
                                onChange={(e) => form.setData('exam_duration', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="60 min"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Icône
                            </label>
                            <input
                                type="text"
                                value={form.data.icon}
                                onChange={(e) => form.setData('icon', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Award"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Ordre
                            </label>
                            <input
                                type="number"
                                value={form.data.order}
                                onChange={(e) => form.setData('order', parseInt(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex items-center gap-2 md:col-span-2">
                            <input
                                type="checkbox"
                                checked={form.data.is_active}
                                onChange={(e) => form.setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                            />
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
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
