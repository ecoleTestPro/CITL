import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export interface MenuItemData {
    id: string | number;
    title: string;
    url: string | null;
    page_id: number | null;
    page?: {
        id: number;
        title: string;
        slug: string;
    };
    parent_id: number | null;
    order: number;
    is_active: boolean;
    children?: MenuItemData[];
}

interface SortableMenuItemProps {
    item: MenuItemData;
    onDelete: (id: string | number) => void;
    onEdit: (item: MenuItemData) => void;
    onMakeChild?: (itemId: string | number, parentId: string | number) => void;
    depth?: number;
}

export function SortableMenuItemV2({
    item,
    onDelete,
    onEdit,
    onMakeChild,
    depth = 0,
}: SortableMenuItemProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    const {
        attributes,
        listeners,
        setNodeRef: setSortableNodeRef,
        transform,
        transition,
        isDragging,
        active,
    } = useSortable({
        id: item.id,
        data: {
            type: 'menu-item',
            item: item,
        },
    });

    // Make this item a drop zone for creating children
    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
        id: `droppable-${item.id}`,
        data: {
            type: 'menu-item-drop',
            parentId: item.id,
        },
    });

    // Détection du décalage horizontal pour indiquer qu'on va créer un sous-menu
    const INDENT_THRESHOLD = 40;
    const wantsToIndent = transform && transform.x > INDENT_THRESHOLD;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const hasChildren = item.children && item.children.length > 0;

    return (
        <div ref={setSortableNodeRef} style={style}>
            <div
                ref={setDroppableNodeRef}
                className={`group mb-2 flex items-center gap-3 rounded-lg border bg-white p-3 transition-all hover:border-orange-300 hover:shadow-sm ${
                    isDragging ? 'border-orange-500 shadow-lg' :
                    isOver && wantsToIndent ? 'border-orange-500 bg-orange-100 shadow-md ring-2 ring-orange-400' :
                    isOver ? 'border-orange-400 bg-orange-50 shadow-md' :
                    'border-gray-200'
                }`}
                style={{ marginLeft: `${depth * 24}px` }}
            >
                {/* Drag Handle */}
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                </div>

                {/* Expand/Collapse for items with children */}
                {hasChildren ? (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                ) : (
                    <div className="w-4" />
                )}

                {/* Item Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                            {item.title}
                        </span>
                        {!item.is_active && (
                            <Badge variant="secondary" className="text-xs">
                                Inactif
                            </Badge>
                        )}
                        {hasChildren && (
                            <Badge
                                variant="outline"
                                className="border-orange-200 text-orange-700"
                            >
                                {item.children?.length} sous-menu(s)
                            </Badge>
                        )}
                        {isOver && wantsToIndent && (
                            <Badge className="bg-orange-500 animate-pulse">
                                → Créer un sous-menu
                            </Badge>
                        )}
                        {isOver && !wantsToIndent && (
                            <Badge className="bg-blue-500">
                                ↕ Réorganiser
                            </Badge>
                        )}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                        {item.page ? (
                            <span className="text-orange-600">
                                Page: {item.page.slug}
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

            {/* Render children if expanded */}
            {hasChildren && isExpanded && (
                <div className="ml-8">
                    {item.children?.map((child) => (
                        <SortableMenuItemV2
                            key={child.id}
                            item={child}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onMakeChild={onMakeChild}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
