import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { MiniRichTextEditor } from '@/components/ui/mini-rich-text-editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ChevronRight, FileText, Loader2, Type } from 'lucide-react';

interface FieldMetadata {
    label: string;
    description: string;
    type: 'text' | 'textarea' | 'richtext';
    maxLength?: number;
    placeholder?: string;
    section: string;
}

interface Section {
    key: string;
    metadata: FieldMetadata;
}

interface EnhancedTranslationEditorProps {
    translations: { [key: string]: string };
    selectedLocale: string;
    loading: boolean;
    sections?: { [section: string]: Section[] };
    metadata?: { [key: string]: FieldMetadata };
    onTranslationChange: (key: string, value: string) => void;
}

export function EnhancedTranslationEditor({
    translations,
    selectedLocale,
    loading,
    sections = {},
    metadata = {},
    onTranslationChange,
}: EnhancedTranslationEditorProps) {
    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!translations || Object.keys(translations).length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
                <FileText className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Aucune traduction disponible pour cette page.</p>
            </div>
        );
    }

    const renderField = (key: string, value: string, fieldMeta?: FieldMetadata) => {
        const label = fieldMeta?.label || key.split('.').pop() || key;
        const placeholder = fieldMeta?.placeholder;
        const maxLength = fieldMeta?.maxLength;
        const type = fieldMeta?.type || 'text';

        // Auto-detect field type
        const autoDetectType = (): 'text' | 'textarea' | 'richtext' => {
            if (type === 'richtext') return 'richtext';
            if (type === 'textarea') return 'textarea';
            if (value.includes('<') && value.includes('>')) return 'richtext';
            if (value.length > 150) return 'textarea';
            return 'text';
        };

        const fieldType = autoDetectType();
        const charCount = value.replace(/<[^>]*>/g, '').length;
        const isNearLimit = maxLength && charCount > maxLength * 0.8;
        const isOverLimit = maxLength && charCount > maxLength;

        return (
            <div key={key} className="group">
                <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor={key} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                        {fieldType === 'richtext' && <Type className="h-3 w-3 text-orange-500" />}
                        <span className="truncate">{label}</span>
                    </label>
                    {maxLength && (
                        <span
                            className={cn(
                                'text-[10px] tabular-nums',
                                isOverLimit ? 'font-medium text-red-500' : isNearLimit ? 'text-orange-500' : 'text-gray-400',
                            )}
                        >
                            {charCount}/{maxLength}
                        </span>
                    )}
                </div>

                {fieldType === 'richtext' ? (
                    <MiniRichTextEditor
                        content={value}
                        onChange={(content) => onTranslationChange(key, content)}
                        placeholder={placeholder}
                        minHeight="100px"
                    />
                ) : fieldType === 'textarea' ? (
                    <Textarea
                        id={key}
                        value={value}
                        onChange={(e) => onTranslationChange(key, e.target.value)}
                        placeholder={placeholder}
                        rows={3}
                        maxLength={maxLength}
                        className="resize-none border-gray-200 bg-white text-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
                    />
                ) : (
                    <Input
                        id={key}
                        value={value}
                        onChange={(e) => onTranslationChange(key, e.target.value)}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className="h-9 border-gray-200 bg-white text-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
                    />
                )}
            </div>
        );
    };

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
                                <div className="space-y-4">
                                    {fields.map(({ key }) => renderField(key, translations[key] || '', metadata[key]))}
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
            <div className="space-y-4">{Object.entries(translations).map(([key, value]) => renderField(key, value, metadata[key]))}</div>
        </ScrollArea>
    );
}
