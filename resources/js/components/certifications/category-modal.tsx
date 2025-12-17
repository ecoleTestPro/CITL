import { LanguageSwitcher } from '@/components/certifications/language-switcher';
import { CategoryFormData, SupportedLanguage } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { Award, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CategoryModalProps {
    isOpen: boolean;
    isEditing: boolean;
    form: InertiaFormProps<CategoryFormData>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function CategoryModal({ isOpen, isEditing, form, onClose, onSubmit }: CategoryModalProps) {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('fr');

    if (!isOpen) return null;

    // Helper pour obtenir la clé du champ en fonction de la langue
    const getFieldKey = (field: string) => `${field}_${currentLanguage}` as keyof CategoryFormData;

    // Helper pour obtenir la valeur d'un champ traduisible
    const getFieldValue = (field: string): string => {
        const key = getFieldKey(field);
        return (form.data[key] as string) || '';
    };

    // Helper pour définir la valeur d'un champ traduisible
    const setFieldValue = (field: string, value: string) => {
        const key = getFieldKey(field);
        form.setData({ ...form.data, [key]: value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                {/* Header */}
                <div className="relative border-b border-gray-200 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-5 dark:border-gray-700 dark:from-primary/20 dark:via-primary/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 dark:bg-primary/30">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {isEditing ? t('dashboard.certifications.edit_category') : t('dashboard.certifications.add_category')}
                                </h2>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                    {isEditing ? 'Modifier les informations de la catégorie' : 'Créer une nouvelle catégorie'}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Language Switcher */}
                <div className="border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-900">
                    <LanguageSwitcher
                        currentLanguage={currentLanguage}
                        onLanguageChange={setCurrentLanguage}
                        showTranslateButton={false}
                    />
                </div>

                {/* Form Content */}
                <form onSubmit={onSubmit} className="p-6">
                    <div className="space-y-5">
                        {/* Language indicator */}
                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                                    currentLanguage === 'fr'
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                }`}
                            >
                                {currentLanguage === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {currentLanguage === 'fr' ? 'Saisissez le contenu en français' : 'Enter content in English'}
                            </span>
                        </div>

                        {/* Name field */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('dashboard.certifications.category_name')} {currentLanguage === 'fr' && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type="text"
                                value={getFieldValue('name')}
                                onChange={(e) => setFieldValue('name', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                placeholder={currentLanguage === 'fr' ? 'Ex: Core Foundation' : 'Ex: Core Foundation'}
                                required={currentLanguage === 'fr'}
                            />
                            {form.errors.name_fr && <p className="mt-1 text-sm text-red-500">{form.errors.name_fr}</p>}
                        </div>

                        {/* Description field */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('dashboard.certifications.category_description')}
                            </label>
                            <textarea
                                value={getFieldValue('description')}
                                onChange={(e) => setFieldValue('description', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows={3}
                                placeholder={
                                    currentLanguage === 'fr'
                                        ? 'Description de la catégorie...'
                                        : 'Category description...'
                                }
                            />
                        </div>

                        {/* Active status */}
                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={form.data.is_active}
                                onChange={(e) => form.setData('is_active', e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <div>
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('dashboard.certifications.category_active')}
                                </label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {currentLanguage === 'fr'
                                        ? 'Cette catégorie sera visible sur le site public'
                                        : 'This category will be visible on the public site'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                        >
                            {form.processing ? t('dashboard.certifications.saving') : t('common.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
