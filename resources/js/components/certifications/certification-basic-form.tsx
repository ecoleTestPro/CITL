import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CertificationCategory, CertificationFormData, SupportedLanguage } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { Clock, FileText, HelpCircle, ImageIcon, Target, Trash2, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CertificationBasicFormProps {
    form: InertiaFormProps<CertificationFormData>;
    categories: CertificationCategory[];
    currentLanguage: SupportedLanguage;
    existingFeaturedImage?: string | null;
    existingSyllabusFile?: string | null;
    onFeaturedImageChange?: (file: File | null) => void;
    onSyllabusFileChange?: (file: File | null) => void;
    onRemoveFeaturedImage?: () => void;
    onRemoveSyllabusFile?: () => void;
}

// Composant pour les sections avec titre et icône
function FormSection({
    title,
    icon: Icon,
    children,
    hint,
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    hint?: string;
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                    {hint && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}

// Composant pour les champs avec label et indicateur requis
function FormField({
    label,
    required,
    hint,
    children,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
                {hint && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <HelpCircle className="h-3 w-3" />
                        {hint}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

export function CertificationBasicForm({
    form,
    categories,
    currentLanguage,
    existingFeaturedImage,
    existingSyllabusFile,
    onFeaturedImageChange,
    onSyllabusFileChange,
    onRemoveFeaturedImage,
    onRemoveSyllabusFile,
}: CertificationBasicFormProps) {
    const { t } = useTranslation();
    const featuredImageRef = useRef<HTMLInputElement>(null);
    const syllabusFileRef = useRef<HTMLInputElement>(null);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
    const [syllabusFileName, setSyllabusFileName] = useState<string | null>(null);

    // Helper pour obtenir la clé du champ en fonction de la langue
    const getFieldKey = (field: string) => `${field}_${currentLanguage}` as keyof CertificationFormData;

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

    useEffect(() => {
        setFeaturedImagePreview(existingFeaturedImage || null);
        setSyllabusFileName(existingSyllabusFile ? existingSyllabusFile.split('/').pop() || null : null);
    }, [existingFeaturedImage, existingSyllabusFile]);

    const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFeaturedImagePreview(URL.createObjectURL(file));
            onFeaturedImageChange?.(file);
        }
    };

    const handleSyllabusFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSyllabusFileName(file.name);
            onSyllabusFileChange?.(file);
        }
    };

    const handleRemoveFeaturedImage = () => {
        setFeaturedImagePreview(null);
        if (featuredImageRef.current) {
            featuredImageRef.current.value = '';
        }
        onRemoveFeaturedImage?.();
    };

    const handleRemoveSyllabusFile = () => {
        setSyllabusFileName(null);
        if (syllabusFileRef.current) {
            syllabusFileRef.current.value = '';
        }
        onRemoveSyllabusFile?.();
    };

    const languageIndicator = (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                currentLanguage === 'fr' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}
        >
            {currentLanguage === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
        </span>
    );

    const inputClasses =
        'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder:text-gray-400';

    return (
        <div className="space-y-6">
            {/* Section Identification */}
            <FormSection title="Identification" icon={Target} hint="Informations principales de la certification">
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField label={t('dashboard.certifications.category')} required>
                            <Select
                                value={form.data.certification_category_id ? String(form.data.certification_category_id) : ''}
                                onValueChange={(value) => form.setData('certification_category_id', parseInt(value))}
                            >
                                <SelectTrigger className={inputClasses}>
                                    <SelectValue placeholder={t('dashboard.certifications.select_category')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>

                        <div className="flex items-end">
                            <div className="flex h-[42px] items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 dark:border-gray-600 dark:bg-gray-700/50">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Langue actuelle :</span>
                                {languageIndicator}
                            </div>
                        </div>
                    </div>

                    <FormField label={`${t('dashboard.certifications.title')}`} required hint={currentLanguage === 'fr' ? 'Champ obligatoire' : 'Optional'}>
                        <input
                            type="text"
                            value={getFieldValue('title')}
                            onChange={(e) => setFieldValue('title', e.target.value)}
                            className={inputClasses}
                            required={currentLanguage === 'fr'}
                            placeholder={currentLanguage === 'fr' ? 'Ex: CTFL v4.0' : 'Ex: CTFL v4.0'}
                        />
                    </FormField>

                    <FormField label={t('dashboard.certifications.subtitle')} hint="Nom complet de la certification">
                        <input
                            type="text"
                            value={getFieldValue('subtitle')}
                            onChange={(e) => setFieldValue('subtitle', e.target.value)}
                            className={inputClasses}
                            placeholder={currentLanguage === 'fr' ? 'Ex: Certified Tester Foundation Level' : 'Ex: Certified Tester Foundation Level'}
                        />
                    </FormField>

                    <FormField label={t('dashboard.certifications.short_description')} hint="Résumé affiché dans les listes">
                        <textarea
                            value={getFieldValue('description')}
                            onChange={(e) => setFieldValue('description', e.target.value)}
                            className={`${inputClasses} resize-none`}
                            rows={3}
                            placeholder={
                                currentLanguage === 'fr'
                                    ? 'Décrivez brièvement la certification en 2-3 phrases...'
                                    : 'Briefly describe the certification in 2-3 sentences...'
                            }
                        />
                        <p className="mt-1 text-xs text-gray-400">{getFieldValue('description').length} / 500 caractères recommandés</p>
                    </FormField>
                </div>
            </FormSection>

            {/* Section Médias */}
            <FormSection title="Médias" icon={ImageIcon} hint="Image et document de la certification">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Image à la une */}
                    <div className="space-y-3">
                        <FormField label={t('dashboard.certifications.featured_image')} hint="Format: JPG, PNG, WEBP">
                            <div className="mt-1">
                                {featuredImagePreview ? (
                                    <div className="group relative overflow-hidden rounded-lg">
                                        <img src={featuredImagePreview} alt="Image à la une" className="h-40 w-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button
                                                type="button"
                                                onClick={handleRemoveFeaturedImage}
                                                className="rounded-full bg-red-500 p-3 text-white transition-transform hover:scale-110"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => featuredImageRef.current?.click()}
                                        className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 transition-all hover:border-primary hover:bg-primary/5 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-primary"
                                    >
                                        <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cliquez pour ajouter</p>
                                        <p className="mt-1 text-xs text-gray-400">Max. 5MB</p>
                                    </div>
                                )}
                                <input
                                    ref={featuredImageRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                    onChange={handleFeaturedImageChange}
                                    className="hidden"
                                />
                            </div>
                        </FormField>
                    </div>

                    {/* Document Syllabus */}
                    <div className="space-y-3">
                        <FormField label={t('dashboard.certifications.syllabus_document')} hint="Format: PDF uniquement">
                            <div className="mt-1">
                                {syllabusFileName ? (
                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                                                <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                                            </div>
                                            <div>
                                                <p className="max-w-[150px] truncate text-sm font-medium text-gray-900 dark:text-gray-100">{syllabusFileName}</p>
                                                <p className="text-xs text-gray-500">Document PDF</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveSyllabusFile}
                                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => syllabusFileRef.current?.click()}
                                        className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 transition-all hover:border-primary hover:bg-primary/5 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-primary"
                                    >
                                        <Upload className="mb-2 h-8 w-8 text-gray-400" />
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cliquez pour ajouter</p>
                                        <p className="mt-1 text-xs text-gray-400">Max. 10MB</p>
                                    </div>
                                )}
                                <input ref={syllabusFileRef} type="file" accept=".pdf" onChange={handleSyllabusFileChange} className="hidden" />
                            </div>
                        </FormField>
                    </div>
                </div>
            </FormSection>

            {/* Section Examen */}
            <FormSection title="Informations sur l'examen" icon={Clock} hint="Paramètres de l'examen de certification">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <FormField label={t('dashboard.certifications.num_questions')}>
                        <div className="relative">
                            <input
                                type="number"
                                value={form.data.exam_questions}
                                onChange={(e) => form.setData('exam_questions', parseInt(e.target.value) || 0)}
                                className={inputClasses}
                                min="0"
                                placeholder="40"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Q</span>
                        </div>
                    </FormField>

                    <FormField label={t('dashboard.certifications.passing_score')}>
                        <div className="relative">
                            <input
                                type="number"
                                value={form.data.exam_passing_score}
                                onChange={(e) => form.setData('exam_passing_score', parseInt(e.target.value) || 0)}
                                className={inputClasses}
                                min="0"
                                max="100"
                                placeholder="65"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                        </div>
                    </FormField>

                    <FormField label={t('dashboard.certifications.total_points')}>
                        <div className="relative">
                            <input
                                type="number"
                                value={form.data.exam_total_points}
                                onChange={(e) => form.setData('exam_total_points', parseInt(e.target.value) || 0)}
                                className={inputClasses}
                                min="0"
                                placeholder="40"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">pts</span>
                        </div>
                    </FormField>

                    <FormField label={t('dashboard.certifications.duration')}>
                        <input
                            type="text"
                            value={form.data.exam_duration}
                            onChange={(e) => form.setData('exam_duration', e.target.value)}
                            className={inputClasses}
                            placeholder="60 min"
                        />
                    </FormField>
                </div>

                {/* Aperçu des données d'examen */}
                {(form.data.exam_questions > 0 || form.data.exam_passing_score > 0) && (
                    <div className="mt-4 rounded-lg bg-primary/5 p-4 dark:bg-primary/10">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-gray-100">Aperçu :</span> L'examen comporte{' '}
                            <span className="font-semibold text-primary">{form.data.exam_questions || '—'}</span> questions pour un total de{' '}
                            <span className="font-semibold text-primary">{form.data.exam_total_points || '—'}</span> points. Score minimum requis :{' '}
                            <span className="font-semibold text-primary">{form.data.exam_passing_score || '—'}%</span>. Durée :{' '}
                            <span className="font-semibold text-primary">{form.data.exam_duration || '—'}</span>.
                        </p>
                    </div>
                )}
            </FormSection>

            {/* Section Statut */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${form.data.is_active ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}
                        >
                            <div className={`h-3 w-3 rounded-full ${form.data.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('dashboard.certifications.cert_active')}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {form.data.is_active ? 'La certification sera visible sur le site public' : 'La certification sera masquée'}
                            </p>
                        </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            checked={form.data.is_active}
                            onChange={(e) => form.setData('is_active', e.target.checked)}
                            className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-primary/20 dark:bg-gray-700" />
                    </label>
                </div>
            </div>
        </div>
    );
}
