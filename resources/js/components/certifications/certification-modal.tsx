import RichTextEditor from '@/components/rich-text-editor';
import { CertificationCategory, CertificationFormData } from '@/types';
import { UseFormReturn } from '@inertiajs/react';
import { useState } from 'react';

interface CertificationModalProps {
    isOpen: boolean;
    isEditing: boolean;
    form: UseFormReturn<CertificationFormData>;
    categories: CertificationCategory[];
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function CertificationModal({ isOpen, isEditing, form, categories, onClose, onSubmit }: CertificationModalProps) {
    const [activeTab, setActiveTab] = useState<'basic' | 'content'>('basic');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {isEditing ? 'Modifier la certification' : 'Ajouter une certification'}
                    </h2>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex gap-4 px-6">
                        <button
                            type="button"
                            onClick={() => setActiveTab('basic')}
                            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'basic'
                                    ? 'border-secondary text-secondary dark:border-accent dark:text-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                            }`}
                        >
                            Informations de base
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('content')}
                            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'content'
                                    ? 'border-secondary text-secondary dark:border-accent dark:text-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                            }`}
                        >
                            Contenu détaillé
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
                    <form onSubmit={onSubmit}>
                        {/* Basic Information Tab */}
                        {activeTab === 'basic' && (
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

                                    <div>
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

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Slug <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.slug}
                                            onChange={(e) => form.setData('slug', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Icône</label>
                                        <input
                                            type="text"
                                            value={form.data.icon}
                                            onChange={(e) => form.setData('icon', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="ns-shape-35"
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
                        )}

                        {/* Detailed Content Tab */}
                        {activeTab === 'content' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Vue d'ensemble</label>
                                    <RichTextEditor
                                        content={form.data.overview}
                                        onChange={(content) => form.setData('overview', content)}
                                        placeholder="Décrivez la vue d'ensemble de la certification..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Public cible</label>
                                    <RichTextEditor
                                        content={form.data.target_audience}
                                        onChange={(content) => form.setData('target_audience', content)}
                                        placeholder="Décrivez le public cible..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Contenu de la formation
                                    </label>
                                    <RichTextEditor
                                        content={form.data.training_content}
                                        onChange={(content) => form.setData('training_content', content)}
                                        placeholder="Décrivez le contenu de la formation..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Structure de l'examen (détails)
                                    </label>
                                    <RichTextEditor
                                        content={form.data.exam_structure_details}
                                        onChange={(content) => form.setData('exam_structure_details', content)}
                                        placeholder="Détaillez la structure de l'examen..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Bénéfices professionnels
                                    </label>
                                    <RichTextEditor
                                        content={form.data.business_outcomes}
                                        onChange={(content) => form.setData('business_outcomes', content)}
                                        placeholder="Décrivez les bénéfices professionnels..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Informations complémentaires
                                    </label>
                                    <RichTextEditor
                                        content={form.data.additional_information}
                                        onChange={(content) => form.setData('additional_information', content)}
                                        placeholder="Ajoutez des informations complémentaires..."
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSubmit(e as unknown as React.FormEvent)}
                            disabled={form.processing}
                            className="flex-1 rounded-lg bg-secondary px-4 py-2 text-white transition-colors hover:bg-secondary/90 disabled:opacity-50"
                        >
                            {form.processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
