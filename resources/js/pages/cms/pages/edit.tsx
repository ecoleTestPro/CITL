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

export default function Edit({ page, pageTypes }: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Initialize with empty builder data or existing Craft.js data
    const initializeBuilderData = () => {
        // Check if content is already Craft.js format (has ROOT node)
        if (page.content && typeof page.content === 'object' && 'ROOT' in page.content) {
            return JSON.stringify(page.content);
        }
        // Otherwise, start with empty canvas
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

    // Handler functions
    const handleTitleChange = useCallback(
        (value: string) => {
            setData('title', value);
        },
        [setData]
    );

    const handleStatusChange = useCallback(
        (value: 'draft' | 'published') => {
            setData('status', value);
        },
        [setData]
    );

    const handlePageTypeChange = useCallback(
        (value: PageType) => {
            setData('page_type', value);
        },
        [setData]
    );

    const handleSeoTitleChange = useCallback(
        (value: string) => {
            setData('seo_title', value);
        },
        [setData]
    );

    const handleSeoDescriptionChange = useCallback(
        (value: string) => {
            setData('seo_description', value);
        },
        [setData]
    );

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
