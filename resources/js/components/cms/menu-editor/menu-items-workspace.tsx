import { MenuItemData } from '@/components/cms/sortable-menu-item-v2';
import { EmptyMenuState } from './empty-menu-state';
import { MenuTreeView } from './menu-tree-view';

interface MenuItemsWorkspaceProps {
    menuItems: MenuItemData[];
    rootItems: MenuItemData[];
    onDelete: (id: string | number) => void;
    onEdit: (item: MenuItemData) => void;
    onAddItem: () => void;
    onUpdate: (items: MenuItemData[]) => void;
}

export function MenuItemsWorkspace({
    menuItems,
    rootItems,
    onDelete,
    onEdit,
    onAddItem,
    onUpdate,
}: MenuItemsWorkspaceProps) {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {menuItems.length === 0 ? (
                <EmptyMenuState onAddItem={onAddItem} />
            ) : (
                <MenuTreeView
                    items={menuItems}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            )}
        </div>
    );
}
