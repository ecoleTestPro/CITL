import RichTextEditor from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
    is_active: boolean;
    locale: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    faq: Faq | null;
    onSuccess: () => void;
    categories: string[];
}

export function FaqFormModal({ isOpen, onClose, faq, onSuccess, categories }: Props) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [useNewCategory, setUseNewCategory] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [locale, setLocale] = useState('fr');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (faq) {
            setQuestion(faq.question);
            setAnswer(faq.answer);
            setCategory(faq.category);
            setIsActive(faq.is_active);
            setLocale(faq.locale);
            setUseNewCategory(false);
            setNewCategory('');
        } else {
            resetForm();
        }
    }, [faq, isOpen]);

    const resetForm = () => {
        setQuestion('');
        setAnswer('');
        setCategory('');
        setNewCategory('');
        setUseNewCategory(false);
        setIsActive(true);
        setLocale('fr');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!question || !answer || (!category && !newCategory)) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setIsSubmitting(true);

        const data = {
            question,
            answer,
            category: useNewCategory ? newCategory : category,
            order: 0,
            is_active: isActive,
            locale,
        };

        const url = faq ? `/dashboard/faqs/${faq.id}` : '/dashboard/faqs';
        const method = faq ? 'put' : 'post';

        router[method](url, data, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(faq ? 'FAQ mise à jour avec succès' : 'FAQ créée avec succès');
                resetForm();
                onClose();
                onSuccess();
            },
            onError: (errors) => {
                console.error('Errors:', errors);
                toast.error("Erreur lors de l'enregistrement de la FAQ");
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{faq ? 'Modifier la FAQ' : 'Nouvelle FAQ'}</DialogTitle>
                    <DialogDescription>{faq ? 'Modifiez les informations de la FAQ' : 'Créez une nouvelle question fréquemment posée'}</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="question">
                                Question <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Entrez la question"
                                rows={2}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="answer">
                                Réponse <span className="text-red-500">*</span>
                            </Label>
                            <RichTextEditor content={answer} onChange={setAnswer} placeholder="Entrez la réponse..." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="category">
                                        Catégorie <span className="text-red-500">*</span>
                                    </Label>
                                    <button type="button" onClick={() => setUseNewCategory(!useNewCategory)} className="text-xs text-blue-600 hover:underline">
                                        {useNewCategory ? 'Utiliser existante' : 'Nouvelle catégorie'}
                                    </button>
                                </div>
                                {useNewCategory ? (
                                    <Input
                                        id="newCategory"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        placeholder="Nom de la nouvelle catégorie"
                                        required
                                    />
                                ) : (
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="locale">
                                    Langue <span className="text-red-500">*</span>
                                </Label>
                                <Select value={locale} onValueChange={setLocale}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fr">Français</SelectItem>
                                        <SelectItem value="en">Anglais</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                FAQ active
                            </Label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enregistrement...' : faq ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
