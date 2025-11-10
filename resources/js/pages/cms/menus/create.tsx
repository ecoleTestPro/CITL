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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        location: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/cms/menus');
    };

    return (
        <AppLayout>
            <Head title="Nouveau Menu" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Nouveau Menu</h1>
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
                                            <SelectValue placeholder="Sélectionnez un emplacement" />
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

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Création...' : 'Créer le menu'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
