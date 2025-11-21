import axios from 'axios';
import { FileText, Plus, Trash2, Upload, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    color: string;
}

interface CertificationDocumentsTabProps {
    certificationId?: number;
}

const TAG_COLORS = [
    { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-200', name: 'blue' },
    { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', name: 'green' },
    { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-200', name: 'purple' },
    { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-800 dark:text-orange-200', name: 'orange' },
    { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200', name: 'red' },
    { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-200', name: 'yellow' },
];

export function CertificationDocumentsTab({ certificationId }: CertificationDocumentsTabProps) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([
        { id: 1, name: 'Syllabus', color: 'blue' },
        { id: 2, name: 'Formation', color: 'green' },
        { id: 3, name: 'Examen blanc', color: 'purple' },
        { id: 4, name: 'Guide', color: 'orange' },
    ]);
    const [isUploading, setIsUploading] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [showNewTagInput, setShowNewTagInput] = useState(false);
    const [selectedTagColor, setSelectedTagColor] = useState('blue');

    const handleFileSelect = useCallback(
        async (files: FileList | null) => {
            if (!files || files.length === 0) return;

            setIsUploading(true);
            const formData = new FormData();

            Array.from(files).forEach((file) => {
                formData.append('files[]', file);
            });

            if (certificationId) {
                formData.append('certification_id', certificationId.toString());
            }

            try {
                const response = await axios.post('/dashboard/certifications/documents/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    setDocuments([...documents, ...response.data.data]);
                }
            } catch (error) {
                console.error('Error uploading files:', error);
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        },
        [certificationId, documents],
    );

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

    const handleDeleteDocument = async (documentId: number) => {
        try {
            await axios.delete(`/dashboard/certifications/documents/${documentId}/delete`);
            setDocuments(documents.filter((doc) => doc.id !== documentId));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const handleAddTagToDocument = async (documentId: number, tagId: number) => {
        try {
            const response = await axios.post(`/dashboard/certifications/documents/${documentId}/tags/attach`, {
                tag_id: tagId,
            });

            if (response.data.success) {
                setDocuments(
                    documents.map((doc) => (doc.id === documentId ? { ...doc, tags: [...doc.tags, response.data.data] } : doc)),
                );
            }
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    const handleRemoveTagFromDocument = async (documentId: number, tagId: number) => {
        try {
            await axios.post(`/dashboard/certifications/documents/${documentId}/tags/detach`, {
                tag_id: tagId,
            });

            setDocuments(documents.map((doc) => (doc.id === documentId ? { ...doc, tags: doc.tags.filter((t) => t.id !== tagId) } : doc)));
        } catch (error) {
            console.error('Error removing tag:', error);
        }
    };

    const handleCreateTag = async () => {
        if (!newTagName.trim()) return;

        try {
            const response = await axios.post('/dashboard/certifications/tags/store', {
                name: newTagName,
                color: selectedTagColor,
            });

            if (response.data.success) {
                setAvailableTags([...availableTags, response.data.data]);
                setNewTagName('');
                setShowNewTagInput(false);
            }
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };

    const getTagColorClasses = (colorName: string) => {
        const color = TAG_COLORS.find((c) => c.name === colorName);
        return color || TAG_COLORS[0];
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Gestion des documents</h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Ajoutez des documents liés à cette certification (syllabus, guides, exemples d'examens, etc.)
                </p>

                {/* Upload area */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-6 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-colors hover:border-secondary dark:border-gray-600 dark:bg-gray-800 dark:hover:border-accent"
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center">
                            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Téléchargement en cours...</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Cliquez pour charger</span> ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX, XLS, XLSX (MAX. 10MB)</p>
                        </>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                    />
                </div>

                {/* Documents list */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Documents chargés ({documents.length})
                    </h4>

                    {documents.length > 0 ? (
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 dark:bg-accent/10">
                                            <FileText className="h-6 w-6 text-secondary dark:text-accent" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                {doc.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(doc.file_size)}</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {doc.tags.map((tag) => {
                                                    const colorClasses = getTagColorClasses(tag.color);
                                                    return (
                                                        <span
                                                            key={tag.id}
                                                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}
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
                                                    );
                                                })}
                                                <select
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            handleAddTagToDocument(doc.id, parseInt(e.target.value));
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-600 hover:border-secondary hover:text-secondary dark:border-gray-600 dark:text-gray-400"
                                                >
                                                    <option value="">+ Ajouter un tag</option>
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
                                        className="ml-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                            <FileText className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Aucun document chargé pour le moment
                            </p>
                        </div>
                    )}
                </div>

                {/* Tag management */}
                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Tags disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => {
                            const colorClasses = getTagColorClasses(tag.color);
                            return (
                                <span
                                    key={tag.id}
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}
                                >
                                    {tag.name}
                                </span>
                            );
                        })}
                        {showNewTagInput ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    placeholder="Nom du tag"
                                    className="rounded-lg border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCreateTag();
                                        }
                                    }}
                                />
                                <select
                                    value={selectedTagColor}
                                    onChange={(e) => setSelectedTagColor(e.target.value)}
                                    className="rounded-lg border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    {TAG_COLORS.map((color) => (
                                        <option key={color.name} value={color.name}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={handleCreateTag}
                                    className="rounded-lg bg-secondary px-2 py-1 text-xs text-white hover:bg-secondary/90"
                                >
                                    Créer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewTagInput(false);
                                        setNewTagName('');
                                    }}
                                    className="rounded-lg px-2 py-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400"
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
                                Créer un tag
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
