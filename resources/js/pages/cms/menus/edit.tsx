import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useMemo } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableMenuItemV2, MenuItemData } from '@/components/cms/sortable-menu-item-v2';
import { DraggablePageItem } from '@/components/cms/draggable-page-item';
import { MenuItemForm } from '@/components/cms/menu-item-form';
import { Plus, Save, FileText, Settings } from 'lucide-react';

interface Menu {
    id: number;
    name: string;
    location: string;
    is_active: boolean;
    style_template: string;
    is_sticky: boolean;
    style_config: { logo?: string; show_search?: boolean; show_cta?: boolean; cta_text?: string; cta_url?: string; } | null;
}

interface Page { id: number; title: string; slug: string; }
interface Props { menu: Menu & { all_items: MenuItemData[] }; pages: Page[]; }

export default function Edit({ menu, pages }: Props) {
    const [formData, setFormData] = useState({
        name: menu.name, location: menu.location, is_active: menu.is_active,
        style_template: menu.style_template || 'default', is_sticky: menu.is_sticky,
        style_config: { logo: menu.style_config?.logo || '', show_search: menu.style_config?.show_search || false,
            show_cta: menu.style_config?.show_cta || false, cta_text: menu.style_config?.cta_text || '', cta_url: menu.style_config?.cta_url || '' }
    });
    const [menuItems, setMenuItems] = useState<MenuItemData[]>(menu.all_items || []);
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItemData | null>(null);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    const availablePages = useMemo(() => {
        const usedPageIds = menuItems.filter(item => item.page_id !== null).map(item => item.page_id);
        return pages.filter(page => !usedPageIds.includes(page.id));
    }, [pages, menuItems]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        if (activeData?.type === 'page') {
            const page = activeData.page;
            // Si on dépose sur un menu-item ou sa drop zone, on le fait devenir enfant
            let parentId = null;
            if (overData?.type === 'menu-item-drop') {
                parentId = overData.parentId;
            } else if (overData?.type === 'menu-item') {
                parentId = overData.item.id;
            }
            const newItem: MenuItemData = { id: 'temp' + Date.now(), title: page.title, url: null, page_id: page.id,
                parent_id: parentId, order: menuItems.length, is_active: true, page: page };
            setMenuItems([...menuItems, newItem]);
        } else if (activeData?.type === 'menu-item' && overData?.type === 'menu-item') {
            if (active.id !== over.id) {
                const draggedItem = menuItems.find(item => item.id === active.id);
                const targetItem = menuItems.find(item => item.id === over.id);

                // Si on dépose sur un élément de même niveau (même parent_id), on réorganise
                if (draggedItem?.parent_id === targetItem?.parent_id) {
                    setMenuItems((items) => {
                        const oldIndex = items.findIndex((item) => item.id === active.id);
                        const newIndex = items.findIndex((item) => item.id === over.id);
                        return arrayMove(items, oldIndex, newIndex);
                    });
                } else {
                    // Sinon, on fait devenir enfant de l'élément cible
                    setMenuItems((items) => items.map((item) =>
                        item.id === active.id ? { ...item, parent_id: over.id as number } : item
                    ));
                }
            }
        } else if (activeData?.type === 'menu-item' && overData?.type === 'menu-item-drop') {
            const itemId = active.id; const parentId = overData.parentId;
            if (itemId !== parentId) {
                setMenuItems((items) => items.map((item) => item.id === itemId ? { ...item, parent_id: parentId as number | null } : item));
            }
        }
    };

    const handleSaveItem = (itemData: Partial<MenuItemData>) => {
        if (editingItem) {
            setMenuItems((items) => items.map((item) => item.id === editingItem.id ? { ...item, ...itemData } : item));
            setEditingItem(null);
        } else {
            const newItem: MenuItemData = { id: 'temp' + Date.now(), title: itemData.title || '', url: itemData.url || null,
                page_id: itemData.page_id || null, parent_id: itemData.parent_id || null, order: menuItems.length, is_active: itemData.is_active ?? true };
            setMenuItems([...menuItems, newItem]);
        }
    };

    const handleDeleteItem = (id: string | number) => {
        if (confirm('Êtes-vous sûr ?')) setMenuItems((items) => items.filter((item) => item.id !== id));
    };

    const handleEditItem = (item: MenuItemData) => { setEditingItem(item); setShowItemForm(true); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put('/cms/menus/' + menu.id, { ...formData, items: menuItems.map((item, index) => ({ ...item, order: index })) });
    };

    const rootItems = menuItems.filter((item) => !item.parent_id);

    return (
        <AppLayout>
            <Head title={'Éditer: ' + menu.name} />
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="flex h-[calc(100vh-4rem)]">
                    <div className="w-80 flex-shrink-0 border-r bg-gray-50">
                    <div className="flex h-full flex-col">
                        <div className="border-b bg-white p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold"><Settings className="h-5 w-5" />Configuration</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <Card>
                                <CardHeader className="pb-3"><CardTitle className="text-sm">Informations</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    <div><Label htmlFor="name" className="text-xs">Nom</Label>
                                        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-8 text-sm" /></div>
                                    <div><Label htmlFor="location" className="text-xs">Emplacement</Label>
                                        <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                                            <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="header">En-tête</SelectItem><SelectItem value="footer">Pied de page</SelectItem></SelectContent>
                                        </Select></div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked === true })} />
                                        <Label htmlFor="is_active" className="text-xs">Actif</Label></div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-3"><CardTitle className="text-sm">Style</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    <div><Label className="text-xs">Template</Label>
                                        <Select value={formData.style_template} onValueChange={(value) => setFormData({ ...formData, style_template: value })}>
                                            <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="default">Par défaut</SelectItem>
                                                <SelectItem value="logo-center-cta">Logo - Menu centré - CTA</SelectItem>
                                                <SelectItem value="logo-menu">Logo - Menu aligné</SelectItem></SelectContent>
                                        </Select></div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="is_sticky" checked={formData.is_sticky} onCheckedChange={(checked) => setFormData({ ...formData, is_sticky: checked === true })} />
                                        <Label htmlFor="is_sticky" className="text-xs">Menu fixe</Label></div>
                                    <div><Label className="text-xs">Logo</Label>
                                        <Input value={formData.style_config.logo} onChange={(e) => setFormData({ ...formData, style_config: { ...formData.style_config, logo: e.target.value } })} className="h-8 text-sm" placeholder="CITL" /></div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="show_cta" checked={formData.style_config.show_cta} onCheckedChange={(checked) => setFormData({ ...formData, style_config: { ...formData.style_config, show_cta: checked === true } })} />
                                        <Label htmlFor="show_cta" className="text-xs">Bouton CTA</Label></div>
                                    {formData.style_config.show_cta && (
                                        <><Input value={formData.style_config.cta_text} onChange={(e) => setFormData({ ...formData, style_config: { ...formData.style_config, cta_text: e.target.value } })} className="h-8 text-sm" placeholder="Texte CTA" />
                                        <Input value={formData.style_config.cta_url} onChange={(e) => setFormData({ ...formData, style_config: { ...formData.style_config, cta_url: e.target.value } })} className="h-8 text-sm" placeholder="URL CTA" /></>
                                    )}
                                </CardContent>
                            </Card>
                            <div>
                                <div className="mb-2 flex items-center gap-2"><FileText className="h-4 w-4 text-gray-600" />
                                    <h3 className="text-sm font-semibold">Pages disponibles</h3><span className="text-xs text-gray-500">({availablePages.length})</span></div>
                                <p className="mb-3 text-xs text-gray-600">Glissez-déposez une page vers le menu</p>
                                <div className="max-h-96 space-y-2 overflow-y-auto">
                                    {availablePages.length === 0 ? (
                                        <div className="rounded-md border-2 border-dashed p-4 text-center"><p className="text-xs text-gray-500">Toutes les pages sont ajoutées</p></div>
                                    ) : availablePages.map((page) => <DraggablePageItem key={page.id} page={page} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between border-b bg-white px-6 py-4">
                        <div><h1 className="text-xl font-bold">Éléments du menu</h1>
                            <p className="text-sm text-gray-600">Glissez-déposez pour réorganiser ou créer des sous-menus</p></div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.history.back()}>Annuler</Button>
                            <Button size="sm" onClick={handleSubmit} className="bg-orange-600 hover:bg-orange-700"><Save className="mr-2 h-4 w-4" />Enregistrer</Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                        {menuItems.length === 0 ? (
                                <div className="flex h-full items-center justify-center"><div className="text-center">
                                    <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                    <h3 className="mb-2 text-lg font-medium">Aucun élément</h3>
                                    <p className="mb-4 text-sm text-gray-600">Glissez une page depuis la sidebar</p>
                                    <Button onClick={() => { setEditingItem(null); setShowItemForm(true); }} className="bg-orange-600 hover:bg-orange-700">
                                        <Plus className="mr-2 h-4 w-4" />Ajouter</Button></div></div>
                            ) : (
                                <SortableContext items={rootItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                                    <div className="mx-auto max-w-4xl space-y-2">
                                        {rootItems.map((item) => <SortableMenuItemV2 key={item.id} item={item} onDelete={handleDeleteItem} onEdit={handleEditItem} />)}
                                    </div>
                                </SortableContext>
                            )}
                    </div>
                </div>
                </div>
            </DndContext>
            <MenuItemForm open={showItemForm} onClose={() => { setShowItemForm(false); setEditingItem(null); }} onSave={handleSaveItem} pages={pages} parentOptions={rootItems} editingItem={editingItem} />
        </AppLayout>
    );
}
