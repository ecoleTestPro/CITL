import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

interface ImageUploaderProps {
    imageKey: string;
    currentPath: string;
    label: string;
    description?: string;
    recommendedSize?: string;
    acceptedFormats?: string[];
    maxSize?: number; // in MB
    uploading?: boolean;
    onUpload: (key: string, file: File) => Promise<void>;
}

export function ImageUploader({
    imageKey,
    currentPath,
    label,
    description,
    recommendedSize = '800x600',
    acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
    maxSize = 5,
    uploading = false,
    onUpload,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback(
        (file: File): string | null => {
            if (!acceptedFormats.includes(file.type)) {
                return `Format non supporté. Formats acceptés: ${acceptedFormats.map((f) => f.split('/')[1]).join(', ')}`;
            }
            if (file.size > maxSize * 1024 * 1024) {
                return `Le fichier est trop volumineux. Taille max: ${maxSize}MB`;
            }
            return null;
        },
        [acceptedFormats, maxSize],
    );

    const handleFileSelect = useCallback(
        (file: File) => {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }

            setError(null);
            setSelectedFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        },
        [validateFile],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files[0];
            if (file) {
                handleFileSelect(file);
            }
        },
        [handleFileSelect],
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                handleFileSelect(file);
            }
        },
        [handleFileSelect],
    );

    const handleUpload = useCallback(async () => {
        if (!selectedFile) return;

        try {
            await onUpload(imageKey, selectedFile);
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch {
            setError("Erreur lors de l'upload");
        }
    }, [selectedFile, imageKey, onUpload]);

    const handleCancel = useCallback(() => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const displayImage = previewUrl || currentPath;

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</h4>
                    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
                </div>
                <span className="text-[10px] text-gray-400">{recommendedSize}</span>
            </div>

            {/* Image Preview / Drop Zone */}
            <div
                className={cn(
                    'relative overflow-hidden rounded-lg border-2 border-dashed transition-all',
                    isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700',
                    'hover:border-primary/50',
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {displayImage ? (
                    <div className="relative aspect-video w-full">
                        <img src={displayImage} alt={label} className="h-full w-full object-cover" />
                        {previewUrl && (
                            <div className="absolute top-2 left-2 rounded bg-orange-500 px-2 py-0.5 text-[10px] font-medium text-white">Nouveau</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                            <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                                <Upload className="mr-1.5 h-3.5 w-3.5" />
                                Changer
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 p-4"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                        <p className="text-xs text-gray-500">Glissez-déposez ou cliquez pour sélectionner</p>
                        <p className="text-[10px] text-gray-400">
                            {acceptedFormats.map((f) => f.split('/')[1].toUpperCase()).join(', ')} - Max {maxSize}MB
                        </p>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && <p className="text-xs text-red-500">{error}</p>}

            {/* Actions */}
            {selectedFile && (
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-gray-500">{selectedFile.name}</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={uploading}>
                            <X className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" onClick={handleUpload} disabled={uploading} className="bg-citl-orange hover:bg-citl-orange/90">
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    Upload...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-1.5 h-3.5 w-3.5" />
                                    Enregistrer
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {/* Hidden Input */}
            <input ref={fileInputRef} type="file" accept={acceptedFormats.join(',')} className="hidden" onChange={handleInputChange} />
        </div>
    );
}
