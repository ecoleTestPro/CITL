import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

interface ContentEditorSectionProps {
    initialContent?: any;
}

export interface ContentEditorRef {
    save: () => Promise<any>;
}

export const ContentEditorSection = forwardRef<
    ContentEditorRef,
    ContentEditorSectionProps
>(({ initialContent }, ref) => {
    const editorRef = useRef<EditorJS | null>(null);

    useImperativeHandle(ref, () => ({
        save: async () => {
            if (editorRef.current) {
                return await editorRef.current.save();
            }
            return null;
        },
    }));

    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        config: {
                            levels: [1, 2, 3, 4, 5, 6],
                            defaultLevel: 2,
                        },
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    },
                },
                data: initialContent || { blocks: [] },
                placeholder: 'Commencez à écrire votre contenu...',
                minHeight: 300,
            });

            editorRef.current = editor;
        }

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return (
        <div className="rounded-lg border bg-white shadow-sm">
            <div
                id="editorjs"
                className="prose prose-sm max-w-none p-8 focus:outline-none sm:prose lg:prose-lg"
                style={{
                    minHeight: '500px',
                }}
            />
        </div>
    );
});

ContentEditorSection.displayName = 'ContentEditorSection';
