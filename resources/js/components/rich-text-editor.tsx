import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
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
    Table as TableIcon,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Commencez à écrire...' }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-secondary underline dark:text-accent',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full',
                },
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 dark:border-gray-600 px-4 py-2',
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[200px] px-4 py-3',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('URL du lien:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt("URL de l'image:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="rounded-lg border border-gray-300 dark:border-gray-700">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-gray-300 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
                {/* Text Formatting */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Gras"
                >
                    <Bold className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Italique"
                >
                    <Italic className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Souligné"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Barré"
                >
                    <Strikethrough className="h-4 w-4" />
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

                {/* Headings */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`rounded px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Titre 2"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`rounded px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Titre 3"
                >
                    H3
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

                {/* Lists */}
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Liste à puces"
                >
                    <List className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Liste numérotée"
                >
                    <ListOrdered className="h-4 w-4" />
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

                {/* Alignment */}
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Aligner à gauche"
                >
                    <AlignLeft className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Centrer"
                >
                    <AlignCenter className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Aligner à droite"
                >
                    <AlignRight className="h-4 w-4" />
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

                {/* Link & Image */}
                <button
                    onClick={addLink}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Insérer un lien"
                >
                    <LinkIcon className="h-4 w-4" />
                </button>
                <button
                    onClick={addImage}
                    className="rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    type="button"
                    title="Insérer une image"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

                {/* Table */}
                <button
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                    className={`rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        editor.isActive('table') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    type="button"
                    title="Insérer un tableau"
                >
                    <TableIcon className="h-4 w-4" />
                </button>
                {editor.isActive('table') && (
                    <>
                        <button
                            onClick={() => editor.chain().focus().addColumnBefore().run()}
                            className="rounded px-2 py-2 text-xs transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            type="button"
                            title="Ajouter une colonne avant"
                        >
                            +Col
                        </button>
                        <button
                            onClick={() => editor.chain().focus().addRowBefore().run()}
                            className="rounded px-2 py-2 text-xs transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            type="button"
                            title="Ajouter une ligne avant"
                        >
                            +Row
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                            className="rounded px-2 py-2 text-xs transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            type="button"
                            title="Supprimer la colonne"
                        >
                            -Col
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteRow().run()}
                            className="rounded px-2 py-2 text-xs transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            type="button"
                            title="Supprimer la ligne"
                        >
                            -Row
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteTable().run()}
                            className="rounded px-2 py-2 text-xs text-red-600 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            type="button"
                            title="Supprimer le tableau"
                        >
                            Del
                        </button>
                    </>
                )}

                <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

                {/* Undo/Redo */}
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="rounded p-2 transition-colors hover:bg-gray-200 disabled:opacity-50 dark:hover:bg-gray-700"
                    type="button"
                    title="Annuler"
                >
                    <Undo className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="rounded p-2 transition-colors hover:bg-gray-200 disabled:opacity-50 dark:hover:bg-gray-700"
                    type="button"
                    title="Rétablir"
                >
                    <Redo className="h-4 w-4" />
                </button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} placeholder={placeholder} />
        </div>
    );
}
