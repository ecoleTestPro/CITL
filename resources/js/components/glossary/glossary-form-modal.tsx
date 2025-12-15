import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Switch } from '@mui/material';
import { Save, X } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Glossary {
    id: number;
    term: string;
    definition: string;
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
        term: glossary?.term || '',
        definition: glossary?.definition || '',
        category: glossary?.category || '',
        letter: glossary?.letter || '',
        is_active: glossary?.is_active ?? true,
    });

    // Reset form when glossary changes
    useEffect(() => {
        if (glossary) {
            setData({
                term: glossary.term,
                definition: glossary.definition,
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

    const handleTermChange = (value: string) => {
        setData('term', value);
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
                <DialogPanel className="max-w-2xl w-full rounded-lg bg-white dark:bg-gray-800 shadow-xl max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold">
                            {isEditing ? `Modifier: ${glossary.term}` : 'Ajouter un terme'}
                        </DialogTitle>
                        <button
                            onClick={handleClose}
                            disabled={processing}
                            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Term */}
                        <div className="space-y-2">
                            <Label htmlFor="term">
                                Terme <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="term"
                                value={data.term}
                                onChange={(e) => handleTermChange(e.target.value)}
                                placeholder="Ex: API (Application Programming Interface)"
                                className={errors.term ? 'border-red-500' : ''}
                                disabled={processing}
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
                                className={`w-full rounded-md border ${
                                    errors.definition ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                                disabled={processing}
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
                                disabled={processing}
                            />
                            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                        </div>

                        {/* Letter and Order */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="letter">
                                    Lettre <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={data.letter}
                                    onValueChange={(value) => setData('letter', value)}
                                    disabled={processing}
                                >
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
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                disabled={processing}
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                Terme actif (visible sur le site)
                            </Label>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t">
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
