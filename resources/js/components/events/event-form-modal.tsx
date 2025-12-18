import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MiniRichTextEditor } from '@/components/ui/mini-rich-text-editor';
import { Switch } from '@/components/ui/switch';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Event {
    id: number;
    title: string;
    organization: string;
    description: string;
    start_date: string;
    end_date: string | null;
    location: string | null;
    tags: string[] | null;
    is_active: boolean;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
    onSuccess: () => void;
}

export function EventFormModal({ isOpen, onClose, event, onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isActive, setIsActive] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setOrganization(event.organization);
            setDescription(event.description);
            setStartDate(event.start_date);
            setEndDate(event.end_date || '');
            setLocation(event.location || '');
            setTags(event.tags || []);
            setIsActive(event.is_active);
        } else {
            resetForm();
        }
    }, [event, isOpen]);

    const resetForm = () => {
        setTitle('');
        setOrganization('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setTagInput('');
        setTags([]);
        setIsActive(true);
    };

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !organization || !description || !startDate) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setIsSubmitting(true);

        const data = {
            title,
            organization,
            description,
            start_date: startDate,
            end_date: endDate || null,
            location: location || null,
            tags: tags.length > 0 ? tags : null,
            is_active: isActive,
            order,
        };

        if (event) {
            router.put(`/dashboard/events/${event.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Événement mis à jour avec succès');
                    onSuccess();
                    onClose();
                    resetForm();
                },
                onError: (errors) => {
                    toast.error('Erreur lors de la mise à jour');
                    console.error(errors);
                },
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post('/dashboard/events', data, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Événement créé avec succès');
                    onSuccess();
                    onClose();
                    resetForm();
                },
                onError: (errors) => {
                    toast.error('Erreur lors de la création');
                    console.error(errors);
                },
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{event ? 'Modifier l\'événement' : 'Nouvel événement'}</DialogTitle>
                    <DialogDescription>
                        {event ? 'Modifiez les informations de l\'événement ci-dessous.' : 'Remplissez les informations pour créer un nouvel événement.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Titre <span className="text-red-500">*</span>
                            </Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de l'événement" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="organization">
                                Organisation <span className="text-red-500">*</span>
                            </Label>
                            <Input id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Nom de l'organisation" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description <span className="text-red-500">*</span>
                        </Label>
                        <MiniRichTextEditor
                            content={description}
                            onChange={setDescription}
                            placeholder="Description de l'événement..."
                            minHeight="120px"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start_date">
                                Date de début <span className="text-red-500">*</span>
                            </Label>
                            <Input id="start_date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="end_date">Date de fin</Label>
                            <Input id="end_date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lieu de l'événement" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex gap-2">
                            <Input
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ajouter un tag et appuyez sur Entrée"
                            />
                            <Button type="button" onClick={handleAddTag} variant="outline">
                                Ajouter
                            </Button>
                        </div>
                        {tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-500">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="is_active" className="cursor-pointer">
                            Événement actif
                        </Label>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enregistrement...' : event ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
