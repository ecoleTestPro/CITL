import { CertificationCategory, CertificationFormData } from '@/types';
import { UseFormReturn } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface CertificationBasicFormProps {
    form: UseFormReturn<CertificationFormData>;
    categories: CertificationCategory[];
}

export function CertificationBasicForm({ form, categories }: CertificationBasicFormProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Catégorie <span className="text-red-500">*</span>
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

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Titre <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.data.title}
                        onChange={(e) => form.setData('title', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Sous-titre</label>
                    <input
                        type="text"
                        value={form.data.subtitle}
                        onChange={(e) => form.setData('subtitle', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description courte
                    </label>
                    <textarea
                        value={form.data.description}
                        onChange={(e) => form.setData('description', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows={3}
                    />
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Informations sur l'examen</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre de questions
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
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Durée</label>
                        <input
                            type="text"
                            value={form.data.exam_duration}
                            onChange={(e) => form.setData('exam_duration', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="60 min"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Autres informations</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">URL du syllabus</label>
                        <input
                            type="url"
                            value={form.data.syllabus_url}
                            onChange={(e) => form.setData('syllabus_url', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ordre d'affichage
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
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Certification active et visible
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
