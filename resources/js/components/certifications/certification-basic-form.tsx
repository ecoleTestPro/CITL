import { CertificationCategory, CertificationFormData } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { FileText, ImageIcon, Trash2, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CertificationBasicFormProps {
    form: InertiaFormProps<CertificationFormData>;
    categories: CertificationCategory[];
    existingFeaturedImage?: string | null;
    existingSyllabusFile?: string | null;
    onFeaturedImageChange?: (file: File | null) => void;
    onSyllabusFileChange?: (file: File | null) => void;
    onRemoveFeaturedImage?: () => void;
    onRemoveSyllabusFile?: () => void;
}

export function CertificationBasicForm({
    form,
    categories,
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Sous-titre</label>
                    <input
                        type="text"
                        value={form.data.subtitle}
                        onChange={(e) => form.setData('subtitle', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description courte</label>
                    <textarea
                        value={form.data.description}
                        onChange={(e) => form.setData('description', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows={3}
                    />
                </div>
            </div>

            {/* Featured Image Section */}
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Image à la une</h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Cette image sera affichée sur la carte de certification sur les pages publiques.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        {featuredImagePreview ? (
                            <div className="relative">
                                <img
                                    src={featuredImagePreview}
                                    alt="Image à la une"
                                    className="h-48 w-full rounded-lg object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveFeaturedImage}
                                    className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => featuredImageRef.current?.click()}
                                className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-primary dark:border-gray-600 dark:bg-gray-800 dark:hover:border-primary"
                            >
                                <ImageIcon className="mb-2 h-10 w-10 text-gray-400" />
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cliquez pour ajouter une image</p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">JPG, PNG, WEBP (max. 5MB)</p>
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
                </div>
            </div>

            {/* Syllabus Section */}
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Document Syllabus</h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Téléchargez le document Syllabus officiel de la certification (PDF uniquement).
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        {syllabusFileName ? (
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{syllabusFileName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Document Syllabus</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveSyllabusFile}
                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => syllabusFileRef.current?.click()}
                                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:border-primary dark:border-gray-600 dark:bg-gray-800 dark:hover:border-primary"
                            >
                                <Upload className="mb-2 h-8 w-8 text-gray-400" />
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cliquez pour charger le Syllabus</p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">PDF uniquement (max. 10MB)</p>
                            </div>
                        )}
                        <input
                            ref={syllabusFileRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleSyllabusFileChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Informations sur l'examen</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de questions</label>
                        <input
                            type="number"
                            value={form.data.exam_questions}
                            onChange={(e) => form.setData('exam_questions', parseInt(e.target.value))}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Score requis (%)</label>
                        <input
                            type="number"
                            value={form.data.exam_passing_score}
                            onChange={(e) => form.setData('exam_passing_score', parseInt(e.target.value))}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Points totaux</label>
                        <input
                            type="number"
                            value={form.data.exam_total_points}
                            onChange={(e) => form.setData('exam_total_points', parseInt(e.target.value))}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Durée</label>
                        <input
                            type="text"
                            value={form.data.exam_duration}
                            onChange={(e) => form.setData('exam_duration', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="60 min"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Autres informations</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2 md:col-span-2">
                        <input
                            type="checkbox"
                            checked={form.data.is_active}
                            onChange={(e) => form.setData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Certification active et visible</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
