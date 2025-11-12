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
import type { PageTypesMap } from '@/types/cms';

interface Props {
    pageTypes: PageTypesMap;
}

export default function Create({ pageTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        status: 'draft',
        page_type: 'custom',
        seo_title: '',
        seo_description: '',
        content: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/cms/pages');
    };

    return (
        <AppLayout>
            <Head title="Nouvelle Page" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Nouvelle Page</h1>
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
                                    <Label htmlFor="page_type">Type de page</Label>
                                    <Select
                                        value={data.page_type}
                                        onValueChange={(value) =>
                                            setData('page_type', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(pageTypes).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {data.page_type !== 'custom' && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Les pages statiques ont une structure prédéfinie
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
                                {processing ? 'Création...' : 'Créer la page'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
