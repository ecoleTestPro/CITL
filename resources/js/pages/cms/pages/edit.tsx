import { Head, useForm } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import {
    GeneralInfoSection,
    SeoSection,
    EditorToolbar,
    SettingsPanel as PageSettingsPanel,
} from '@/components/cms/page-editor';
import { PageBuilder } from '@/components/page-builder';
import type { Page, PageTypesMap, PageType } from '@/types/cms';

interface Props {
    page: Page;
    pageTypes: PageTypesMap;
}

/**
 * Page d'édition pour le CMS avec page builder visuel intégré
 *
 * Permet d'éditer une page existante en utilisant Craft.js pour la construction
 * visuelle du contenu. Gère les métadonnées (titre, status, SEO) et le contenu
 * visuel de manière séparée.
 *
 * @param {Props} props - Les propriétés du composant
 * @param {Page} props.page - La page à éditer avec toutes ses données
 * @param {PageTypesMap} props.pageTypes - Dictionnaire des types de pages disponibles
 * @returns {JSX.Element} Interface d'édition complète avec toolbar, settings et builder
 */
export default function Edit({ page, pageTypes }: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    /**
     * Initialise les données du builder à partir du contenu de la page
     *
     * Gère 3 cas de figure :
     * 1. Contenu déjà sérialisé en string JSON (format Craft.js)
     * 2. Contenu en objet avec structure ROOT (format Craft.js natif)
     * 3. Contenu vide ou invalide (retourne undefined pour canvas vierge)
     *
     * @returns {string | undefined} Données sérialisées pour Craft.js ou undefined
     */
    const initializeBuilderData = () => {
        if (!page.content) return undefined;

        // If content is already a string, use it
        if (typeof page.content === 'string') {
            try {
                JSON.parse(page.content); // Validate it's valid JSON
                return page.content;
            } catch {
                return undefined;
            }
        }

        // If content is an object with ROOT node (Craft.js format), stringify it
        if (typeof page.content === 'object' && 'ROOT' in page.content) {
            return JSON.stringify(page.content);
        }

        return undefined;
    };

    const [builderData, setBuilderData] = useState<string | undefined>(initializeBuilderData());

    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        status: page.status,
        page_type: page.page_type,
        seo_title: page.seo_title || '',
        seo_description: page.seo_description || '',
        content: page.content,
    });

    /**
     * Gestionnaire de changement du titre de la page
     *
     * @param {string} value - Nouveau titre de la page
     */
    const handleTitleChange = useCallback(
        (value: string) => {
            setData('title', value);
        },
        [setData]
    );

    /**
     * Gestionnaire de changement du statut de publication
     *
     * @param {('draft' | 'published')} value - Nouveau statut (brouillon ou publié)
     */
    const handleStatusChange = useCallback(
        (value: 'draft' | 'published') => {
            setData('status', value);
        },
        [setData]
    );

    /**
     * Gestionnaire de changement du type de page
     *
     * @param {PageType} value - Nouveau type de page
     */
    const handlePageTypeChange = useCallback(
        (value: PageType) => {
            setData('page_type', value);
        },
        [setData]
    );

    /**
     * Gestionnaire de changement du titre SEO
     *
     * @param {string} value - Nouveau titre pour les moteurs de recherche
     */
    const handleSeoTitleChange = useCallback(
        (value: string) => {
            setData('seo_title', value);
        },
        [setData]
    );

    /**
     * Gestionnaire de changement de la description SEO
     *
     * @param {string} value - Nouvelle description pour les moteurs de recherche
     */
    const handleSeoDescriptionChange = useCallback(
        (value: string) => {
            setData('seo_description', value);
        },
        [setData]
    );

    /**
     * Sauvegarde la page avec toutes ses modifications
     *
     * Parse les données du builder en JSON et les envoie au serveur via PUT.
     * Utilise un setTimeout pour s'assurer que l'état est bien à jour avant
     * la soumission du formulaire.
     *
     * @async
     * @returns {Promise<void>}
     */
    const handleSave = async () => {
        try {
            // Parse builder data to save as JSON object
            const contentToSave = builderData ? JSON.parse(builderData) : {};

            // Update content with builder data
            setData('content', contentToSave);

            // Submit the form
            setTimeout(() => {
                put(`/cms/pages/${page.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        console.log('Page updated successfully');
                    },
                    onError: (errors) => {
                        console.error('Save errors:', errors);
                    },
                });
            }, 50);
        } catch (error) {
            console.error('Save error:', error);
        }
    };

    /**
     * Gestionnaire des changements dans le page builder
     *
     * Met à jour l'état local et parse le JSON pour le stocker dans le formulaire.
     * Appelé automatiquement par Craft.js à chaque modification du builder.
     *
     * @param {string} data - Données sérialisées du builder en JSON
     */
    const handleBuilderChange = (data: string) => {
        setBuilderData(data);
        // Parse and set as object for form
        try {
            const parsed = JSON.parse(data);
            setData('content', parsed);
        } catch (e) {
            console.error('Failed to parse builder data:', e);
        }
    };

    return (
        <>
            <Head title={`Éditer: ${page.title}`} />

            {/* Modern Toolbar */}
            <EditorToolbar
                pageTitle={data.title || 'Sans titre'}
                status={data.status}
                isSubmitting={processing}
                onSave={handleSave}
                onSettingsToggle={() => setSettingsOpen(!settingsOpen)}
                settingsOpen={settingsOpen}
            />

            {/* Settings Side Panel for Page */}
            <PageSettingsPanel
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                generalSection={
                    <GeneralInfoSection
                        title={data.title}
                        status={data.status}
                        pageType={data.page_type}
                        pageTypes={pageTypes}
                        onTitleChange={handleTitleChange}
                        onStatusChange={handleStatusChange}
                        onPageTypeChange={handlePageTypeChange}
                        titleError={errors.title}
                    />
                }
                seoSection={
                    <SeoSection
                        seoTitle={data.seo_title}
                        seoDescription={data.seo_description}
                        onSeoTitleChange={handleSeoTitleChange}
                        onSeoDescriptionChange={handleSeoDescriptionChange}
                    />
                }
            />

            {/* Page Builder */}
            <PageBuilder
                initialData={builderData}
                onSave={handleBuilderChange}
            />
        </>
    );
}
