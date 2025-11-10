import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState, useMemo } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { MenuItemData } from '@/components/cms/sortable-menu-item-v2';
import { MenuItemForm } from '@/components/cms/menu-item-form';
import {
    MenuConfigurationSidebar,
    MenuEditorHeader,
    MenuItemsWorkspace,
} from '@/components/cms/menu-editor';

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
            cta_url: menu.style_config?.cta_url || ''
        }
    });
    const [menuItems, setMenuItems] = useState<MenuItemData[]>(menu.all_items || []);
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItemData | null>(null);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    const availablePages = useMemo(() => {
        const usedPageIds = menuItems
            .filter(item => item.page_id !== null && item.page_id !== undefined)
            .map(item => Number(item.page_id));
        return pages.filter(page => !usedPageIds.includes(Number(page.id)));
    }, [pages, menuItems]);

    // Gestion du drag and drop des pages depuis la sidebar
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeData = active.data.current;

        // Seules les pages peuvent être glissées depuis la sidebar
        if (activeData?.type === 'page') {
            const page = activeData.page;
            const newItem: MenuItemData = {
                id: 'temp' + Date.now(),
                title: page.title,
                url: null,
                page_id: page.id,
                parent_id: null,
                order: menuItems.length,
                is_active: true,
                page: page
            };
            setMenuItems([...menuItems, newItem]);
        }
    };

    // Mise à jour des items depuis le tree view
    const handleUpdateItems = (updatedItems: MenuItemData[]) => {
        setMenuItems(updatedItems);
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

    // Construire l'arbre hiérarchique à partir de la liste plate
    const buildTree = (items: MenuItemData[]): MenuItemData[] => {
        const itemMap = new Map<string | number, MenuItemData>();
        const tree: MenuItemData[] = [];

        // Créer une copie de chaque item avec un tableau children vide
        items.forEach(item => {
            itemMap.set(item.id, { ...item, children: [] });
        });

        // Construire l'arbre
        itemMap.forEach(item => {
            if (item.parent_id === null || item.parent_id === undefined) {
                tree.push(item);
            } else {
                const parent = itemMap.get(item.parent_id);
                if (parent) {
                    parent.children = parent.children || [];
                    parent.children.push(item);
                } else {
                    // Si le parent n'existe pas, mettre à la racine
                    tree.push(item);
                }
            }
        });

        return tree;
    };

    const treeItems = buildTree(menuItems);
    const rootItems = menuItems.filter((item) => !item.parent_id);

    return (
        <AppLayout>
            <Head title={'Éditer: ' + menu.name} />
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="flex h-[calc(100vh-4rem)]">
                    <MenuConfigurationSidebar
                        name={formData.name}
                        location={formData.location}
                        isActive={formData.is_active}
                        styleTemplate={formData.style_template}
                        isSticky={formData.is_sticky}
                        styleConfig={formData.style_config}
                        availablePages={availablePages}
                        onNameChange={(value) => setFormData({ ...formData, name: value })}
                        onLocationChange={(value) => setFormData({ ...formData, location: value })}
                        onActiveChange={(value) => setFormData({ ...formData, is_active: value })}
                        onStyleTemplateChange={(value) => setFormData({ ...formData, style_template: value })}
                        onStickyChange={(value) => setFormData({ ...formData, is_sticky: value })}
                        onStyleConfigChange={(config) => setFormData({ ...formData, style_config: config })}
                    />
                    <div className="flex flex-1 flex-col">
                        <MenuEditorHeader
                            title="Éléments du menu"
                            description="Glissez-déposez pour réorganiser ou créer des sous-menus"
                            onCancel={() => window.history.back()}
                            onSave={handleSubmit}
                        />
                        <MenuItemsWorkspace
                            menuItems={menuItems}
                            rootItems={treeItems}
                            onDelete={handleDeleteItem}
                            onEdit={handleEditItem}
                            onAddItem={() => { setEditingItem(null); setShowItemForm(true); }}
                            onUpdate={handleUpdateItems}
                        />
                    </div>
                </div>
            </DndContext>
            <MenuItemForm
                open={showItemForm}
                onClose={() => { setShowItemForm(false); setEditingItem(null); }}
                onSave={handleSaveItem}
                pages={pages}
                parentOptions={rootItems}
                editingItem={editingItem}
            />
        </AppLayout>
    );
}
