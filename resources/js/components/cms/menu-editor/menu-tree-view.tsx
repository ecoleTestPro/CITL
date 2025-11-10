import { Tree, NodeModel, TreeMethods, RenderParams } from '@minoru/react-dnd-treeview';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRef } from 'react';
import { GripVertical, Trash2, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MenuItemData } from '@/components/cms/sortable-menu-item-v2';

interface MenuTreeViewProps {
    items: MenuItemData[];
    onUpdate: (newItems: MenuItemData[]) => void;
    onDelete: (id: string | number) => void;
    onEdit: (item: MenuItemData) => void;
}

export function MenuTreeView({ items, onUpdate, onDelete, onEdit }: MenuTreeViewProps) {
    const treeRef = useRef<TreeMethods>(null);

    // Convertir MenuItemData en NodeModel pour react-dnd-treeview
    const treeData: NodeModel<MenuItemData>[] = items
        .filter(item => item && item.id !== undefined)
        .map((item) => ({
            id: item.id,
            parent: item.parent_id || 0,
            droppable: true,
            text: item.title,
            data: item,
        }));

    const handleDrop = (newTree: NodeModel<MenuItemData>[]) => {
        // Convertir NodeModel en MenuItemData
        const updatedItems = newTree.map((node, index) => ({
            ...node.data!,
            parent_id: node.parent === 0 ? null : node.parent,
            order: index,
        }));
        onUpdate(updatedItems);
    };

    const CustomNode = ({ node, depth, isOpen, onToggle }: RenderParams) => {
        // Protection robuste contre les nœuds invalides
        if (!node) {
            return null;
        }

        // Si le node n'a pas de data, c'est probablement un placeholder pendant le drag
        if (!node.data) {
            return (
                <div
                    className="mb-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-3"
                    style={{ marginLeft: `${depth * 24}px` }}
                >
                    <span className="text-sm text-gray-400">Element placeholder</span>
                </div>
            );
        }

        const item = node.data as MenuItemData;
        if (!item || item.id === undefined || item.id === null) {
            return null;
        }

        const indent = depth * 24;

        return (
            <div
                className="group mb-2 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-orange-300 hover:shadow-sm"
                style={{ marginLeft: `${indent}px` }}
            >
                {/* Drag Handle */}
                <div className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                </div>

                {/* Expand/Collapse */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onToggle) {
                            onToggle();
                        }
                    }}
                    className="text-gray-500 hover:text-gray-700"
                >
                    {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </button>

                {/* Item Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{item.title}</span>
                        {!item.is_active && (
                            <Badge variant="secondary" className="text-xs">
                                Inactif
                            </Badge>
                        )}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                        {item.page ? (
                            <span className="text-orange-600 flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {item.page.slug}
                            </span>
                        ) : item.url ? (
                            <span>URL: {item.url}</span>
                        ) : (
                            <span className="text-gray-400">Sans lien</span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(item)}
                        className="h-8 hover:bg-orange-50 hover:text-orange-600"
                    >
                        Éditer
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(item.id)}
                        className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    const CustomDragPreview = ({ node }: RenderParams) => {
        if (!node.data) {
            return null;
        }

        const item = node.data as MenuItemData;
        return (
            <div className="rounded-lg border border-orange-500 bg-white p-3 shadow-lg">
                <span className="font-medium">{item.title}</span>
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="mx-auto max-w-4xl">
                <Tree
                    ref={treeRef}
                    tree={treeData}
                    rootId={0}
                    render={CustomNode}
                    dragPreviewRender={CustomDragPreview}
                    onDrop={handleDrop}
                    classes={{
                        root: 'space-y-2',
                        draggingSource: 'opacity-30',
                        dropTarget: 'bg-orange-50',
                    }}
                    sort={false}
                    insertDroppableFirst={false}
                    canDrop={(tree, { dragSource, dropTargetId }) => {
                        // Empêcher de déposer un parent dans son propre enfant
                        if (dragSource?.parent === dropTargetId) {
                            return true;
                        }
                        return true;
                    }}
                    dropTargetOffset={10}
                    placeholderRender={(node, { depth }) => {
                        if (!node) return null;
                        return (
                            <div
                                className="rounded-lg border-2 border-dashed border-orange-400 bg-orange-50 p-3"
                                style={{ marginLeft: `${depth * 24}px` }}
                            >
                                <span className="text-sm text-orange-600">Déposer ici</span>
                            </div>
                        );
                    }}
                />
            </div>
        </DndProvider>
    );
}
