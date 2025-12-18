import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
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
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Redo,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    blog_category_id: number | null;
    tags: string[] | null;
    is_published: boolean;
    published_at: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string[] | null;
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    blog: Blog | null;
    categories: Category[];
    onSuccess: () => void;
}

export function BlogFormModal({ isOpen, onClose, blog, categories, onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [categoryId, setCategoryId] = useState<string>('');
    const [tags, setTags] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [publishedAt, setPublishedAt] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<string>('');
    const [removeImage, setRemoveImage] = useState(false);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
            Image,
        ],
        content: blog?.content || '<p>Commencez à écrire votre article...</p>',
    });

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setSlug(blog.slug);
            setExcerpt(blog.excerpt || '');
            setCategoryId(blog.blog_category_id?.toString() || '');
            setTags(blog.tags?.join(', ') || '');
            setIsPublished(blog.is_published);
            setPublishedAt(blog.published_at ? new Date(blog.published_at).toISOString().slice(0, 16) : '');
            setFeaturedImagePreview(blog.featured_image || '');
            setMetaTitle(blog.meta_title || '');
            setMetaDescription(blog.meta_description || '');
            setMetaKeywords(blog.meta_keywords?.join(', ') || '');
            editor?.commands.setContent(blog.content);
        } else {
            resetForm();
        }
    }, [blog, editor]);

    const resetForm = () => {
        setTitle('');
        setSlug('');
        setExcerpt('');
        setCategoryId('');
        setTags('');
        setIsPublished(false);
        setPublishedAt('');
        setFeaturedImage(null);
        setFeaturedImagePreview('');
        setRemoveImage(false);
        setMetaTitle('');
        setMetaDescription('');
        setMetaKeywords('');
        editor?.commands.setContent('<p>Commencez à écrire votre article...</p>');
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!blog) {
            const generatedSlug = value
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            setSlug(generatedSlug);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFeaturedImage(file);
            setFeaturedImagePreview(URL.createObjectURL(file));
            setRemoveImage(false);
        }
    };

    const handleRemoveImage = () => {
        setFeaturedImage(null);
        setFeaturedImagePreview('');
        setRemoveImage(true);
    };

    const setLink = () => {
        const url = window.prompt('URL du lien');
        if (url) {
            editor?.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('URL de l\'image');
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('excerpt', excerpt);
        formData.append('content', editor?.getHTML() || '');
        if (categoryId) formData.append('blog_category_id', categoryId);
        formData.append('is_published', isPublished ? '1' : '0');
        if (publishedAt) formData.append('published_at', publishedAt);
        if (featuredImage) formData.append('featured_image', featuredImage);
        if (removeImage) formData.append('remove_image', '1');
        if (metaTitle) formData.append('meta_title', metaTitle);
        if (metaDescription) formData.append('meta_description', metaDescription);

        // Handle tags
        const tagArray = tags
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t);
        tagArray.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        // Handle meta keywords
        const keywordArray = metaKeywords
            .split(',')
            .map((k) => k.trim())
            .filter((k) => k);
        keywordArray.forEach((keyword, index) => {
            formData.append(`meta_keywords[${index}]`, keyword);
        });

        const url = blog ? `/dashboard/blog/${blog.id}` : '/dashboard/blog';
        const method = blog ? 'post' : 'post';

        if (blog) {
            formData.append('_method', 'PUT');
        }

        router.post(url, formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(blog ? 'Article modifié avec succès' : 'Article créé avec succès');
                onSuccess();
                onClose();
                resetForm();
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Erreur lors de la sauvegarde');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    if (!editor) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] sm:max-w-6xl! max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{blog ? 'Modifier l\'article' : 'Nouvel article'}</DialogTitle>
                    <DialogDescription>Remplissez les informations de l'article. Les champs marqués sont obligatoires.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="content">Contenu</TabsTrigger>
                            <TabsTrigger value="settings">Paramètres</TabsTrigger>
                            <TabsTrigger value="seo">SEO</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Titre <span className="text-red-500">*</span>
                                </Label>
                                <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Titre de l'article" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="url-de-l-article" />
                                <p className="text-xs text-gray-500">Généré automatiquement depuis le titre. Peut être personnalisé.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Extrait</Label>
                                <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Bref résumé de l'article..." rows={3} />
                                <p className="text-xs text-gray-500">Généré automatiquement si vide.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Contenu <span className="text-red-500">*</span>
                                </Label>
                                <div className="rounded-md border">
                                    <div className="border-b bg-gray-50 dark:bg-gray-900 p-2 flex flex-wrap gap-1">
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <Bold className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <Italic className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <UnderlineIcon className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <Strikethrough className="h-4 w-4" />
                                        </Button>
                                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <AlignLeft className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <AlignCenter className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <AlignRight className="h-4 w-4" />
                                        </Button>
                                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <List className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                                            <ListOrdered className="h-4 w-4" />
                                        </Button>
                                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                                        <Button type="button" size="sm" variant="ghost" onClick={setLink}>
                                            <LinkIcon className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={addImage}>
                                            <ImageIcon className="h-4 w-4" />
                                        </Button>
                                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().undo().run()}>
                                            <Undo className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().redo().run()}>
                                            <Redo className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <EditorContent editor={editor} className="prose dark:prose-invert max-w-none p-4 min-h-[300px] focus:outline-none" />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Catégorie</Label>
                                <Select value={categoryId || 'none'} onValueChange={(value) => setCategoryId(value === 'none' ? '' : value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Aucune catégorie</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2, tag3" />
                                <p className="text-xs text-gray-500">Séparez les tags par des virgules</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="featured-image">Image à la une</Label>
                                <Input id="featured-image" type="file" accept="image/*" onChange={handleImageChange} />
                                {featuredImagePreview && !removeImage && (
                                    <div className="mt-2 relative">
                                        <img src={featuredImagePreview} alt="Aperçu" className="max-w-xs rounded-md" />
                                        <Button type="button" size="sm" variant="destructive" onClick={handleRemoveImage} className="mt-2">
                                            Supprimer l'image
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="is-published" checked={isPublished} onCheckedChange={setIsPublished} />
                                <Label htmlFor="is-published">Publier l'article</Label>
                            </div>

                            {isPublished && (
                                <div className="space-y-2">
                                    <Label htmlFor="published-at">Date de publication</Label>
                                    <Input id="published-at" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
                                    <p className="text-xs text-gray-500">Laissez vide pour publier immédiatement</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="seo" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="meta-title">Titre SEO</Label>
                                <Input id="meta-title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Titre optimisé pour les moteurs de recherche" />
                                <p className="text-xs text-gray-500">Recommandé: 50-60 caractères. {metaTitle.length} caractères</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta-description">Description SEO</Label>
                                <Textarea id="meta-description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Description pour les moteurs de recherche" rows={3} />
                                <p className="text-xs text-gray-500">Recommandé: 150-160 caractères. {metaDescription.length} caractères</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta-keywords">Mots-clés SEO</Label>
                                <Input id="meta-keywords" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="mot-clé1, mot-clé2, mot-clé3" />
                                <p className="text-xs text-gray-500">Séparez les mots-clés par des virgules</p>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enregistrement...' : blog ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
