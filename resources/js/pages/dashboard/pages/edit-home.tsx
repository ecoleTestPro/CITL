import { PageEditorActions } from '@/components/dashboard/page-editor-actions';
import { PageEditorLayout } from '@/components/dashboard/page-editor-layout';
import { PagePreview } from '@/components/dashboard/page-preview';
import { EnhancedTranslationEditor } from '@/components/dashboard/enhanced-translation-editor';
import { useTranslations } from '@/hooks/use-translations';
import { Badge } from '@/components/ui/badge';

interface EditHomeProps {
    pageUrl: string;
    pageTitle: string;
    pageName: string;
}

export default function EditHome({
    pageUrl,
    pageTitle,
    pageName,
}: EditHomeProps) {
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
                    onLocaleChange={setSelectedLocale}
                    onReset={handleReset}
                    onPreview={handlePreview}
                    onSave={handleSave}
                />
            }
        >
            <div className="flex max-h-[calc(100vh-200px)] w-1/2 flex-col gap-4 overflow-auto">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        Edit Translations ({selectedLocale.toUpperCase()})
                    </h3>
                    {hasUnsavedChanges && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Unsaved changes
                        </Badge>
                    )}
                </div>
                <EnhancedTranslationEditor
                    translations={translations[selectedLocale] || {}}
                    selectedLocale={selectedLocale}
                    loading={loading}
                    sections={sections}
                    metadata={metadata}
                    onTranslationChange={handleTranslationChange}
                />
            </div>

            <PagePreview pageUrl={pageUrl} pageTitle={pageTitle} />
        </PageEditorLayout>
    );
}
