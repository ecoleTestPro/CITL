import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Textarea } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Switch } from '@mui/material';
import { Save, X } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Glossary {
    id: number;
    term_en: string;
    term_fr: string | null;
    definition_en: string;
    definition_fr: string | null;
    category: string | null;
    letter: string;
    is_active: boolean;
}

interface GlossaryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    glossary?: Glossary | null;
    onSuccess?: () => void;
}

export function GlossaryFormModal({ isOpen, onClose, glossary, onSuccess }: GlossaryFormModalProps) {
    const isEditing = !!glossary;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        term_en: glossary?.term_en || '',
        term_fr: glossary?.term_fr || '',
        definition_en: glossary?.definition_en || '',
        definition_fr: glossary?.definition_fr || '',
        category: glossary?.category || '',
        letter: glossary?.letter || '',
        is_active: glossary?.is_active ?? true,
    });

    // Reset form when glossary changes
    useEffect(() => {
        if (glossary) {
            setData({
                term_en: glossary.term_en,
                term_fr: glossary.term_fr || '',
                definition_en: glossary.definition_en,
                definition_fr: glossary.definition_fr || '',
                category: glossary.category || '',
                letter: glossary.letter,
                is_active: glossary.is_active,
            });
        } else {
            reset();
        }
    }, [glossary]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(isEditing ? 'Terme modifié avec succès' : 'Terme créé avec succès');
                onSuccess?.();
                onClose();
                reset();
            },
            onError: () => {
                toast.error(isEditing ? 'Erreur lors de la modification' : 'Erreur lors de la création');
            },
        };

        if (isEditing) {
            put(`/dashboard/glossary/${glossary.id}`, options);
        } else {
            post('/dashboard/glossary', options);
        }
    };

    const handleTermEnChange = (value: string) => {
        setData('term_en', value);
        if (value && !data.letter && !isEditing) {
            const firstLetter = value.charAt(0).toUpperCase();
            if (/[A-Z]/.test(firstLetter)) {
                setData('letter', firstLetter);
            }
        }
    };

    const handleClose = () => {
        if (!processing) {
            onClose();
            reset();
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                    <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4 dark:bg-gray-800">
                        <DialogTitle className="text-xl font-bold">
                            {isEditing ? `Modifier: ${glossary.term_en}` : 'Ajouter un terme'}
                        </DialogTitle>
                        <button
                            onClick={handleClose}
                            disabled={processing}
                            className="rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Letter */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between space-x-4">
                                <Label htmlFor="letter">
                                    Lettre <span className="text-red-500">*</span>
                                </Label>
                                <Select value={data.letter} onValueChange={(value) => setData('letter', value)} disabled={processing}>
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
                            </div>
                            {errors.letter && <p className="text-sm text-red-500">{errors.letter}</p>}
                        </div>

                        {/* Terms EN/FR */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="term_en">
                                    Terme (EN) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="term_en"
                                    value={data.term_en}
                                    onChange={(e) => handleTermEnChange(e.target.value)}
                                    placeholder="Ex: API (Application Programming Interface)"
                                    className={errors.term_en ? 'border-red-500' : ''}
                                    disabled={processing}
                                />
                                {errors.term_en && <p className="text-sm text-red-500">{errors.term_en}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="term_fr">Terme (FR)</Label>
                                <Input
                                    id="term_fr"
                                    value={data.term_fr}
                                    onChange={(e) => setData('term_fr', e.target.value)}
                                    placeholder="Ex: API (Interface de Programmation d'Application)"
                                    className={errors.term_fr ? 'border-red-500' : ''}
                                    disabled={processing}
                                />
                                {errors.term_fr && <p className="text-sm text-red-500">{errors.term_fr}</p>}
                            </div>
                        </div>

                        {/* Definitions EN/FR */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="definition_en">
                                    Définition (EN) <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="definition_en"
                                    value={data.definition_en}
                                    onChange={(e) => setData('definition_en', e.target.value)}
                                    placeholder="Enter the definition in English..."
                                    rows={4}
                                    className={`w-full rounded-md border ${
                                        errors.definition_en ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white px-3 py-2 text-gray-900 dark:bg-gray-700 dark:text-gray-100`}
                                    disabled={processing}
                                />
                                {errors.definition_en && <p className="text-sm text-red-500">{errors.definition_en}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="definition_fr">Définition (FR)</Label>
                                <Textarea
                                    id="definition_fr"
                                    value={data.definition_fr}
                                    onChange={(e) => setData('definition_fr', e.target.value)}
                                    placeholder="Entrez la définition en français..."
                                    rows={4}
                                    className={`w-full rounded-md border ${
                                        errors.definition_fr ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white px-3 py-2 text-gray-900 dark:bg-gray-700 dark:text-gray-100`}
                                    disabled={processing}
                                />
                                {errors.definition_fr && <p className="text-sm text-red-500">{errors.definition_fr}</p>}
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Catégorie (optionnel)</Label>
                            <Input
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                placeholder="Ex: Développement, Marketing, etc."
                                disabled={processing}
                            />
                            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center space-x-2">
                            <Switch id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} disabled={processing} />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                Terme actif (visible sur le site)
                            </Label>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 border-t pt-4">
                            <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Enregistrer'}
                            </Button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
