import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Textarea } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Switch } from '@mui/material';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface Glossary {
    id: number;
    term: string;
    definition: string;
    category: string | null;
    letter: string;
    order: number;
    is_active: boolean;
}

interface Props {
    glossary: Glossary;
}

export default function GlossaryEdit({ glossary }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        term: glossary.term,
        definition: glossary.definition,
        category: glossary.category || '',
        letter: glossary.letter,
        order: glossary.order,
        is_active: glossary.is_active,
    });

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/glossary/${glossary.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Terme modifié avec succès');
            },
            onError: () => {
                toast.error('Erreur lors de la modification du terme');
            },
        });
    };

    return (
        <AppLayout>
            <Head title={`Modifier: ${glossary.term}`} />

            <div className="container mx-auto max-w-3xl px-4 py-8">
                <div className="mb-6">
                    <Link
                        href="/dashboard/glossary"
                        className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Retour à la liste
                    </Link>
                    <h1 className="text-3xl font-bold">Modifier le terme</h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">{glossary.term}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-card p-6">
                    {/* Term */}
                    <div className="space-y-2">
                        <Label htmlFor="term">
                            Terme <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="term"
                            value={data.term}
                            onChange={(e) => setData('term', e.target.value)}
                            placeholder="Ex: API (Application Programming Interface)"
                            className={errors.term ? 'border-red-500' : ''}
                        />
                        {errors.term && <p className="text-sm text-red-500">{errors.term}</p>}
                    </div>

                    {/* Definition */}
                    <div className="space-y-2">
                        <Label htmlFor="definition">
                            Définition <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="definition"
                            value={data.definition}
                            onChange={(e) => setData('definition', e.target.value)}
                            placeholder="Entrez la définition du terme..."
                            rows={4}
                            className={errors.definition ? 'border-red-500' : ''}
                        />
                        {errors.definition && <p className="text-sm text-red-500">{errors.definition}</p>}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Catégorie (optionnel)</Label>
                        <Input
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            placeholder="Ex: Développement, Marketing, etc."
                        />
                        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                    </div>

                    {/* Letter and Order */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="letter">
                                Lettre <span className="text-red-500">*</span>
                            </Label>
                            <Select value={data.letter} onValueChange={(value) => setData('letter', value)}>
                                <SelectTrigger className={errors.letter ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Sélectionnez une lettre" />
                                </SelectTrigger>
                                <SelectContent>
                                    {alphabet.map((letter) => (
                                        <SelectItem key={letter} value={letter}>
                                            {letter}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.letter && <p className="text-sm text-red-500">{errors.letter}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Ordre d'affichage</Label>
                            <Input id="order" type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value) || 0)} min="0" />
                            {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center space-x-2">
                        <Switch id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                        <Label htmlFor="is_active" className="cursor-pointer">
                            Terme actif (visible sur le site)
                        </Label>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 border-t pt-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href="/dashboard/glossary">Annuler</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
