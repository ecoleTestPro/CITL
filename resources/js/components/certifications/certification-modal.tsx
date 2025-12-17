import { CertificationBasicForm } from '@/components/certifications/certification-basic-form';
import { CertificationContentForm } from '@/components/certifications/certification-content-form';
import { CertificationDocumentsTab } from '@/components/certifications/certification-documents-tab';
import { Certification, CertificationCategory, CertificationFormData } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { useState } from 'react';

interface CertificationModalProps {
    isOpen: boolean;
    isEditing: boolean;
    form: InertiaFormProps<CertificationFormData>;
    categories: CertificationCategory[];
    certificationId?: number;
    existingCertification?: Certification | null;
    onClose: () => void;
    onSubmit: (e: React.FormEvent, files: { featuredImage: File | null; syllabusFile: File | null; removeFeaturedImage: boolean; removeSyllabusFile: boolean }) => void;
}

export function CertificationModal({ isOpen, isEditing, form, categories, certificationId, existingCertification, onClose, onSubmit }: CertificationModalProps) {
    const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'documents'>('basic');
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
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent'
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
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                            }`}
                        >
                            Contenu détaillé
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
                                Documents
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="max-h-[calc(90vh-220px)] overflow-y-auto p-6">
                    <form onSubmit={handleSubmit}>
                        {activeTab === 'basic' && (
                            <CertificationBasicForm
                                form={form}
                                categories={categories}
                                existingFeaturedImage={existingCertification?.featured_image}
                                existingSyllabusFile={existingCertification?.syllabus_file}
                                onFeaturedImageChange={handleFeaturedImageChange}
                                onSyllabusFileChange={handleSyllabusFileChange}
                                onRemoveFeaturedImage={handleRemoveFeaturedImage}
                                onRemoveSyllabusFile={handleRemoveSyllabusFile}
                            />
                        )}
                        {activeTab === 'content' && <CertificationContentForm form={form} />}
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
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={form.processing}
                                className="flex-1 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                            >
                                {form.processing ? 'Enregistrement...' : 'Enregistrer'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
