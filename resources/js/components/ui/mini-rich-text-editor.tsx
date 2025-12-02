'use client';

import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Redo,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MiniRichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
    minHeight?: string;
}

// Bouton de la toolbar
function ToolbarButton({
    onClick,
    isActive,
    disabled,
    title,
    children,
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={onClick}
                        disabled={disabled}
                        type="button"
                        className={cn(
                            'rounded p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700',
                            isActive && 'bg-gray-200 text-orange-600 dark:bg-gray-700 dark:text-orange-400',
                            disabled && 'cursor-not-allowed opacity-50',
                        )}
                    >
                        {children}
                    </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                    {title}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

// Séparateur vertical
function ToolbarDivider() {
    return <div className="mx-0.5 h-5 w-px bg-gray-300 dark:bg-gray-600" />;
}

export function MiniRichTextEditor({ content, onChange, placeholder = 'Entrez votre texte...', className, minHeight = '100px' }: MiniRichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-orange-600 underline dark:text-orange-400',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm dark:prose-invert max-w-none focus:outline-none px-3 py-2',
                    'prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1',
                ),
                style: `min-height: ${minHeight}`,
            },
        },
    });

    // Sync content when it changes externally
    React.useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content, false);
        }
    }, [content, editor]);

    if (!editor) {
        return (
            <div className={cn('rounded-md border border-gray-300 dark:border-gray-700', className)}>
                <div className="flex h-10 items-center border-b border-gray-200 bg-gray-50 px-2 dark:border-gray-700 dark:bg-gray-800">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
                </div>
                <div className="p-3" style={{ minHeight }}>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        );
    }

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL du lien:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className={cn('rounded-md border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500', className)}>
            {/* Toolbar compacte */}
            <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-1.5 py-1 dark:border-gray-700 dark:bg-gray-800">
                {/* Formatage texte */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Gras (Ctrl+B)"
                >
                    <Bold className="h-3.5 w-3.5" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italique (Ctrl+I)"
                >
                    <Italic className="h-3.5 w-3.5" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Souligné (Ctrl+U)"
                >
                    <UnderlineIcon className="h-3.5 w-3.5" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    title="Barré"
                >
                    <Strikethrough className="h-3.5 w-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Titres */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Titre 2"
                >
                    <span className="text-xs font-bold">H2</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Titre 3"
                >
                    <span className="text-xs font-bold">H3</span>
                </ToolbarButton>

                <ToolbarDivider />

                {/* Listes */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Liste à puces"
                >
                    <List className="h-3.5 w-3.5" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Liste numérotée"
                >
                    <ListOrdered className="h-3.5 w-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Alignement */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    title="Aligner à gauche"
                >
                    <AlignLeft className="h-3.5 w-3.5" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    title="Centrer"
                >
                    <AlignCenter className="h-3.5 w-3.5" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    title="Aligner à droite"
                >
                    <AlignRight className="h-3.5 w-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Lien */}
                <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Insérer un lien">
                    <LinkIcon className="h-3.5 w-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Annuler/Rétablir */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Annuler (Ctrl+Z)"
                >
                    <Undo className="h-3.5 w-3.5" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Rétablir (Ctrl+Y)"
                >
                    <Redo className="h-3.5 w-3.5" />
                </ToolbarButton>
            </div>

            {/* Contenu de l'éditeur */}
            <EditorContent editor={editor} />
        </div>
    );
}

export default MiniRichTextEditor;
