import { CertificationBasicForm } from '@/components/certifications/certification-basic-form';
import { CertificationContentForm } from '@/components/certifications/certification-content-form';
import { CertificationDocumentsTab } from '@/components/certifications/certification-documents-tab';
import { LanguageSwitcher } from '@/components/certifications/language-switcher';
import { TranslationService } from '@/services/translation-service';
import { Certification, CertificationCategory, CertificationFormData, SupportedLanguage, TranslatableField } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface CertificationModalProps {
    isOpen: boolean;
    isEditing: boolean;
    form: InertiaFormProps<CertificationFormData>;
    categories: CertificationCategory[];
    certificationId?: number;
    existingCertification?: Certification | null;
    onClose: () => void;
    onSubmit: (
        e: React.FormEvent,
        files: { featuredImage: File | null; syllabusFile: File | null; removeFeaturedImage: boolean; removeSyllabusFile: boolean },
    ) => void;
}

// Champs traduisibles pour les formulaires basiques
const basicTranslatableFields: TranslatableField[] = ['title', 'subtitle', 'description'];

// Champs traduisibles pour le contenu riche
const contentTranslatableFields: TranslatableField[] = [
    'overview',
    'target_audience',
    'training_content',
    'exam_structure_details',
    'business_outcomes',
    'additional_information',
];

export function CertificationModal({
    isOpen,
    isEditing,
    form,
    categories,
    certificationId,
    existingCertification,
    onClose,
    onSubmit,
}: CertificationModalProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'documents'>('basic');
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('fr');
    const [isTranslating, setIsTranslating] = useState(false);
    const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
    const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
    const [removeFeaturedImage, setRemoveFeaturedImage] = useState(false);
    const [removeSyllabusFile, setRemoveSyllabusFile] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e, {
            featuredImage: featuredImageFile,
            syllabusFile: syllabusFile,
            removeFeaturedImage,
            removeSyllabusFile,
        });
    };

    const handleFeaturedImageChange = (file: File | null) => {
        setFeaturedImageFile(file);
        setRemoveFeaturedImage(false);
    };

    const handleSyllabusFileChange = (file: File | null) => {
        setSyllabusFile(file);
        setRemoveSyllabusFile(false);
    };

    const handleRemoveFeaturedImage = () => {
        setFeaturedImageFile(null);
        setRemoveFeaturedImage(true);
    };

    const handleRemoveSyllabusFile = () => {
        setSyllabusFile(null);
        setRemoveSyllabusFile(true);
    };

    // Fonction pour traduire automatiquement les champs
    const handleAutoTranslate = async () => {
        const sourceLanguage = currentLanguage;
        const targetLanguage: SupportedLanguage = currentLanguage === 'fr' ? 'en' : 'fr';

        // Récupérer les champs à traduire selon l'onglet actif
        const fieldsToTranslate = activeTab === 'basic' ? basicTranslatableFields : contentTranslatableFields;

        // Récupérer les valeurs des champs source
        const sourceFields: Partial<Record<TranslatableField, string>> = {};
        fieldsToTranslate.forEach((field) => {
            const sourceKey = `${field}_${sourceLanguage}` as keyof CertificationFormData;
            const value = form.data[sourceKey] as string;
            if (value && value.trim() !== '') {
                sourceFields[field] = value;
            }
        });

        if (Object.keys(sourceFields).length === 0) {
            toast.error(
                sourceLanguage === 'fr'
                    ? 'Aucun champ à traduire. Veuillez remplir les champs en français.'
                    : 'No fields to translate. Please fill in the English fields.',
            );
            return;
        }

        setIsTranslating(true);

        try {
            const translations = await TranslationService.translateMultiple(sourceFields, sourceLanguage, targetLanguage);

            // Mettre à jour les champs traduits
            const updatedData = { ...form.data };
            Object.entries(translations).forEach(([field, translation]) => {
                const targetKey = `${field}_${targetLanguage}` as keyof CertificationFormData;
                (updatedData as Record<string, unknown>)[targetKey] = translation;
            });
            form.setData(updatedData);

            toast.success(
                targetLanguage === 'fr'
                    ? 'Traduction vers le français terminée !'
                    : 'Translation to English completed!',
            );
        } catch (error) {
            console.error('Translation error:', error);
            toast.error(
                currentLanguage === 'fr'
                    ? 'Erreur lors de la traduction. Veuillez réessayer.'
                    : 'Translation error. Please try again.',
            );
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {isEditing ? t('dashboard.certifications.edit_certification') : t('dashboard.certifications.add_certification')}
                    </h2>
                </div>

                {/* Language Switcher */}
                <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                    <LanguageSwitcher
                        currentLanguage={currentLanguage}
                        onLanguageChange={setCurrentLanguage}
                        onAutoTranslate={handleAutoTranslate}
                        isTranslating={isTranslating}
                        showTranslateButton={activeTab !== 'documents'}
                    />
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex gap-4 px-6">
                        <button
                            type="button"
                            onClick={() => setActiveTab('basic')}
                            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'basic'
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                            }`}
                        >
                            {t('dashboard.certifications.basic_info')}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('content')}
                            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'content'
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                            }`}
                        >
                            {t('dashboard.certifications.detailed_content')}
                        </button>
                        {isEditing && certificationId && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('documents')}
                                className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === 'documents'
                                        ? 'border-primary text-primary dark:border-accent dark:text-accent'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                }`}
                            >
                                {t('dashboard.certifications.documents')}
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="max-h-[calc(90vh-280px)] overflow-y-auto p-6">
                    <form onSubmit={handleSubmit}>
                        {activeTab === 'basic' && (
                            <CertificationBasicForm
                                form={form}
                                categories={categories}
                                currentLanguage={currentLanguage}
                                existingFeaturedImage={existingCertification?.featured_image}
                                existingSyllabusFile={existingCertification?.syllabus_file}
                                onFeaturedImageChange={handleFeaturedImageChange}
                                onSyllabusFileChange={handleSyllabusFileChange}
                                onRemoveFeaturedImage={handleRemoveFeaturedImage}
                                onRemoveSyllabusFile={handleRemoveSyllabusFile}
                            />
                        )}
                        {activeTab === 'content' && <CertificationContentForm form={form} currentLanguage={currentLanguage} />}
                        {activeTab === 'documents' && isEditing && certificationId && <CertificationDocumentsTab certificationId={certificationId} />}
                    </form>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex justify-end gap-4">
                        <div className="flex w-1/3 justify-center gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={form.processing || isTranslating}
                                className="flex-1 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                            >
                                {form.processing ? t('dashboard.certifications.saving') : t('common.save')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
