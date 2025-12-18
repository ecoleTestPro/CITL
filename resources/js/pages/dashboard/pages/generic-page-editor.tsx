import { EnhancedImageEditor } from '@/components/dashboard/enhanced-image-editor';
import { EnhancedTranslationEditor } from '@/components/dashboard/enhanced-translation-editor';
import { PageEditorActions } from '@/components/dashboard/page-editor-actions';
import { PageEditorLayout } from '@/components/dashboard/page-editor-layout';
import { PagePreview } from '@/components/dashboard/page-preview';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPageConfig } from '@/config/page-editor-config';
import { useMultiPageImages } from '@/hooks/use-images';
import { useTranslations } from '@/hooks/use-translations';
import { Circle, ImageIcon, Type } from 'lucide-react';
import { useMemo } from 'react';

interface GenericPageEditorProps {
    /** Slug de la page (correspond à la clé dans PAGE_EDITOR_CONFIGS) */
    pageSlug: string;
    /** URL de prévisualisation de la page */
    pageUrl: string;
    /** Titre de la page (optionnel, utilisé comme fallback) */
    pageTitle?: string;
    /** Nom de la page pour les traductions (optionnel, utilisé comme fallback) */
    pageName?: string;
}

export default function GenericPageEditor({ pageSlug, pageUrl, pageTitle, pageName }: GenericPageEditorProps) {
    // Récupérer la configuration de la page
    const config = getPageConfig(pageSlug);

    // Utiliser les valeurs de config ou les fallbacks
    const translationKey = config?.translationKey || pageName || pageSlug;
    const title = config?.title || pageTitle || pageSlug;
    const imagePages = useMemo(() => config?.imagePages || ['global'], [config?.imagePages]);
    const hasImages = config?.hasImages ?? true;

    // Hook pour les traductions
    const {
        translations,
        selectedLocale,
        availableLocales,
        loading: translationsLoading,
        saving,
        hasUnsavedChanges: hasUnsavedTranslations,
        metadata,
        sections,
        setSelectedLocale,
        handleTranslationChange,
        handleSave,
        handleReset,
    } = useTranslations(translationKey);

    // Hook pour les images (chargement multiple pages)
    const {
        images,
        loading: imagesLoading,
        uploading,
        uploadingKey,
        sections: imageSections,
        handleUpload,
    } = useMultiPageImages(imagePages);

    const handlePreview = () => {
        window.open(pageUrl, '_blank');
    };

    // Déterminer si on affiche les onglets (si la page a des images)
    const showTabs = hasImages && Object.keys(images).length > 0;

    return (
        <PageEditorLayout
            pageTitle={title}
            actionsBar={
                <PageEditorActions
                    selectedLocale={selectedLocale}
                    availableLocales={availableLocales}
                    loading={translationsLoading}
                    saving={saving}
                    hasUnsavedChanges={hasUnsavedTranslations}
                    onLocaleChange={setSelectedLocale}
                    onReset={handleReset}
                    onPreview={handlePreview}
                    onSave={handleSave}
                />
            }
        >
            {/* Editor Panel */}
            <div className="flex h-[calc(100vh-180px)] w-[380px] shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                {showTabs ? (
                    /* Tabs Header - Shown when page has images */
                    <Tabs defaultValue="translations" className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-800">
                            <TabsList className="h-8 bg-gray-100 p-0.5 dark:bg-gray-800">
                                <TabsTrigger value="translations" className="h-7 gap-1.5 px-3 text-xs">
                                    <Type className="h-3.5 w-3.5" />
                                    Textes
                                </TabsTrigger>
                                <TabsTrigger value="images" className="h-7 gap-1.5 px-3 text-xs">
                                    <ImageIcon className="h-3.5 w-3.5" />
                                    Images
                                </TabsTrigger>
                            </TabsList>
                            {hasUnsavedTranslations && (
                                <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
                                    <Circle className="h-2 w-2 fill-current" />
                                    <span>Non enregistré</span>
                                </div>
                            )}
                        </div>

                        {/* Translations Tab */}
                        <TabsContent value="translations" className="mt-0 flex-1 overflow-hidden p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-xs text-gray-500">Langue:</span>
                                <Badge variant="outline" className="h-5 border-gray-200 px-1.5 text-[10px] font-medium uppercase dark:border-gray-700">
                                    {selectedLocale}
                                </Badge>
                            </div>
                            <EnhancedTranslationEditor
                                translations={translations[selectedLocale] || {}}
                                selectedLocale={selectedLocale}
                                loading={translationsLoading}
                                sections={sections}
                                metadata={metadata}
                                onTranslationChange={handleTranslationChange}
                            />
                        </TabsContent>

                        {/* Images Tab */}
                        <TabsContent value="images" className="mt-0 flex-1 overflow-hidden p-4">
                            <EnhancedImageEditor
                                images={images}
                                loading={imagesLoading}
                                uploading={uploading}
                                uploadingKey={uploadingKey}
                                sections={imageSections}
                                onUpload={handleUpload}
                            />
                        </TabsContent>
                    </Tabs>
                ) : (
                    /* Simple layout without tabs - Translations only */
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                                <Type className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Textes</span>
                            </div>
                            {hasUnsavedTranslations && (
                                <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
                                    <Circle className="h-2 w-2 fill-current" />
                                    <span>Non enregistré</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 overflow-hidden p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-xs text-gray-500">Langue:</span>
                                <Badge variant="outline" className="h-5 border-gray-200 px-1.5 text-[10px] font-medium uppercase dark:border-gray-700">
                                    {selectedLocale}
                                </Badge>
                            </div>
                            <EnhancedTranslationEditor
                                translations={translations[selectedLocale] || {}}
                                selectedLocale={selectedLocale}
                                loading={translationsLoading}
                                sections={sections}
                                metadata={metadata}
                                onTranslationChange={handleTranslationChange}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Preview Panel */}
            <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <PagePreview pageUrl={pageUrl} pageTitle={title} locale={selectedLocale} />
            </div>
        </PageEditorLayout>
    );
}
