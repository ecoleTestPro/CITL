import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@headlessui/react';
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
        return <div className="flex items-center justify-center py-8 text-muted-foreground">No translations available for this page.</div>;
    }

    return (
        <div className="space-y-4">
            {Object.entries(translations).map(([key, value]) => (
                <div key={key} className="space-y-2 rounded-lg border p-4">
                    <Label htmlFor={key} className="text-sm font-medium text-muted-foreground">
                        {key}
                    </Label>
                    {value.length > 100 ? (
                        <Textarea id={key} value={value} onChange={(e) => onTranslationChange(key, e.target.value)} rows={4} className="resize-none" />
                    ) : (
                        <Input id={key} value={value} onChange={(e) => onTranslationChange(key, e.target.value)} />
                    )}
                </div>
            ))}
        </div>
    );
}
