import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Eye, Loader2, Save, Undo } from 'lucide-react';

interface PageEditorActionsProps {
    selectedLocale: string;
    availableLocales: string[];
    loading: boolean;
    saving: boolean;
    onLocaleChange: (locale: string) => void;
    onReset: () => void;
    onPreview: () => void;
    onSave: () => void;
}

export function PageEditorActions({
    selectedLocale,
    availableLocales,
    loading,
    saving,
    onLocaleChange,
    onReset,
    onPreview,
    onSave,
}: PageEditorActionsProps) {
    return (
        <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2">
                <Label htmlFor="locale-select" className="text-sm">
                    Language:
                </Label>
                <Select value={selectedLocale} onValueChange={onLocaleChange}>
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {availableLocales.map((locale) => (
                            <SelectItem key={locale} value={locale}>
                                {locale.toUpperCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onReset}
                    disabled={loading}
                >
                    <Undo className="mr-2 h-4 w-4" />
                    Reset
                </Button>
                <Button variant="outline" size="sm" onClick={onPreview}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                </Button>
                <Button size="sm" onClick={onSave} disabled={saving}>
                    {saving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
