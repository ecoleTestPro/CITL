import { CertificationBasicForm } from '@/components/certifications/certification-basic-form';
import { CertificationContentForm } from '@/components/certifications/certification-content-form';
import { CertificationDocumentsTab } from '@/components/certifications/certification-documents-tab';
import { LanguageSwitcher } from '@/components/certifications/language-switcher';
import { TranslationService } from '@/services/translation-service';
import { Certification, CertificationCategory, CertificationFormData, SupportedLanguage, TranslatableField } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { Award, BookOpen, CheckCircle2, FileText, Info, Loader2, X } from 'lucide-react';
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

    // Helper pour vérifier si un contenu HTML a du texte réel
    const hasRealContent = (value: string): boolean => {
        if (!value) return false;
        // Retirer les balises HTML et vérifier s'il reste du contenu
        const strippedContent = value.replace(/<[^>]*>/g, '').trim();
        return strippedContent.length > 0;
    };

    // Fonction pour traduire automatiquement les champs
    const handleAutoTranslate = async () => {
        const sourceLanguage = currentLanguage;
        const targetLanguage: SupportedLanguage = currentLanguage === 'fr' ? 'en' : 'fr';

        // Récupérer les champs à traduire selon l'onglet actif
        const fieldsToTranslate = activeTab === 'basic' ? basicTranslatableFields : contentTranslatableFields;

        // Récupérer les valeurs des champs source (vérifier le contenu réel pour le HTML)
        const sourceFields: Partial<Record<TranslatableField, string>> = {};
        fieldsToTranslate.forEach((field) => {
            const sourceKey = `${field}_${sourceLanguage}` as keyof CertificationFormData;
            const value = form.data[sourceKey] as string;
            if (hasRealContent(value)) {
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

        const fieldsCount = Object.keys(sourceFields).length;
        toast.loading(`Traduction de ${fieldsCount} champ${fieldsCount > 1 ? 's' : ''} en cours...`, { id: 'translating' });

        try {
            const translations = await TranslationService.translateMultiple(sourceFields, sourceLanguage, targetLanguage);

            // Mettre à jour les champs traduits
            const updatedData = { ...form.data };
            Object.entries(translations).forEach(([field, translation]) => {
                const targetKey = `${field}_${targetLanguage}` as keyof CertificationFormData;
                (updatedData as Record<string, unknown>)[targetKey] = translation;
            });
            form.setData(updatedData);

            toast.dismiss('translating');
            toast.success(
                targetLanguage === 'fr'
                    ? `${fieldsCount} champ${fieldsCount > 1 ? 's' : ''} traduit${fieldsCount > 1 ? 's' : ''} vers le français !`
                    : `${fieldsCount} field${fieldsCount > 1 ? 's' : ''} translated to English!`,
            );
        } catch (error) {
            console.error('Translation error:', error);
            toast.dismiss('translating');
            toast.error(currentLanguage === 'fr' ? 'Erreur lors de la traduction. Veuillez réessayer.' : 'Translation error. Please try again.');
        } finally {
            setIsTranslating(false);
        }
    };

    // Vérifier si les champs requis sont remplis pour chaque onglet
    const isBasicTabComplete = () => {
        return form.data.title_fr && form.data.certification_category_id;
    };

    const isContentTabComplete = () => {
        return form.data.overview_fr || form.data.target_audience_fr;
    };

    // Tabs configuration avec icônes et statut
    const tabs = [
        {
            id: 'basic' as const,
            label: t('dashboard.certifications.basic_info'),
            icon: Info,
            description: 'Titre, catégorie, examen',
            isComplete: isBasicTabComplete(),
        },
        {
            id: 'content' as const,
            label: t('dashboard.certifications.detailed_content'),
            icon: BookOpen,
            description: 'Contenu riche détaillé',
            isComplete: isContentTabComplete(),
        },
        ...(isEditing && certificationId
            ? [
                  {
                      id: 'documents' as const,
                      label: t('dashboard.certifications.documents'),
                      icon: FileText,
                      description: 'Fichiers et ressources',
                      isComplete: true,
                  },
              ]
            : []),
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                {/* Header amélioré */}
                <div className="relative border-b border-gray-200 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-5 dark:border-gray-700 dark:from-primary/20 dark:via-primary/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 dark:bg-primary/30">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {isEditing ? t('dashboard.certifications.edit_certification') : t('dashboard.certifications.add_certification')}
                                </h2>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                    {isEditing
                                        ? `Modification de "${existingCertification?.title_fr || ''}"`
                                        : 'Créez une nouvelle certification professionnelle'}
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

                {/* Navigation par onglets améliorée */}
                <div className="border-b border-gray-200 bg-gray-50/50 px-6 dark:border-gray-700 dark:bg-gray-800/50">
                    <div className="flex gap-1 py-2">
                        {tabs.map((tab, index) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-white text-primary shadow-sm dark:bg-gray-900 dark:text-accent'
                                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100'
                                    }`}
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:group-hover:bg-gray-600">
                                        {tab.isComplete && !isActive ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Icon className={`h-4 w-4 ${isActive ? 'text-primary dark:text-accent' : 'text-gray-500'}`} />
                                        )}
                                    </span>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">Étape {index + 1}</span>
                                        </div>
                                        <span className="block">{tab.label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Language Switcher amélioré */}
                {activeTab !== 'documents' && (
                    <div className="border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-900">
                        <LanguageSwitcher
                            currentLanguage={currentLanguage}
                            onLanguageChange={setCurrentLanguage}
                            onAutoTranslate={handleAutoTranslate}
                            isTranslating={isTranslating}
                            showTranslateButton={true}
                        />
                    </div>
                )}

                {/* Content avec scroll */}
                <div className="flex-1 overflow-y-auto bg-gray-50/30 p-6 dark:bg-gray-800/30">
                    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
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

                {/* Footer amélioré avec navigation et actions */}
                <div className="border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        {/* Navigation rapide */}
                        <div className="flex items-center gap-2">
                            {activeTab !== 'basic' && (
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(activeTab === 'documents' ? 'content' : 'basic')}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Précédent
                                </button>
                            )}
                            {activeTab === 'basic' && (
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('content')}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Suivant
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                            {activeTab === 'content' && isEditing && certificationId && (
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('documents')}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Suivant
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Actions principales */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={form.processing || isTranslating || !isBasicTabComplete()}
                                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {form.processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {t('dashboard.certifications.saving')}
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        {isEditing ? 'Mettre à jour' : 'Créer la certification'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
