import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, ImageIcon, Loader2 } from 'lucide-react';
import { ImageUploader } from './image-uploader';

interface ImageMetadata {
    label: string;
    description: string;
    recommendedSize: string;
    maxSize: number;
    acceptedFormats: string[];
    section: string;
}

interface ImageSection {
    key: string;
    metadata: ImageMetadata;
}

interface EnhancedImageEditorProps {
    images: { [key: string]: string };
    loading: boolean;
    uploading: boolean;
    uploadingKey: string | null;
    sections?: { [section: string]: ImageSection[] };
    onUpload: (key: string, file: File) => Promise<void>;
}

export function EnhancedImageEditor({ images, loading, uploading, uploadingKey, sections = {}, onUpload }: EnhancedImageEditorProps) {
    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!images || Object.keys(images).length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
                <ImageIcon className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Aucune image disponible pour cette page.</p>
            </div>
        );
    }

    // Render with sections (accordion)
    if (Object.keys(sections).length > 0) {
        return (
            <ScrollArea className="h-full pr-3">
                <Accordion type="multiple" defaultValue={Object.keys(sections)} className="space-y-2">
                    {Object.entries(sections).map(([sectionName, fields]) => (
                        <AccordionItem
                            key={sectionName}
                            value={sectionName}
                            className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                        >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-90">
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{sectionName}</span>
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                        {fields.length}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="border-t border-gray-100 bg-gray-50/50 px-4 py-4 dark:border-gray-800 dark:bg-gray-950/50">
                                <div className="space-y-6">
                                    {fields.map(({ key, metadata }) => (
                                        <ImageUploader
                                            key={key}
                                            imageKey={key}
                                            currentPath={images[key] || ''}
                                            label={metadata.label}
                                            description={metadata.description}
                                            recommendedSize={metadata.recommendedSize}
                                            acceptedFormats={metadata.acceptedFormats}
                                            maxSize={metadata.maxSize}
                                            uploading={uploading && uploadingKey === key}
                                            onUpload={onUpload}
                                        />
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        );
    }

    // Fallback to simple list
    return (
        <ScrollArea className="h-full pr-3">
            <div className="space-y-6">
                {Object.entries(images).map(([key, path]) => (
                    <ImageUploader
                        key={key}
                        imageKey={key}
                        currentPath={path}
                        label={key.replace(/_/g, ' ')}
                        uploading={uploading && uploadingKey === key}
                        onUpload={onUpload}
                    />
                ))}
            </div>
        </ScrollArea>
    );
}
