import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: any;
    status: 'draft' | 'published';
    seo_title: string | null;
    seo_description: string | null;
}

interface Props {
    page: Page;
}

export default function Edit({ page }: Props) {
    const editorRef = useRef<EditorJS | null>(null);
    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        status: page.status,
        seo_title: page.seo_title || '',
        seo_description: page.seo_description || '',
        content: page.content,
    });

    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        config: {
                            levels: [1, 2, 3, 4],
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
                data: page.content || { blocks: [] },
                placeholder: 'Commencez à écrire votre contenu...',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editorRef.current) {
            try {
                const outputData = await editorRef.current.save();
                setData('content', outputData);

                // Small delay to ensure data is set
                setTimeout(() => {
                    put(`/cms/pages/${page.id}`);
                }, 100);
            } catch (error) {
                console.error('Editor save error:', error);
            }
        }
    };

    return (
        <AppLayout>
            <Head title={`Éditer: ${page.title}`} />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Éditer la page</h1>
                    <div className="text-sm text-muted-foreground">
                        Slug: /{page.slug}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations générales</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Titre</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="status">Statut</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData('status', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">
                                                Brouillon
                                            </SelectItem>
                                            <SelectItem value="published">
                                                Publié
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Contenu</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    id="editorjs"
                                    className="prose max-w-none rounded-lg border p-4"
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>SEO</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="seo_title">
                                        Titre SEO
                                    </Label>
                                    <Input
                                        id="seo_title"
                                        value={data.seo_title}
                                        onChange={(e) =>
                                            setData('seo_title', e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="seo_description">
                                        Description SEO
                                    </Label>
                                    <Input
                                        id="seo_description"
                                        value={data.seo_description}
                                        onChange={(e) =>
                                            setData(
                                                'seo_description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Enregistrement...'
                                    : 'Enregistrer'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
