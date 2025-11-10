import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import type { MenuItemData } from './sortable-menu-item';

interface Page {
    id: number;
    title: string;
    slug: string;
}

interface MenuItemFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (item: Partial<MenuItemData>) => void;
    pages: Page[];
    parentOptions?: MenuItemData[];
    editingItem?: MenuItemData | null;
}

export function MenuItemForm({
    open,
    onClose,
    onSave,
    pages,
    parentOptions = [],
    editingItem,
}: MenuItemFormProps) {
    const { data, setData, reset } = useForm({
        title: '',
        url: '',
        page_id: null as number | null,
        parent_id: null as number | null,
        is_active: true,
        link_type: 'page' as 'page' | 'url',
    });

    useEffect(() => {
        if (editingItem) {
            setData({
                title: editingItem.title,
                url: editingItem.url || '',
                page_id: editingItem.page_id,
                parent_id: editingItem.parent_id,
                is_active: editingItem.is_active,
                link_type: editingItem.page_id ? 'page' : 'url',
            });
        } else {
            reset();
        }
    }, [editingItem, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const itemData: Partial<MenuItemData> = {
            title: data.title,
            url: data.link_type === 'url' ? data.url : null,
            page_id: data.link_type === 'page' ? data.page_id : null,
            parent_id: data.parent_id,
            is_active: data.is_active,
        };

        if (editingItem) {
            itemData.id = editingItem.id;
        }

        onSave(itemData);
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {editingItem
                            ? 'Éditer l\'élément de menu'
                            : 'Ajouter un élément de menu'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            placeholder="Ex: À propos"
                        />
                    </div>

                    {/* Link Type Selection */}
                    <div>
                        <Label>Type de lien *</Label>
                        <div className="mt-2 flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="link_type"
                                    value="page"
                                    checked={data.link_type === 'page'}
                                    onChange={() =>
                                        setData('link_type', 'page')
                                    }
                                    className="text-orange-600"
                                />
                                <span>Page</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="link_type"
                                    value="url"
                                    checked={data.link_type === 'url'}
                                    onChange={() => setData('link_type', 'url')}
                                    className="text-orange-600"
                                />
                                <span>URL personnalisée</span>
                            </label>
                        </div>
                    </div>

                    {/* Page Selector */}
                    {data.link_type === 'page' && (
                        <div>
                            <Label htmlFor="page_id">Page *</Label>
                            <Select
                                value={data.page_id?.toString() || ''}
                                onValueChange={(value) =>
                                    setData(
                                        'page_id',
                                        value ? parseInt(value) : null,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une page" />
                                </SelectTrigger>
                                <SelectContent>
                                    {pages.map((page) => (
                                        <SelectItem
                                            key={page.id}
                                            value={page.id.toString()}
                                        >
                                            {page.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* URL Input */}
                    {data.link_type === 'url' && (
                        <div>
                            <Label htmlFor="url">URL *</Label>
                            <Input
                                id="url"
                                type="url"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                placeholder="https://example.com"
                            />
                        </div>
                    )}

                    {/* Parent Selection */}
                    <div>
                        <Label htmlFor="parent_id">Élément parent</Label>
                        <Select
                            value={data.parent_id?.toString() || 'none'}
                            onValueChange={(value) =>
                                setData(
                                    'parent_id',
                                    value === 'none' ? null : parseInt(value),
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Aucun (niveau racine)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">
                                    Aucun (niveau racine)
                                </SelectItem>
                                {parentOptions
                                    .filter(
                                        (option) =>
                                            !editingItem ||
                                            option.id !== editingItem.id,
                                    )
                                    .map((option) => (
                                        <SelectItem
                                            key={option.id}
                                            value={option.id.toString()}
                                        >
                                            {option.title}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <p className="mt-1 text-xs text-gray-500">
                            Laissez vide pour un élément de niveau racine
                        </p>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_active"
                            checked={data.is_active}
                            onCheckedChange={(checked) =>
                                setData('is_active', checked === true)
                            }
                        />
                        <Label htmlFor="is_active">Actif</Label>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            className="bg-orange-600 hover:bg-orange-700"
                        >
                            {editingItem ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
