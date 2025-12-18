import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Globe, Loader2, RotateCcw, Save } from 'lucide-react';

interface PageEditorActionsProps {
    selectedLocale: string;
    availableLocales: string[];
    loading: boolean;
    saving: boolean;
    hasUnsavedChanges?: boolean;
    onLocaleChange: (locale: string) => void;
    onReset: () => void;
    onPreview: () => void;
    onSave: () => void;
}

const localeNames: Record<string, string> = {
    fr: 'Français',
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
};

export function PageEditorActions({
    selectedLocale,
    availableLocales,
    loading,
    saving,
    hasUnsavedChanges = false,
    onLocaleChange,
    onReset,
    onPreview,
    onSave,
}: PageEditorActionsProps) {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-800 dark:bg-gray-950">
            {/* Left: Language selector */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">Langue</span>
                </div>
                <Select value={selectedLocale} onValueChange={onLocaleChange}>
                    <SelectTrigger className="h-9 w-[140px] border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {availableLocales.map((locale) => (
                            <SelectItem key={locale} value={locale}>
                                <span className="flex items-center gap-2">
                                    <span className="text-xs font-medium uppercase text-gray-400">{locale}</span>
                                    <span>{localeNames[locale] || locale}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Right: Action buttons */}
            <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onReset} disabled={loading} className="h-9 w-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Réinitialiser les modifications</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onPreview} className="h-9 w-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Prévisualiser dans un nouvel onglet</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <Button
                    size="sm"
                    onClick={onSave}
                    disabled={saving || !hasUnsavedChanges}
                    className={`h-9 gap-2 px-4 ${
                        hasUnsavedChanges
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                    }`}
                >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    <span className="hidden sm:inline">Enregistrer</span>
                </Button>
            </div>
        </div>
    );
}
