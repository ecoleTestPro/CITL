import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableMenuItem, MenuItemData } from '@/components/cms/sortable-menu-item';
import { MenuItemForm } from '@/components/cms/menu-item-form';
import { Plus, Save } from 'lucide-react';

interface Menu {
    id: number;
    name: string;
    location: string;
    is_active: boolean;
    style_template: string;
    is_sticky: boolean;
    style_config: {
        logo?: string;
        show_search?: boolean;
        show_cta?: boolean;
        cta_text?: string;
        cta_url?: string;
    } | null;
}

interface Page {
    id: number;
    title: string;
    slug: string;
}

interface Props {
    menu: Menu & { all_items: MenuItemData[] };
    pages: Page[];
}

export default function Edit({ menu, pages }: Props) {
    const [formData, setFormData] = useState({
        name: menu.name,
        location: menu.location,
        is_active: menu.is_active,
        style_template: menu.style_template || 'default',
        is_sticky: menu.is_sticky,
        style_config: {
            logo: menu.style_config?.logo || '',
            show_search: menu.style_config?.show_search || false,
            show_cta: menu.style_config?.show_cta || false,
            cta_text: menu.style_config?.cta_text || '',
            cta_url: menu.style_config?.cta_url || '',
        },
    });

    const [menuItems, setMenuItems] = useState<MenuItemData[]>(
        menu.all_items || [],
    );
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItemData | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setMenuItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSaveItem = (itemData: Partial<MenuItemData>) => {
        if (editingItem) {
            setMenuItems((items) =>
                items.map((item) =>
                    item.id === editingItem.id ? { ...item, ...itemData } : item,
                ),
            );
            setEditingItem(null);
        } else {
            const newItem: MenuItemData = {
                id: `temp-${Date.now()}`,
                title: itemData.title || '',
                url: itemData.url || null,
                page_id: itemData.page_id || null,
                parent_id: itemData.parent_id || null,
                order: menuItems.length,
                is_active: itemData.is_active ?? true,
            };
            setMenuItems([...menuItems, newItem]);
        }
    };

    const handleDeleteItem = (id: string | number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            setMenuItems((items) => items.filter((item) => item.id !== id));
        }
    };

    const handleEditItem = (item: MenuItemData) => {
        setEditingItem(item);
        setShowItemForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/cms/menus/${menu.id}`, {
            ...formData,
            items: menuItems.map((item, index) => ({ ...item, order: index })),
        });
    };

    const rootItems = menuItems.filter((item) => !item.parent_id);

    return (
        <AppLayout>
            <Head title={`Éditer: ${menu.name}`} />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Éditer le menu</h1>
                        <p className="mt-1 text-sm text-gray-600">{menu.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.history.back()}>Annuler</Button>
                        <Button onClick={handleSubmit} className="bg-orange-600 hover:bg-orange-700">
                            <Save className="mr-2 h-4 w-4" />Enregistrer
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-1">
                            <Card>
                                <CardHeader><CardTitle>Informations</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nom</Label>
                                        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="location">Emplacement</Label>
                                        <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="header">En-tête</SelectItem>
                                                <SelectItem value="footer">Pied de page</SelectItem>
                                                <SelectItem value="sidebar">Barre latérale</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked === true })} />
                                        <Label htmlFor="is_active">Actif</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader><CardTitle>Style du menu</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="style_template">Template</Label>
                                        <Select value={formData.style_template} onValueChange={(value) => setFormData({ ...formData, style_template: value })}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="default">Par défaut (Logo + Menu)</SelectItem>
                                                <SelectItem value="logo-center-cta">Logo - Menu centré - CTA</SelectItem>
                                                <SelectItem value="logo-menu">Logo - Menu aligné à droite</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="is_sticky" checked={formData.is_sticky} onCheckedChange={(checked) => setFormData({ ...formData, is_sticky: checked === true })} />
                                        <Label htmlFor="is_sticky">Menu fixe (sticky)</Label>
                                    </div>
                                    <div>
                                        <Label htmlFor="logo">Logo Text</Label>
                                        <Input id="logo" value={formData.style_config.logo} onChange={(e) => setFormData({ ...formData, style_config: { ...formData.style_config, logo: e.target.value } })} placeholder="CITL" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="show_search" checked={formData.style_config.show_search} onCheckedChange={(checked) => setFormData({ ...formData, style_config: { ...formData.style_config, show_search: checked === true } })} />
                                        <Label htmlFor="show_search">Afficher la recherche</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="show_cta" checked={formData.style_config.show_cta} onCheckedChange={(checked) => setFormData({ ...formData, style_config: { ...formData.style_config, show_cta: checked === true } })} />
                                        <Label htmlFor="show_cta">Bouton CTA</Label>
                                    </div>
                                    {formData.style_config.show_cta && (
                                        <>
                                            <div>
                                                <Label htmlFor="cta_text">Texte du bouton CTA</Label>
                                                <Input id="cta_text" value={formData.style_config.cta_text} onChange={(e) => setFormData({ ...formData, style_config: { ...formData.style_config, cta_text: e.target.value } })} placeholder="Contact" />
                                            </div>
                                            <div>
                                                <Label htmlFor="cta_url">URL du bouton CTA</Label>
                                                <Input id="cta_url" value={formData.style_config.cta_url} onChange={(e) => setFormData({ ...formData, style_config: { ...formData.style_config, cta_url: e.target.value } })} placeholder="/contact" />
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Éléments du menu</CardTitle>
                                        <Button type="button" onClick={() => { setEditingItem(null); setShowItemForm(true); }} className="bg-orange-600 hover:bg-orange-700">
                                            <Plus className="mr-2 h-4 w-4" />Ajouter un élément
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {menuItems.length === 0 ? (
                                        <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
                                            <p className="text-gray-500">Aucun élément dans ce menu.</p>
                                            <p className="mt-2 text-sm text-gray-400">Cliquez sur "Ajouter un élément" pour commencer</p>
                                        </div>
                                    ) : (
                                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                            <SortableContext items={rootItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                                                <div className="space-y-2">
                                                    {rootItems.map((item) => (
                                                        <SortableMenuItem key={item.id} item={item} onDelete={handleDeleteItem} onEdit={handleEditItem} />
                                                    ))}
                                                </div>
                                            </SortableContext>
                                        </DndContext>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>

                <MenuItemForm open={showItemForm} onClose={() => { setShowItemForm(false); setEditingItem(null); }} onSave={handleSaveItem} pages={pages} parentOptions={rootItems} editingItem={editingItem} />
            </div>
        </AppLayout>
    );
}
