import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MiniRichTextEditor } from '@/components/ui/mini-rich-text-editor';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface TranslationEditorProps {
    translations: { [key: string]: string };
    selectedLocale: string;
    loading: boolean;
    onTranslationChange: (key: string, value: string) => void;
}

export function TranslationEditor({ translations, selectedLocale, loading, onTranslationChange }: TranslationEditorProps) {
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

    // Déterminer le type de champ automatiquement basé sur le contenu
    const getFieldType = (value: string): 'text' | 'textarea' | 'richtext' => {
        // Si contient du HTML, c'est du richtext
        if (value.includes('<') && value.includes('>')) return 'richtext';
        // Si le texte est long, utiliser textarea
        if (value.length > 150) return 'textarea';
        return 'text';
    };

    return (
        <div className="space-y-4">
            {Object.entries(translations).map(([key, value]) => {
                const fieldType = getFieldType(value);

                return (
                    <div key={key} className="space-y-2 rounded-lg border bg-card p-4 transition-colors hover:border-primary/50">
                        <div className="flex items-center gap-2">
                            <Label htmlFor={key} className="text-sm font-medium text-muted-foreground">
                                {key}
                            </Label>
                            {fieldType === 'richtext' && (
                                <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
                                    Texte riche
                                </Badge>
                            )}
                        </div>

                        {fieldType === 'richtext' ? (
                            <MiniRichTextEditor
                                content={value}
                                onChange={(content) => onTranslationChange(key, content)}
                                minHeight="100px"
                            />
                        ) : fieldType === 'textarea' ? (
                            <Textarea
                                id={key}
                                value={value}
                                onChange={(e) => onTranslationChange(key, e.target.value)}
                                rows={4}
                                className="resize-y"
                            />
                        ) : (
                            <Input
                                id={key}
                                value={value}
                                onChange={(e) => onTranslationChange(key, e.target.value)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
