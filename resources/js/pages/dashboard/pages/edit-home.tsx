import { EnhancedTranslationEditor } from '@/components/dashboard/enhanced-translation-editor';
import { PageEditorActions } from '@/components/dashboard/page-editor-actions';
import { PageEditorLayout } from '@/components/dashboard/page-editor-layout';
import { PagePreview } from '@/components/dashboard/page-preview';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/use-translations';
import { Circle } from 'lucide-react';

interface EditHomeProps {
    pageUrl: string;
    pageTitle: string;
    pageName: string;
}

export default function EditHome({ pageUrl, pageTitle, pageName }: EditHomeProps) {
    const {
        translations,
        selectedLocale,
        availableLocales,
        loading,
        saving,
        hasUnsavedChanges,
        metadata,
        sections,
        setSelectedLocale,
        handleTranslationChange,
        handleSave,
        handleReset,
    } = useTranslations(pageName);

    const handlePreview = () => {
        window.open(pageUrl, '_blank');
    };

    return (
        <PageEditorLayout
            pageTitle={pageTitle}
            actionsBar={
                <PageEditorActions
                    selectedLocale={selectedLocale}
                    availableLocales={availableLocales}
                    loading={loading}
                    saving={saving}
                    hasUnsavedChanges={hasUnsavedChanges}
                    onLocaleChange={setSelectedLocale}
                    onReset={handleReset}
                    onPreview={handlePreview}
                    onSave={handleSave}
                />
            }
        >
            {/* Editor Panel */}
            <div className="flex h-[calc(100vh-180px)] w-[380px] shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                {/* Editor Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Édition</span>
                        <Badge variant="outline" className="h-5 border-gray-200 px-1.5 text-[10px] font-medium uppercase dark:border-gray-700">
                            {selectedLocale}
                        </Badge>
                    </div>
                    {hasUnsavedChanges && (
                        <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
                            <Circle className="h-2 w-2 fill-current" />
                            <span>Non enregistré</span>
                        </div>
                    )}
                </div>

                {/* Editor Content */}
                <div className="flex-1 overflow-hidden p-4">
                    <EnhancedTranslationEditor
                        translations={translations[selectedLocale] || {}}
                        selectedLocale={selectedLocale}
                        loading={loading}
                        sections={sections}
                        metadata={metadata}
                        onTranslationChange={handleTranslationChange}
                    />
                </div>
            </div>

            {/* Preview Panel */}
            <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <PagePreview pageUrl={pageUrl} pageTitle={pageTitle} locale={selectedLocale} />
            </div>
        </PageEditorLayout>
    );
}
