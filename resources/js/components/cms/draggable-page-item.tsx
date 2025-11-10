import { useDraggable } from '@dnd-kit/core';
import { FileText } from 'lucide-react';

interface Page {
    id: number;
    title: string;
    slug: string;
}

interface DraggablePageItemProps {
    page: Page;
}

export function DraggablePageItem({ page }: DraggablePageItemProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `page-${page.id}`,
        data: {
            type: 'page',
            page: page,
        },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`group cursor-grab rounded-md border bg-white p-3 transition-all hover:border-orange-300 hover:shadow-sm active:cursor-grabbing ${
                isDragging ? 'opacity-50' : 'opacity-100'
            }`}
        >
            <div className="flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-orange-600" />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                        {page.title}
                    </p>
                    <p className="truncate text-xs text-gray-500">/{page.slug}</p>
                </div>
            </div>
        </div>
    );
}
