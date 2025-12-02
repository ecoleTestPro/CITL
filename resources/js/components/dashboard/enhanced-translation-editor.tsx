import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MiniRichTextEditor } from '@/components/ui/mini-rich-text-editor';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Loader2 } from 'lucide-react';

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
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    if (!translations || Object.keys(translations).length === 0) {
        return <div className="flex items-center justify-center py-8 text-muted-foreground">Aucune traduction disponible pour cette page.</div>;
    }

    const renderField = (key: string, value: string, fieldMeta?: FieldMetadata) => {
        const label = fieldMeta?.label || key;
        const description = fieldMeta?.description;
        const placeholder = fieldMeta?.placeholder;
        const maxLength = fieldMeta?.maxLength;
        const type = fieldMeta?.type || 'text';

        // Déterminer le type de champ automatiquement si non spécifié
        const autoDetectType = (): 'text' | 'textarea' | 'richtext' => {
            return 'richtext';
            if (type === 'richtext') return 'richtext';
            if (type === 'textarea') return 'textarea';
            // Auto-detect basé sur le contenu
            if (value.includes('<') && value.includes('>')) return 'richtext';
            if (value.length > 150) return 'textarea';
            return 'text';
        };

        const fieldType = autoDetectType();
        const charCount = value.replace(/<[^>]*>/g, '').length; // Strip HTML for char count
        const isNearLimit = maxLength && charCount > maxLength * 0.8;
        const isOverLimit = maxLength && charCount > maxLength;

        return (
            <div key={key} className="space-y-2 rounded-lg border bg-card p-4 transition-colors hover:border-primary/50">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <Label htmlFor={key} className="text-sm font-semibold text-foreground">
                                {label}
                            </Label>
                            {description && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="max-w-xs">{description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                            {fieldType === 'richtext' && (
                                <Badge variant="secondary" className="bg-orange-100 text-xs text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
                                    Texte riche
                                </Badge>
                            )}
                        </div>
                        {description && <p className="text-xs text-muted-foreground">{description}</p>}
                    </div>
                    {maxLength && (
                        <div className="flex items-center gap-1">
                            <span
                                className={`text-xs ${
                                    isOverLimit ? 'font-semibold text-destructive' : isNearLimit ? 'text-orange-500' : 'text-muted-foreground'
                                }`}
                            >
                                {charCount}/{maxLength}
                            </span>
                        </div>
                    )}
                </div>

                {fieldType === 'richtext' ? (
                    <MiniRichTextEditor content={value} onChange={(content) => onTranslationChange(key, content)} placeholder={placeholder} minHeight="120px" />
                ) : fieldType === 'textarea' ? (
                    <Textarea
                        id={key}
                        value={value}
                        onChange={(e) => onTranslationChange(key, e.target.value)}
                        placeholder={placeholder}
                        rows={4}
                        className="resize-y font-sans"
                        maxLength={maxLength}
                    />
                ) : (
                    <Input
                        id={key}
                        value={value}
                        onChange={(e) => onTranslationChange(key, e.target.value)}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className="font-sans"
                    />
                )}
            </div>
        );
    };

    // If we have sections, render with accordion
    if (Object.keys(sections).length > 0) {
        return (
            <Accordion type="multiple" defaultValue={Object.keys(sections)} className="space-y-2">
                {Object.entries(sections).map(([sectionName, fields]) => (
                    <AccordionItem key={sectionName} value={sectionName} className="rounded-lg border px-4">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{sectionName}</span>
                                <Badge variant="outline" className="text-xs">
                                    {fields.length} {fields.length === 1 ? 'champ' : 'champs'}
                                </Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 pt-4">
                            {fields.map(({ key }) => renderField(key, translations[key] || '', metadata[key]))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        );
    }

    // Fallback to simple list if no sections
    return <div className="space-y-4">{Object.entries(translations).map(([key, value]) => renderField(key, value, metadata[key]))}</div>;
}
