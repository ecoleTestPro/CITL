import { Head, useForm } from '@inertiajs/react';
import { useRef, useState, useCallback } from 'react';
import {
    GeneralInfoSection,
    SeoSection,
    EditorToolbar,
    SettingsPanel as PageSettingsPanel,
} from '@/components/cms/page-editor';
import { PageBuilder } from '@/components/page-builder';
import type { Page } from '@/types/cms';

interface Props {
    page: Page;
}

export default function EditBuilder({ page }: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [builderData, setBuilderData] = useState<string>(
        typeof page.content === 'string' ? page.content : JSON.stringify(page.content || {})
    );

    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        status: page.status,
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
            // Update content with builder data
            setData('content', builderData);

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
        setData('content', data);
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
                        onTitleChange={handleTitleChange}
                        onStatusChange={handleStatusChange}
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
