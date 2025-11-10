import { Head, useForm } from '@inertiajs/react';
import { useRef, useState, useCallback } from 'react';
import {
    GeneralInfoSection,
    ContentEditorSection,
    SeoSection,
    EditorToolbar,
    SettingsPanel,
    EditorLayout,
    type ContentEditorRef,
} from '@/components/cms/page-editor';
import type { Page } from '@/types/cms';

interface Props {
    page: Page;
}

export default function Edit({ page }: Props) {
    const editorRef = useRef<ContentEditorRef | null>(null);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        status: page.status,
        seo_title: page.seo_title || '',
        seo_description: page.seo_description || '',
        content: page.content,
    });

    // Handler functions with useCallback to avoid TypeScript infinite recursion
    const handleTitleChange = useCallback((value: string) => {
        setData('title', value);
    }, [setData]);

    const handleStatusChange = useCallback((value: 'draft' | 'published') => {
        setData('status', value);
    }, [setData]);

    const handleSeoTitleChange = useCallback((value: string) => {
        setData('seo_title', value);
    }, [setData]);

    const handleSeoDescriptionChange = useCallback((value: string) => {
        setData('seo_description', value);
    }, [setData]);

    const handleSave = async () => {
        if (editorRef.current) {
            try {
                const outputData = await editorRef.current.save();

                // Update the content field first
                setData('content', outputData);

                // Submit the form with a small delay to ensure state is updated
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
                console.error('Editor save error:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSave();
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

            {/* Settings Side Panel */}
            <SettingsPanel
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

            {/* Main Editor Content */}
            <div className="bg-muted/30">
                <EditorLayout settingsOpen={settingsOpen}>
                    <form onSubmit={handleSubmit}>
                        <ContentEditorSection
                            ref={editorRef}
                            initialContent={page.content}
                        />
                    </form>
                </EditorLayout>
            </div>
        </>
    );
}
