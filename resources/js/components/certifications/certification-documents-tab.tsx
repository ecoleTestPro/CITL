import axios from 'axios';
import { FileText, Plus, Trash2, Upload, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

interface Document {
    id: number;
    name: string;
    file_path: string;
    file_size: number;
    file_type: string;
    tags: Tag[];
}

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface PendingFile {
    file: File;
    tagIds: number[];
}

interface CertificationDocumentsTabProps {
    certificationId?: number;
}

export function CertificationDocumentsTab({ certificationId }: CertificationDocumentsTabProps) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [showNewTagInput, setShowNewTagInput] = useState(false);

    // Load documents and tags on mount
    useEffect(() => {
        if (certificationId) {
            loadDocuments();
        }
        loadTags();
    }, [certificationId]);

    const loadDocuments = async () => {
        if (!certificationId) return;

        try {
            const response = await axios.get(`/dashboard/certifications/${certificationId}/documents`);
            if (response.data.success) {
                setDocuments(response.data.data.documents || []);
            }
        } catch (error) {
            console.error('Error loading documents:', error);
        }
    };

    const loadTags = async () => {
        try {
            const response = await axios.get('/dashboard/certifications/tags');
            if (response.data.success) {
                setAvailableTags(response.data.data.tags || []);
            }
        } catch (error) {
            console.error('Error loading tags:', error);
        }
    };

    const handleFileSelect = useCallback((files: FileList | null) => {
        if (!files || files.length === 0) return;

        const newPendingFiles: PendingFile[] = Array.from(files).map((file) => ({
            file,
            tagIds: [],
        }));

        setPendingFiles([...pendingFiles, ...newPendingFiles]);
    }, [pendingFiles]);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            handleFileSelect(e.dataTransfer.files);
        },
        [handleFileSelect],
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const handleRemovePendingFile = (index: number) => {
        setPendingFiles(pendingFiles.filter((_, i) => i !== index));
    };

    const handleToggleTagForPendingFile = (fileIndex: number, tagId: number) => {
        setPendingFiles(
            pendingFiles.map((pf, i) => {
                if (i === fileIndex) {
                    const tagIds = pf.tagIds.includes(tagId) ? pf.tagIds.filter((id) => id !== tagId) : [...pf.tagIds, tagId];
                    return { ...pf, tagIds };
                }
                return pf;
            }),
        );
    };

    const handleConfirmUpload = async () => {
        if (pendingFiles.length === 0) return;

        setIsUploading(true);

        try {
            // Upload files one by one with their tags
            for (const pendingFile of pendingFiles) {
                const formData = new FormData();
                formData.append('files[]', pendingFile.file);

                if (certificationId) {
                    formData.append('certification_id', certificationId.toString());
                }

                const response = await axios.post('/dashboard/certifications/documents/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success && response.data.data.documents.length > 0) {
                    const uploadedDoc = response.data.data.documents[0];

                    // Attach tags if any
                    if (pendingFile.tagIds.length > 0) {
                        for (const tagId of pendingFile.tagIds) {
                            await axios.post(`/dashboard/certifications/documents/${uploadedDoc.id}/tags/attach`, {
                                tag_id: tagId,
                            });
                        }

                        // Reload document with tags
                        const docResponse = await axios.get(`/dashboard/certifications/${certificationId}/documents`);
                        if (docResponse.data.success) {
                            setDocuments(docResponse.data.data.documents || []);
                        }
                    } else {
                        setDocuments([...documents, uploadedDoc]);
                    }
                }
            }

            setPendingFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            toast.success(
                pendingFiles.length > 1
                    ? `${pendingFiles.length} documents importés avec succès`
                    : 'Document importé avec succès',
            );
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error('Erreur lors de l\'importation des documents');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancelUpload = () => {
        setPendingFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteDocument = async (documentId: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ? Cette action est irréversible.')) {
            return;
        }

        try {
            await axios.delete(`/dashboard/certifications/documents/${documentId}/delete`);
            setDocuments(documents.filter((doc) => doc.id !== documentId));
            toast.success('Document supprimé avec succès');
        } catch (error) {
            console.error('Error deleting document:', error);
            toast.error('Erreur lors de la suppression du document');
        }
    };

    const handleAddTagToDocument = async (documentId: number, tagId: number) => {
        try {
            const response = await axios.post(`/dashboard/certifications/documents/${documentId}/tags/attach`, {
                tag_id: tagId,
            });

            if (response.data.success) {
                setDocuments(documents.map((doc) => (doc.id === documentId ? { ...doc, tags: [...doc.tags, response.data.data.tag] } : doc)));
                toast.success('Catégorie ajoutée au document');
            }
        } catch (error) {
            console.error('Error adding tag:', error);
            toast.error('Erreur lors de l\'ajout de la catégorie');
        }
    };

    const handleRemoveTagFromDocument = async (documentId: number, tagId: number) => {
        try {
            await axios.post(`/dashboard/certifications/documents/${documentId}/tags/detach`, {
                tag_id: tagId,
            });

            setDocuments(documents.map((doc) => (doc.id === documentId ? { ...doc, tags: doc.tags.filter((t) => t.id !== tagId) } : doc)));
            toast.success('Catégorie retirée du document');
        } catch (error) {
            console.error('Error removing tag:', error);
            toast.error('Erreur lors du retrait de la catégorie');
        }
    };

    const handleCreateTag = async () => {
        if (!newTagName.trim()) return;

        try {
            const response = await axios.post('/dashboard/certifications/tags/store', {
                name: newTagName,
            });

            if (response.data.success) {
                setAvailableTags([...availableTags, response.data.data.tag]);
                setNewTagName('');
                setShowNewTagInput(false);
                toast.success('Nouvelle catégorie créée avec succès');
            }
        } catch (error) {
            console.error('Error creating tag:', error);
            toast.error('Erreur lors de la création de la catégorie');
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Gestion des documents</h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Ajoutez des documents liés à cette certification et organisez-les par catégories (syllabus, guides, examens blancs, etc.)
                </p>

                {/* Upload area */}
                {pendingFiles.length === 0 && (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                        className="mb-6 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-colors hover:border-secondary dark:border-gray-600 dark:bg-gray-800 dark:hover:border-accent"
                    >
                        <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Cliquez pour charger</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX, XLS, XLSX (MAX. 10MB)</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                            multiple
                            onChange={(e) => handleFileSelect(e.target.files)}
                        />
                    </div>
                )}

                {/* Pending files confirmation */}
                {pendingFiles.length > 0 && (
                    <div className="mb-6 space-y-4 rounded-lg border-2 border-secondary bg-secondary/5 p-4 dark:border-accent dark:bg-accent/5">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {pendingFiles.length} fichier{pendingFiles.length > 1 ? 's' : ''} sélectionné{pendingFiles.length > 1 ? 's' : ''}
                            </h4>
                            <button
                                onClick={handleCancelUpload}
                                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Annuler
                            </button>
                        </div>

                        <div className="space-y-3">
                            {pendingFiles.map((pf, index) => (
                                <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-secondary dark:text-accent" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{pf.file.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(pf.file.size)}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemovePendingFile(index)}
                                            className="text-gray-400 hover:text-red-600"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Tags selection */}
                                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-750">
                                        <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Catégories disponibles (optionnel)
                                        </p>
                                        <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                                            Sélectionnez une ou plusieurs catégories pour organiser ce document
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {availableTags.length > 0 ? (
                                                availableTags.map((tag) => (
                                                    <button
                                                        key={tag.id}
                                                        type="button"
                                                        onClick={() => handleToggleTagForPendingFile(index, tag.id)}
                                                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                                            pf.tagIds.includes(tag.id)
                                                                ? 'bg-secondary text-white dark:bg-accent'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                        }`}
                                                    >
                                                        {tag.name}
                                                    </button>
                                                ))
                                            ) : (
                                                <p className="text-xs italic text-gray-500 dark:text-gray-400">
                                                    Aucune catégorie disponible
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleConfirmUpload}
                                disabled={isUploading}
                                className="flex-1 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/90 disabled:opacity-50 dark:bg-accent dark:hover:bg-accent/90"
                            >
                                {isUploading ? 'Importation en cours...' : 'Confirmer l\'importation'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Documents list */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Documents importés ({documents.length})</h4>

                    {documents.length > 0 ? (
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="flex flex-1 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 dark:bg-accent/10">
                                            <FileText className="h-6 w-6 text-secondary dark:text-accent" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(doc.file_size)}</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {doc.tags.map((tag) => (
                                                    <span
                                                        key={tag.id}
                                                        className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary dark:bg-accent/10 dark:text-accent"
                                                    >
                                                        {tag.name}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTagFromDocument(doc.id, tag.id)}
                                                            className="hover:opacity-70"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                                <select
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            handleAddTagToDocument(doc.id, parseInt(e.target.value));
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                    className="rounded-full border border-dashed border-gray-300 bg-transparent px-2 py-0.5 text-xs font-medium text-gray-600 hover:border-secondary hover:text-secondary dark:border-gray-600 dark:text-gray-400"
                                                >
                                                    <option value="">+ Ajouter</option>
                                                    {availableTags
                                                        .filter((tag) => !doc.tags.some((t) => t.id === tag.id))
                                                        .map((tag) => (
                                                            <option key={tag.id} value={tag.id}>
                                                                {tag.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteDocument(doc.id)}
                                        className="ml-4 shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                            <FileText className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Aucun document importé pour le moment</p>
                        </div>
                    )}
                </div>

                {/* Tag management */}
                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Catégories disponibles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                            <span
                                key={tag.id}
                                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            >
                                {tag.name}
                            </span>
                        ))}
                        {showNewTagInput ? (
                            <div className="flex w-full gap-2">
                                <input
                                    type="text"
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    placeholder="Nom de la catégorie"
                                    className="flex-1 rounded-lg border border-gray-300 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCreateTag();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleCreateTag}
                                    className="rounded-lg bg-secondary px-3 py-1 text-sm text-white hover:bg-secondary/90"
                                >
                                    Créer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewTagInput(false);
                                        setNewTagName('');
                                    }}
                                    className="rounded-lg px-3 py-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400"
                                >
                                    Annuler
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowNewTagInput(true)}
                                className="inline-flex items-center gap-1 rounded-full border border-dashed border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:border-secondary hover:text-secondary dark:border-gray-600 dark:text-gray-400"
                            >
                                <Plus className="h-3 w-3" />
                                Créer une catégorie
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
