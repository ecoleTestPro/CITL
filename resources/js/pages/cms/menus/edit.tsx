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
import { Checkbox } from '@/components/ui/checkbox';

interface Menu {
    id: number;
    name: string;
    location: string;
    is_active: boolean;
}

interface Page {
    id: number;
    title: string;
    slug: string;
}

interface Props {
    menu: Menu;
    pages: Page[];
}

export default function Edit({ menu, pages }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: menu.name,
        location: menu.location,
        is_active: menu.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/cms/menus/${menu.id}`);
    };

    return (
        <AppLayout>
            <Head title={`Éditer: ${menu.name}`} />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Éditer le menu</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations du menu</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="location">
                                        Emplacement
                                    </Label>
                                    <Select
                                        value={data.location}
                                        onValueChange={(value) =>
                                            setData('location', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="header">
                                                Header
                                            </SelectItem>
                                            <SelectItem value="footer">
                                                Footer
                                            </SelectItem>
                                            <SelectItem value="sidebar">
                                                Sidebar
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.location && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) =>
                                            setData(
                                                'is_active',
                                                checked === true,
                                            )
                                        }
                                    />
                                    <Label htmlFor="is_active">Actif</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Items du menu</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    La gestion des items de menu sera
                                    implémentée dans une prochaine version.
                                </p>
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
